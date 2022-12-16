package www.olive.mvc.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Brand {

	private int brandNum;
	private String brandName;
	private String sellerId;
	private String sellerPw;
}
