let boardSeq = location.search.split("?")[1].split("=")[1];

const getPosts = () => {
	
	
	  callXhr(
    	document.getElementById('api-path').value.concat('/post/list').concat("?page=0&size=20"), 
    	'POST', 
    	{ 
			boardFk 	: boardSeq 
			, page		: 0
			, size		: 20	
		}, 
    	(callback) => {
			console.log(callback);
    	}  
  	);
};

document.addEventListener('DOMContentLoaded', () => {
	getPosts();
});