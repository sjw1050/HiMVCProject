package www.olive.mvc.cart.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
	public String viewCartList(Model model, HttpSession session, Cart cart) {
		
		AuthInfo Info = (AuthInfo) session.getAttribute("info");
		System.out.println("Info >>>>>>>>>>>" + Info);
		
		//로그인 했을때만 장바구니 보기
		if(Info != null) {
		List<Cart> viewCartList = cartService.viewCartList(Info.getMemberNum());
		System.out.println("viewCartList>>>>>>>>>>>>" + viewCartList);
		model.addAttribute("viewCartList" , viewCartList);
		}
		//로그인 안 했을때
		else {
			return "redirect:/member/loginForm";
		}
		
		return "/cart/viewCart";
	}
	//장바구니에 담기 
	@PostMapping("/insertInCart")
	public String addCart(HttpSession session, HttpServletRequest request, Cart cart) {
		
		AuthInfo Info = (AuthInfo) session.getAttribute("info");
		System.out.println("Info >>>>>>>>>>>" + Info);
		System.out.println("Info.getMemberNum() >>>>>>>>>>>" + Info.getMemberNum());
		
		int productId = Integer.parseInt (request.getParameter("productId"));
		System.out.println("productId >>>>>>>>>>>>>" + productId);
		
//		int productPrice = Integer.parseInt (request.getParameter("productPrice"));
//		System.out.println("productId >>>>>>>>>>>>>" + productPrice);
		
		int count = Integer.parseInt (request.getParameter("count"));
		System.out.println("count >>>>>>>>>" + count);
		
		
		cart.setMemberNum(Info.getMemberNum());
//		cart.setTotalProductPrice(productPrice);
		cart.setTotalProductCount(count);
		
		cartService.insertInCart(cart);
		System.out.println("cart >>>>>>>>>>" + cart);
		System.out.println("cart.getcartId >>>>>>>>>>>>>" + cart.getCartId());
		
		return "redirect:/cart/viewCart";
	}
	
	@PostMapping("/deleteCart")
	public String deleteInCart(int cartId) {
		
		cartService.deleteCart(cartId);
		
		return "/cart/viewCart";
	}
	
}
