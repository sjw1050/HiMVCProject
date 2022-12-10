package www.olive.mvc.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.repository.MemberRepository;

@Service
public class MemberService {
	
	@Autowired
	MemberRepository memberRepository;

	public List<MemberEntity> selectAll() {
		return memberRepository.selectAll();
	}
	
	

}
