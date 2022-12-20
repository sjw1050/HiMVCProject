package www.olive.mvc.mapper.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;

@Mapper
public interface ProductMapper {

	List<Product> selectAllProduct();

	List<Product> selectOneProduct(String productId);

//	List<Product> selectByMainCate(String mainCateId);
//
//	//cateId 받아오기 test
	List<SubCategory> selectCateId();

	List<Product> selectByMain(String mainCateId);

	List<Product> selectbySub(String subCateId);
	
}
