//API call함수 (글로벌)
const getQuery = (params) => {
	return queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
};

const callXhr = (url, method, params, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
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
				case 500:
					alert('에러가 발생했습니다.\n관리자에게 문의하세요.');
				break;
				default:
					alert(`${xhr.status}`);
				break;
			}
      	}
    };
};

const callFileXhr = (url, method, params, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send(params !== null && params);
    xhr.onreadystatechange = () => {
		if(xhr.readyState === 4) {
			switch (xhr.status) {
				case 200:
				case 201:
					if(callback) {
						callback(JSON.parse(xhr.response));
					}
				break;
				case 500:
					alert('에러가 발생했습니다.\n관리자에게 문의하세요.');
				break;
				default:
					alert(`${xhr.status}`);
				break;
			}
      	}
    };
};