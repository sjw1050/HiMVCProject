package www.olive.mvc.product.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.member.dto.AuthInfo;
import www.olive.mvc.member.dto.MemberEntity;
import www.olive.mvc.member.service.MemberService;
import www.olive.mvc.product.dto.Brand;
import www.olive.mvc.product.service.SellerService;

@Controller
@RequestMapping("/seller")
public class SellerController {

	@Autowired
	SellerService sellerService;
	
	@PostMapping("/login")
	public String login(HttpSession session, Brand brand, Model model) {
		return null;
	}

}
