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
import org.springframework.web.bind.annotation.ResponseBody;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.cart.service.CartService;
import www.olive.mvc.member.dto.AuthInfo;
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
		//System.out.println("Info >>>>>>>>>>>" + Info);
	
		
		//로그인 했을때만 장바구니 보기
		if(Info != null) {
		List<Cart> viewCartList = cartService.viewCartList(Info);
		System.out.println("viewCartList>>>>>>>>>>>>" + viewCartList);
		model.addAttribute("viewCartList" , viewCartList);
		session.setAttribute("alreadyExist", viewCartList);
		}
		//로그인 안 했을때
		else {
			return "redirect:/member/loginForm";
		}
		return "/cart/viewCart";
	}
	
	@GetMapping("cartchk")
	public @ResponseBody String cartchk(HttpSession session, int productId) {
		String result = null;
		AuthInfo info = (AuthInfo) session.getAttribute("info");		
		List<Cart> cartlis = cartService.findCart(info);
		System.out.println("해당 멤버가 가지고있는 카트리스트 :" + cartlis);
		for(Cart _cart : cartlis) {
			_cart.setProductId(productId);
			System.out.println("카트 하나당 상품 있는지 확인하기 전 _cart 프로덕트 바뀐지 확인" + _cart);
			boolean cartalreadyExist = cartService.findUserCart(_cart);
			if(cartalreadyExist == true) {
				boolean prodalreadyExist = cartService.findUserCartProd(_cart);
				if(prodalreadyExist == true) {
					System.out.println("이미 있을때는 fail반환");
					result = "fail";
					break;
				}else {
					System.out.println("없을떄는 success반환");
					result = "success";
				}
			}			
		}
		return result;
	}
	
	//장바구니에 담기 
	@PostMapping("/insertInCart")
	public String addCart(HttpSession session, HttpServletRequest request, Cart cart, int productId) {
		
		AuthInfo Info = (AuthInfo) session.getAttribute("info");
		//System.out.println("Info >>>>>>>>>>>" + Info);
		//System.out.println("Info.getMemberNum() >>>>>>>>>>>" + Info.getMemberNum());
		
//		int productId = Integer.parseInt (request.getParameter("productId"));
//		System.out.println("productId >>>>>>>>>>>>>" + productId);
		
//		int productPrice = Integer.parseInt (request.getParameter("productPrice"));
//		System.out.println("productId >>>>>>>>>>>>>" + productPrice);
		
		int count = Integer.parseInt (request.getParameter("count"));
		cart.setMemberNum(Info.getMemberNum());
		cart.setTotalProductCount(count);
		cart.setProductId(productId);
		//System.out.println("해당 회원의 카트정보" + _cart);		
//		boolean alreadyExist = cartService.findCartProduct(productId);
//		System.out.println("alreadyExist >>>>>>>>" + alreadyExist);
//		if(alreadyExist == true) {
//			System.out.println("추가되는 수량 >>>>>>>>" + cart);
//			cartService.addProductCount(cart);
//		}else {
//			cartService.insertInCart(cart);
//		}
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
