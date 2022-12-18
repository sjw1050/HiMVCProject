
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
	crossorigin="anonymous">
</head>
<body>

	<!-- Button trigger modal -->
	<button type="button" class="btn btn-primary" data-bs-toggle="modal"
		data-bs-target="#exampleModal">회원가입</button>

	<!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="exampleModalLabel">회원가입</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">

					<c:if test="${!empty err }">
						<script>
							alert("${err}");
						</script>
					</c:if>
					<form action="${pageContext.request.contextPath}/member/regist"
						method="post">
						<table>
							<tr>
								<th>아이디:</th>
								<td><input type="text" name="memberId" value="${id }" /></td>
							</tr>
							<tr>
								<th>비밀번호:</th>
								<td><input type="password" name="pw" /></td>
							</tr>
							<tr>
								<th>이름:</th>
								<td><input type="text" name="memberName" /></td>
							</tr>
							<tr>
								<th>이메일:</th>
								<td><input type="text" name="email" /></td>
							</tr>
							<tr>
								<th>전화번호:</th>
								<td><input type="text" name="phone" /></td>
							</tr>
							<tr>
								<th>성별:</th>
								<td><input type="radio" name="gender" value="f" />여성 <input
									type="radio" name="gender" value="m" />남성</td>
							</tr>
							<tr>
								<th>생년월일:<th>
								<td><input type="date" name="birthday"></input></td>
							</tr>
							<tr>
								<th>주소:</th>
								<td><input type="text" name="address" /></td>
							</tr>
							
						</table>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-secondary"
						data-bs-dismiss="modal">가입하기</button>
				</div>
			</div>
		</div>
	</div>
	</form>

	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
		crossorigin="anonymous"></script>
</body>
</html>