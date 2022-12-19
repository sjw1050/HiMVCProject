package www.olive.mvc.member.dto;

import java.sql.Date;

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
	private int level;
	
	public MemberEntity(Long memberNum, String id, String name, Date birthday, Long tpa) {
		this.memberNum = memberNum;
		this.memberId = id;
		this.memberName = name;
		this.birthday = birthday;
		this.tpa = tpa;
	}


}
