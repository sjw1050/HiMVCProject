package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.customerCenter.dto.Faq;
import www.olive.mvc.mapper.FaqMapper;

@Service
public class FaqService {
	
	@Autowired
	FaqMapper faqRepository;

	public List<Faq> selectAll() {
		return faqRepository.selectAll();
	}

	public List<Faq> searchFaq(String inqTitNm) {
		return faqRepository.searchFaq(inqTitNm);
	}

	public int searchCount(String inqTitNm) {
		return faqRepository.countAll(inqTitNm);
	}

}
