package www.olive.mvc.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import www.olive.mvc.member.dto.MemberEntity;
    
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
	private String brandName;
	private String productInfo;
}
