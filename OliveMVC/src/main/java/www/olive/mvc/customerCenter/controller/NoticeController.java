package www.olive.mvc.customerCenter.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.customerCenter.dto.Notice;
import www.olive.mvc.customerCenter.service.NoticeService;

@Controller
@RequestMapping("/notice")
public class NoticeController {
	
	@Autowired
	NoticeService noticeService;
	
	
	@GetMapping("viewNotice")
	public String viewNotice(Model model) {
		List<Notice> list = noticeService.viewNotice();
		model.addAttribute("list", list);
		return "notice/viewNotice";
	}
	
	@GetMapping("write")
	public String writeNotice() {
		System.out.println("write 진입 성공");
		return "notice/writeform";
	}

}
