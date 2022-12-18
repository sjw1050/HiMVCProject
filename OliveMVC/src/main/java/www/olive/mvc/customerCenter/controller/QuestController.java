package www.olive.mvc.customerCenter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import www.olive.mvc.customerCenter.dto.AnswerBoard;
import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.customerCenter.service.QuestService;
import www.olive.mvc.member.dto.AuthInfo;

import java.lang.ProcessBuilder.Redirect;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/quest/*")
public class QuestController {
	
	@Autowired
	QuestService questService;
	
	@GetMapping("view")
	public String viewQuest(Model model, HttpSession session) {
		AuthInfo logininfo = (AuthInfo) session.getAttribute("info");
		if(logininfo == null) {
			List<QuestionBoard> qList = questService.viewquest();
			model.addAttribute("qlist", qList);
			return "quest/viewquest";
		}else {
			List<QuestionBoard> qList = questService.viewMemberQuest(logininfo);
			model.addAttribute("qlist", qList);
			return "quest/viewquest";
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
		return "quest/write";
	}
	
	@PostMapping("write")
	public String saveQuest(HttpSession session, QuestionBoard quest) {
		AuthInfo loginauth = (AuthInfo) session.getAttribute("info");
		//System.out.println("문의 내용 들어왔니?>>>" + quest);
		//System.out.println("로그인 정보 들어왔니?>>" +loginauth);
		questService.saveQuest(quest, loginauth);
		
		return "redirect:/quest/view";
	}
	
	@PostMapping("modiquest")
	public String modiquest(QuestionBoard quest) {
		//System.out.println("퀘스트 제대로 들어왔니?" + quest);
		questService.modiQuest(quest);
		return "redirect:/quest/view";
	}
	
	@PostMapping("removequest")
	public String removequest(Long questionNum) {
		System.out.println("퀘스트번호 들어왔니?" + questionNum);
		questService.removeQuest(questionNum);
		return "redirect:/quest/view";
	}
	
	@PostMapping("addAnswer")
	public String addAnswer(Model model,AnswerBoard answer, RedirectAttributes redirectAttributes) {
		//System.out.println("답변 받아왔니?" + answer);
		questService.saveAnswer(answer);
		redirectAttributes.addAttribute("questionNum", answer.getQuestionNum());
		return "redirect:/quest/detailQuest";
	}
	
	@PostMapping("modifyAnswer")
	public String modifyAnswer(AnswerBoard answerBoard, RedirectAttributes redirectAttributes) {
		//System.out.println("답변수정 잘 받아왔니?" + answerBoard);
		questService.updateAnswer(answerBoard);
		redirectAttributes.addAttribute("questionNum", answerBoard.getQuestionNum());
		return "redirect:/quest/detailQuest";
	}
	

}
