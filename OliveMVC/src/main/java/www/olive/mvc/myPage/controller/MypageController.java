package www.olive.mvc.myPage.controller;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.omg.CORBA.PUBLIC_MEMBER;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.customerCenter.service.QuestService;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderList;
import www.olive.mvc.myPage.dto.ProductOrder;
import www.olive.mvc.myPage.service.MypageService;

@Controller
@RequestMapping("/mypage/**")
public class MypageController {
	
	@Autowired
	MypageService mypageService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	QuestService questService;
	
	
	@GetMapping("main")
	public String MainPage(HttpSession session, Model model) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
//		System.out.println("현재 로그인 정보"+info);
		if(info == null) {
			return "main";
		}
		List<ProductOrder> order = mypageService.viewOrder(info.getMemberNum()); 
		List<QuestionBoard> qList = questService.viewMemberQuest(info);
		//System.out.println("오더정보 들어옴?" + order);
		model.addAttribute("order", order);
		model.addAttribute("quest", qList);
		return "mypage/main";
	}
	
	@GetMapping("orderdetail")
	public String orderdetail(HttpSession session, Model model, ProductOrder po) {	
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info == null) {
			return "main";
		}
		MemberEntity member = memberService.selectMember(info.getMemberNum());
		//System.out.println("멤버 들어옴?"+member);
		po.setMember(member);
		//System.out.println("오더 변경됨?" + po);
		List<OrderList> oList = mypageService.orderListView(po);
		//System.out.println("오더리스트 들어옴?" + oList);
		model.addAttribute("orderList", oList);
		return "mypage/orderdetail";
	}
	
	@GetMapping("address")
	public String viewAddress(HttpSession session, Model model) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info == null) {
			return "main";
		}
		List<OrderAddress> address = mypageService.viewAddress(info.getMemberNum());
		System.out.println("주소 잘 가져왔니?" + address);
		model.addAttribute("address", address);
		return "mypage/viewaddress";
	}

}
