package www.olive.mvc.util;


import org.springframework.data.jpa.repository.JpaRepository;

import www.olive.mvc.member.dto.Member;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {

}
