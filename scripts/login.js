var formSerialize = require('form-serialize');
var axios = require('axios');
var modal = require('./ui/modal');
console.log("未添加热更新")
var $form = document.querySelector('[name=loginForm]');
console.log(11123456)
$form.addEventListener('submit', (e) => {
	e.preventDefault();
	let data = formSerialize($form, {
		hash: true
	});

	axios.post('/login', data).then((data) => {
		if(data.status === 200 && data.data.status === 0){
			location.href = '/';
			console.log('登录成功');
			modal.show({
				content: '登录成功'
			});
		}else{
			modal.show({
				content: '登录失败'
			});
			console.log('登录失败');
		}
	});

	console.log('form submit', data);

});

[1, 2, 3].map((n) => n + 1);
