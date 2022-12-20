package www.olive.mvc.cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.order.dto.Cart;

//수
@Controller
public class CartController {
	
	@Autowired
	CartService cartService;
	
	//장바구니 가기 및 장바구니 리스트 불러오기
	@GetMapping("/cart/viewCart")
	public String viewCartList(Model model) {
		System.out.println(">>>>>>>>>>>>>>장바구니 잘 갔나<<<<<<<<<<<<<");
		List<Cart> viewCartList = cartService.viewCart();
		System.out.println("viewCartList >>>>>>>>>>>>>>" + viewCartList);
		
		model.addAttribute("viewCartList", viewCartList);
		return "/cart/viewCart";
	}
	

}
