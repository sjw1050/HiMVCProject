package www.olive.mvc.myPage.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class OrderDetailsLIst {
	
	private List<OrderDetails> odList;
	
	public void poList() {
		odList = new ArrayList<OrderDetails>();
		
	}

}
