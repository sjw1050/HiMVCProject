package www.olive.mvc.member.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;

@Controller
@RequestMapping("/member/**")
//내가왔노라
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@GetMapping("regist")
	public String regist() {
		return "/member/registForm";
	}
	
	@GetMapping("membercheck")
	public @ResponseBody String membercheck(MemberEntity member) {
		//System.out.println("멤버 id체크 id 받아왔니?"+member);
		MemberEntity checkmember = memberService.checkMember(member);
		//System.out.println("체크멤버에서 멤버가 들어왔니?" + checkmember);
		if(checkmember != null) {
			return "fail";
		}else {
			return "success";
		}
	}
	
	@PostMapping("regist")
	public String registmember(MemberEntity member, Model model) {
			memberService.registMember(member);
			return "/main";
	}
	
	@GetMapping("view")
	public String viewMember(Model model) {
		List<MemberEntity> list = memberService.selectAll(); 
		model.addAttribute("list",list);
		return "/member/viewAll";
	}
	
	@GetMapping("loginForm")
	public void loginForm() {
	}
	
	@PostMapping("login")
	public String login(HttpSession session, MemberEntity member, RedirectAttributes redirectAttributes) {
		//System.out.println(member);
		AuthInfo info = memberService.memberCheck(member.getMemberId(), member.getPw());
		if(info != null) {
			//System.out.println("멤버정보 : " + info);
		session.setAttribute("info", info);
		//model.addAttribute("info", info);
		if(session.getAttribute("togo") != null) {
			//System.out.println("세션에 붙었니?"+session.getAttribute("togo"));
			String togo = (String) session.getAttribute("togo");
			togo.substring(0);
			System.out.println("togo>>>"+togo);
			session.removeAttribute("togo");
			return togo;
		}
		return "redirect:/main";
		}else {
			redirectAttributes.addFlashAttribute("notmember", "아이디와 비밀번호가 일치하지 않습니다.");
			return "redirect:/main";
		}
	}
	
	@GetMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/main";
	}
	
	@GetMapping("adminlogin")
	public String adminloginForm() {
		return "/admin/loginForm";
	}
		
		@PostMapping("adminlogin")
		public String adminlogin(HttpSession session, Admin admin, Model model) {
			System.out.println("어드민 잘 들어왔니>>>"+admin);
			Admin _adminAdmin = memberService.adminCheck(admin.getAdminId(), admin.getAdminPw());
			if(_adminAdmin != null) {
			session.setAttribute("admininfo", _adminAdmin);
			if(session.getAttribute("togo") != null) {
				//System.out.println("세션에 붙었니?"+session.getAttribute("togo"));
				String togo = (String) session.getAttribute("togo");
				togo.substring(0);
				System.out.println("togo>>>"+togo);
				session.removeAttribute("togo");
				return togo;
			}
			return "/main";
			}else {
				model.addAttribute("notadmin", "관리자만 이용할 수 있는 메뉴입니다.");
				return "/admin/loginForm";
			}
		
	}

}
