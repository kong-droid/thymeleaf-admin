let boardSeq = location.search.split("?")[1].split("=")[1];

const getPosts = (currentPage) => {
	
	let pageInfo = {
		currentPage	: currentPage === undefined || currentPage === -1 ? 0 : currentPage,
		pageSize	: 5
	}
			
	document.querySelector("#posts").innerHTML = "";
			
	callXhr(
		document.getElementById('api-path').value.concat('/post/list').concat(`?page=${pageInfo.currentPage}&size=${pageInfo.pageSize}`)
		, 'POST' 
    	, { boardFk : boardSeq }
    	, (callback) => {
			if(callback.totalCount > 0 ) {
				callback.posts.forEach(item => {
					document.getElementById('posts').innerHTML += 
						`<tr>
							<td class="align-middle text-center">${item.postSeq}</td>
							<td class="align-middle text-center">${item.title}</td>
							<td class="align-middle text-center">${item.startDt.split('T')[0]} ~ ${item.endDt.split('T')[0]}</td>
							<td class="align-middle text-center">${item.createdDt.split('T')[0]}</td>
							<td class="align-middle text-center">${item.createdNo}</td>
							<td class="align-middle text-center" style="padding-top:1%;">
								<a href="javascript:void(0)" class="btn btn-success btn-sm">Update</a>
								<a href="javascript:void(0)" class="btn btn-danger btn-sm">Delete</a>
							<td>
						</tr>`;
				});
			} else {
				document.getElementById('posts').innerHTML += `<tr><td col="6">데이터가 없습니다.</td></tr>`;
			}

			// 페이지네이션 함수
			getPageNation(callback.totalCount, pageInfo.currentPage, pageInfo.pageSize, "getPosts");
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

document.addEventListener('DOMContentLoaded', () => {
	getBoardTitle();
	getPosts();
});