package www.olive.mvc.product.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import www.olive.mvc.product.dto.Product;
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


	// 메인 카테고리별 상품 뿌리기 
	@GetMapping("/category")
	public String getProdByMain(HttpServletRequest request, Model model) throws Exception {

		String mainCateId = request.getParameter("mainCateId");
		List<Product> listByMain = productService.getProdByMain(mainCateId);
		
		String subCateId = request.getParameter("subCateId");
		List<Product> listBySub = productService.getProdBySub(subCateId);

		model.addAttribute("listByMain", listByMain);
		model.addAttribute("listBySub", listBySub);
		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		System.out.println("listByMain >>>>" + listByMain);
		System.out.println("listBySub >>>>" + listBySub);
		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		
		return "/product/list";
	}
	
	
	
	//서브 카테고리별 상품 뿌리기 
	@GetMapping("/category/sub")
	public String getProdBySub(HttpServletRequest request, Model model) throws Exception {

		String subCateId = request.getParameter("subCateId");
		List<Product> listBySub = productService.getProdBySub(subCateId);

		model.addAttribute("listBySub", listBySub);
		System.out.println("controller listBySub >>>> " + listBySub);
		
		return "/product/list";
	}
	

	// 상품 상세 보기
	@GetMapping("/product/viewOneProduct")
	public String viewOneProduct(HttpServletRequest request, Model model, Product product) {

		//String productId = request.getParameter("productId");
		Product oneProdList = productService.viewOneProduct(product.getProductId());

		//System.out.println("productId param >>> " + productId);
		System.out.println("oneProdList >>>>" + oneProdList);

		model.addAttribute("oneProdList", oneProdList);
		return "product/viewOneProduct";
	}

}
