/*
* 	Created By KMH
*	2022-06-05
*/

/**
 * 페이징 처리
 * @param totalCount 	리스트 총계
 * @param currentPage 	페이지 번호
 * @param pageSize		페이지 사이즈
 * @param func			함수명
 */
const getPageNation = (totalCount, currentPage, pageSize, func) => {
    const pageUnit = 5;
  	let pageHtml = "";
    
  	// 페이지네이션
  	if(totalCount > 0) {
        const startPage = Math.floor(currentPage/pageUnit)*pageUnit;
        const totalPage = Math.ceil(parseInt(totalCount) / parseInt(pageSize));
        
        pageHtml +=  "<a href='#' id='" + 0 + "' class='btn btn-primary' onclick='" + func + "(0)'> << </a>";
        
        for(var i=startPage; i<(totalPage > startPage+pageUnit ? startPage+pageUnit : totalPage); i++) {
        	if(currentPage === i) {
        		pageHtml +=  "<a href='#' id='" + i + "' class='btn btn-primary' onclick='" + func + "(" + i + ")'>" + (i+1) +"</a>";
        	} else {
        		pageHtml +=  "<a href='#' id='" + i + "' class='btn btn-primary' onclick='" + func + "(" + i + ")'>" + (i+1) +"</a>";
        	}
        }
        
        pageHtml +=  "<a href='#' id='" + (totalPage-1) + "' class='btn btn-primary' onclick='" + func + "(" + (totalPage-1) + ")'> >> </a>";
        document.querySelector("#paging").innerHTML = pageHtml;
        
    }
};

/**
 * 쿠키값 추출
 * @param cookieName
 * @returns
 */
const getCookie = (cookieName) => {
	let cookie = document.cookie;
	// 현재 쿠키가 존재할 경우
	if(cookie.length > 0) {
		// 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
		startIndex = cookie.indexOf(cookieName);
		// 만약 존재한다면
		if(startIndex != -1) {
			// 값을 얻어내기 위해 시작 인덱스 조절
			startIndex += cookieName.length;
			// 값을 얻어내기 위해 종료 인덱스 추출
			endIndex = cookie.indexOf(";", startIndex);
			// 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
			if( endIndex == -1) endIndex = cookie.length;
			// 쿠키값을 추출하여 리턴
			return unescape(cookie.substring(startIndex + 1, endIndex));
		} else {
			// 쿠키 내에 해당 쿠키가 존재하지 않을 경우
			return '';
		}
	} else {
		// 쿠키 자체가 없을 경우
		return '';
	}
};

/**
* 쿠키 설정
* @param cookieName 쿠키명
* @param cookieValue 쿠키값
* @param expireDay 쿠키 유효날짜
*/
const setCookie = (cookieName, cookieValue, expireDate) => {
	let today = new Date();
	today.setDate(today.getDate() + parseInt(expireDate));
	document.cookie = cookieName + "=" + escape( cookieValue ) + "; path=/; expires=" + today.toGMTString() + ";"
};

/**
 * @param cookieName 쿠키명
 */
const deleteCookie = (cookieName) => {
	let expireDate = new Date();
	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
};


const isEmpty = (value) => {

	const values = Object.values(value);

	for (const item of values) {
		if (checkSpace(item)) {
			return true;
		}
		if (item === '' || item !== null && item.length === 0) return true;
		if (item === null) return true;
	}

	if (value === null) {
		return true;
	}
	
	if (value.length) {
		return value.length === 0;
	}
	
	if (value.trim().length) {
		return value.trim().length === 0;
	}

	 if (checkSpace(value)) {
	 	return true;
	 }

  return Object.keys(value).length === 0;
};

const hasAnyValue = (v) => {
	const values = Object.values(v);
	let answer = false;
	for (const item of values) {
		if (item !== '' &&  item.length !== 0) answer = true;
	}
	return answer;
}

const checkSpace = (str) => {
	const pattern = /\s{2,}/g;
	return pattern.test(str);
};

const onFocus = (element, comment) => {
	alert(comment);
	element.focus();
};

const checkPhoneNum = (str) => {
	const pattern = /^\d{3}-\d{3,4}-\d{4}$/;
	return !pattern.test(str);
};

const checkEmail = (str) => {
	const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
	return !pattern.test(str);
};

const checkPassword = (str) => {
	const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
	return !pattern.test(str);
};

const commonFileUpload = (tbName, tbSeq, tbType, memberSeq, files, func) => {
	const formData = new FormData();
	formData.append("tbName", tbName);
	formData.append("tbSeq", tbSeq);
	formData.append("tbType", tbType);
	formData.append("memberSeq", memberSeq);
	formData.append("files", files);
	callFileXhr(
		document.getElementById("api-path").value.concat("/attach/a")
		, "POST"
		, formData
		, (callback) => {
			func(callback);
		}
	);
};

const downloadFile = ( fileName, attachSeq ) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', document.getElementById("api-path").value.concat(`/attach/r/${attachSeq}`));
    xhr.send();    
    xhr.responseType = 'blob';
    xhr.onload = () => {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = fileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        delete a;
    };
    xhr.onerror = (e) => {
		console.error(e);
	};   
};

const removeFile = ( attachSeq ) => {
	if(confirm('파일을 삭제하시겠습니까?')) {
	  	callXhr(
	    	document.getElementById('api-path').value.concat(`/attach/d-p/${attachSeq}`), 
	    	'POST',  
	    	null, 
	    	(callback) => {
				alert('삭제되었습니다.');
				document.getElementById("remove-file-" + attachSeq).remove();
			}  
	  	);   
	};
};