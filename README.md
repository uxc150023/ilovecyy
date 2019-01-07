# xxj

> A Vue.js project

所有全局 方法都用_function 命名

图片裁剪 使用vue-cropper      npm install vue-cropper --save -dev
	用法：
		import Cutimgdialog from '@/components/cutImg/cutimgdialog'
		
		components: {
	        'app-cutimgdialog': Cutimgdialog
	    },

富文本编辑器： vue-quill-editor、quill
	参考地址：url: https://blog.csdn.net/senmage/article/details/82388728
	用法：import Quilleditor from '@/components/quilleditor/quilleditor'
		components: {
	        'app-quilleditor':Quilleditor
	    },


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
