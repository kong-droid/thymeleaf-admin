let editor;
 
const loadEditor = () => {
	const Editor = toastui.Editor;
	editor = new Editor({
		el: document.getElementById('content'),
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
	formData.append('tbSeq', '0');
	formData.append('tbType', 'imageEditor');
	formData.append('memberSeq', getCookie('memberSeq'));
	formData.append('files', blob);
	callFileXhr(
		document.getElementById('api-path').value.concat(`/attach/a`)
		, 'POST'
		, formData
		, (callback) => {
			callbackImage(document.getElementById('api-path').value + callback.data.attached[0].fullPath);
		}
	);
};

