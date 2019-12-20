 //引入注册模块
 import { Verify } from "./registry.js";
 import{ Logining } from "./login.js";

if(document.getElementById('registry')){
    
    new Verify();
}
if(document.getElementById('login')){
    new Logining();
}