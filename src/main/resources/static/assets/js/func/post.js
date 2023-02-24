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
							<td class="align-middle text-center">${item.periodStartDt !== undefined && item.periodStartDt !== null ? item.periodStartDt.split("T")[0] : "미지정" } ~ ${ item.periodEndDt !== undefined && item.periodEndDt !== null ? item.periodEndDt.split("T")[0] : "미지정"}</td>
							<td class="align-middle text-center">${item.createdDt !== undefined && item.createdDt.split("T")[0]}</td>
							<td class="align-middle text-center">${item.memberinfo !== null ? item.memberinfo.name : 'unknown'}</td>
							<td class="align-middle text-center" style="padding-top:1%;">
								<button class="btn btn-success btn-sm" id="board-update-btn" onclick="movePage(${item.postSeq})">Update</button>
								<button class="btn btn-danger btn-sm" id="board-delete-btn" onclick="deletePost(${item.postSeq}, null)">Delete</button>
							</td>
						</tr>`;
				});
			} else {
				document.getElementById('posts').innerHTML += '<tr><td col="6">데이터가 없습니다.</td></tr>';
			}

			// 페이지네이션 함수
			getPageNation(callback.data.totalCount, pageInfo.currentPage, pageInfo.pageSize, 'getPosts');
		}
  	  );
};

const getBoardTitle = () => {
	let boardTitle = document.getElementById('board-title');
	switch (boardSeq) {
		case "1":
			boardTitle.innerHTML = 'Notice';
		break;
		case "2":
			boardTitle.innerHTML = 'Event';
		break;
		case "3":
			boardTitle.innerHTML = 'FAQ';
		break;
	}
};


// MOVE
const movePage = ( postSeq ) => {
	location.href = postSeq === undefined ? `/post/handle/${boardSeq}` : `/post/handle/${boardSeq}/${postSeq}`;
};

// DELETE
const deletePost = ( postSeq, boardSeq ) => {
	let postId = postSeq === null ? document.getElementById('post-seq').value : postSeq;
	callXhr(
		document.getElementById('api-path').value.concat('/post/d-l')
		, 'POST' 
    	, { 
			postSeq : postId
			, handle : { 
				memberSeq : getCookie('memberSeq') 
			}
		}
    	, (callback) => {
			if(boardSeq !== null) {
				location.reload();	
			} else {
				location.href = `/post/${boardSeq};`
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
	
	let callParam = {
		tbName: 'tb_post'
		, tbSeq: postSeq
		, tbType: 'post_attachment'
	};
	
	callXhr(
		document.getElementById('api-path').value.concat('/attach/r')
		, 'POST' 
    	, callParam
    	, (callback) => {
			if(callback.data.attaches.length > 0) {
				callback.data.attaches.forEach(item => {
					document.getElementById('post-files').innerHTML +=
					`<div id=${"remove-file-" + item.attachSeq }>
						<label style="cursor: pointer;" onclick="downloadFile('${item.realName}', '${item.attachSeq}');">${item.realName}&emsp;</label>
						<i class="fa fa-trash text-danger" onclick="removeFile('${item.attachSeq}');"></i>
					</div>`; 
				});					
			};
		}
	);	
		
	document.getElementById('delete-post').style.display = 'inline';
};

// Add & Modify
const handlePost = () => {
	let postSeq = document.getElementById('post-seq').value;
	let boardSeq = document.getElementById('board-seq').value;
	let title = document.getElementById('title');
	let content = document.getElementsByClassName('ProseMirror toastui-editor-contents');
	let periodStartDt = document.getElementById('period-start-dt');
	let periodEndDt = document.getElementById('period-end-dt');
	let noticeYn = document.getElementById('notice-yn').checked === true ? 'Y' : 'N';
	let secretYn = document.getElementById('secret-yn').checked === true ? 'Y' : 'N';
	let useYn = document.getElementById('use-yn').checked === true ? 'Y' : 'N';
	let files = document.getElementById('file').files;
	
	if (isEmpty(title.value)) {
		onFocus(title, '게시글 제목을 입력하세요.');
		return;
	}
	
	if (!isEmpty(periodStartDt.value) && !isEmpty(periodEndDt.value)) {
		if(periodStartDt.value >= periodEndDt.value) {
			onFocus(periodStartDt, '게시 시작일은 게시 종료일의 범위 내여야 합니다.');
			return false;
		}
	}
	
	if(editor.getHTML() === "<p><br></p>"){
		alert(content, '게시글을 입력하세요.');
		return;
	}
	
	
	let callParam = {
		postSeq : postSeq
		, boardSeq : boardSeq
		, title : title.value
		, noticeYn : noticeYn
		, secretYn : secretYn
		, handle : {
			content : editor.getHTML()
			, periodStartDt : periodStartDt.value
			, periodEndDt : periodEndDt.value
			, useYn : useYn
			, delYn : 'N'
			, memberSeq : getCookie('memberSeq')
		}
	};
	
	callXhr(
		document.getElementById('api-path').value.concat(postSeq === '' ? '/post/a' : '/post/m')
		, 'POST' 
    	, callParam
    	, (callback) => {
			if(callback.status === 200) {
				if(files.length > 0) {
					commonFileUpload(
						'tb_post'
						, callback.data.postSeq
						, 'post_attachment'
						, getCookie('memberSeq')
						, files[0]
						, (response) => {
							response.data.attached.forEach(item => {
								document.getElementById('post-files').innerHTML +=
								`<div id=${"remove-file-" + item.attachSeq }>
									<label style="cursor: pointer;" onclick="downloadFile('${item.realName}', '${item.attachSeq}');">${item.realName}&emsp;</label>
									<i class="fa fa-trash text-danger" onclick="removeFile('${item.attachSeq}');"></i>
								</div>`; 
							}) 							
						}
					);
				}
				alert('저장되었습니다.');
			}
		}
	);
};