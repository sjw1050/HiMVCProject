package www.olive.mvc.customerCenter.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
	
	private Long noticeNum;
	private String noticeTitle;
	private String noticeContent;
	private Date noticeDate;
	private int view_count;
	private Long adminNum;

}
