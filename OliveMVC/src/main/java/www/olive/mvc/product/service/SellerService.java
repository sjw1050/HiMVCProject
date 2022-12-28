package www.olive.mvc.product.service;

import java.util.List;

import www.olive.mvc.product.dto.Brand;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;

public interface SellerService {

	Brand sellerCheck(String sellerId, String sellerPw);

	List<Product> viewBySeller(String sellerId);

	List<SubCategory> getSubCate();

	void addProduct(Product product);

	
}
