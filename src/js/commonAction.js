/**
 * 全局方法
 * by cyy zb
 * 2018 12 13
 */
var commonAction = {
	/**
	* @param  获取URL传参并转化为数组，支持指定参数获取
	*/
	getParam: function(key) {
		var ser = location.search;
		if (ser) {
			var arrays = ser.substring(1).split('&');
			var params = {};
			$.each(arrays, function(k, v) {
				var a = v.split('=');
				params[a[0]] = a[1];
			});
			if (key) {
				return params[key];
			}
			return params;
		}
	},
}
