package www.olive.mvc.product.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.service.ProductService;

@Controller
@RequestMapping("/product/*")
public class ProductController {

	@Autowired
	ProductService productService;

	// 상품 전체 보기
	@GetMapping("viewAllProduct")
	public String viewAllProduct(Model model) {

		List<Product> allProductList = productService.viewAllProduct();
		System.out.println("viewAllProduct >>>>" + allProductList);

		model.addAttribute("allProductList", allProductList);
		return "product/viewAllProduct";

	}

	// 상품 상세 보기
	@GetMapping("viewOneProduct")
	public String viewOneProduct(HttpServletRequest request, Model model) {
		
		String productId = request.getParameter("productId");
		List<Product> oneProductList = productService.viewOneProduct(productId);

		System.out.println("productId param >>> " + productId);
		System.out.println("viewOneProduct >>>>" + oneProductList);

		model.addAttribute("oneProductList", oneProductList);
		return "product/viewOneProduct";
	}

	// 카테고리별 상품 보기
	public String viewByCategory(HttpServletRequest request, Model model) {
		
		String categoryId = request.getParameter("categoryId");
		List<Product> cateProductList = productService.viewByCategory(categoryId);
		
		System.out.println("categoryId param >>> " + categoryId);
		System.out.println("viewByCategory >>>>" + cateProductList);
		
		model.addAttribute("cateProductList", cateProductList);
		return "product/viewByCategory";
	}

}
