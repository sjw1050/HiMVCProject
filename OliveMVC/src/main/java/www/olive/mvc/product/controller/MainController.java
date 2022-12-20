package www.olive.mvc.product.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.product.dto.SubCategory;
import www.olive.mvc.product.service.ProductService;

@Controller
public class MainController {
	
	@Autowired
	ProductService productService;
	
	// /main에 카테고리id 붙여주기
	@GetMapping("/*")
	public void mainController(Model model) {
		System.out.println();
		List<SubCategory> cateList = productService.getCateInfo();
		
		model.addAttribute("cateList", cateList);
		System.out.println("cateList >>>>>>>>> " + cateList);
		
//		return "main";
		
	}
}
