package www.olive.mvc.product.service;

import java.util.List;

import www.olive.mvc.product.dto.Product;

public interface ProductService {

	List<Product> viewAllProduct();

	List<Product> viewOneProduct(String productId);

	List<Product> viewByCategory(String categoryId);

}
