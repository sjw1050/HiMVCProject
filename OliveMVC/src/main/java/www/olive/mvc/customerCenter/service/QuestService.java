package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.customerCenter.dto.Notice;
import www.olive.mvc.customerCenter.dto.QuestionBoard;
import www.olive.mvc.mapper.NoticeRepository;
import www.olive.mvc.mapper.QuestionRepository;

@Service
public class QuestService {
	
	@Autowired
	QuestionRepository questionRepository;

	public List<QuestionBoard> viewquest() {
		return questionRepository.selectAll();
	}
	
	

}
