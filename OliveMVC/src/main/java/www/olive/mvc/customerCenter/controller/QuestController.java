package www.olive.mvc.customerCenter.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.customerCenter.service.QuestService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

@Controller
@RequestMapping("/quest/*")
public class QuestController {
	
	@Autowired
	QuestService questService;
	
	@GetMapping("view")
	public String viewQuest(Model model) {
		List<QuestionBoard> qList = questService.viewquest();
		model.addAttribute("qlist", qList);
		return "quest/viewquest";
		
	}

}
