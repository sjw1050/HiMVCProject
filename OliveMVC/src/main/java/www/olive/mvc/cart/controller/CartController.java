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

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.service.ProductService;

   
@Controller
@RequestMapping("/cart/**")
public class CartController {

	@Autowired
	CartService cartService;
//	Cart cart;
	@Autowired
	ProductService productService;
	
  //장바구니 목록
	@GetMapping("/viewCart")
	public String viewCartList(Model model, HttpSession session,HttpServletRequest request) {
		
		AuthInfo Info = (AuthInfo) session.getAttribute("info");
		System.out.println("Info >>>>>>>>>>>" + Info);
	
		
		//로그인 했을때만 장바구니 보기
		if(Info != null) {
		List<Cart> viewCartList = cartService.viewCartList(Info);
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
		
//		int productId = Integer.parseInt (request.getParameter("productId"));
//		System.out.println("productId >>>>>>>>>>>>>" + productId);
		
//		int productPrice = Integer.parseInt (request.getParameter("productPrice"));
//		System.out.println("productId >>>>>>>>>>>>>" + productPrice);
		
		int count = Integer.parseInt (request.getParameter("count"));
		System.out.println("count >>>>>>>>>" + count);
		
		cart.setMemberNum(Info.getMemberNum());
//		cart.setTotalProductPrice(productPrice);
		cart.setTotalProductCount(count);
		
		cartService.insertInCart(cart);
		System.out.println("cart >>>>>>>>>>" + cart);
		
		return "redirect:/cart/viewCart";
	}
	
	//장바구니 삭제
	@PostMapping("/deleteCart")
	public String deleteInCart(HttpServletRequest request, Cart cart) {
		int deleteCartId = Integer.parseInt (request.getParameter("deleteCartId"));
		System.out.println("totalProductCount >>>>>>>>>>>>>" + deleteCartId);
		
		cart.setCartId(deleteCartId);
		cartService.deleteCart(cart);
		System.out.println("cart >>>>>>>>>>" + cart);
		return "redirect:/cart/viewCart";
	}
	
	//장바구니 수량 변경
	@PostMapping("/modifyQuantity")
	public String modifyQuantity (HttpServletRequest request, Cart cart) {
		
		int totalProductCount = Integer.parseInt (request.getParameter("totalProductCount"));
		System.out.println("totalProductCount >>>>>>>>>>>>>" + totalProductCount);
		int cartId = Integer.parseInt (request.getParameter("cartId"));
		System.out.println("cartId >>>>>>>>>>>>" + cartId);
		cart.setCartId(cartId);
		cart.setTotalProductCount(totalProductCount);
		cartService.modifyCart(cart);
		System.out.println("cart >>>>>>>>>>>" + cart);
		
		return "redirect:/cart/viewCart";
	}
	
}
