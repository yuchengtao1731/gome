import { $,ajax, jstool } from "./toolmodule.js";


function Logining(){
    let oInput = $('input','all');
    let oButton = $('.buttonlogin');
    let oSpan = $('span','all')
    console.log(oInput);

    oInput[0].oninput=function(){
        if(oInput[0].value != ""){
            oSpan[1].style.display='block';
        }else{
            oSpan[1].style.display='none';
        }
    }
    oSpan[1].onclick=function(){
        oInput[0].value='';
        oSpan[1].style.display='none';
    }
    oInput[1].oninput=function(){
        if(oInput[1].value != ""){
            oSpan[2].style.display='block';
        }else{
            oSpan[2].style.display='none';
        }
    }
    oSpan[2].onclick=function(){
        oInput[1].value='';
        oSpan[2].style.display='none';
    }

    oButton.onclick=function(){

    }
}

export { Logining }