package www.olive.mvc.order.controller;

import static org.hamcrest.CoreMatchers.nullValue;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderDetails;
import www.olive.mvc.myPage.dto.OrderDetailsLIst;
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
	public String viewOrder(HttpSession session, HttpServletRequest request, Model model, @RequestParam(value="cartId", required=true) List<Integer> cartId) {
		//System.out.println("받은 카트넘버 " + cartId);
		//List<Cart> cart = cartService.viewOneCart(cartId);
		//System.out.println("카트 넘버를 통한 카트를 받아왔니?" + cart);
		
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info == null) {
			return "main";
		}
		System.out.println("리스트로 카트 받는지?"+cartId);
		List<Cart> cartList = new ArrayList<Cart>();
		for(Integer cart : cartId) {
			//System.out.println("카트넘버"+cart);
			Cart oneCart = cartService.viewOneCart(cart);
			//System.out.println("카트넘버를 통해서 카트 정보 받아왔니?"+oneCart);
			cartList.add(oneCart);
		}
		System.out.println("카트아이디 받아서 카트 리스트 받아왔니?" + cartList);
		//model.addAttribute("viewCartList", cart);
//		int OrderProductId = Integer.parseInt(request.getParameter("OrderProductId"));
//		System.out.println("OrderProductId >>>>>>>>>>>>>" + OrderProductId);
//		
		
		List<OrderAddress> orderAddress = mypageService.viewAddress(info.getMemberNum());
		//System.out.println("주소 목록 >>>>>>>>>>" + orderAddress);
		model.addAttribute("orderAddress" , orderAddress);
//		
//		int OrderCartId = Integer.parseInt(request.getParameter("OrderCartId"));
//		System.out.println("OrderCartId >>>>>>>>>>>>>" + OrderCartId);
//		
////		List<Cart> orderCart = cartService.selectOrderCart(OrderProductId);
//		
//		//장바구니에서 구매 버튼 누른 상품 보기
//		cart.setMemberNum(info.getMemberNum());
//		System.out.println("멤버 누구냐>>>>>>>>>>>" + info);
//		List<Cart> viewCartList = cartService.viewCartList(info);
//		System.out.println("viewCartList>>>>>>>>>>>>" + viewCartList);
		session.setAttribute("OrderList", cartList);
		model.addAttribute("viewCartList" , cartList);
		
		
		return "/order/viewMyOrder";
	}

	// 상품 주문
	@PostMapping("/productOrder")
	public String productOrder(HttpSession session,HttpServletRequest request , 
			Model model,OrderAddress oa, ProductOrder po) {
		OrderDetails order = new OrderDetails();
		System.out.println("주소정보 받아왔니?" + oa);
		System.out.println("총금액 받아옴?" + po);
		List<Cart> orderList = (List<Cart>) session.getAttribute("OrderList");
		System.out.println("카트리스트 받아왔니?" + orderList);
		for(Cart cart : orderList) {
			System.out.println("for문 돌리면서 카트 뽑았니?"+cart);
		}
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info != null) {
			MemberEntity member = memberService.selectMember(info.getMemberNum());
			po.setMember(member);
		}
		po.setAddress(oa);
		System.out.println("정보들 추가되었니?" + po);
//		orderService.insertOrderProduct(po);	
//		order.setOrder(po);
//		System.out.println("오더디테일에 프로덕트 오더 들어갓니?" + order);
//		orderService.insertOrder(order);		
		
		return "redirect:/mypage/main";
	}
}
