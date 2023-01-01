package www.olive.mvc.order.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderDetails;
import www.olive.mvc.myPage.dto.ProductOrder;
import www.olive.mvc.order.service.OrderService;

@Controller
@RequestMapping("/order/**")
public class OrderController {

	@Autowired
	OrderService orderService;
	
	@Autowired
	CartService cartService;
	
	@Autowired
	MemberService memberService;
	

	// 장바구니, 상품 상세 페이지에서 상품 주문 가기
	@PostMapping("viewMyOrder")
	public String viewOrder(HttpSession session, HttpServletRequest request, Model model, Cart cart) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		System.out.println("로그인 누가 했냐>>>>>>>>>>>>>>>" + info);

		int OrderProductId = Integer.parseInt(request.getParameter("OrderProductId"));
		System.out.println("OrderProductId >>>>>>>>>>>>>" + OrderProductId);
		
		int OrderCartId = Integer.parseInt(request.getParameter("OrderCartId"));
		System.out.println("OrderCartId >>>>>>>>>>>>>" + OrderCartId);
		
		MemberEntity member = memberService.selectMember(info.getMemberNum());
		cart.setMember(member);
		System.out.println("멤버 누구냐>>>>>>>>>>>" + member);
		

//		List<Cart> orderCart = cartService.selectOrderCart(OrderProductId);
		List<Cart> orderCart = cartService.selectOrderCart(cart);
		System.out.println("cart >>>>>>>>>>>" + orderCart);
		model.addAttribute("orderCart", orderCart);
		
		
		return "/order/viewMyOrder";
	}

	// 상품 주문
	@PostMapping("/productOrder")
	public String productOrder(HttpSession session, Model model,OrderAddress oa , OrderDetails od) {

		System.out.println(">>>>>>>>>>>>주문 한다<<<<<<<<<<<<<<<");
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		System.out.println("Info >>>>>>>>>>>" + info);
		
		MemberEntity member = memberService.selectMember(info.getMemberNum());	
		oa.setMember(member);
		orderService.insertOrderAddress(oa);
		System.out.println("주문 주소 >>>>>>>>>>>" + oa);
		
        
		
		
		
		
	
		

		return "redirect:/mypage/main";
	}
}
