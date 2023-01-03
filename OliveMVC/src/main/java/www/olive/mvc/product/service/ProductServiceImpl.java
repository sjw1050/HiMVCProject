package www.olive.mvc.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.product.ProductMapper;
import www.olive.mvc.product.dto.MainCategory;
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
	public Product viewOneProduct(int productId) {
		return productMapper.selectOneProduct(productId);
	}

//
//	@Override
//	public List<Product> viewByMainCate(String mainCateId) {
//		return productMapper.selectByMainCate(mainCateId);
//	}
//
  
	@Override
	public List<Product> getProdByMain(String mainCateId) {
		return productMapper.selectByMain(mainCateId);
	}

	@Override
	public List<Product> getProdBySub(String subCateId) {
		return productMapper.selectbySub(subCateId);
	}

	@Override
	public List<SubCategory> getSubCate() {
		return productMapper.selectAllFromSub();
	}
	public List<MainCategory> getMainCate() {
		return productMapper.selectAllFromMain();
	}

	//메인 - 검색하기
	@Override
	public List<Product> searchProduct(String query) {
		return productMapper.selectLikeThis(query);
	}
}
