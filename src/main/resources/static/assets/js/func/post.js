// READ
const getPosts = (currentPage) => {
	
	let pageInfo = {
		currentPage	: currentPage === undefined || currentPage === -1 ? 0 : currentPage,
		pageSize	: 5
	}
			
	document.querySelector("#posts").innerHTML = "";
			
	callXhr(
		document.getElementById('api-path').value.concat('/post/r')
		, 'POST' 
    	, { search : { page : pageInfo.currentPage, size : pageInfo.pageSize, delYn : 'N' }, boardSeq : boardSeq }
    	, (callback) => {
			if(callback.data.totalCount > 0 ) {
				callback.data.posts.forEach((item, index) => {
					document.getElementById('posts').innerHTML += 
						`<tr>
							<td class="align-middle text-center">${index + 1}</td>
							<td class="align-middle text-center">${item.postSeq}</td>
							<td class="align-middle text-center">${item.title}</td>
							<td class="align-middle text-center">${item.periodStartDt !== null ? item.periodStartDt.split("T")[0] : "미지정" } ~ ${ item.periodEndDt !== null ? item.periodEndDt.split("T")[0] : "미지정"}</td>
							<td class="align-middle text-center">${item.createdDt !== null && item.createdDt.split("T")[0]}</td>
							<td class="align-middle text-center">${item.memberinfo.name}</td>
							<td class="align-middle text-center" style="padding-top:1%;">
								<a href="javascript:void(0)" class="btn btn-success btn-sm" id="board-update-btn" onclick="movePage(${item.postSeq})">Update</a>
								<a href="javascript:void(0)" class="btn btn-danger btn-sm" id="board-delete-btn" onclick="deletePost(${item.postSeq})">Delete</a>
							<td>
						</tr>`;
				});
			} else {
				document.getElementById('posts').innerHTML += `<tr><td col="6">데이터가 없습니다.</td></tr>`;
			}

			// 페이지네이션 함수
			getPageNation(callback.data.totalCount, pageInfo.currentPage, pageInfo.pageSize, "getPosts");
		}
  	  );
};

const getBoardTitle = () => {
	switch (boardSeq) {
		case "1":
			document.getElementById('board-title').innerHTML = `Notice`;
		break;
		case "2":
			document.getElementById('board-title').innerHTML = 'Event';
		break;
		case "3":
			document.getElementById('board-title').innerHTML = 'FAQ';
		break;
	}
};


// MOVE
const movePage = ( postSeq ) => {
	location.href = postSeq === undefined ? '/post/handle' : `/post/handle/${postSeq}`;
};

// DELETE
const deletePost = ( postSeq ) => {
	let postId = postSeq === null ? document.getElementById('post-seq').value : postSeq;
	callXhr(
		document.getElementById('api-path').value.concat(`/post/d-l`)
		, 'POST' 
    	, { 
			postSeq : postId
			, handle : { 
				memberSeq : getCookie('memberSeq') 
			}
		}
    	, (callback) => {
			alert('Invalid Error.');
			if(postSeq !== null) {
				location.reload();	
			} else {
				history.back(-1);
			}
		}
	);
};

// Read Post
const getPost = () => {
	callXhr(
		document.getElementById('api-path').value.concat(`/post/r/${postSeq}`)
		, 'GET' 
    	, null
    	, (callback) => {
			let viewData = callback.data;
			document.getElementById('title').value = viewData.title;
			document.getElementsByClassName('ProseMirror toastui-editor-contents')[0].innerHTML = viewData.content;
			document.getElementById('period-start-dt').value = viewData.periodStartDt;
			document.getElementById('period-end-dt').value = viewData.periodEndDt;
			if(viewData.noticeYn.toUpperCase() === 'Y') {
				document.getElementById('notice-yn').checked = true;
			}
			if(viewData.secretYn.toUpperCase() === 'Y') {
				document.getElementById('secret-yn').checked = true;
			}
			if(viewData.useYn.toUpperCase() === 'Y') {
				document.getElementById('use-yn').checked = true;
			}
		}
	);	
	document.getElementById('delete-post').style.display = 'inline';
};

// Add & Modify
const handlePost = () => {
	let title = document.getElementById('title').value;
	let content = document.getElementsByClassName('ProseMirror toastui-editor-contents')[0].innerText;
	let periodStartDt = document.getElementById('period-start-dt').value;
	let periodEndDt = document.getElementById('period-end-dt').value;
	let noticeYn = document.getElementById('notice-yn').checked === true ? 'Y' : 'N';
	let secretYn = document.getElementById('secret-yn').checked === true ? 'Y' : 'N';
	let useYn = document.getElementById('use-yn').checked === true ? 'Y' : 'N';
	
	let callParam = {
		
	}
	
};