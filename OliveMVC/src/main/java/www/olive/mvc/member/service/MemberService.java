package www.olive.mvc.member.service;



import static org.hamcrest.CoreMatchers.nullValue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.MemberMapper;
import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.myPage.dto.ProductOrder;

@Service
public class MemberService {
	
	@Autowired
	MemberMapper memberRepository;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	public List<MemberEntity> selectAll() {
		return memberRepository.selectAll();
	}

	public AuthInfo memberCheck(String memberId, String Pw) {
		//System.out.println("멤버 아이디,비번 전달받았는지>>>" + memberId + Pw);
		AuthInfo info = null;
		MemberEntity member = memberRepository.selectId(memberId);
		//System.out.println("반환받은 멤버 >>>" + member);
		if(member != null) {
			if(member.getMemberId().equals(memberId)) {
			if(bCryptPasswordEncoder.matches(Pw, member.getPw())) {
				info = new AuthInfo(member.getMemberNum(), member.getMemberId(), member.getPw(), member.getEmail(), member.getMemberName(), member.getAddressNumber(), member.getAddressInfo(), member.getAddressDetail(), member.getAddressDetail2(), member.getBirthday(), member.getTpa(), member.getMemberLevel());
			}else {
				return null;
			}
			}else {
				return null;
			}
		}
//		if(member.getMemberId().equals(memberId)) {
//			if(member.getPw().equals(Pw)) {
//				info = new AuthInfo(member.getMemberNum(), member.getMemberId(), member.getPw(), member.getEmail(), member.getMemberName(), member.getAddressNumber(), member.getAddressInfo(), member.getAddressDetail(), member.getAddressDetail2(), member.getBirthday(), member.getTpa(), member.getMemberLevel());
//			}else {
//				
//			}
//		}else {
//			return null;
//		}
		//}
		//System.out.println("info 입력>>>" + info);
		return info;
	}
	
	public void registMember(MemberEntity member) {
//		Character gender = member.getGender();
		System.out.println("젠더가 뭐니"+ member.getGender());
		memberRepository.insertMember(member);
	}


	public Admin adminCheck(String adminId, String adminPw) {
		Admin admin = memberRepository.selectAdmin(adminId);
		if(admin == null) {
			return null;
		}
		if(admin.getAdminId().equals(adminId)) {
			if(admin.getAdminPw().equals(adminPw)) {
				return admin;
			}else {
				admin = null;
			}
		}else {
			admin = null;
		}
		return admin;
	}

	public MemberEntity checkMember(MemberEntity member) {
		MemberEntity _member = memberRepository.selectId(member.getMemberId()); 
		System.out.println("체크멤버>>"+_member);
		if(_member == null) {
			return null;
		}else {
			return _member;
		}
	}

	public MemberEntity selectMember(Long memberNum) {
		return memberRepository.selectMember(memberNum);
	}

	public AuthInfo updateTpa(ProductOrder po) {
		memberRepository.updateTpa(po);
		MemberEntity member = memberRepository.selectId(po.getMember().getMemberId());
		if(member != null) {
		AuthInfo info = new AuthInfo(member.getMemberNum(), member.getMemberId(), member.getPw(), member.getEmail(), member.getMemberName(), member.getAddressNumber(), member.getAddressInfo(), member.getAddressDetail(), member.getAddressDetail2(), member.getBirthday(), member.getTpa(), member.getMemberLevel());
		return info;
		}else {
			return null;
		}
		
	}
	
	

}
