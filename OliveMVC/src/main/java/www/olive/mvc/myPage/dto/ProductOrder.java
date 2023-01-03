package www.olive.mvc.myPage.dto;

import java.sql.Date;
import java.util.List;

import lombok.Data;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.product.dto.Product;

@Data
public class ProductOrder {
//member m, product_order po, product p, order_status os, order_address oa, order_details od, brand b
	private int orderId;
	   //private String orderNumber;
	   private int totalPrice;
	   private Date orderDate;
	   private OrderStatus status;
	   private OrderAddress address;
	   private MemberEntity member;
}
