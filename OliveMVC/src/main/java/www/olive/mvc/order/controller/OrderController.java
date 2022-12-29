package www.olive.mvc.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/order/**")
public class OrderController {

	@GetMapping("/viewOrderList")
	public String viewOrder() {
		
		System.out.println(">>>>>>>>>>>>주문목록 왔다<<<<<<<<<<<<<<<");
		
		
		return "/order/viewOrderList";
	}
}
