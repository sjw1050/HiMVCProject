package www.olive.mvc.member.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthInfo {

	private String id;
	private String email;
	private String name;
	private String address;
	private Date birthday;
	private Long tpa;

}
