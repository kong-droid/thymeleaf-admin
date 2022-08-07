/*
* 	Created By KMH
*	2022-06-05
*/
// '' or null ==> return
const isValid = (tagName, comment) => {
	if(document.getElementById(tagName).value === '') {
		alert(comment);
		return;	
	}
}

/**
 * 페이징 처리
 * totalCount 	: 리스트 총계
 * currentPage 	: 페이지 번호
 * pageSize		: 페이지 사이즈
 * func			: 함수명
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
