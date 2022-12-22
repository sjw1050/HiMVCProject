package www.olive.mvc.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import www.olive.mvc.member.dto.MemberEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	private int reviewId;
	private Product productId;
	private MemberEntity memberNum;
	private int ratingGrade;
	private String reviewContent;
}
