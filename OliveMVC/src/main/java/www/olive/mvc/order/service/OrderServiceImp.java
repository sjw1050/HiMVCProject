package www.olive.mvc.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.OrderMapper;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderDetails;
import www.olive.mvc.myPage.dto.ProductOrder;

@Service
public class OrderServiceImp implements OrderService{

	@Autowired
	OrderMapper orderMapper;

	@Override
	public void insertOrderAddress(OrderAddress oa) {
		orderMapper.insertOrderAddress(oa);
	}

	@Override
	public void insertOrderProduct(ProductOrder po) {
		orderMapper.insertOrderProduct(po);
	}

	@Override
	public void insertOrder(OrderDetails order) {
		orderMapper.insertOrder(order);
	}

}
