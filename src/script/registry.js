import { $,ajax, jstool } from "./toolmodule.js";


function Verify() {

    let oForm = $('form');
    let oInput = $('input', 'all');
    let oSpan = $('span', 'all');
    let oSection = $('section', 'all');
    let oArticle = $('article');

    let flagName = 0;
    let flagEmail = 0;
    let flagPass = 0;
    let flagPassTwo = 0;
    let flagTel = 0;
    let falgPic = 0;

    //用户名
    oInput[0].onfocus = function () {
        if (this.value == "4到16位，字母、数字、下划线均可") {
            this.value = '';
            this.style.color = 'black';
        }
    }
    oInput[0].onblur = function () {
        let regename = /^[a-zA-Z]\w{3,15}$/;
        if (this.value != '') {
            if (regename.test(this.value)) {
                oSpan[0].innerHTML = '√';
                oSpan[0].style.color = 'green'
                flagName = true;
                ajax({
                    type:'post',
                    url:'http://10.31.161.151/erjieduan/gome/php/registry.php',
                    data:{
                        username:this.value
                    }
                }).then(function(data){
                    console.log(data);
                    if(data){
                        oSpan[0].innerHTML = '用户名已存在';
                        oSpan[0].style.color = 'red';
                        flagName = false;
                    }
                   
                })
            } else {
                oSpan[0].innerHTML = '用户名格式有误';
                oSpan[0].style.color = 'red';
                flagName = false;
            }

        } else {
            this.value = '4到16位，字母、数字、下划线均可'
            this.style.color = '#ccc';
            oSpan[0].innerHTML = '用户名不能为空'
            oSpan[0].style.color = 'red'
            flagName = false;
        }
    }
    //邮箱
    oInput[1].onfocus = function () {
        if (this.value == "请输入邮箱") {
            this.value = '';
            this.style.color = 'black';
        }
    }
    oInput[1].onblur = function () {
        let regemail = /^(\w+[\+\-\_\.]*\w+)\@(\w+[\+\-\_\.]*\w+)\.(\w+[\+\-\_\.]*\w+)$/;
        if (this.value != '') {
            if (regemail.test(this.value)) {
                oSpan[1].innerHTML = '√';
                oSpan[1].style.color = 'green'
                flagEmail = true;
            } else {
                oSpan[1].innerHTML = '邮箱格式有误';
                oSpan[1].style.color = 'red'
                flagEmail = false;
            }

        } else {
            this.value = '请输入邮箱'
            this.style.color = '#ccc';
            oSpan[1].innerHTML = '邮箱不能为空'
            oSpan[1].style.color = 'red'
            flagEmail = false;
        }
    }
    //密码
    oInput[2].onfocus = function () {
        if (this.value == "6-16位大小写英文字母、数字或字符组成") {
            this.value = '';
            this.style.color = 'black';
        }
    }
    oInput[2].oninput = function () {
        if (this.value.length >= 6 && this.value.length <= 16) {
            let regNum = /\d+/;
            let regLow = /[a-z]+/;
            let regUpp = /[A-Z]+/;
            let regOther = /[\W]+/;
            let count = 0;
            if (regNum.test(this.value)) {
                count++;
            }
            if (regLow.test(this.value)) {
                count++;
            }
            if (regUpp.test(this.value)) {
                count++;
            }
            if (regOther.test(this.value)) {
                count++;
            }
            switch (count) {
                case 1:
                    oSection[2].style.background = 'green';
                    oSection[0].style.background = '#ccc';
                    oSection[1].style.background = '#ccc';
                    oSpan[2].innerHTML = '√';
                    oSpan[2].style.color = 'green';
                    flagPass = true;
                    break;
                case 2:
                case 3:
                    oSection[1].style.background = 'green';
                    oSection[0].style.background = '#ccc';
                    oSection[2].style.background = '#ccc';
                    oSpan[2].innerHTML = '√';
                    oSpan[2].style.color = 'green';
                    flagPass = true;
                    break;
                case 4:
                    oSection[0].style.background = 'green';
                    oSection[1].style.background = '#ccc';
                    oSection[2].style.background = '#ccc';
                    oSpan[2].innerHTML = '√';
                    oSpan[2].style.color = 'green';
                    flagPass = true;
                    break;
            }

        } else {
            oSpan[2].innerHTML = '密码格式有误';
            oSpan[2].style.color = 'red'
            flagPass = false;
        }
    }

    oInput[2].onblur = function () {

        if (this.value !== '') {
            if (flagPass) {
                oSpan[2].innerHTML = '√';
                oSpan[2].style.color = 'green';
                flagPass = true;
            }
        } else {
            this.value = '6-16位大小写英文字母、数字或字符组成'
            this.style.color = '#ccc';
            oSpan[2].innerHTML = '密码不能为空';
            oSpan[2].style.color = 'red';
            flagPass = false;
        }
    }

    //再次输入密码
    oInput[3].onfocus = function () {
        if (this.value == "请再次输入密码") {
            this.value = '';
            this.style.color = 'black';
        }
    }
    oInput[3].onblur = function () {
        if (this.value != oInput[2].value) {
            this.value = '请再次输入密码'
            this.style.color = '#ccc';
            oSpan[3].innerHTML = '二次输入的密码不符';
            oSpan[3].style.color = 'red'
            flagPassTwo = false
        } else {
            oSpan[3].innerHTML = '√'
            oSpan[3].style.color = 'green'
            flagPassTwo = true
        }
    }

    //手机号
    oInput[4].onfocus = function () {
        if (this.value == "请输入手机号码") {
            this.value = '';
            this.style.color = 'black';
        }
    }
    oInput[4].onblur = function () {
        let regemail = /^1[3578]\d{9}$/;
        if (this.value != '') {
            if (regemail.test(this.value)) {
                oSpan[4].innerHTML = '√';
                oSpan[4].style.color = 'green'
                flagTel = true
            } else {
                oSpan[4].innerHTML = '手机号码格式有误';
                oSpan[4].style.color = 'red'
                flagTel = false
            }

        } else {
            this.value = '请输入手机号码'
            this.style.color = '#ccc';
            oSpan[4].innerHTML = '手机号码不能为空'
            oSpan[4].style.color = 'red'
            flagTel = false
        }
    }
    //请输入验证码
    oInput[5].onfocus = function () {
        if (this.value == "请输入验证码") {
            this.value = '';
            this.style.color = 'black';
        }
    }
    oInput[5].onblur = function () {
        if (this.value != '') {
            if (this.value != oArticle.innerHTML) {
                oSpan[5].innerHTML = '验证码不符';
                oSpan[5].style.color = 'red'
                falgPic = false
            } else {
                oSpan[5].innerHTML = '√'
                oSpan[5].style.color = 'green'
                falgPic = true
            }
        }else{
            this.value = '请输入验证码'
            this.style.color = '#ccc';
            oSpan[5].innerHTML = '验证码不能为空'
            oSpan[5].style.color = 'red'
            falgPic = false
        }

    }




    //生成随机数




    function fn() {
        var arr = [];
        for (var i = 48; i <= 57; i++) {
            arr.push(String.fromCharCode(i));
        }
        for (var i = 65; i <= 90; i++) {
            arr.push(String.fromCharCode(i));
        }

        var str = '';
        for (var i = 0; i < 5; i++) {
            var num = parseInt(Math.random() * arr.length);
            if (num > 9) {
                var flag = true;
                flag = Math.random() > 0.5 ? true : false;
                if (flag) {
                    str += arr[num].toLowerCase();
                } else {
                    str += arr[num]
                }
            } else {
                str += arr[num];
            }

        }
        return str
    }

    oArticle.innerHTML = fn()
    oArticle.onclick = function () {

        var arr = [];
        for (var i = 48; i <= 57; i++) {
            arr.push(String.fromCharCode(i));
        }
        for (var i = 65; i <= 90; i++) {
            arr.push(String.fromCharCode(i));
        }

        var str = '';
        for (var i = 0; i < 5; i++) {
            var num = parseInt(Math.random() * arr.length);
            if (num > 9) {
                var flag = true;
                flag = Math.random() > 0.5 ? true : false;
                if (flag) {
                    str += arr[num].toLowerCase();
                } else {
                    str += arr[num]
                }
            } else {
                str += arr[num];
            }
        }
        oArticle.innerHTML = str
    }
    //注册
    oForm.onsubmit = function () {
        if (oInput[0].value === '4到16位，字母、数字、下划线均可') {
            oSpan[0].innerHTML = '用户名不能为空';
            oSpan[0].style.color = 'red';
            flagName = false;
        }
        if (oInput[1].value === '请输入邮箱') {
            oSpan[1].innerHTML = '邮箱不能为空';
            oSpan[1].style.color = 'red';
            flagEmail = false;
        }
        if (oInput[2].value === '6-16位大小写英文字母、数字或字符组成') {
            oSpan[2].innerHTML = '密码不能为空';
            oSpan[2].style.color = 'red';
            flagPass = false;
        }
        if (oInput[3].value === '请再次输入密码') {
            oSpan[3].innerHTML = '密码不能为空';
            oSpan[3].style.color = 'red';
            flagPassTwo = false;
        }
        if (oInput[4].value === '请输入手机号码') {
            oSpan[4].innerHTML = '手机号码不能为空';
            oSpan[4].style.color = 'red';
            flagTel = false;
        }
        if (oInput[5].value === '请输入验证码') {
            oSpan[5].innerHTML = '验证码不能为空';
            oSpan[5].style.color = 'red';
            falgPic = false;
        }


        if (flagName==false || flagEmail == false || flagPassTwo == false || flagTel == false || falgPic == false || flagPass == false) {
            return false;
        }
    }
}


export { Verify }
