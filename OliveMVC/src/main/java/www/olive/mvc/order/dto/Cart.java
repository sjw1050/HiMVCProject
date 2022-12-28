package www.olive.mvc.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
   
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

	private int cartId;
	private int productId;
	private int totalProductCount;
	private int totalProductPrice;
	private Long memberNum;
	private String productName;
	private int productPrice;
}
