package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.Faq;

@Mapper
public interface FaqRepository {
	
	public List<Faq> selectAll();

}
