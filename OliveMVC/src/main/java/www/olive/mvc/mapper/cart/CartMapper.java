package www.olive.mvc.mapper.cart;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.order.dto.Cart;

@Mapper
public interface CartMapper {

	List<Cart> selectCartProduct();


}
