package www.olive.mvc.cart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.mapper.cart.CartMapper;
import www.olive.mvc.member.dto.AuthInfo;

  
@Service
public class CartServiceImp implements CartService{
	
	@Autowired
	private CartMapper cartMapper;

	@Override
	public List<Cart> viewCartList(AuthInfo Info) {
		return cartMapper.selectCartList(Info);
	}

	@Override
	public void insertInCart(Cart cart) {
		cartMapper.insertInCart(cart);
	}

	@Override
	public void deleteCart(Cart cart) {
		cartMapper.deleteProductInCart(cart);
	}

	@Override
	public void modifyCart(Cart cart) {
		cartMapper.modifyQuantity(cart);
	}





}
