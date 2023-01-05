package www.olive.mvc.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import www.olive.mvc.customerCenter.dto.OliveFile;
import www.olive.mvc.mapper.product.SellerMapper;
import www.olive.mvc.member.dto.Admin;
import www.olive.mvc.product.dto.Brand;
import www.olive.mvc.product.dto.Product;
import www.olive.mvc.product.dto.SubCategory;

@Service
public class SellerServiceImpl implements SellerService {

	@Autowired
	SellerMapper sellerMapper;

	// 셀러 상품등록 섭카테고리
	@Override
	public List<SubCategory> getSubCate() {
		return sellerMapper.selectSubCate();
	}

	@Override
	public Brand sellerCheck(String sellerId, String sellerPw) {
		Brand brand = sellerMapper.selectSeller(sellerId);
		// System.out.println("impl의 브랜드 >>> "+brand);
		if (brand == null) {
			return null;
		}
		if (brand.getSellerId().equals(sellerId)) {
			if (brand.getSellerPw().equals(sellerPw)) {
				return brand;
			} else {
				brand = null;
			} 
		} else {
			brand = null;
		}

		return brand;
	}

	// 셀러별 상품 목록
	@Override
	public List<Product> viewBySeller(String sellerId) {

		return sellerMapper.selectProdBySeller(sellerId);
	}

	@Override
	public void addProduct(Product product) {
		sellerMapper.insertProduct(product);
	}

	// 상품 등록 - 파일 업로드
	@Override
	public void addProductFile(String savedFilePath) {
		sellerMapper.insertProductFile(savedFilePath);
	}

	// 상품 삭제
	@Override
	public void removeProd(String productId) {
		sellerMapper.deleteProd(productId);
	}

	//상품 수정
	@Override
	public void modiProd(Product product) {
		sellerMapper.updateProd(product);
	}
	@Override
	public void modiProdFile(OliveFile oFile) {
		sellerMapper.updateFile(oFile);
	}

	@Override
	public Product selectOneProd(String productId) {
		return sellerMapper.selectOneProd(productId);
	}
	@Override
	public OliveFile selectOneFile(String productId) {
		return  sellerMapper.selectOneFile(productId);
	}

	
}
