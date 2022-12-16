package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
		Long memberNum = loginauth.getMemberNum();
		quest.setMemberNum(memberNum);
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
	
	

}
