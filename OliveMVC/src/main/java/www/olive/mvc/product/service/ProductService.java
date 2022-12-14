package www.olive.mvc.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.mapper.ProductMapper;

@Service
public class ProductService {

	@Autowired
	ProductMapper productMapper;
	
	public List<Product> selectAll(){
		return productMapper.selectAll();
	}
}
