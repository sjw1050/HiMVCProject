package www.olive.mvc.myPage.controller;



import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.customerCenter.service.QuestService;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;
import www.olive.mvc.myPage.dto.OrderAddress;
import www.olive.mvc.myPage.dto.OrderList;
import www.olive.mvc.myPage.dto.ProductOrder;
import www.olive.mvc.myPage.service.MypageService;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.ProductQna;
import www.olive.mvc.product.service.ProductService;

@Controller
@RequestMapping("/mypage/**")
public class MypageController {
	
	@Autowired
	MypageService mypageService;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	QuestService questService;
	
	@Autowired
	ProductService productService;
	
	
	@GetMapping("main")
	public String MainPage(HttpSession session, Model model) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
//		System.out.println("현재 로그인 정보"+info);
		if(info == null) {
			return "main";
		}
		
		List<ProductOrder> order = mypageService.viewOrder(info.getMemberNum()); 
		List<QuestionBoard> qList = questService.viewMemberQuest(info);
		List<ProductQna> pqList = mypageService.viewProductQna(info.getMemberNum());
		
		
		//System.out.println("오더정보 들어옴?" + order);
		model.addAttribute("order", order);
		model.addAttribute("mqlist", qList);
		model.addAttribute("pqList", pqList);
		return "mypage/main";
	}
	
	@GetMapping("orderdetail")
	public String orderdetail(HttpSession session, Model model, ProductOrder po) {	
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info == null) {
			return "main";
		}
		MemberEntity member = memberService.selectMember(info.getMemberNum());
		//System.out.println("멤버 들어옴?"+member);
		po.setMember(member);
		//System.out.println("오더 변경됨?" + po);
		List<OrderList> oList = mypageService.orderListView(po);
		//System.out.println("오더리스트 들어옴?" + oList);
		model.addAttribute("orderList", oList);
		return "mypage/orderdetail";
	}
	
	@GetMapping("address")
	public String viewAddress(HttpSession session, Model model) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info == null) {
			return "main";
		}
		List<OrderAddress> address = mypageService.viewAddress(info.getMemberNum());
		//System.out.println("주소 잘 가져왔니?" + address);
		model.addAttribute("address", address);
		return "mypage/viewaddress";
	}
	
	@PostMapping("updateaddress")
	public String updateAddress(HttpSession session, Model model, OrderAddress address) {
		//System.out.println("수정된 정보 받아옴?" + address);
		mypageService.updateAddress(address);
		
		return "redirect:/mypage/address";
	}
	
	@PostMapping("insertaddress")
	public String insertAddress(HttpSession session, Model model, OrderAddress address) {
		//System.out.println("인서트 멤버"+address);
//		AuthInfo info = (AuthInfo) session.getAttribute("info");
//		//System.out.println("추가된 주소 정보 받아옴?" + address);
//		if(info == null) {
//			return "main";
//		}
//		MemberEntity member = memberService.selectMember(info.getMemberNum());
//		address.setMember(member);
		//System.out.println("주소지 멤버 입력" + address);
		mypageService.insertAddress(address);		
		return "redirect:/mypage/address";
	}
	
	@GetMapping("deleteaddress")
	public String deleteAddress(OrderAddress address) {
		mypageService.deleteAddress(address);
		return "redirect:/mypage/address";
	}
	
	@GetMapping("modifymemberform")
	public String modifyMemberForm(Long memberNum, Model model) {
		System.out.println("멤버넘버 받음?"+memberNum);
		MemberEntity member = memberService.selectMember(memberNum);
		System.out.println("수정할 멤버정보" + member);
		model.addAttribute("member", member);
		return "mypage/modifymemberform";
	}
	
	@PostMapping("modifymember")
	public String modifyMember(MemberEntity member, String newpw) {
		if(newpw != null) {
			if (newpw.trim() != "") {
				member.setPw(newpw);
			}
		}			
		System.out.println("회원수정 멤버 받아옴?" + member);
		mypageService.modifyMember(member);
		return "mypage/main";
	}
	
	@GetMapping("withdrawalform")
	public void withdrawalform(Model model, Long memberNum) {
		MemberEntity member = memberService.selectMember(memberNum);
		model.addAttribute("member", member);
	}
	
	@GetMapping("withdrawal")
	public @ResponseBody String withdrawal(Long memberNum, HttpSession session) {
		int result = mypageService.withdrawal(memberNum);
		if(result >0) {
		session.invalidate();
		return "success";
		}else {
			return "fail";
		}
	}
	
	@GetMapping("productqnaList")
	public String productQnaList(HttpSession session, Model model) {
		AuthInfo info = (AuthInfo) session.getAttribute("info");
		if(info == null) {
			return "/main";
		}
		List<ProductQna> pqList = mypageService.viewProductQna(info.getMemberNum());
		System.out.println("상품qna 리스트 받아왔니?" + pqList);
		model.addAttribute("pqList", pqList);
		return "mypage/productqnaList";
	}
	
	@GetMapping("productqnaListAll")
	public String productQnaListAll(Model model) {
//		AuthInfo info = (AuthInfo) session.getAttribute("info");
//		if(info == null) {
//			return "/main";
//		}
		List<ProductQna> pqList = mypageService.viewProductQnaAll();
		//System.out.println("상품qna 리스트 받아왔니?" + pqList);
		model.addAttribute("pqList", pqList);
		return "mypage/productqnaList";
	}
	
	@GetMapping("detailproductqna")
	public String detailproductqna(Model model, ProductQna productQna) {
		ProductQna qna = mypageService.detailProductQna(productQna.getProductQnaId());
		//System.out.println("상품qna받아왔니?" + qna);
		model.addAttribute("qna", qna);
		return "mypage/detailproductqna";
	}
	
	@PostMapping("answerinsert")
	public @ResponseBody String answerinsert(ProductQna qna) {
		//System.out.println("답변 정보 받아왔니?"+qna);
		int result = mypageService.answerInsert(qna);
		System.out.println("result>>"+result);
		if(result > 0) {
		return "success";
		}else {
			return "fail";
		}
	}
	
	@PostMapping("modifyproductqna")
	public @ResponseBody String modifyproductqna(ProductQna qna) {
		System.out.println("문의 수정 정보 받아왔니?"+qna);
		int result = mypageService.modifyProductQna(qna);
		System.out.println("result>>"+result);
		if(result > 0) {
		return "success";
		}else {
			return "fail";
		}
	}
	
	@GetMapping("productquestform")
	public void productquestform(Product product, Model model) {
		Product oneProd = productService.viewOneProduct(product.getProductId());
		model.addAttribute("oneProd", oneProd);
	}
	
	@PostMapping("productquestinsert")
	public String productQuestInsert(ProductQna qna, HttpSession session) {
		System.out.println("상품문의 정보 받아옴?"+qna);
		mypageService.productQuestInsert(qna);
		return "redirect:/mypage/productqnaListAll/";
	}
	

}
