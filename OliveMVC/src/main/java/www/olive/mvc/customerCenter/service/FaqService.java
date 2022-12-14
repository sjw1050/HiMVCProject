package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.customerCenter.dto.Faq;
import www.olive.mvc.repository.FaqRepository;

@Service
public class FaqService {
	
	@Autowired
	FaqRepository faqRepository;

	public List<Faq> selectAll() {
		return faqRepository.selectAll();
	}

}
