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
import www.olive.mvc.myPage.service.MypageService;
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
	
	@Autowired
	MypageService mypageService;
	

	// 장바구니에서 상품 주문 가기
	@PostMapping("viewMyOrder")
	public String viewOrder(HttpSession session, HttpServletRequest request, Model model, Cart cart, OrderAddress oa,
		ProductOrder po) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info == null) {
			return "main";
		}
//		int OrderProductId = Integer.parseInt(request.getParameter("OrderProductId"));
//		System.out.println("OrderProductId >>>>>>>>>>>>>" + OrderProductId);
//		
		
		List<OrderAddress> orderAddress = mypageService.viewAddress(info.getMemberNum());
		System.out.println("주소 목록 >>>>>>>>>>" + orderAddress);
		model.addAttribute("orderAddress" , orderAddress);
		
		int OrderCartId = Integer.parseInt(request.getParameter("OrderCartId"));
		System.out.println("OrderCartId >>>>>>>>>>>>>" + OrderCartId);
		
//		List<Cart> orderCart = cartService.selectOrderCart(OrderProductId);
		
		//장바구니에서 구매 버튼 누른 상품 보기
		cart.setMemberNum(info.getMemberNum());
		System.out.println("멤버 누구냐>>>>>>>>>>>" + info);
		List<Cart> viewCartList = cartService.viewCartList(info);
		System.out.println("viewCartList>>>>>>>>>>>>" + viewCartList);
		model.addAttribute("viewCartList" , viewCartList);
		
		
		return "/order/viewMyOrder";
	}

	// 상품 주문
	@PostMapping("/productOrder")
	public String productOrder(HttpSession session,HttpServletRequest request , 
			Model model,OrderAddress oa , OrderDetails od, ProductOrder po) {

		System.out.println(">>>>>>>>>>>>주문 한다<<<<<<<<<<<<<<<");
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		System.out.println("Info >>>>>>>>>>>" + info);
		
		MemberEntity member = memberService.selectMember(info.getMemberNum());
		oa.setMember(member);
		System.out.println("주문 주소 >>>>>>>>>>>" + oa);
		orderService.insertOrderAddress(oa);
		System.out.println("주문 주소 >>>>>>>>>>>" + oa);
		
		int productPrice = Integer.parseInt(request.getParameter("productPrice"));
		System.out.println("productPrice >>>>>>>>>>>>>" + productPrice);
		
		po.setTotalPrice(productPrice);
		po.setAddress(oa);
		po.setMember(member);
		orderService.insertOrderProduct(po);
		System.out.println("product_order >>>>>>>>>>>" + po);
		
//		productId,productPrice,totalProductCount
//		int productId = Integer.parseInt(request.getParameter("productId"));
//		System.out.println("productId >>>>>>>>>>>>>" + productId);
//		int productPrice = Integer.parseInt(request.getParameter("productPrice"));
//		System.out.println("productPrice >>>>>>>>>>>>>" + productPrice);
//		int totalProductCount = Integer.parseInt(request.getParameter("totalProductCount"));
//		System.out.println("totalProductCount >>>>>>>>>>>>>" + totalProductCount);
		
		
		
		
	
		
		
		
		
	
		

		return "redirect:/mypage/main";
	}
}
