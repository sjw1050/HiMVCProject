package www.olive.mvc.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberGrade {
	
	private int level;
	private int low;
	private int high;

}
