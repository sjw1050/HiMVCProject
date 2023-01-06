package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderDetails;
import www.olive.mvc.myPage.dto.OrderList;
import www.olive.mvc.myPage.dto.ProductOrder;

@Mapper
public interface OrderMapper {

	List<OrderList> orderListView(ProductOrder po);
	List<ProductOrder> viewOrder(Long memberNum);
	List<OrderAddress> viewAddress(Long memberNum);
	void updateAddress(OrderAddress address);
	void insertAddress(OrderAddress address);
	void deleteAddress(OrderAddress address);
	
	//상품 주문
	void insertOrderAddress(OrderAddress oa);
	void insertOrderProduct(ProductOrder po);
	void insertOrder(OrderDetails order);
	
	
}
