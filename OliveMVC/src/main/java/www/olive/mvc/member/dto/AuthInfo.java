package www.olive.mvc.member.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthInfo {

	
	private Long memberNum;
	private String id;
	private String email;
	private String name;
	private int addressNumber;
	private String addressInfo;
	private String addressDetail;
	private String addressDetail2;
	private Date birthday;
	private Long tpa;
	private int level;

}
