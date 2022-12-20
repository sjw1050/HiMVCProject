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
	private int brandNum;
	private String productName;
	private int productPrice;
	private String productInfo;
	private int colorId;
	private int subCateId;
	private String brandName;
	
}
