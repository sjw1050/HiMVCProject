package www.olive.mvc.customerCenter.dto;

import lombok.NoArgsConstructor;

import lombok.AllArgsConstructor;

import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticeFile {
	private String fileName;
	private Notice noticeNum;

}
