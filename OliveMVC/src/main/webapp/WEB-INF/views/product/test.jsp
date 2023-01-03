<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
	<h1>최근검색어 test.jsp</h1>
	
	<div class="wrapper">
        <form id="todo-form" class="form">
            <input required maxlength="10" type="text" placeholder="SEARCH">
        </form>
        <button type="submit" form="todo-form">제출하기</button>
        
        <!-- 로컬스토리지에 저장된 최근검색어가 보여지는 div -->
        <div class="todo-inner">
            <div class="allDelete off">
                <h2 class="tit">최근 검색어</h2>
                <span class="btn">모두 지우기 ❌</span>
            </div>
        <!-- 로컬스토리지에 저장된 최근검색어가 보여지는 div -->
            
            
            <p class="txt"></p>
            <ul id="todo-list"></ul>
        </div>
    </div>
    
    
    
    <script type="text/javascript">
    const toDoForm = document.querySelector('#todo-form');
    const toDoInput = toDoForm.querySelector('input');
    const toDoList = document.querySelector('#todo-list');
    const allDelete = document.querySelector('.allDelete');
    const txt = document.querySelector('.txt');
    const TODOS_KEY = "todos";

    let toDos = new Array();

    function saveToDos() { //item을 localStorage에 저장합니다.
        typeof(Storage) !== 'undefined' && localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    };

    function allDeleteToDo() { //전체 item을 삭제
        localStorage.clear(toDos);
        toDoList.innerText = '최근검색어 내역이 없습니다.';
    };

    function deleteToDo(e) { //각각의 item을 삭제
        const li = e.target.parentElement;
        li.remove();
        toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
        toDos.length === 0 && (txt.innerText = '최근검색어 내역이 없습니다.')
        saveToDos();
    };

    function paintToDo(newTodo) { //화면에 뿌림
        const {id, text} = newTodo;
        const item = document.createElement("li");
        const span = document.createElement("span");
        const button = document.createElement("button");
        item.id = id;
        span.innerText = text;
        button.innerText = '❌';
        button.addEventListener("click", deleteToDo);
        allDelete.addEventListener("click", allDeleteToDo);
        item.appendChild(span);
        item.appendChild(button);
        toDoList.appendChild(item);
        newTodo !== null && allDelete.classList.remove('off');
    };

    function handleToDoSubmit(event) { //form 전송
        event.preventDefault();
        const newTodoItem = toDoInput.value;
        toDoInput.value = '';
        const newTodoObj = {
            id: Date.now(),
            text: newTodoItem
        };
        toDos.push(newTodoObj);
        paintToDo(newTodoObj);
        saveToDos();
    };

    toDoForm.addEventListener('submit', handleToDoSubmit);

    const savedToDos = JSON.parse(localStorage.getItem(TODOS_KEY));
    if(savedToDos !== null) {
        toDos = savedToDos //전에 있던 items들을 계속 가지도 있다록 합니다. 
        savedToDos.forEach(paintToDo);
    }
    
    
    </script>
</body>
</html>