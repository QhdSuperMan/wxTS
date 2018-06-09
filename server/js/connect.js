(function(){
    langStep = true,
    setLanguage = document.getElementsByClassName('setLanguage'),
    h_btn = document.getElementsByClassName('langbtn')[0];
    h_btn2 = document.getElementsByClassName('langbtn')[1];
    classKu.addEvent(h_btn2, 'click', function () {
      Updatelang()
    })
    classKu.addEvent(h_btn,'click', function() {
      Updatelang()
    })
    function Updatelang() {
      if (langStep) {
        for (var i = 0; i < setLanguage.length; i++) {
          setLanguage[i].innerText = chinaese[i]
        }
        common.svgNav(langStep)
        langStep = false
      } else {
        common.svgNav(langStep)
        for (var i = 0; i < setLanguage.length; i++) {
          setLanguage[i].innerText = Englisn[i]
        }
        langStep = true
      }
      initicalMain()
      scrollMain()
    }
})()