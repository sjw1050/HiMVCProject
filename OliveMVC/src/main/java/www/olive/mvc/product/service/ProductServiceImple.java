package www.olive.mvc.product.service;

import java.util.List;

import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.mapper.ProductMapper;

public class ProductServiceImple implements ProductMapper{

	//@Select("select * from product")
		public List<Product> selectAll();

}
