package www.olive.mvc.product.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import lombok.extern.slf4j.Slf4j;
import www.olive.mvc.product.dto.Brand;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;
import www.olive.mvc.product.service.SellerService;
import www.olive.mvc.util.FileUtil;

@Controller
@RequestMapping("/seller")
@Slf4j
public class SellerController {

	@Autowired
	SellerService sellerService;

	
	// /seller로 들어올 시 하위카테고리 붙여주기.
	// @GetMapping("")
	// public void subCate(Model model) {
	// }

	// 셀러 로그인 폼
	@GetMapping("/sellerLogin")
	public String sellerloginForm() {
		return "/seller/loginForm";
	}

	// 셀러 로그인
	@PostMapping("/sellerLogin")
	public String sellerlogin(HttpSession session, Brand brand, Model model) {
		// 로그인 할 때 서브카테고리 세션에 붙여주기
		List<SubCategory> subCateList = sellerService.getSubCate();
		session.setAttribute("subCateList", subCateList);
		System.out.println("subCateList 셀러 잘 들어왔나 " + subCateList);

		Brand _brand = sellerService.sellerCheck(brand.getSellerId(), brand.getSellerPw());

		if (_brand != null) {
			session.setAttribute("sellerInfo", _brand);
			model.addAttribute("sellerInfo", _brand);
			if (session.getAttribute("togo") != null) {
				String togo = (String) session.getAttribute("togo");
				togo.substring(0);
				// System.out.println("togo>>>" + togo);
				session.removeAttribute("togo");
				return togo;
			}

			return "redirect:/main";
		} else {
			model.addAttribute("notseller", "셀러 회원이 아닙니다.");
			return "/seller/loginForm";
		}

	}

	// 셀러로그아웃
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/main";
	}

	// 셀러 관리 메뉴
	@GetMapping("/sellerMenu")
	public String sellerMenu(Model model, HttpServletRequest request) {
		// 셀러 페이지로 가면서 그 셀러의 상품 목록 뿌려주기.
		String sellerId = request.getParameter("sellerId");
		System.out.println("셀러별 상품 셀러 아이디 >>> " + sellerId);

		// List<Product> listBySeller = sellerService.viewBySeller(sellerId);
		//
		// model.addAttribute("listBySeller", listBySeller);
		// System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		// System.out.println("listBySeller >>>>" + listBySeller);
		// System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");

		return "/seller/sellerMenu";

	}

	//셀러별 상품 목록
	@GetMapping("viewBySeller")
	public String viewBySeller(Model model, HttpServletRequest request) {

		String sellerId = request.getParameter("sellerId");
		// System.out.println("셀러별 상품, 셀러 아이디 >>> " + sellerId);
		List<Product> listBySeller = sellerService.viewBySeller(sellerId);

		model.addAttribute("listBySeller", listBySeller);
		// System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		// System.out.println("listBySeller >>>>" + listBySeller);
		// System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>");

		return "/seller/viewBySeller";

	}

	// 상품 등록 폼
	@GetMapping("/registProduct")
	public String registProductForm(Model model) {
		// List<SubCategory> subCateList = sellerService.getSubCate();
		//
		// model.addAttribute("subCate", subCateList);
		// System.out.println("subCateList 셀러 잘 들어왔나 " + subCateList);
		return "/seller/registProduct";

		// return "main";

	}

	// 상품 등록
	@PostMapping("/registProduct")
	public String registProduct(@RequestParam("subCateId") String subCateId, Product product,
			MultipartHttpServletRequest mtfRequest, HttpServletRequest request) throws Exception {
		System.out.println("registProduct 등록폼 들어옴" + mtfRequest);

		// 사진 저장하고 경로 받아옴
		List<MultipartFile> fileList = mtfRequest.getFiles("productImage");
		sellerService.addProduct(product);
		log.info("fileList>>>>>>>  " + fileList);
		log.info("fileName>>>>>>>  " + fileList.get(0).getOriginalFilename());

		for (MultipartFile file : fileList) {
			if (file.getSize() != 0) {
				String savedPath = FileUtil.uploadFile(file, request);
				String filename = savedPath.substring(10).trim();
				System.out.println(filename);
				sellerService.addProductFile(savedPath);
			}
		}
		return "redirect:/viewBySeller";

	}
	
	//상품 파일 받아오기
	
	//상품 삭제
	@GetMapping("/removeProd")
	public void removeProd(HttpServletRequest request) {
		String productId = request.getParameter("productId");
		sellerService.removeProd(productId);
	}
	
}
