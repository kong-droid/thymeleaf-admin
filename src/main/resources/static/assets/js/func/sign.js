const signIn = () => {
	isValid('sign-in-password', '비밀번호를 입력하세요. ');
	isValid('sign-in-id',		'아이디를 입력하세요. ');
	
  	callXhr(
    	document.getElementById('api-path').value.concat('/auth/authentication'), 
    	'POST', 
    	{
			id			:	document.getElementById('sign-in-id').value
    		, password	:	document.getElementById('sign-in-password').value
    	},
    	(callback) => {
			if(callback.role !== 'ROLE_ADMIN') {
				alert('관리자 계정만 로그인할 수 있습니다.');
			} else {
				sessionStorage.setItem("ROLE", 		callback.role);
				sessionStorage.setItem("memberSeq", callback.memberSeq);
				sessionStorage.setItem("name", 		callback.name);
				sessionStorage.setItem("email", 	callback.email);
				sessionStorage.setItem("profile", 	callback.profile);
				location.href = '/post/notice?boardSeq=1';
			}
			
    	}  
  	);
};

const signOut = () => {
	if(confirm("로그아웃 하시겠습니까?")){
		sessionStorage.clear();
		location.href = '/';	
	}
};