package www.olive.mvc.order.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;
import www.olive.mvc.order.dto.OrderList;
import www.olive.mvc.order.service.OrderService;
 
@Controller
@RequestMapping("/order/**")
public class OrderController {

	@Autowired
	OrderService orderService;
	@Autowired
	MemberService memberService;
	
	//상품 주문 가기
	@GetMapping("/viewMyOrder")
	public String viewMyOrder() {
		System.out.println(">>>>>>>>>>>>주문 왔다<<<<<<<<<<<<<<<");
		return "/order/viewMyOrder";
	}
	
	//장바구니,상품 상세 페이지에서 상품 주문 가기
	@PostMapping("viewMyOrder")
	public String viewOrder(HttpSession session, HttpServletRequest request , Model model) {
		System.out.println(">>>>>>>>>>>>주문 왔다<<<<<<<<<<<<<<<");
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		System.out.println("로그인 누가 했냐>>>>>>>>>>>>>>>" + info);
		MemberEntity member = memberService.selectMember(info.getMemberNum());
		
		int productId = Integer.parseInt (request.getParameter("productId"));
		int productPrice = Integer.parseInt (request.getParameter("productPrice"));
		
//		List<Cart> order
		
		model.addAttribute("member", member);
		
//		List<OrderList> orderList = orderService.viewOrderList();
		return "/order/viewMyOrder";
	}
	
	//상품 주문 
	@PostMapping("/productOrder")
	public String productOrder(Model model) {
		
		
		
		
		return "redirect:/mypage/main";
	}
}
