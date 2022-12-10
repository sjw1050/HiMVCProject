package www.olive.mvc.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@GetMapping("/view")
	public String viewMember(Model model) {
		List<MemberEntity> list = memberService.selectAll(); 
		model.addAttribute("list",list);
		return "/member/viewAll";
	}

}
