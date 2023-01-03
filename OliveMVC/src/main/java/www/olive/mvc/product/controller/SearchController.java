package www.olive.mvc.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.service.ProductService;

@Controller
@RequestMapping("/search/*")
public class SearchController {

	@Autowired
	ProductService productService;
	
	//메인 - 검색하기
	@GetMapping("mainSearch")
	public String mainSearch(Model model, @RequestParam("query") String query) {
		
		System.out.println("SearchController > mainSearch > query :::::: " + query);
		
		List<Product> searchList = productService.searchProduct(query);
		
		model.addAttribute("query", query);
		model.addAttribute("searchResult", searchList);
		
		System.out.println("searchResult >>>> " + searchList);
		
		
		//검색 결과 보여줄 jsp
		return "/product/searchProduct";
	}
}
