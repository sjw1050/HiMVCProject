package www.olive.mvc.member.dto;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "member")
public class Member {
	
	@Id
	@GeneratedValue
	private Long memberNum;
	
	private String memberId;
	private String pw;
	private String memberName;
	private String email;
	private String phone;
	private Date birthday;
	private char gender;
	private String address;
	private Date regdate;
	private Long tpa;

}
