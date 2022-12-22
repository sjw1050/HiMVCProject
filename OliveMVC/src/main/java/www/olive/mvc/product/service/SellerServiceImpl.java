package www.olive.mvc.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.product.SellerMapper;

@Service
public class SellerServiceImpl implements SellerService{

	@Autowired
	SellerMapper sellerMapper;
	
	
}
