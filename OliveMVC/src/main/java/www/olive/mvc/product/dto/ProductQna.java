package www.olive.mvc.product.dto;


import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import www.olive.mvc.member.dto.MemberEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductQna {
	private int productQnaId;
	private String productQuestionTitle;
	private String productQuestion;
	private Date productQuestionDate;
	private String productQuestionAnswer;
	private Date productAnswerDate;
	private Product product;
	private MemberEntity member;
}
