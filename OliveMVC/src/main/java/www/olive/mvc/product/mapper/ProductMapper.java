package www.olive.mvc.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.product.dto.Product;

@Mapper
public interface ProductMapper {
	
	//@Select("select * from product")
	public List<Product> selectAll();
	
}
