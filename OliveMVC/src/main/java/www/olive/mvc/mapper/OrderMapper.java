package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.myPage.dto.OrderAddress;
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

}
