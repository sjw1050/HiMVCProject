package www.olive.mvc.cart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.cart.CartMapper;
import www.olive.mvc.order.dto.Cart;


@Service
public class CartServiceImp implements CartService{
	
	@Autowired
	private CartMapper cartMapper;
	
	@Override
	public List<Cart> viewCart() {
		return cartMapper.selectCartProduct();
	}

}
