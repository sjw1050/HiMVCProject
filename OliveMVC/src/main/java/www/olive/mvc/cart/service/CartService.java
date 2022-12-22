package www.olive.mvc.cart.service;

import java.util.List;

import www.olive.mvc.order.dto.Cart;
import www.olive.mvc.order.dto.OrderList;

public interface CartService {


	List<Cart> viewCart();

	List<OrderList> viewOrderList(Long member_num);
}
