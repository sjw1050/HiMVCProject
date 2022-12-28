package www.olive.mvc.customerCenter.dto;

import lombok.NoArgsConstructor;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.ProductQna;
import www.olive.mvc.product.dto.Review;
import lombok.AllArgsConstructor;

import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OliveFile {
	private String fileName;
	private Notice noticeNum;
	private QuestionBoard questionNum;
	private Product productId;
	private Review reviewId;
	private ProductQna productQnaId;

}
