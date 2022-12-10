package www.olive.mvc.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.Notice;

@Mapper
public interface NoticeRepository {
	
	public List<Notice> selectAll();

}
