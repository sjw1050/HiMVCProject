package www.olive.mvc.product.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductQna {
	private int productQnaId;
	private int productId;
	private int memberNum;
	private String productQuestionTitle;
	private String productQuestion;
	private Date productQuestionDate;
	private String productQuestionAnswer;
	private Date productAnswerDate;
}
