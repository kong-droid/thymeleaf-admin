const signIn = () => {
	
 	let id = document.getElementById('sign-in-id');
 	let password = document.getElementById('sign-in-password');
	
	if (isEmpty(id.value)) {
		onFocus(id, '아이디를 입력하세요.');
		return;
	}
	
	if(checkEmail(id.value)) {
		onFocus(id, '아이디는 이메일 형식이어야 합니다.');
		return;
	}
	
	if (isEmpty(password.value)) {
		onFocus(password, '이메일을 입력하세요.');
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
					handleUserCookie(callback.data.role, callback.data.memberSeq);
					location.href = '/post/1';
				}
			} else {
				alert('아이디 혹은 비밀번호가 틀렸습니다.');
			}
    	}  
  	);
};

const signOut = () => {
	if(confirm('로그아웃 하시겠습니까?')){
		deleteCookie('role');
		deleteCookie('memberSeq');
		location.href = '/';	
	}
};

const handleUserInfo = (isAdd) => {
 	let name = document.getElementById('name');
 	let email = document.getElementById('email');
 	let password = document.getElementById('password');
 	let mobile = document.getElementById('mobile');
 	let profile = document.getElementById('profile').files;
 	
	if (isEmpty(name.value)) {
		onFocus(name, '이름을 입력하세요.');
		return;
	}
	
	if (isEmpty(email.value)) {
		onFocus(email, '이메일을 입력하세요.');
		return;
	}
	 	
	if (isEmpty(mobile.value)) {
		onFocus(mobile, '전화번호를 입력하세요.');
		return;
	}
	
	if(isAdd) {
		if (isEmpty(password.value)) {
			onFocus(password, '패스워드를 입력하세요.');
			return;
		} 	
		
		if(checkPassword(password.value)) {
			onFocus(password, '패스워드 형식이 올바르지 않습니다.');
			return;
		}
	}
		 	
	if(checkEmail(email.value)) {
		onFocus(email, '이메일 형식이 올바르지 않습니다.');
		return;
	}
	 	 		 	
	if(checkPhoneNum(mobile.value)) {
		onFocus(mobile, '전화번호 형식이 올바르지 않습니다.');
		return;
	}
		 		
	let callParam = {
		id			: isAdd ? email.value : null
    	, password	: password.value
    	, name		: name.value
    	, role		: isAdd ? 'role_admin'.toUpperCase() : null
    	, email		: email.value
    	, phone		: mobile.value
    	, handle	: {
			memberSeq : isAdd ? null : getCookie('memberSeq')
		}
	}; 		
		 		
  	callXhr(
    	document.getElementById('api-path').value.concat(isAdd ? '/member/a' : '/member/m') 
    	, 'POST'
    	, callParam
    	, (callback) => {
			if(profile.length > 0) {
				commonFileUpload(
					'tb_member'
					, callback.data.memberSeq
					, 'profileImage'
					, callback.data.memberSeq
					, profile[0]
					, (func) => {
					  	callXhr(
					    	document.getElementById('api-path').value.concat('/member/m') 
					    	, 'POST' 
					    	, {
								handle : { memberSeq : callback.data.memberSeq } 
					    		, profile : func.data.attached[0].fullPath
					    	}
					    	, () => {
								handleUserHref(isAdd);
							}  
					  	);
					}
				);				
			} else {
				handleUserHref(isAdd);
			}
    	}  
	);	
};

const withdrawal = () => {
	let callParam = {
		handle : {
			memberSeq : getCookie('memberSeq')
		}
	};
	
	if(confirm('정말 탈퇴하시겠습니까?')) {
		callXhr(
			document.getElementById('api-path').value.concat('/member/d-l')
			, 'POST' 
			, callParam
			, () => {
				alert('탈퇴 되었습니다.');
				location.href = '/';
			}  
		);
	}
};

const getUserInfo = () => {
	let callParam = {
		search : {
			memberSeq : getCookie('memberSeq')
			, delYn : 'N'
		}
	};
	
	callXhr(
		document.getElementById('api-path').value.concat(`/member/r/${getCookie('memberSeq')}`)
		, 'GET' 
		, callParam
		, (callback) => {
			document.getElementById('name').value = callback.data.name;
			document.getElementById('email').value = callback.data.email;
			document.getElementById('mobile').value = callback.data.phone;
			let userImage = document.getElementById('profile-image');
			if(callback.data.profile !== undefined) {
				userImage.innerHTML =
				`<img src="${callback.data.profile}" alt="profile_image" class="w-100 border-radius-lg shadow-sm"/>`;
			} else {
				userImage.innerHTML =
				`<img src="/assets/img/icons/user-icon.png" alt="not_found_profile_image" class="w-100 border-radius-lg shadow-sm"/>`;
			
			}
		}  
	);
}

const handleUserHref = (isAdd) => {
	if(isAdd) {
		alert('회원가입 되었습니다.');
		location.href = '/';
	} else {
		alert('정보가 수정되었습니다.');
		location.reload();
	}
};

const handleUserCookie = (role, memberSeq) => {
	if(memberSeq !== null) {
		setCookie('memberSeq', memberSeq, 1);
	}
	
	if(role !== null) {
		setCookie('role', role.toUpperCase(), 1);
	}	
};
