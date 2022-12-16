package www.olive.mvc.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.product.ProductMapper;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductMapper productMapper;

	@Override
	public List<Product> viewAllProduct() {
		return productMapper.selectAllProduct();
	}

	@Override
	public List<Product> viewOneProduct(String productId) {
		return productMapper.selectOneProduct(productId);
	}


	@Override
	public List<Product> viewByMainCate(String mainCateId) {
		return productMapper.selectByMainCate(mainCateId);
	}

	//cateId 받아오기 test
	@Override
	public List<SubCategory> getCateId() {
		return productMapper.selectCateId();
	}
}
