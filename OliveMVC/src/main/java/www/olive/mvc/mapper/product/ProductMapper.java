package www.olive.mvc.mapper.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

import www.olive.mvc.product.dto.Product;

@Mapper
public interface ProductMapper {

	List<Product> selectAllProduct();

	List<Product> selectOneProduct(String productId);

	List<Product> selectByCategory(String categoryId);
	
}
