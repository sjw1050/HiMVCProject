package www.olive.mvc.customerCenter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.customerCenter.dto.OliveFile;
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
//		String fileName = null;
//		if(!file.isEmpty()) {
//			String originalFileName = file.getOriginalFilename();
//			String ext = FilenameUtils.getExtension(originalFileName);	//확장자 구하기
//			UUID uuid = UUID.randomUUID();	//UUID 구하기
//			fileName=uuid+"."+ext;
//			file.transferTo(new File("C:\\upload\\" + fileName));
//		}
//		notice.setFileName(fileName);
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

	public void saveNoticeFile(String savedFilePath) {
		noticeRepository.saveNoticeFile(savedFilePath);
	}

	public List<OliveFile> getNoticeFile(Long noticeNum) {
		return noticeRepository.getNoticeFile(noticeNum);
	}

	public void filedelete(String fileName) {
		noticeRepository.deleteFile(fileName);
	}

	public void addNoticeFile(OliveFile oFile) {
		noticeRepository.addNoticeFile(oFile);
	}
	
	

}
