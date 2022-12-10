package www.olive.mvc.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import www.olive.mvc.member.dto.MemberEntity;


@Mapper
public interface MemberRepository {
	public List<MemberEntity> selectAll();

}
