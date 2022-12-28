package www.olive.mvc.cart.service;

import java.util.List;

import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.order.dto.Cart;
  
public interface CartService {

	List<Cart> viewCartList(AuthInfo info);

	void insertInCart(Cart cart);

	void deleteCart(int cartId);

}
