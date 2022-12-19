package www.olive.mvc.customerCenter.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionBoard {
	
	private Long questionNum;
	private String questionTitle;
	private String questionContent;
	private Date questionDate;
	//private Long memberNum;
	private MemberEntity writer;
	private boolean viewCheck;
	
//	QuestionBoard(Long questionNum, String questionTitle, String questionContent, Date questionDate, MemberEntity member, boolean viewCheck){
//		this.questionNum = questionNum;
//		this.questionTitle = questionTitle;
//		this.questionContent = questionContent;
//		this.writer = member;
//		this.viewCheck = viewCheck;
//	}

}
