package www.olive.mvc;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import www.olive.mvc.product.dto.MainCategory;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;
import www.olive.mvc.product.service.ProductService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	@Autowired
	ProductService productService;
	
	@RequestMapping(value = "/*", method = RequestMethod.GET)
	public String home(Model model) {		
		System.out.println();
		List<SubCategory> subCateList = productService.getSubCate();
		List<MainCategory> mainCateList = productService.getMainCate();
		List<Product> allProductList = productService.viewAllProduct(); //main에 전체상품list 가져옴
		
		model.addAttribute("subCateList", subCateList);
		model.addAttribute("mainCateList", mainCateList);
		model.addAttribute("allProductList", allProductList);
		
		System.out.println("allProductList ::::: " + allProductList);
		
		return "/main";
	}
}
