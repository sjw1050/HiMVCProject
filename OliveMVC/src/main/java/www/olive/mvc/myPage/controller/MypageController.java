package www.olive.mvc.myPage.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.myPage.service.MypageService;

@Controller
@RequestMapping("/mypage/**")
public class MypageController {
	
	@Autowired
	MypageService mypageService;
	
	
	@GetMapping("main")
	public String MainPage(HttpSession session) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		System.out.println("현재 로그인 정보"+info);
		//현재 로그인 정보AuthInfo(memberNum=1, id=user, email=user@user.com, name=user00, address=경기도 김포시, birthday=2000-01-01, tpa=1000000)
		return "mypage/main";
	}

}
