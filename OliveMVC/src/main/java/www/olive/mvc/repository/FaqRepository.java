package www.olive.mvc.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.Faq;

@Mapper
public interface FaqRepository {
	
	public List<Faq> selectAll();

}
