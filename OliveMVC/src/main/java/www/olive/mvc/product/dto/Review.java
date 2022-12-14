package www.olive.mvc.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	private int reviewId;
	private int ratingGrade;
	private int productId;
	private int sellerId;
	private int memberNum;
}
