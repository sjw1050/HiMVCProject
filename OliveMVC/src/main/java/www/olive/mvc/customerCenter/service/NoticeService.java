package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.customerCenter.dto.Notice;
import www.olive.mvc.mapper.NoticeRepository;

@Service
public class NoticeService {
	
	@Autowired
	NoticeRepository noticeRepository;

	public List<Notice> viewNotice() {
		return noticeRepository.selectAll();
	}

	public void saveNotice(Notice notice) {
		noticeRepository.saveNotice(notice);
	}

	public Notice detailNotice(Long noticeNum) {
		noticeRepository.updateview(noticeNum);
		return noticeRepository.selectId(noticeNum);
	}

	public void modifyNotice(Notice notice) {
		noticeRepository.modifyNotice(notice);
	}

	public void removeNotice(Long noticeNum) {
		noticeRepository.removeNotice(noticeNum);
	}
	
	

}
