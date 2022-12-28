package www.olive.mvc.mapper.cart;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.order.dto.Cart;
import www.olive.mvc.order.dto.OrderList;

@Mapper
public interface CartMapper {

//	List<Cart> selectCartProduct();

	List<Cart> selectCartList(AuthInfo info);

	void insertInCart(Cart cart);

	void deleteProductInCart(int cartId);



}
