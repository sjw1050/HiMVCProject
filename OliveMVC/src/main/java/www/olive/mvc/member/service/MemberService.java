package www.olive.mvc.member.service;


import static org.hamcrest.CoreMatchers.nullValue;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.repository.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	MemberRepository memberRepository;

	public List<MemberEntity> selectAll() {
		return memberRepository.selectAll();
	}

	public AuthInfo memberCheck(String memberId, String Pw) {
		//System.out.println("멤버 아이디,비번 전달받았는지>>>" + memberId + Pw);
		AuthInfo info;
		MemberEntity member = memberRepository.selectId(memberId);
		//System.out.println("반환받은 멤버 >>>" + member);
		if(member.getMemberId().equals(memberId)) {
			if(member.getPw().equals(Pw)) {
				info = new AuthInfo(member.getMemberId(), member.getEmail(), member.getMemberName(), member.getAddress(), member.getBirthday(), member.getTpa());
			}else {
				return null;
			}
		}else {
			return null;
		}
		//System.out.println("info 입력>>>" + info);
		return info;
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
	
	

}
