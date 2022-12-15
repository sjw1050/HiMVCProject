package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.member.dto.MemberEntity;


@Mapper
public interface MemberRepository {
	public List<MemberEntity> selectAll();
	public MemberEntity selectId(String memberId);
	public Admin selectAdmin(String adminId);

}
