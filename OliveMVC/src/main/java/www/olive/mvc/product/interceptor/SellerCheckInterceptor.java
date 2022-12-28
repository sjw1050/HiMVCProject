package www.olive.mvc.product.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

public class SellerCheckInterceptor implements HandlerInterceptor {

//
//	@Override
//	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
//			Object handler) throws Exception {
//		HttpSession session = request.getSession(false);
//		if (session != null) {
//			Object authInfo = session.getAttribute("sellerInfo");
//			if (authInfo != null) {
//				return true;
//			}
//		}
//		session.setAttribute("togo", request.getRequestURI());
//		response.sendRedirect(request.getContextPath() + "/seller/sellerLogin");
//		return false;
//	}
//	
//	
	

}
