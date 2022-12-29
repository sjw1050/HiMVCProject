package www.olive.mvc.cart.service;

import java.util.List;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.member.dto.AuthInfo;
  
public interface CartService {

	List<Cart> viewCartList(AuthInfo info);

	void insertInCart(Cart cart);

	void deleteCart(Cart cart);

	void modifyCart(Cart cart);

}
