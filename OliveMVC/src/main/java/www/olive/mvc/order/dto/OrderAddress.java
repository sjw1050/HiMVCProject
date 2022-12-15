package www.olive.mvc.order.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAddress {

	private int addressId;
	private String address;
	private String receiver;
	private String phone;
	private int memberNum;
}
