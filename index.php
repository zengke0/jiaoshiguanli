<?php 

    $path = '';
    if(array_key_exists('PATH_INFO',$_SERVER)){
        $path = $_SERVER['PATH_INFO'];
        // 截取字符串，不要最前面的/
        $path = substr($path,1);
        // 将$path用explode 进行切割，$path是字符串，exploade切割成数组
        $arr = explode('/',$path);
        // var_dump($arr);
        // 判断数组的个数添加网址
        if(count($arr) == 2){
            $path = 'view'.'/'.$arr[0].'/'.$arr[1];
        }else if(count($arr) == 1){
            $path = 'view'.'/'.'dashboard'.'/'.$arr[0];
        }
    }else {
        $path = 'view/dashboard/index';
    }
    

    // var_dump($path);
    include $path.'.html';
    // include 'view'.$path.'.html';
 ?>