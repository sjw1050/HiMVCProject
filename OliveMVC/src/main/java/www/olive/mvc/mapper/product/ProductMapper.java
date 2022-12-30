package www.olive.mvc.mapper.product;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.product.dto.MainCategory;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.ProductQna;
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

	//main에 카테 info 받아오기
	List<SubCategory> selectAllFromSub();
	List<MainCategory> selectAllFromMain();
	
	//상품QnA가져오기
	List<ProductQna> viewProductQna(Long memberNum);
	ProductQna detailProductQna(int productQnaId);
	
}
