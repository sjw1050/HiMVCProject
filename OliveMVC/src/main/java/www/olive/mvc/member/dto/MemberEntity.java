package www.olive.mvc.member.dto;

import java.sql.Date;

import javax.persistence.Column;
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
//@Entity
//@Table(name = "member")
public class MemberEntity {
	
//	@Id
//	@GeneratedValue
//	@Column(name="member_num")
	private Long memberNum;
	
//	@Column(name="member_id")
	private String memberId;
	private String pw;
//	@Column(name="member_name")
	private String memberName;
	
	private String email;
	private String phone;
	private Date birthday;
	private char gender;
	private String address;
	private Date regdate;
	private Long tpa;

}
