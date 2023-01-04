package www.olive.mvc.myPage.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderList {

	/*
	 * select po.order_id, m.member_name,b.brand_name, p.product_name,
	 * p.product_price, od.order_count, po.total_price, oa.address_number,
	 * oa.address_info, oa.address_detail, oa.address_detail2, oa.receiver,
	 * oa.phone, os.status, po.order_date from member m, product_order po, product
	 * p, order_status os, order_address oa, order_details od, brand b where
	 * m.member_num = po.member_num and p.product_id = od.product_id and
	 * po.status_number = os.status_number and po.address_id = oa.address_id and
	 * od.order_id = po.order_id and p.brand_num = b.brand_num
	 */
	private String orderId;
	private String memberName;
	private String brandName;
	private String productName;
	private Long productPrice;
	private int orderCount;
	private Long totalPrice;
	private int addressNumber;
	private String addressInfo;
	private String addressDetail;
	private String addressDetail2;
	private String receiver;
	private String phone;
	private String status;
	private Date orderDate;

}
