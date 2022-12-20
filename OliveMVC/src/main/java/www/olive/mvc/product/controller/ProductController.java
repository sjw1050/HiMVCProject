package www.olive.mvc.product.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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

//	// cateId 받아오기 test
//	@GetMapping("/*")
//	public String category(Model model) {
//		
//		List<SubCategory> cateId = productService.getCateId();
//		model.addAttribute("cateId", cateId);
//				
//		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>");
//		System.out.println("cateId" + cateId);
//		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>");
//		return "main";
//	}
//

	// 메인 카테고리별 상품 뿌리기 
	@GetMapping("/categories")
//	 public String getList(@RequestParam("main") int cateCode, Model model) throws Exception {
	public String getProdByMain(HttpServletRequest request, Model model) throws Exception {

		String mainCateId = request.getParameter("mainCateId");
		List<Product> listByCate = productService.getProdByMain(mainCateId);

		model.addAttribute("listByCate", listByCate);
//		System.out.println("controller >>>>" + listByCate);
		
		return "/product/list";
	}
	
	//서브 카테고리별 상품 뿌리기 
	@GetMapping("/categories/sub")
	public String getProdBySub(HttpServletRequest request, Model model) throws Exception {

		String subCateId = request.getParameter("subCateId");
		List<Product> subList = productService.getProdBySub(subCateId);

		model.addAttribute("subList", subList);
		System.out.println("controller subList >>>>" + subList);
		
		return "/product/list";
	}

}
