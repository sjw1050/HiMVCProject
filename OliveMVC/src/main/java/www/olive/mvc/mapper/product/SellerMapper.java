package www.olive.mvc.mapper.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.product.dto.Brand;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;

@Mapper
public interface SellerMapper {
 
	public Brand selectSeller(String sellerId);

	public List<Product> selectProdBySeller(String sellerId);

	public List<SubCategory> selectSubCate();

	public void insertProduct(Product product);

	public void insertProductFile(String filename);

	public void deleteProd(String productId);
	
}
