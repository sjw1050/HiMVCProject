package www.olive.mvc.myPage.dto;

import java.sql.Date;
import java.util.List;

import lombok.Data;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.product.dto.Product;

@Data
public class OrderList {
	
	private Long orderId;
	   private String orderNumber;
	   private int orderCount;
	   private Long totalPrice;
	   private Date orderDate;
	   private List<Product> product;
	   private int statusNumber;
	   private int addressId;
	   private MemberEntity member;

}
