package www.olive.mvc.product.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import www.olive.mvc.customerCenter.dto.OliveFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	private int productId;
	private Brand brand;
	private String productName;
	private int productPrice;
	private String productInfo;
//	private Color colorId;
	private int colorId;
//	private SubCategory subCategory;
	private String brandName;
	
	
//	private String sellerId;
	private int subCateId;
	private int brandNum;
	private String fileName;
	private OliveFile oliveFile;
	
}
