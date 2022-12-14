package www.olive.mvc.cart.service;

import java.util.List;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
  
public interface CartService {

	List<Cart> viewCartList(AuthInfo info);

	void insertInCart(Cart cart);

	void deleteCart(Cart cart);

	void modifyCart(Cart cart);

//	List<Cart> selectOrderCart(int OrderProductId);
	List<Cart> selectOrderCart(Cart cart);

	Cart viewOneCart(int cartId);

	void deleteCart(int cartId);


	void addProductCount(Cart cart);

	boolean findCartProduct(int productId);

	List<Cart> findCart(AuthInfo info);

	boolean findUserCart(Cart _cart);
	public boolean findUserCartProd(Cart _cart);



}
