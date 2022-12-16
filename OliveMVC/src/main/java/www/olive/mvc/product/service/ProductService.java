package www.olive.mvc.product.service;

import java.util.List;

import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;

public interface ProductService {

	List<Product> viewAllProduct();

	List<Product> viewOneProduct(String productId);

	List<Product> viewByMainCate(String mainCateId);

	//cateId 받아오기 test
	List<SubCategory> getCateId();

}
