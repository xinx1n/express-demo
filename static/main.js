$(function(){
	$('#button').click(function() {
		if(!$('#file-input').val()){
			alert('请选择文件');
			return;
		}
		if($('#file-input')[0].files[0].size > 1048576){
			alert('文件不能大于1M');
			return;
		}
		$.ajax({
		    url: '/upload',
		    type: 'POST',
		    cache: false,
		    data: new FormData($('#upload-form')[0]),
		    processData: false,
		    contentType: false
		}).done(function(res) {
			var result = jQuery.parseJSON(res);
			if(result.success){
				$('#upload-result').html('下载：<a href="/download/'+result.filename +'">'+result.filename+'</a>')
				$('#file-input').val('')
			}else{
				alert('上传失败');
			}
		}).fail(function(res) {
			alert('上传失败');
		});
	});

	var fileInput = document.getElementById('file-input'), 
		info = document.getElementById('file-info');
	fileInput.addEventListener('change', function () {
	    if (!fileInput.value) {
	        info.innerHTML = '没有选择文件';
	        return;
	    }
	    var file = fileInput.files[0];
	    info.innerHTML = '文件: ' + file.name + '<br>' +
	                     '大小: ' + file.size + '<br>' +
	                     '修改: ' + file.lastModifiedDate;
	});
});

