package www.olive.mvc.cart.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.order.dto.Cart;
import www.olive.mvc.order.dto.OrderList;

//수
@Controller
public class CartController {

	@Autowired
	CartService cartService;
	
	//주문목록
	@GetMapping("/cart/orderList")
	public String orderList(Model model, HttpSession session) {
		System.out.println(">>>>>>>>>>>>>>>orderList왔다<<<<<<<<<<<<<<<<<");
		
		AuthInfo orderInfo = (AuthInfo) session.getAttribute("info");
		System.out.println("orderInfo >>>>>>>>>>>" + orderInfo);
		
		Long member_num = orderInfo.getMemberNum();
		List<OrderList> viewOrderList = cartService.viewOrderList(member_num);
		System.out.println("viewOrderList >>>>>>>>>>" + viewOrderList);
		model.addAttribute("viewOrderList" , viewOrderList);
		
		return "/cart/orderList";
	}
	
	//장바구니 리스트 보기(잠깐 닫음)
//	@GetMapping("/cart/viewCart")
//	public String viewCartList(Model model, HttpSession session) {
//		System.out.println(">>>>>>>>>>>>>viewCart왔다<<<<<<<<<<<<<");
//
//		AuthInfo cartInfo = (AuthInfo) session.getAttribute("info");
//		System.out.println("cartInfo>>>>>>>>>>>" + cartInfo);
//
//		//로그인 했을때만 리스트 보기 (미완성)
////		if (cartInfo != null) {
//			List<Cart> viewCartList = cartService.viewCart();
//			System.out.println("viewCartList >>>>>>>>>>>>>>" + viewCartList);
//
//			model.addAttribute("viewCartList", viewCartList);
////		} 
//// 		로그인 안 했을 경우 인터셉터 or 리다이렉트
////			else {}
//		return "/cart/viewCart";
//	}

}
