package www.olive.mvc.member.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;

public class AuthCheckInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {
		//System.out.println("인터셉터>>>>>>" + request.getRequestURI());
		HttpSession session = request.getSession(false);
		if (session != null) {
			Object authInfo = session.getAttribute("info");
			//System.out.println("세션에붙었니?" + authInfo);
			if (authInfo != null) {
				//System.out.println("인터셉터 통과했다");
				return true;
			}
		}
		session.setAttribute("togo", request.getRequestURI());
		response.sendRedirect(request.getContextPath() + "/member/loginForm");
		return false;
	}
	
	

}
