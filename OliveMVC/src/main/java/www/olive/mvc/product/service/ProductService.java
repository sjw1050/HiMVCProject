package www.olive.mvc.product.service;

import java.util.List;

import www.olive.mvc.product.dto.MainCategory;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;

public interface ProductService {

	List<Product> viewAllProduct();

	Product viewOneProduct(int productId);

//	List<Product> viewByMainCate(String mainCateId);

	// 메인 카테고리별 상품 
	List<Product> getProdByMain(String mainCateId);

	// 서브 카테고리별 상품 
	List<Product> getProdBySub(String subCateId);

	// 메인에 카테고리 정보 붙여놓기
	List<SubCategory> getSubCate();
	List<MainCategory> getMainCate();

}
