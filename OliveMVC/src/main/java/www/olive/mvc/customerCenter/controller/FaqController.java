package www.olive.mvc.customerCenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.customerCenter.dto.Faq;
import www.olive.mvc.customerCenter.service.FaqService;

@Controller
@RequestMapping("/faq")
public class FaqController {
	
	@Autowired
	FaqService faqService;
	
	@GetMapping("faqview")
	public String faqView(Model model) {
		List<Faq> list = faqService.selectAll();
		model.addAttribute("list", list);
		return "faq/faqview";
	}

}
