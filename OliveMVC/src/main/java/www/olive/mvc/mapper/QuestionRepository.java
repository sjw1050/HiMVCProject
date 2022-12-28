package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.AnswerBoard;
import www.olive.mvc.customerCenter.dto.OliveFile;
import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.member.dto.AuthInfo;

@Mapper
public interface QuestionRepository {
	
	public List<QuestionBoard> selectAll();

	public void saveQuest(QuestionBoard quest);

	public List<QuestionBoard> findMemberNum(Long memberNum);

	public QuestionBoard findQuestNum(Long questionNum);

	public void modifyQuest(QuestionBoard quest);

	public void removeQuest(Long questionNum);

	public List<AnswerBoard> AnswerToFindQuestNum(Long questionNum);

	public void saveAnswer(AnswerBoard answer);

	public void adminQuestCheck(Long questionNum);

	public void updateAnswer(AnswerBoard answerBoard);

	public void saveQuestFile(String filename);

	public List<OliveFile> getQuestFile(Long questionNum);

	public void addQuestFile(OliveFile oFile);

	public void deleteFile(String fileName);

}
