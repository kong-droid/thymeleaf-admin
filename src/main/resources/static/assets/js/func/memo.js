const handleMemo = () => {
 	let memo = document.getElementById('memo');
 	
	if (isEmpty(memo.value)) {
		onFocus(memo, '메모를 입력하세요.');
		return;
	}
		 		
	let callParam = {
		memoDt : getToday()
		, handle : {
			content	: memo.value
			, memberSeq : getCookie('memberSeq')
		}
	}; 		
		 		
  	callXhr(
    	document.getElementById('api-path').value.concat('/memo/a') 
    	, 'POST'
    	, callParam
    	, (callback) => {
			let memos = document.getElementById('memos');
			memos.innerHTML +=
			`<div id='remove-memo-'${callback.data.memoSeq} class="alert alert-primary alert-dismissible text-white" role="alert">
				<span class="text-sm">${callParam.handle.content}</span>
				<button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert" aria-label="Close" onclick="removeMemo(${callback.data.memoSeq})">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>`;
			
			memo.value = '';
    	}  
	);	
};

const removeMemo = (memoSeq) => {
	  callXhr(
    	document.getElementById('api-path').value.concat(`/memo/d/${memoSeq}`) 
    	, 'POST'
    	, {memoSeq : memoSeq}
    	, (callback) => {
			document.getElementById('remove-memo-' + memoSeq).remove();
    	}  
	);	
};

const getMemos= () => {
	let callParam = {
		search : {
			memberSeq : getCookie('memberSeq')
		}
	};
	
	callXhr(
		document.getElementById('api-path').value.concat('/memo/r')
		, 'POST' 
		, callParam
		, (callback) => {
			let memos = document.getElementById('memos');
			if(callback.data.memos.length > 0) {
				callback.data.memos.forEach(memo => {
					memos.innerHTML +=
					`<div id='remove-memo-'${memo.memoSeq} class="alert alert-primary alert-dismissible text-white" role="alert">
						<span class="text-sm">${memo.content}</span>
						<button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert" aria-label="Close" onclick="removeMemo(${memo.memoSeq})">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>`;
				});
			}
		}  
	);
}

