package www.olive.mvc.cart.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.order.dto.Cart;
import www.olive.mvc.order.dto.OrderList;


@Controller
@RequestMapping("/cart/**")
public class CartController {

	@Autowired
	CartService cartService;
	
	//장바구니 목록
	@GetMapping("/cart/viewCart")
	public String viewCartList(Model model, HttpSession session) {
		System.out.println(">>>>>>>>>>>>>>>orderList왔다<<<<<<<<<<<<<<<<<");
		
		AuthInfo Info = (AuthInfo) session.getAttribute("info");
		System.out.println("orderInfo >>>>>>>>>>>" + Info);
		
		//로그인 했을때만 장바구니 보기
		if(Info != null) {
		List<Cart> viewCartList = cartService.viewCartList(Info.getMemberNum());
		model.addAttribute("viewCartList" , viewCartList);
		}
		//로그인 안 했을때
		else {
			return "redirect:/member/loginForm";
		}
		
		return "/cart/viewCart";
	}
	//장바구니에 담기 
	@PostMapping("/cart/insertInCart")
	public void addCart(HttpSession session, Model model, Cart cart) {
		
		AuthInfo Info = (AuthInfo) session.getAttribute("info");
		System.out.println("orderInfo >>>>>>>>>>>" + Info);
		
		cart.setMemberNum(Info.getMemberNum());
		
		
		
		
		
		
	}
	
}
