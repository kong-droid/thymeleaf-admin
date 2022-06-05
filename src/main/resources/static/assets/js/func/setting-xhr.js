//API call함수 (글로벌)
const getQuery = (params) => {
	return queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
};

const callXhr = (url, method, params, callback) => {
    const xhr  = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");
    xhr.send(params !== null && JSON.stringify(params));
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
		switch (xhr.status) {
			case 200:
			case 201:
				if(callback) {
					callback(JSON.parse(xhr.response));
				}
			break;
			case 400:
				alert("잘못된 파라미터입니다. \n재전송하세요.");
			break;
			case 404:
				alert("정보가 없습니다.");
			break;
			case 500:
				alert("에러가 발생했습니다. \n개발자에게 문의하세요.");
			break;
		}

      }
    };
};