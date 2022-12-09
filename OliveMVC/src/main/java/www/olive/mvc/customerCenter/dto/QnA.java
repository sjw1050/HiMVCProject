package www.olive.mvc.customerCenter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QnA {
	
	private Long faqNum;
	private String faqTitle;
	private String faqQuestion;
	private String faqAnswer;
	private Long adminNum;

}
