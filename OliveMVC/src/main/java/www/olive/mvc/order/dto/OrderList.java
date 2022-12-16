package www.olive.mvc.order.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderList {
	private int orderId;
	private String orderNumber;
	private int orderCount;
	private int totalPrice;
	private Date orderDate;
	private int productId;
	private int statusNumber;
	private int addressId;
	private int memberNum;
}
