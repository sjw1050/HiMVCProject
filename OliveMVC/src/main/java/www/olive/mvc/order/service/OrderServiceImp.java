package www.olive.mvc.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.OrderMapper;
import www.olive.mvc.myPage.dto.OrderAddress;

@Service
public class OrderServiceImp implements OrderService{

	@Autowired
	OrderMapper orderMapper;

	@Override
	public void insertOrderAddress(OrderAddress oa) {
		orderMapper.insertOrderAddress(oa);
	}

	


}
