/**
 * Created by Administrator on 2017/7/15.
 */
//现在是进行了模块化的开发，因此现在的这个与业务不相关的功能，也要封闭成一个模块，这就是一个工具模块
//专门用来获取?后面的id
define(function () {
  var o = {
    queryString: function () {
      // 获取当前url中的tc_id
      var search = location.search;
      // 截取字符串
      search = search.slice(1);
      // 分割字符串
      var searchArr = search.split("&");
      // console.log(searchArr);
      var obj = {};
      // 遍历数组
      for (var i = 0; i < searchArr.length; i++) {
        // 分割字符串
        var temp = searchArr[i].split("=");
        // console.log(temp);
        // 存入对象中
        obj[temp[0]] = temp[1];
      }
      return obj; //要把对象返回值
    }
  }
  return o;
})