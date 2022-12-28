package www.olive.mvc.myPage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import www.olive.mvc.product.dto.Product;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetails {
	
	private int orderDetailNum;
    private ProductOrder order;
    private Product product;
    private int orderCount;

}
