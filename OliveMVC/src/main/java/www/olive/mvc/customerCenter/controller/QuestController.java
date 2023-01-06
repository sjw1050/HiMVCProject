package www.olive.mvc.customerCenter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import www.olive.mvc.customerCenter.dto.AnswerBoard;
import www.olive.mvc.customerCenter.dto.OliveFile;
import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.customerCenter.service.QuestService;
import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.util.FileUtil;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
@RequestMapping("cs/quest/**")
public class QuestController {
	
	@Autowired
	QuestService questService;
	
	@GetMapping("view")
	public String viewQuest(Model model, HttpSession session) {
		AuthInfo logininfo = (AuthInfo) session.getAttribute("info");
		Admin admin = (Admin) session.getAttribute("admininfo");
		if(logininfo == null && admin == null) {
			return "/main";
		}else {
			List<QuestionBoard> mqList = questService.viewMemberQuest(logininfo);
			List<OliveFile> questFile = questService.getFiles();
			System.out.println("받아온 전체 파일 정보 " + questFile);
			//List<QuestionBoard> mqList = questService.viewquest();
			List<AnswerBoard> answerBoard = questService.viewAnswerList();
			
			//System.out.println("퀘스트 들어왔니?"+qList.get(0).getWriter().getMemberNum());
			model.addAttribute("mqlist", mqList);
			model.addAttribute("questFiles", questFile);
			model.addAttribute("answer", answerBoard);
			return "customercenter/quest/viewquest";
		}
	}
	
	@GetMapping("detailQuest")
	public String detailQuest(Model model, @RequestParam("questionNum") Long questionNum, HttpSession session) {
		//System.out.println("퀘션 넘버 받았니?" + questNum);
		if(session.getAttribute("admininfo")!= null) {
			//System.out.println("어드민 체크에 들어왔니?");
			questService.adminQuestCheck(questionNum);
		}
		QuestionBoard qBoard = questService.detailQuest(questionNum);
		List<OliveFile> questFile = questService.getQuestFile(questionNum);
		if (questFile != null) {
			//System.out.println("QuestFileList>>>>?"+questFile.get(0).getFileName());
			model.addAttribute("questFiles", questFile);
		}
		//System.out.println("어드민체크 변경되었니?" + qBoard.isViewCheck());
		List<AnswerBoard> answerBoard = questService.viewAnswer(questionNum);
		//System.out.println("답변 들어왔니?"+answerBoard);
		//System.out.println("퀘스트 들어왔니?>>"+qBoard);
		
		model.addAttribute("qboard", qBoard);
		model.addAttribute("answer", answerBoard);
		return "quest/detailquest";
	}
	
	@GetMapping("write")
	public String writeFormQuest() {
		return "customercenter/quest/write";
	}
	
	@PostMapping("write")
	public String saveQuest(HttpSession session, QuestionBoard quest, MultipartFile file, HttpServletRequest request) {
		System.out.println("퀘스트 들어옴?" + quest);
		System.out.println("파일 들어옴?" + file);
		AuthInfo loginauth = (AuthInfo) session.getAttribute("info");
		//System.out.println("문의 내용 들어왔니?>>>" + quest);
		//System.out.println("로그인 정보 들어왔니?>>" +loginauth);
//		System.out.println("파일 입력?"+mtfRequest.getFiles("file").get(0).getOriginalFilename());
//		List<MultipartFile> fileList = mtfRequest.getFiles("file");
		questService.saveQuest(quest, loginauth);
//		for(MultipartFile mf : fileList) {
//			if (mf.getSize() != 0) {
//				try {
//				String savedFilePath = FileUtil.uploadFile(mf, request);
//				String filename = savedFilePath.substring(10).trim();
//				System.out.println(filename);
//				questService.saveQuestFile(filename);
//				} catch (Exception e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//			
//			}
//		}		
		if(file != null) {
		if(file.getSize() != 0) {
			try {
				String savedFilePath = FileUtil.uploadFile(file, request);
				String filename = savedFilePath.substring(10).trim();
				System.out.println(filename);
				questService.saveQuestFile(filename);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
		}	
		
		return "redirect:cs/quest/view";
	}
	
	@PostMapping("modiquest")
	public String modiquest(QuestionBoard quest, MultipartHttpServletRequest mtfRequest, HttpServletRequest request, RedirectAttributes redirectAttributes) {
		OliveFile oFile = new OliveFile();
		//System.out.println("퀘스트 제대로 들어왔니?" + quest);
		List<MultipartFile> files = mtfRequest.getFiles("file");
		for(MultipartFile mf : files) {
			System.out.println("파일 들어옴?"+mf.getOriginalFilename());
			if (mf.getSize() != 0) {
				try {
				String savedFilePath = FileUtil.uploadFile(mf, request);
				String fileName = savedFilePath.substring(10).trim();
				oFile.setFileName(fileName);
				oFile.setQuestionNum(quest);
				//System.out.println("올리브파일 잘 받아졌니?"+oFile);
				//System.out.println(fileName);
				questService.addQuestFile(oFile);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			
			}
		}
		questService.modiQuest(quest);
		redirectAttributes.addAttribute("questionNum", quest.getQuestionNum());
		return "redirect:/quest/detailQuest";
	}
	
	@GetMapping("download")
	public ResponseEntity<byte[]> downloadFile(String fileName, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String originalName = null;
		if(fileName.toLowerCase().contains("jpg") || fileName.toLowerCase().contains("gif") || fileName.toLowerCase().contains("png") || fileName.toLowerCase().contains("jpeg")) {
			originalName = fileName.substring(6, 18) + fileName.substring(20);
		}else {
			System.out.println(fileName.substring(5, 18));
			originalName = fileName.substring(5, 17) + fileName.substring(17);
		}
		

		HttpHeaders httpHeaders = FileUtil.getHttpHeaders(originalName);
		String rootPath = FileUtil.getRootPath(fileName, request); // 업로드 기본경로 경로
		//System.out.println("루트경로"+rootPath);
		ResponseEntity<byte[]> entity = null;
		
		try (InputStream inputStream = new FileInputStream(rootPath + originalName)) {
	        entity = new ResponseEntity<>(IOUtils.toByteArray(inputStream), httpHeaders, HttpStatus.CREATED);
	    } catch (Exception e) {
	        e.printStackTrace();
	        entity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
	    return entity;

	}
	
	@GetMapping("delete")
	public @ResponseBody String delelteFile(String fileName, HttpServletRequest request) {
		//System.out.println("파일네임 들어왔니?"+fileName);
		questService.filedelete(fileName);
		FileUtil.deleteFile(fileName, request);
		return "success";
	}
	
	@PostMapping("removequest")
	public String removequest(Long questionNum) {
		//System.out.println("퀘스트번호 들어왔니?" + questionNum);
		questService.removeQuest(questionNum);
		return "redirect:cs/quest/view";
	}
	
	@PostMapping("addAnswer")
	public String addAnswer(Model model,AnswerBoard answer) {
		//System.out.println("답변 받아왔니?" + answer);
		questService.saveAnswer(answer);
		questService.adminQuestCheck(answer.getQuestionNum());
		return "redirect:cs/quest/view";
	}
	
	@PostMapping("modifyAnswer")
	public String modifyAnswer(AnswerBoard answerBoard) {
		//System.out.println("답변수정 잘 받아왔니?" + answerBoard);
		questService.updateAnswer(answerBoard);
		return "redirect:cs/quest/view";
	}
	

}
