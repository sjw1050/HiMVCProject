package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;

import www.olive.mvc.customerCenter.dto.AnswerBoard;
import www.olive.mvc.customerCenter.dto.OliveFile;
import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.mapper.QuestionMapper;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;

@Service
public class QuestService {
	
	@Autowired
	QuestionMapper questionRepository;

	public List<QuestionBoard> viewquest() {
		return questionRepository.selectAll();
	}

	public void saveQuest(QuestionBoard quest, AuthInfo loginauth) {
//		Long memberNum = loginauth.getMemberNum();
//		quest.setMemberNum(memberNum);
		//System.out.println("로그인 정보 및 퀘스트 정보 왔니?" + loginauth + quest);
		quest.setWriter(new MemberEntity(loginauth.getMemberNum(), loginauth.getId(), loginauth.getName(), loginauth.getBirthday(),loginauth.getTpa()));;
		//System.out.println("멤버넘버 입력됨?"+quest.getWriter());
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

	public void saveQuestFile(String filename) {
		questionRepository.saveQuestFile(filename);
	}

	public List<OliveFile> getQuestFile(Long questionNum) {
		return questionRepository.getQuestFile(questionNum);
	}

	public void addQuestFile(OliveFile oFile) {
		questionRepository.addQuestFile(oFile);
	}

	public void filedelete(String fileName) {
		questionRepository.deleteFile(fileName);
	}

	public List<OliveFile> getFiles() {
		return questionRepository.getQuestFiles();
	}

	public List<AnswerBoard> viewAnswerList() {
		return questionRepository.viewAnswerList();
	}
	
	

}
