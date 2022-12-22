package www.olive.mvc.product.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	private int productId;
	private Brand brandNum;
	private String productName;
	private int productPrice;
	private String productInfo;
	private Color colorId;
	private SubCategory subCateId;
	private String brandName;
	
}
