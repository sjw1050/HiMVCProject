package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.QuestionBoard;

@Mapper
public interface QuestionRepository {
	
	public List<QuestionBoard> selectAll();

	public void saveQuest(QuestionBoard quest);

	public List<QuestionBoard> findMemberNum(Long memberNum);

	public QuestionBoard findQuestNum(Long questionNum);

	public void modifyQuest(QuestionBoard quest);

	public void removeQuest(Long questionNum);

}
