package www.olive.mvc.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	private int reviewId;
	private int productId;
	private int memberNum;
	private int ratingGrade;
	private String reviewContent;
}
