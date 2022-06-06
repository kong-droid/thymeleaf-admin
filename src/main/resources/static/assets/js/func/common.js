/*
* 	Created By KMH
*	2022-06-05
*/

// '' or null ==> return
const isValid = (tagName, comment) => {
	if(document.getElementById(tagName).value === '' || document.getElementById(tagName).value === null) {
		alert(comment);
		return;	
	}
}