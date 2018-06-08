'use strict';

(function () {
  // 中英文互换
  var langStep = true,
  setLanguage = document.getElementsByClassName('setLanguage'), 
  h_btn = document.getElementsByClassName('langbtn')[0],
  h_btn2 = document.getElementsByClassName('langbtn')[1],
  Chinese = ["联系我们","JLL以敬畏之心面对全球教育产业结构，渴望借助区块链技术，让教育插上区块链的翅膀腾飞，同时也期望通过 JLL教育协议，特别是教育垂直的各方人士及其背后的价值更好的流通交融。作为一个热爱技术变革的团队，我们也期望透过 JLL，尤其是 JLL教育协议，为区块链技术的积累和进步，贡献力量。",
"教链 JLL","首页","白皮书","联系我们","团队","联系信息","欢迎联系我们","微信公众号","币用","小助手"],
  English = ["CONTACT US", "JLL desires to empower the development of education industry by using block chain technology. Meanwhile, it expects to facilitate better circulation and integration among all participants in the vertical education industry and their underlying value through the implementation of JLL education protocol. As a team who embrace technological changes, we also expect to contribute to the accumulation and progress of blockchain technology through JLL, especially JLL education protocol.",
"JLL CHAIN","MAIN","WHITE PAPER","CONTACT US","TEAM","Contact InFo","Contact InFo","Welcome to contact us","WeChat public number","BiYong","Little assistant"];
  classKu.addEvent(h_btn2, 'click', function () {
    Updatelang();
  });
  classKu.addEvent(h_btn, 'click', function () {
    Updatelang();
  });
  // 初始化语言
  function initiclLang() {
   if(localStorage.getItem('lang') === null){
      localStorage.setItem('lang',false)
   } else {
      langStep = localStorage.getItem('lang') === '1' ? true : false;
      Updatelang()
   }
  }
  initiclLang()
  function Updatelang() {
    if (langStep) {
      for (var i = 0; i < setLanguage.length; i++) {
        setLanguage[i].innerText = Chinese[i];
      }
      common.svgNav(langStep);
      localStorage.setItem('lang',1)
      langStep = false;
    } else {
      common.svgNav(langStep);
      for (var i = 0; i < setLanguage.length; i++) {
        setLanguage[i].innerText = English[i];
      }
      localStorage.setItem('lang',0)
      langStep = true;
    }
  }
})();
