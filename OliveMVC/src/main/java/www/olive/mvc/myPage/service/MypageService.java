package www.olive.mvc.myPage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.MemberMapper;
import www.olive.mvc.mapper.OrderMapper;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderList;
import www.olive.mvc.myPage.dto.ProductOrder;

@Service
public class MypageService {
	
	@Autowired
	MemberMapper memberRepository;
	
	@Autowired
	OrderMapper orderMapper;

	public MemberEntity selectGrade(AuthInfo info) {
		return memberRepository.selectGradeMember(info);
	}

	public List<OrderList> orderListView(ProductOrder po) {
		return orderMapper.orderListView(po);
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

}
