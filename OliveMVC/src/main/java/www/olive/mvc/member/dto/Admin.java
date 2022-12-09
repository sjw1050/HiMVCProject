package www.olive.mvc.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {
	
	private Long adminNum;
	private String adminId;
	private String adminPw;

}
