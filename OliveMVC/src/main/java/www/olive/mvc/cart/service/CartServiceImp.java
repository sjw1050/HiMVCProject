package www.olive.mvc.cart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.cart.dto.Cart;
import www.olive.mvc.mapper.cart.CartMapper;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;

  
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

//	@Override
//	public List<Cart> selectOrderCart(int OrderProductId) {
//		return cartMapper.selectOrderCart(OrderProductId);
//	}
	
	@Override
	public List<Cart> selectOrderCart(Cart cart) {
		return cartMapper.selectOrderCart(cart);
	}

@Override
public Cart viewOneCart(int cartId) {
	return cartMapper.viewOneCart(cartId);
}

@Override
public void deleteCart(int cartId) {
	cartMapper.deleteCart(cartId);
}

@Override
public boolean findCartProduct(int productId) {
	return cartMapper.findProduct(productId);
}

@Override
public void addProductCount(Cart cart) {
	cartMapper.addCount(cart);
}









}
