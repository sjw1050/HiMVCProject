package www.olive.mvc.customerCenter.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionBoard {
	
	private Long questionNum;
	private String questionTitle;
	private String questionContent;
	private Date questionDate;
	private Long memberNum;
	private boolean viewCheck;

}
