package www.olive.mvc.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
	private int productId;
	private String productName;
	private int productPrice;
	private int mainCateId;
	private int brandId;
	private int subCateId;
	private int sellerId;
	private int colorId;
}
