package www.olive.mvc.product.dto;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Brand {
	private int brandId;
	private String brandName;
}
