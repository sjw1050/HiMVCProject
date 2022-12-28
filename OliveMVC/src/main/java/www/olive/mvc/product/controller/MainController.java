package www.olive.mvc.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import www.olive.mvc.product.dto.MainCategory;
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
		List<SubCategory> subCateList = productService.getSubCate();
		List<MainCategory> mainCateList = productService.getMainCate();
		
		model.addAttribute("subCateList", subCateList);
		model.addAttribute("mainCateList", mainCateList);
//		System.out.println("subCateList >>>>>>>>> " + subCateList);
//		System.out.println("mainCateList >>>>>>>>> " + mainCateList);
		
//		return "main";
		
	}
}
