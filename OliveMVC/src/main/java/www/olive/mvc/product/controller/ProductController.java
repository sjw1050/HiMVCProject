package www.olive.mvc.product.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;
import www.olive.mvc.product.service.ProductService;

@Controller
//@RequestMapping("/product/*")
public class ProductController {

	@Autowired
	ProductService productService;

	// 상품 전체 보기
	@GetMapping("/product/viewAllProduct")
	public String viewAllProduct(Model model) {

		List<Product> allProductList = productService.viewAllProduct();
		System.out.println("viewAllProduct >>>>" + allProductList);

		model.addAttribute("allProductList", allProductList);
		return "product/viewAllProduct";

	}

	// 상품 상세 보기
	@GetMapping("/product/viewOneProduct")
	public String viewOneProduct(HttpServletRequest request, Model model) {
		
		String productId = request.getParameter("productId");
		List<Product> oneProductList = productService.viewOneProduct(productId);

		System.out.println("productId param >>> " + productId);
		System.out.println("viewOneProduct >>>>" + oneProductList);

		model.addAttribute("oneProductList", oneProductList);
		return "product/viewOneProduct";
	}

	//cateId 받아오기 test
	@GetMapping("/*")
	public String category(Model model) {
		
		List<SubCategory> cateId = productService.getCateId();
		model.addAttribute("cateId", cateId);
				
		return "main";
	}
	
	// main 카테고리별 상품 보기
	@GetMapping("/categories?mainCateId=")
	public String viewByMainCate(HttpServletRequest request, Model model) {
		
		String mainCateId = request.getParameter("mainCateId");
		List<Product> mainCateProdList = productService.viewByMainCate(mainCateId);
		System.out.println("mainCateId param >>> " + mainCateId);
		
		if(mainCateId.equals("1")) {
			
		}
		
		System.out.println("mainCateProdList >>>>" + mainCateProdList);
		
		model.addAttribute("cateProductList", mainCateProdList);
		return "product/viewByCategory";
	}

}
