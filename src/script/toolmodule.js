// 以下是封装的工具


// 取元素
function $(selector, all) {
    if (all != 'all') {
        return document.querySelector(selector);
    } else {
        return document.querySelectorAll(selector);
    }
}



// 生成验证码
function yzm() {

    var str = '';
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 65; i <= 90; i++) {
        arr.push(String.fromCharCode(i));
    }
    for (var i = 0; i < 5; i++) {
        str += arr[Math.round(Math.random() * (arr.length - 1))];
    }

    return str;
}

// 随机数
function rannum(min, max) {
    // min-max区间的随机整数
    return Math.round(Math.random() * (max - min)) + min;
}


// cookie操作
let jstool = {
    addcookie: function(key, value, days) {
        let d = new Date();
        d.setDate(d.getDate() + days);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
    },
    getcookie: function(key) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newarr = value.split('=');
            if (key === newarr[0]) {
                return newarr[1];
            }
        }
    },
    delcookie: function(key) {
        this.addcookie(key, '', -1);
    }
}







// ajax-promise
function ajax(obj) {

    //将对象转换成数据拼接适合的字符串的格式?&
    function objToString(obj) {
        if (Object.prototype.toString.call(obj).slice(8, -1) === 'Object') {
            let objarr = [];
            for (let i in obj) {
                objarr.push(i + '=' + obj[i]);
            }
            return objarr.join('&')
        }
    }

    //创建promise实例
    let promise = new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest(); //获取ajax对象

        //1.默认get,此参数可以省略。
        obj.type = obj.type || 'get';

        //2.接口地址不能为空
        if (!obj.url) {
            throw new Error('接口地址不能为空');
        }

        //3.数据存在(对象转字符串，字符串直接使用)
        if (obj.data) {
            if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'Object') {
                obj.data = objToString(obj.data);
            } else {
                obj.data = obj.data;
            }
        }

        //4.数据存在，同时get请求，将数据拼接到地址栏的后面
        if (obj.data && obj.type === 'get') {
            obj.url += '?' + obj.data;
        }

        //6.是否异步,如果同步无需onreadystatechange进行监听
        if (obj.async === 'false' || obj.async === false) {
            obj.async = false;
        } else {
            obj.async = true;
        }

        ajax.open(obj.type, obj.url, obj.async);

        //5.数据存在和post,通过send和请求头传输数据
        if (obj.data && obj.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(obj.data);
        } else {
            ajax.send();
        }

        //7.同步异步获取数据(利用回调函数将数据传输出来)
        if (obj.async) { //异步
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) { //服务器响应成功
                    if (ajax.status === 200) { //请求接口成功
                        let objdata = null;
                        if (obj.dataType === 'json') {
                            objdata = JSON.parse(ajax.responseText);
                        } else {
                            objdata = ajax.responseText;
                        }
                        resolve(objdata);

                    } else { //接口有误
                        reject('接口地址有误');
                    }
                }
            }
        } else { //同步
            if (ajax.status === 200) {
                let objdata = null;
                if (obj.dataType === 'json') {
                    objdata = JSON.parse(ajax.responseText);
                } else {
                    objdata = ajax.responseText;
                }
                resolve(objdata);
            } else {
                reject('接口地址有误');
            }
        }

    });

    return promise;
}

// 运动
function bufferMove(obj, json, fn) {
    var speed = 0;

    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }
    clearInterval(obj.timer); //防止事件下面定时器叠加
    obj.timer = setInterval(function() {
        var flag = true; //假设运动已经结束

        //开始属性遍历运动
        for (var attr in json) { //attr:css属性名称  json[attr]:目标点 前面的target
            //1.求当前的css属性值
            var currentValue = null;
            if (attr === 'opacity') { //透明度
                currentValue = getStyle(obj, attr) * 100; //扩展100倍，透明度的目标100
            } else { //px单位的属性
                currentValue = parseInt(getStyle(obj, attr));
            }
            //2.求速度
            speed = (json[attr] - currentValue) / 50; //10：运动因子
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //3.判断运动开启和停止
            if (currentValue !== json[attr]) { //没到目标继续运动
                if (attr === 'opacity') { //透明度
                    obj.style.opacity = (currentValue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (currentValue + speed) + ');'; //IE
                }
                obj.style[attr] = currentValue + speed + 'px'; //属性一定要用中括号。
                flag = false; //运动没有结束
            }
        }

        if (flag) { //判断所有的属性都已经到了目标点了，如果没到继续运动falg=false,不满足此条件
            clearInterval(obj.timer);
            fn && typeof fn === 'function' && fn(); //运动完成，执行回调函数。
        }
    }, 10);
}



// 添加类
function addClass(obj, className) {
    //没有class属性
    if (obj.className == "") {
        obj.className = className;
    } else { //有class属性
        var index = classIndexOf(obj, className);
        //如果原来没有这个新加的class
        if (index == -1) {
            obj.className += " " + className;
        }
    }
}

//检验是否包含有某一个class
function classIndexOf(obj, name) {
    var arrClassName = obj.className.split(" "); //根据空格转数组
    for (var i = 0; i < arrClassName.length; i++) {
        if (arrClassName[i] == name) {
            return i;
        }
    }
    return -1;
}

function removeClass(obj, className) {
    //
    if (obj.className != "") {
        var arrClassName = obj.className.split(" ");
        var index = classIndexOf(obj, className);

        if (index != -1) { //存在
            arrClassName.splice(index, 1); //删掉
        }
        obj.className = arrClassName.join(" "); //转回字符串赋值
    }
}



export { $, rannum, jstool, ajax, bufferMove, yzm, addClass, removeClass }