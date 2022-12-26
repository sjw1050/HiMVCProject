package www.olive.mvc.myPage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.mapper.MemberMapper;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;

@Service
public class MypageService {
	
	@Autowired
	MemberMapper memberRepository;

	public MemberEntity selectGrade(AuthInfo info) {
		return memberRepository.selectGradeMember(info);
	}

}
