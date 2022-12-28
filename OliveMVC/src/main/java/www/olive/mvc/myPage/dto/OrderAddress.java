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
	private int addressNumber;
	   private String addressInfo;
	   private String addressDetail;
	   private String addressDetail2;
	   private String receiver;
	   private String phone;
	   private MemberEntity member;

}
