package www.olive.mvc.myPage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.MemberMapper;
import www.olive.mvc.mapper.OrderMapper;
import www.olive.mvc.mapper.product.ProductMapper;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderDetails;
import www.olive.mvc.myPage.dto.OrderList;
import www.olive.mvc.myPage.dto.ProductOrder;
import www.olive.mvc.product.dto.ProductQna;

@Service
public class MypageService {
	
	@Autowired
	MemberMapper memberRepository;
	
	@Autowired
	OrderMapper orderMapper;
	
	@Autowired
	ProductMapper productMapper;

	public List<OrderList> orderListView(ProductOrder po) {
		List<OrderList> orderLists = orderMapper.orderListView(po);
		StringBuffer sBuffer = new StringBuffer();
		for(OrderList order : orderLists) {
			sBuffer.append(order.getPhone());
			sBuffer.replace(4, 8, "****");
			order.setPhone(sBuffer.toString());
		}
		//System.out.println("연락처 변경됨?"+orderLists);
		return orderLists;
	}

	public List<ProductOrder> viewOrder(Long memberNum) {
		return orderMapper.viewOrder(memberNum);
	}

	public List<OrderAddress> viewAddress(Long memberNum) {
		return orderMapper.viewAddress(memberNum);
		
	}

	public void updateAddress(OrderAddress address) {
		orderMapper.updateAddress(address);
	}

	public void insertAddress(OrderAddress address) {
		orderMapper.insertAddress(address);
	}

	public void deleteAddress(OrderAddress address) {
		orderMapper.deleteAddress(address);
	}

	public void modifyMember(MemberEntity member) {
		memberRepository.modifyMember(member);
	}

	public int withdrawal(Long memberNum) {
		return memberRepository.withdrawal(memberNum);
	}

	public List<ProductQna> viewProductQna(Long memberNum) {
		return productMapper.viewProductQna(memberNum);
	}

	public ProductQna detailProductQna(int productQnaId) {
		return productMapper.detailProductQna(productQnaId);
	}

	public List<ProductQna> viewProductQnaAll() {
		return productMapper.viewProductQnaAll();
	}

	public int answerInsert(ProductQna qna) {
		return productMapper.answerInsert(qna);
	}

	public int modifyProductQna(ProductQna qna) {
		return productMapper.modifyProductQna(qna);
	}

	public void productQuestInsert(ProductQna qna) {
		productMapper.productQuestInsert(qna);
	}

	public List<OrderList> getOrderList(AuthInfo info) {
		List<OrderList> orderLists = orderMapper.getOrderList(info);
//		List<OrderList> newList = new ArrayList<>();
//		Map<String, List<OrderList>> map = new HashMap<>();
//		for(OrderList obj : orderLists) {
//			String id = obj.getOrderId();
//			if
//			
//			map.put(, );
//		}
		return orderLists;
	}

	public List<OrderDetails> viewOrderDetail(AuthInfo info) {
		return orderMapper.viewOrderDetail(info.getMemberNum());
	}

	public Map getOrderMap(Long memberNum) {
		Map map = new HashMap<>();
		List<String> orderNumList = orderMapper.getOrderNum(memberNum);
		for(String orderNum : orderNumList) {
			List<OrderDetails> details = orderMapper.getOrderDetailsList(orderNum); 
			System.out.println("details >>> " + details);
			map.put(orderNum, details);
		}
		System.out.println("map >>>>>>>>>>>>>>> " + map);
		return map;
	}

	public OrderAddress searchAddrNum(OrderAddress oa) {
		return orderMapper.searchAddrNum(oa);
	}

}
