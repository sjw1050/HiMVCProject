package www.olive.mvc.customerCenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.customerCenter.dto.Faq;
import www.olive.mvc.customerCenter.service.FaqService;

@Controller
@RequestMapping("/cs/faq/**")
public class FaqController {
	
	@Autowired
	FaqService faqService;
	
	@GetMapping("faqview")
	public String faqView(Model model) {
		List<Faq> list = faqService.selectAll();
		model.addAttribute("faqList", list);
		return "/customercenter/cs_main";
	}
	
	@PostMapping("search")
	public String faqSerach(String inqTitNm, Model model) {
		System.out.println("검색어 받아왔니?" + inqTitNm);
		List<Faq> faqList = faqService.searchFaq(inqTitNm);
		int count = faqService.searchCount(inqTitNm);
		System.out.println("검색어가 들어간 테이블 카운트" + count);
		System.out.println("받아온 검색어 목록>>>" + faqList);
		model.addAttribute("faqList", faqList);
		model.addAttribute("inqTitNm", inqTitNm);
		model.addAttribute("count", count);
		return "/customercenter/searchfaq";
	}

}
