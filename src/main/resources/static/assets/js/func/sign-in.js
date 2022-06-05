const signIn = () => {
	isValid('sign-in-password', '비밀번호를 입력하세요. ');
	isValid('sign-in-id',		'아이디를 입력하세요. ');
	// 부르는 법
  	callXhr(
    	`http://localhost:1000/auth/login`, 
    	'POST', 
    	{
			id			:	document.getElementById('sign-in-id').value
    		, password	:	document.getElementById('sign-in-password').value
    	}, 
    	(callback) => {
			console.log(typeof callback.role);
			if(callback.role !== 'ROLE_ADMIN') {
				alert('관리자 계정만 로그인할 수 있습니다.');
			} else {
				sessionStorage.setItem("ROLE", 		callback.role);
				sessionStorage.setItem("memberSeq", callback.memberSeq);
				location.href = '/home/index';
			}
			
    	}  
  	);
} 