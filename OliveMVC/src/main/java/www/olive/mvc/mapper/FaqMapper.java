package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.Faq;

@Mapper
public interface FaqMapper {
	
	public List<Faq> selectAll();

	public List<Faq> searchFaq(String inqTitNm);

	public int countAll(String inqTitNm);

}
