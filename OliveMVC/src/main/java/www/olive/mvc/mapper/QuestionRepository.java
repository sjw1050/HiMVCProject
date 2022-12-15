package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.QuestionBoard;

@Mapper
public interface QuestionRepository {
	
	public List<QuestionBoard> selectAll();

}
