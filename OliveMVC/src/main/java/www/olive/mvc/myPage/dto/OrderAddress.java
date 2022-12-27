package www.olive.mvc.myPage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import www.olive.mvc.member.dto.MemberEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAddress {
	
	private int addressId;
	   private String address;
	   private String receiver;
	   private String phone;
	   private MemberEntity member;

}
