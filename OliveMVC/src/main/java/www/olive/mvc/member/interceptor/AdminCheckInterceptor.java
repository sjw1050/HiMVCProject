package www.olive.mvc.member.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

public class AdminCheckInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {
		HttpSession session = request.getSession(false);
		if (session != null) {
			Object authInfo = session.getAttribute("admininfo");
			if (authInfo != null) {
				return true;
			}
		}
		response.sendRedirect(request.getContextPath() + "/member/adminloginForm");
		return false;
	}
	
	

}
