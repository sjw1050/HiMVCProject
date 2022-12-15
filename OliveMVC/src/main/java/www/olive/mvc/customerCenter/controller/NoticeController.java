package www.olive.mvc.customerCenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.customerCenter.dto.Notice;
import www.olive.mvc.customerCenter.service.NoticeService;

@Controller
@RequestMapping("/notice")
public class NoticeController {
	
	@Autowired
	NoticeService noticeService;
	
	
	@GetMapping("viewall")
	public String viewallNotice(Model model) {
		List<Notice> list = noticeService.viewNotice();
		model.addAttribute("list", list);
		return "notice/viewNotice";
	}
	
	@GetMapping("write")
	public String writeNotice() {
		System.out.println("write 진입 성공");
		return "notice/write";
	}
	
	@PostMapping("write")
	public String write(Notice notice) {
		//System.out.println("공지 입력되었니?" + notice);
		noticeService.saveNotice(notice);
		return "redirect:/notice/viewall";
	}
	
	@GetMapping("viewnotice")
	public String viewnotice(Long noticeNum, Model model) {
		//System.out.println("공지번호 들어왔니?" + noticeNum);
		Notice notice = noticeService.detailNotice(noticeNum);
		//System.out.println("공지 번호에 맞게 들어왔니?" + notice);
		model.addAttribute("notice", notice);
		return "notice/detailnotice";
		
	}
	
	@PostMapping("modinotice")
	public String modinotice(Notice notice) {
		System.out.println("공지 수정 내용 들어왔니?" + notice);
		noticeService.modifyNotice(notice);
		return "redirect:/notice/viewall";
	}
	
	@PostMapping("removenotice")
	public String removenotice(Long noticeNum) {
		System.out.println("공지 번호 받아와지니?"+noticeNum);
		noticeService.removeNotice(noticeNum);
		return "redirect:/notice/viewall";
	}

}
