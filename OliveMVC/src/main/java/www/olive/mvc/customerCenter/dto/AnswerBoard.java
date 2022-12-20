package www.olive.mvc.customerCenter.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerBoard {
	
	private Long answerNum;
	private String answer;
	private Date answerDate;
	private Long questionNum;

}
