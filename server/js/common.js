'use strict';

// 底部导航
var nav_goMainIcon = document.getElementsByClassName('nav_goMainIcon')[0],
    body = document.getElementsByClassName('body')[0],
    nav_goMain = document.getElementsByClassName('nav_goMain')[0];
nav_goMainIcon.onclick = function () {
  classKu.scrollTop(0, classKu.getOffsetTopByBody(body) - 140);
};
classKu.addEvent(window, 'scroll', classKu.throttel(function () {
  if (classKu.getScrollTop() > 100) {
    nav_goMain.style.display = 'none';
  } else {
    nav_goMain.style.display = 'block';
  }
}, 50));
// 小屏幕按钮,获取dom
classKu.addEvent(window, 'resize', classKu.throttel(function () {
  initicalBGimg();
  if (window.innerWidth > 992) {
    updateSmall(true);
  }
}, 50));
var smallScreenBtn = document.getElementsByClassName('smallScreenBtn')[0],
    smallBtnStep = true;
smallScreenBtn.onclick = function () {
  updateSmall(false);
};
function updateSmall(step) {
  var smallhr = document.getElementsByClassName('smallhr'),
      smallA = document.getElementsByClassName('smallA'),
      smallnavList = document.getElementsByClassName('smallnavList')[0];
  if (smallBtnStep && step === false) {
    classKu.addClass(smallhr[0], 'Lone');
    classKu.addClass(smallhr[1], 'Lactive');
    classKu.addClass(smallhr[2], 'Ractive');
    classKu.addClass(smallhr[3], 'Ltwo');
    smallnavList.style.display = 'block';

    var _loop = function _loop(i) {
      setTimeout(function () {
        classKu.addClass(smallA[i], 'aActive');
      }, i * 100);
    };

    for (var i = 0; i < smallA.length; i++) {
      _loop(i);
    }
    smallBtnStep = !smallBtnStep;
  } else {
    classKu.delClass(smallhr[0], 'Lone');
    classKu.delClass(smallhr[1], 'Lactive');
    classKu.delClass(smallhr[2], 'Ractive');
    classKu.delClass(smallhr[3], 'Ltwo');
    smallnavList.style.display = 'none';

    var _loop2 = function _loop2(i) {
      setTimeout(function () {
        classKu.delClass(smallA[i], 'aActive');
      }, i * 100);
    };

    for (var i = 0; i < smallA.length; i++) {
      _loop2(i);
    }
    smallBtnStep = !smallBtnStep;
  }
}
// 初始化背景图
function initicalBGimg() {
  document.getElementsByClassName('bg3d')[0].style.height = window.innerHeight + 'px';
}
initicalBGimg();
// 小屏幕按钮,获取dom
classKu.addEvent(window, 'resize', classKu.throttel(function () {
  initicalBGimg();
}, 50));
//屏幕滚动 导航栏功能
var logoSvg = document.getElementsByClassName('logoSvg')[0],
    logoText = document.getElementsByClassName('logoText')[0],
    navListText = document.getElementsByClassName('navListText'),
    navListTextactive = document.getElementsByClassName('navListTextactive'),
    shortHover = document.getElementsByClassName('shortHover'),
    nav = document.getElementsByClassName('nav')[0], smallScreenBtn = document.getElementsByClassName('smallScreenBtn')[0];
    classKu.addEvent(window, 'scroll', function () {
    if (classKu.getScrollTop() > 800) {
      classKu.addClass(logoSvg, 'active');
      classKu.addClass(logoText, 'active');
      classKu.addClass(nav, 'action');
      classKu.addClass(smallScreenBtn, 'samllActive');
      for (var i = 0; i < navListText.length; i++) {
        navListText[i].attributes[0].value = 'navListTextactive';
      }
    } else {
      classKu.delClass(logoSvg, 'active');
      classKu.delClass(logoText, 'active');
      classKu.delClass(nav, 'action');
      classKu.delClass(smallScreenBtn, 'samllActive');
      for (var i = 0; i < navListTextactive.length; i++) {
        navListTextactive[i].attributes[0].value = 'navListText';
      }
    }
  });
// 导航点击
var smallnavList = document.getElementsByClassName('smallnavList')[0];
classKu.addEvent(smallnavList, 'click', function () {
  updateSmall(true);
});
// smallnavList.onclik = function (event) {
//   console.log(1)
//   var event = window.event || event || arguments.callee.caller.arguments[0];
// }
// 返回顶部
document.getElementsByClassName('gotoTop')[0].onclick = function () {
  classKu.scrollTop(classKu.getScrollTop(), 0);
};
var chinese = ['首页', '白皮书', '联系我们', '团队', '中 / 英'],
    English = ['MAIN', 'WHITE PAPER', 'CONTACT US', 'TEAM', '中 / 英'];
window.common = {
  svgNav: function svgNav(step) {
    if (step) {
      for (var i = 0; i < navListTextactive.length; i++) {
        navListTextactive[i].innerHTML = chinese[i];
        shortHover[i].style.display = 'none';
      }
      for (var i = 0; i < navListText.length; i++) {
        navListText[i].innerHTML = chinese[i];
        shortHover[i].style.display = 'none';
      }
    } else {
      for (var i = 0; i < navListTextactive.length; i++) {
        navListTextactive[i].innerHTML = English[i];
        shortHover[i].style.display = 'block';
      }
      for (var i = 0; i < navListText.length; i++) {
        navListText[i].innerHTML = English[i];
        shortHover[i].style.display = 'block';
      }
    }
  }
};
