const signIn = () => {
	
 	let id = document.getElementById('sign-in-id');
 	let password = document.getElementById('sign-in-password');
	
	if (isEmpty(id.value)) {
		onFocus(id, "아이디를 입력하세요.");
		return;
	}
	
	if(checkEmail(id.value)) {
		onFocus(id, "아이디는 이메일 형식이어야 합니다.");
		return;
	}
	
	if (isEmpty(password.value)) {
		onFocus(password, "이메일을 입력하세요.");
		return;
	}
	
	
  	callXhr(
    	document.getElementById('api-path').value.concat('/auth/authentication'), 
    	'POST', 
    	{
			id			:	id.value
    		, password	:	password.value
    	},
    	(callback) => {
			if(callback.data !== null) {
				if(callback.data.role.toUpperCase() !== 'ROLE_ADMIN') {
					alert('관리자 계정만 로그인할 수 있습니다.');
				} else {
					setCookie("role", callback.data.role.toUpperCase(), 1);
					setCookie("name", escape(callback.data.name), 1);
					setCookie("id", callback.data.id, 1);
					setCookie("memberSeq", callback.data.memberSeq, 1);
					if(callback.data.profile !== null) {
						setCookie("profile", escape(callback.data.profile.toLowerCase()), 1);
					}
					
					location.href = '/post/1';
				}
			} else {
				alert("아이디 혹은 비밀번호가 틀렸습니다.");
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

const signUp = () => {
 	let name = document.getElementById('name');
 	let email = document.getElementById('email');
 	let password = document.getElementById('password');
 	let mobile = document.getElementById('mobile');
 	let profile = document.getElementById('profile').files;
 	
	if (isEmpty(name.value)) {
		onFocus(name, "이름을 입력하세요.");
		return;
	}
	
	if (isEmpty(email.value)) {
		onFocus(email, "이메일을 입력하세요.");
		return;
	}
	 	
	if (isEmpty(password.value)) {
		onFocus(password, "패스워드를 입력하세요.");
		return;
	} 	
	 	
	if (isEmpty(mobile.value)) {
		onFocus(mobile, "전화번호를 입력하세요.");
		return;
	}
		 	
	if(checkEmail(email.value)) {
		onFocus(email, "이메일 형식이 올바르지 않습니다.");
		return;
	}
	 	
	if(checkPassword(password.value)) {
		onFocus(password, "패스워드 형식이 올바르지 않습니다.");
		return;
	}
		 		 	
	if(checkPhoneNum(mobile.value)) {
		onFocus(mobile, "전화번호 형식이 올바르지 않습니다.");
		return;
	}
		 		
  	callXhr(
    	document.getElementById('api-path').value.concat('/member/a'), 
    	'POST', 
    	{
			id			: email.value
    		, password	: password.value
    		, name		: name.value
    		, role		: "role_admin".toUpperCase()
    		, email		: email.value
    		, phone		: mobile.value
    	},
    	(callback) => {
			if(profile !== null || profile !== undefined) {
				commonFileUpload(
					"tb_member"
					, callback.data.memberSeq
					, "profileImage"
					, callback.data.memberSeq
					, profile[0]
					, (func) => {
					  	callXhr(
					    	document.getElementById('api-path').value.concat('/member/m'), 
					    	'POST', 
					    	{
								handle : { memberSeq : callback.data.memberSeq } 
					    		, profile : func.data.attached[0].fullPath
					    	},
					    	() => {
								alert("회원가입 되었습니다.");
								location.href = "/";
							}  
					  	);
					}
				);				
			} else {
				alert("회원가입 되었습니다.");
				location.href = "/";
			}
    	}  
	);	
};


