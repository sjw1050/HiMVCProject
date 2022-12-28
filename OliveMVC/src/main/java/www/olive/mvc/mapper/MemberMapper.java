package www.olive.mvc.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;


@Mapper
public interface MemberMapper {
	public List<MemberEntity> selectAll();
	public MemberEntity selectId(String memberId);
	public void insertMember(MemberEntity member);
	public Admin selectAdmin(String adminId);
	public MemberEntity selectGradeMember(AuthInfo info);
	public MemberEntity selectMember(Long memberNum);

}