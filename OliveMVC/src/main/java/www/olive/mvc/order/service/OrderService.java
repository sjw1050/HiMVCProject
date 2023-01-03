package www.olive.mvc.order.service;


import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderDetails;
import www.olive.mvc.myPage.dto.ProductOrder;

public interface OrderService {

	void insertOrderAddress(OrderAddress oa);

	void insertOrderProduct(ProductOrder po);

	void insertOrder(OrderDetails order);


}