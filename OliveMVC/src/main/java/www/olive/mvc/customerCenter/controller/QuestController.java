package www.olive.mvc.customerCenter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.customerCenter.service.QuestService;
import www.olive.mvc.member.dto.AuthInfo;

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
	public String detailQuest(Model model, Long questNum) {
		//System.out.println("퀘션 넘버 받았니?" + questNum);
		QuestionBoard qBoard = questService.detailQuest(questNum);
		//System.out.println("퀘스트 들어왔니?>>"+qBoard);
		
		model.addAttribute("qboard", qBoard);
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
	

}
