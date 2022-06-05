/*
* 	Created By KMH
*	2022-06-05
*/

// ''이거나 null일 경우 필수값 리턴 함수
const isValid = (tagName, comment) => {
	if(document.getElementById(tagName).value === '' || document.getElementById(tagName).value === null) {
		alert(comment);
		return;	
	}
}