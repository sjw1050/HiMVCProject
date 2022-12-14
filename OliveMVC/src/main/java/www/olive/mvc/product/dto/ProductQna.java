package www.olive.mvc.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductQna {
	private int productQnaId; 
	private int productId;   
	private int sellerId;    
	private int memberNum;    
}
