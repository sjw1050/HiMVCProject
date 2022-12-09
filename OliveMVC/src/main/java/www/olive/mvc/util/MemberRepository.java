package www.olive.mvc.util;

import java.util.List;

import www.olive.mvc.member.dto.Member;

public interface MemberRepository {
	public List<Member> selectAll();

}
