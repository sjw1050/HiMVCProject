package www.olive.mvc.mapper.cart;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.order.dto.OrderList;
  
@Mapper
public interface CartMapper {

//	List<Cart> selectCartProduct();

	List<Cart> selectCartList(AuthInfo info);

	void insertInCart(Cart cart);

	void deleteProductInCart(Cart cart);

	void modifyQuantity(Cart cart);

//	List<Cart> selectOrderCart(int OrderProductId);
	List<Cart> selectOrderCart(Cart cart);



}
