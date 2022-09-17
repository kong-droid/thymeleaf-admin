const loadEditor = () => {
	const Editor = toastui.Editor;
	const editor = new Editor({
		el: document.querySelector('#content'),
		height: '500px',
		previewStyle: 'tab',
		initialEditType: 'wysiwyg',
		hooks : {
			addImageBlobHook : (blob, callbackImage) => {
				imageUploads(blob, callbackImage);
			}
		}		
	});
};

// 이미지를 업로드 후 이미지를 파일 에디터에 넣어준다.
const imageUploads = (blob, callbackImage) => {
	const formData = new FormData();
	formData.append('tbName', 'attach');
	formData.append('tbSeq', '99999');
	formData.append('tbType', 'imageEditor');
	formData.append('memberSeq', sessionStorage.getItem('memberSeq'));
	formData.append('files', blob);
	callFileXhr(
		document.getElementById('api-path').value.concat(`/attach`)
		, 'POST'
		, formData
		, (callback) => {
			//callbackImage(callback.attached[0].fullPath);
			callbackImage('https://www.newsquest.co.kr/news/photo/202205/96478_80014_5020.jpeg');
		}
	);
};

