package www.olive.mvc.mapper.cart;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.member.dto.AuthInfo;
  
@Mapper
public interface CartMapper {

//	List<Cart> selectCartProduct();

	List<Cart> selectCartList(AuthInfo info);

	void insertInCart(Cart cart);

	void deleteProductInCart(Cart cart);

	void modifyQuantity(Cart cart);

//	List<Cart> selectOrderCart(int OrderProductId);
	List<Cart> selectOrderCart(Cart cart);

	Cart viewOneCart(int cartId);

	void deleteCart(int cartId);

	boolean findProduct(int productId);

	void addCount(Cart cart);

	List<Cart> findCart(AuthInfo info);

	boolean findUserCart(Cart _cart);
	boolean findUserCartProd(Cart _cart);




}
