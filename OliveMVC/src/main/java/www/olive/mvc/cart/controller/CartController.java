package www.olive.mvc.cart.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.order.dto.Cart;


@Controller
public class CartController {
	
	@Autowired
	CartService cartService;
	
	//장바구니 가기
	@GetMapping("/cart/viewCart")
	public String viewCart(Model model) {
		System.out.println(">>>>>>>>>>>>>>장바구니 잘 갔나<<<<<<<<<<<<<");
		List<Cart> viewCartList = cartService.viewCart();
		System.out.println("viewCartList >>>>>>>>>>>>>>" + viewCartList);
		
		model.addAttribute("viewCartList", viewCartList);
		return "/cart/viewCart";
	}
	
//	//장바구니에 있는 상품보기
//	@PostMapping("/cart/viewCartProduct")
//	public String viewCartProduct() {
//		
//		return null;
//	}

}
