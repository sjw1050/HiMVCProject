package www.olive.mvc.customerCenter.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import www.olive.mvc.customerCenter.dto.Notice;
import www.olive.mvc.customerCenter.dto.OliveFile;
import www.olive.mvc.customerCenter.service.NoticeService;
import www.olive.mvc.util.FileUtil;

@Controller
@RequestMapping("cs/notice/**")
public class NoticeController {

	@Autowired
	NoticeService noticeService;

	@GetMapping("viewall")
	public String viewallNotice(Model model) {
		List<Notice> list = noticeService.viewNotice();
		model.addAttribute("noticelist", list);
		return "customercenter/notice/viewNotice";
	}

	@GetMapping("write")
	public String writeNotice() {
		// System.out.println("write 진입 성공");
		return "customercenter/notice/write";
	}

	@PostMapping("write")
	public String write(Notice notice,MultipartHttpServletRequest mtfRequest, HttpServletRequest request) {
		// System.out.println("공지 입력되었니?" + notice);
		List<MultipartFile> fileList = mtfRequest.getFiles("file");
		noticeService.saveNotice(notice);
		for(MultipartFile mf : fileList) {
			if (mf.getSize() != 0) {
				try {
				String savedFilePath = FileUtil.uploadFile(mf, request);
				String filename = savedFilePath.substring(10).trim();
				System.out.println(filename);
				noticeService.saveNoticeFile(filename);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			
			}
		}			 
		return "redirect:cs/notice/viewall";
	}

	@GetMapping("viewnotice")
	public String viewnotice(Long noticeNum, Model model, HttpServletRequest request) {
		// System.out.println("공지번호 들어왔니?" + noticeNum);
		Notice notice = noticeService.detailNotice(noticeNum);
		List<OliveFile> noticeFiles = noticeService.getNoticeFile(noticeNum);
		//System.out.println("공지 파일들>>>"+noticeFiles);
		if (noticeFiles != null) {
			// System.out.println("파일 이미지 경로 수정되었니?"+noticeFile.getFileName());
			model.addAttribute("noticeFiles", noticeFiles);
		}
		// System.out.println("공지 번호에 맞게 들어왔니?" + notice);
		model.addAttribute("notice", notice);
		return "customercenter/notice/detailnotice";

	}

	@PostMapping("modinotice")
	public String modinotice(Notice notice, MultipartHttpServletRequest mtfRequest, HttpServletRequest request) {
		OliveFile oFile = new OliveFile();
		//System.out.println("파일 들어옴?"+mtfRequest.getFiles("file").get(0).getOriginalFilename());
		//System.out.println("공지 수정 내용 들어왔니?" + notice);
		List<MultipartFile> files = mtfRequest.getFiles("file");
		for(MultipartFile mf : files) {
			//System.out.println("파일 들어옴?"+mf.getOriginalFilename());
			if (mf.getSize() != 0) {
				try {
				String savedFilePath = FileUtil.uploadFile(mf, request);
				String fileName = savedFilePath.substring(10).trim();
				oFile.setFileName(fileName);
				oFile.setNoticeNum(notice);
				//System.out.println("올리브파일 잘 받아졌니?"+oFile);
				//System.out.println(filename);
				noticeService.addNoticeFile(oFile);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			
			}
		}	
		noticeService.modifyNotice(notice);
		return "redirect:/notice/viewall";
	}

	@PostMapping("removenotice")
	public String removenotice(Long noticeNum) {
		// System.out.println("공지 번호 받아와지니?" + noticeNum);
		noticeService.removeNotice(noticeNum);
		return "redirect:/notice/viewall";
	}

	@GetMapping("download")
	public ResponseEntity<byte[]> downloadFile(String fileName, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String originalName = null;
		if(fileName.contains("jpg") || fileName.contains("gif") || fileName.contains("png") || fileName.contains("jpeg")) {
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
		noticeService.filedelete(fileName);
		FileUtil.deleteFile(fileName, request);
		return "success";
	}

}
