package www.olive.mvc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import www.olive.mvc.customerCenter.dto.Notice;
import www.olive.mvc.customerCenter.dto.OliveFile;

@Mapper
public interface NoticeMapper {
	
	public List<Notice> selectAll();

	public void saveNotice(Notice notice);

	public Notice selectId(Long noticeNum);

	public void updateview(Long noticeNum);

	public void modifyNotice(Notice notice);

	public void removeNotice(Long noticeNum);

	public void saveNoticeFile(String savedFilePath);

	public List<OliveFile> getNoticeFile(Long noticeNum);

	public void deleteFile(String fileName);

	public void addNoticeFile(OliveFile oFile);

}
