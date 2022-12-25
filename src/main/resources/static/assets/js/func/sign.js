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
			if(callback.data.role.toUpperCase() !== 'ROLE_ADMIN') {
				alert('관리자 계정만 로그인할 수 있습니다.');
			} else {
				setCookie("role", callback.data.role.toUpperCase(), 1);
				setCookie("name", callback.data.name, 1);
				setCookie("id", callback.data.id, 1);
				setCookie("profile", callback.data.profile.toLowerCase(), 1);
				setCookie("memberSeq", callback.data.memberSeq, 1);
				location.href = '/post/notice?boardSeq=1';
			}
			
    	}  
  	);
};

const signOut = () => {
	if(confirm("로그아웃 하시겠습니까?")){
		deleteCookie("role");
		deleteCookie("name");
		deleteCookie("id");
		deleteCookie("profile");
		deleteCookie("memberSeq");
		location.href = '/';	
	}
};