package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.customerCenter.dto.AnswerBoard;
import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.mapper.QuestionRepository;
import www.olive.mvc.member.dto.AuthInfo;

@Service
public class QuestService {
	
	@Autowired
	QuestionRepository questionRepository;

	public List<QuestionBoard> viewquest() {
		return questionRepository.selectAll();
	}

	public void saveQuest(QuestionBoard quest, AuthInfo loginauth) {
//		Long memberNum = loginauth.getMemberNum();
//		quest.setMemberNum(memberNum);
		quest.getWriter().setMemberNum(loginauth.getMemberNum());
		questionRepository.saveQuest(quest);
	}

	public List<QuestionBoard> viewMemberQuest(AuthInfo logininfo) {
		Long memberNum = logininfo.getMemberNum();
		List<QuestionBoard> qboard = questionRepository.findMemberNum(memberNum); 
		return qboard;
	}

	public QuestionBoard detailQuest(Long questionNum) {
		return questionRepository.findQuestNum(questionNum);
	}

	public void modiQuest(QuestionBoard quest) {
		questionRepository.modifyQuest(quest);
	}

	public void removeQuest(Long questionNum) {
		questionRepository.removeQuest(questionNum);
	}

	public List<AnswerBoard> viewAnswer(Long questionNum) {
		//System.out.println("서비스 퀘션넘"+questionNum);
		return questionRepository.AnswerToFindQuestNum(questionNum);
	}

	public void saveAnswer(AnswerBoard answer) {
		questionRepository.saveAnswer(answer);
	}

	public void adminQuestCheck(Long questionNum) {
		questionRepository.adminQuestCheck(questionNum);
	}

	public void updateAnswer(AnswerBoard answerBoard) {
		questionRepository.updateAnswer(answerBoard);
	}
	
	

}
