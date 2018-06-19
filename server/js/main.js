'use strict';

(function () {
  // 轮播图
  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progress'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  // team
  var teamItem = new Swiper('.teamItem', {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 1,
    breakpoints: {
      420: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 1
      },
      1920: {
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 10,
      }
    }
  });
  // Consultant
  var ConsultantItem = new Swiper('.ConsultantItem', {
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 1,
    breakpoints: {
      420: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesPerGroup: 1
      }
    }
  });
  // logom
  var logom = new Swiper('.logomItem', {
    loop: true,
    slidesPerView: 6,
    slidesPerGroup: 1,
    breakpoints: {
      420: {
        slidesPerView: 5,
        spaceBetween: 10,
        slidesPerGroup: 1
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 10,
        slidesPerGroup: 1
      }
    }
  });
  // 时钟
  function initicalClock() {
    var clock_hours = document.getElementsByClassName('clock_hours')[0],
        clock_minutes = document.getElementsByClassName('clock_minutes')[0],
        clock_s = document.getElementsByClassName('clock_s')[0];
    function clearClock() {
      clock_hours.style.transform = 'rotate(' + 360 * (classKu.getTimes().h / 12) + 'deg)';
      clock_minutes.style.transform = 'rotate(' + 360 * (classKu.getTimes().m / 60) + 'deg)';
      clock_s.style.transform = 'rotate(' + 360 * (classKu.getTimes().s / 60) + 'deg)';
      setTimeout(function () {
        clearClock();
      }, 1000);
    }
    clearClock();
  }
  initicalClock();
  // 小屏幕按钮,获取dom
  classKu.addEvent(window, 'resize', classKu.throttel(function () {
    scrollMain()
    // 更新seiper
    setTimeout(function() {
      initicalBGimg();
      initicalMain(); 
    },1000)
    if (window.innerWidth > 992) {
      updateSmall(true);
    }
    if (window.innerWidth > 1200) {
      canvas.style.display = 'block';
    } else {
      canvas.style.display = 'none';
    }
  }, 50));
  // 锚点 team
  var gtoTeam = document.getElementsByClassName('gtoTeam')[0],
  gtoTeam1 = document.getElementsByClassName('gtoTeam')[1],
  demo = document.getElementsByClassName('demo'),
  team = document.getElementsByClassName('team')[0];
  classKu.addEvent(gtoTeam, 'click', function () {
    classKu.scrollGo(classKu.getScrollTop(), classKu.getOffsetTopByBody(team) - 150, 100);
  })
  classKu.addEvent(gtoTeam1, 'click', function () {
    classKu.scrollGo(classKu.getScrollTop(), classKu.getOffsetTopByBody(team) - 150, 100);
  })
  // 星空连线
  var canvas = document.getElementsByClassName('canvas')[0];
  classKu.canvasBG(canvas);
  //屏幕滚动  main 主要功能
  function initicalMain() {
    topbox = [];
    for (var i = 0; i < bodyImg.length; i++) {
      topbox.push(classKu.getOffsetTopByBody(bodyImg[i]));
    }
  }
  var bodyImg = document.getElementsByClassName('bodyImg'),
      bodytext = document.getElementsByClassName('bodytext'),
      topbox = [];
  setTimeout(function () {
    initicalMain();
    classKu.addEvent(window, 'scroll', scrollMain);
  }, 100);
  bodyImg[4].onload = function () {
    initicalMain();
    classKu.addEvent(window, 'scroll', scrollMain);
  };
  function scrollMain() {
    classKu.scrollMain(bodyImg, bodytext, topbox);
  }
  // 中英文切换  JLL to centralization of the content exchange
  var chinaese = ['全球首条', '教育产业公有链', '教链 JLL', '观看视频', '教链 JLL', '首页', '白皮书', '联系我们', '团队', '中 / 英', '什么是教链（JLL）', '教链（JLL）是基于区块链技术的开源去中心化分布式教育产业协议。教链利用JLL智能协议，将区块链技术引入以教育行业，颠覆传统教育产业，打造全球首条教育公有链，其未来蓝图包括诸多教育领域分布式DAPP应用，一条教育产业公有链，一个人才内容去中心化交易所。', "教链（JLL）社区部落", "教链的整个生态由用户、认知讲堂、教链社区、挖矿和排行五大要素构成。用户构成教链社群，可以通过挖矿机制来获取教链代币，以及其他和教链有战略合作关系的其他项目代币。挖矿是教链代币获取的一种方式，也是整个生态的重要组成部分。在教链社区中，有很多有趣的共建方式：教师以认知讲堂作为其个人及其教学内容的展示平台，将自己的教学相关内容上传至认知讲堂，社群用户可以用代币来为喜欢的教学工作者及其内容投票，也可用代币对教师及其内容进行打赏。社群会依据投票情况，为教师及其所传内容进行排名，促进其获取用户打赏以及社群激励。", "教链（JLL）DAPP应用", "教师和教培机构通过JLL协议实现其各类教学内容，如课程、书籍、音频等的上链认证，教培机构可以通过JLL协议及其认证，发现并购买教师所提供的教学内容；人才也可以享受经JLL多样认证的、由教师和教培机构所提供的各类教学内容。所有的交易、培训及教学内容信息均由分布式账本进行数据存储，企业可向人才发出验证请求，获取其在平台上所记录的各类信息，获取其教育相关的全面画像，为其用人选聘提供决策支持。", "教链（JLL）去中心化内容交易所", "基于教师个人IP内容的认证、管理、孵化及与出版社、教育机构、资本等主体的版权交易等。当以上交易达到足够量时，教链内容交易所也可得到推行。", "教链（JLL）智能合约协议", "教链公有链智能协议为共识，以“人才”、“教师”、“资本”、“用户”为分布，通过JLL协议，将IP内容、人才和资本转化为数字资产，同时进行新币孵化、投票。在用户获得收益的同时，最大化IP内容、人才和资本的价值，帮助其在教链的人才及内容交易所和生态内获得流动性。", "JLL教链场景生态 ","教链JLL的生态建设从教育公链、内容交易、人才管理、版权保护、教育IP、教学服务、教育孵化和教育管理出发，利用分布式数据加密存储技术深度建设教链底层基础设施，打造一个去中心化的多方共赢教育新生态。","运营团队", '顾问与投资者', "合作伙伴"],
      Englisn = ['The first public chain', 'of education industry in the world', 'JLL CHAIN','Watch Video', 'JLL CHAIN', 'MAIN', 'WHITE PAPER', 'CONTACT US', 'TEAM', "中 / 英", 'What is the teaching chain?', "Education chain (JLL) is an open source decentralized distributed protocol of education industry based on block chain technology. With JLL intelligent protocol, the education chain introduces block chain technology into the education industry. It will disrupt the traditional education industry and create the world's first education public chain. Its future blueprint include many distributed DAPP applications in education, a public chain of education industry, and a decentralized exchange of personnel contents", "Education chain (JLL) community tribe", "The whole ecosystem of JLL consists of five elements: users, cognition lectures, education chain community, mining and ranking. A community comprises of users, who obtains tokens through mining mechanism and other programs with which JLL has forged strategic partnership. Mining is one of the ways to obtain tokens and an important part of the whole ecosystem. There are a lot of co-building manners in the community: a teacher will use the cognition lecture as the platform to demonstrate himself and his teaching contents--he will upload related contents to the cognition lecture. Community users vote for or reward the preferred educators and their contents with tokens. The community will rank the teachers and their contents based on the votes, motivating the teachers to obtain user rewards and community incentives.", "JLL to centralization of the content exchange", "Teachers and education organization realize all kinds of teaching contents, such as the certification of courses, books, audio and others, through JLL protocol; an education organization find and purchase the teaching contents provided by teachers through JLL protocol and its certification; talents can also enjoy a variety of JLL certified teaching content provided by teachers and educational organizations. All transactions, training and teaching content information are stored as data on distributed ledgers. A company can send a validation request to a talent. By doing this, the company gets all his information recorded on the platform, accesses to his comprehensive education portrait, and supports the decision making of employment.", "JLL exchange for talents and contents", "A large number of talents and their education certification data, teachers and their uploaded teaching contents are based on JLL protocol. Based on education data, the JLL ecosystem achieves transaction between talents and employers. It also enables the certification, management, and hatch of IP contents based on individual teachers, and the copyright trades among presses, education organizations, and capitals. When the above trading volume is sufficient, the talent and content", "JLL smart contract protocol", "The JLL public chain is based on the consensus of smart contract protocols and distributed over “talents”, ”teachers”, ”capitals” and “users”. The JLL protocol will convert the IP contents, talents and capitals into digital assets. It will also hatch new tokens and votes at the same time. While benefiting users, it will maximize the value of IP contents, talents and capitals and enable their liquidity in the talents and contents exchange and ecosystem. ", 
      "JLL chain application of ecological","The ecological construction of the JLL chain  starts with the education  public chain, content transaction, talent management, copyright protection, education intellectual property, teaching services, education incubation and education management, and uses distributed data encryption and storage technology to build the infrastructure of the Master chain to create a Decentralized multi-party win-win educational ecology.",
      "Operation team", "Consultant team", "Cooperative partner"],
      langStep = true, setLanguage = document.getElementsByClassName('setLanguage'), h_btn = document.getElementsByClassName('langbtn')[0],
      stImg = document.getElementsByClassName('stImg')[0],
      h_btn2 = document.getElementsByClassName('langbtn')[1];
      classKu.addEvent(h_btn2, 'click', function () {
        Updatelang();
      });
      classKu.addEvent(h_btn, 'click', function () {
        Updatelang();
      });
      function Updatelang() {
        if (langStep) {
          for (var i = 0; i < setLanguage.length; i++) {
            setLanguage[i].innerText = chinaese[i];
          }
          common.svgNav(langStep);
          localStorage.setItem('lang',1)
          langStep = false;
          langUpdate(langStep)
          stImg.setAttribute('src', './images/zst.png')
          for(var i = 0; i < bodytext.length; i++) {
            classKu.addClass(bodytext[i], 'hzbodyList')
          }
        } else {
          common.svgNav(langStep);
          for (var i = 0; i < setLanguage.length; i++) {
            setLanguage[i].innerText = Englisn[i];
          }
          localStorage.setItem('lang',0)
          stImg.setAttribute('src', './images/yst.png')
          for(var i = 0; i < bodytext.length; i++) {
            classKu.delClass(bodytext[i], 'hzbodyList')
          }
          langStep = true;
          langUpdate(langStep)
        }
        initicalMain();
        scrollMain();
      }
  // 初始化语言   ./images/yst.png ./images/zst.png
  function initiclLang() {
    if(localStorage.getItem('lang') === null){
       localStorage.setItem('lang',false)
    } else {
       langStep = localStorage.getItem('lang') === '1' ? true : false;
       Updatelang()
       langUpdate(langStep)
    }
   }
   initiclLang()
   // 中英文切换 轮播图部分
   function langUpdate(step) {
    var langZ = ["唐靖杰","教链（JLL)中国区发起人 区块链应用架构师 区块链天使投资人","孔灵","教链（JLL)联合发起人 中国社区推广者 中聚区块链董事长","磊子","教链（JLL)联合发起人 区块链技术专家 数字货币钱包技术专家",
  "田旭","JLL项目运营官数字资产早期投资人 数字资产量化交易师","闫钰航","社区运营官社群实操专家 京东互联网社区运营专家","徐致卿","社区运营主管腾讯社群管理专家","陈凯","内容运营官新媒体营运前阿里系内容撰稿人",
  "张振","首席产品设计官 品牌设计师 UI前端设计师","吴玉荣","张艾","数字货币天使投资人 币趣联合创始人 多家交易所顾问","梁凯恩","亚洲超级演说家 超越极限董事局主席","朱少平","原全国人大财经委法案主任 多部政策法律文件起草者","吴正宽",
"中国行销大师 超级演说家","石岩","中国十大策划讲师 品牌中国副秘书长 梦无缺工程创人","全栈开发工程师 区块链技术爱好者 数字货币早期持有者","沈晓宇","区块链高级架构师  加密算法高级工程师  区块链共识算法研究员  ETH、EOS区块链系统研究员",
"刘需"," 全栈开发工程师  高级算法工程师  精通java/C/C++/Python  ETH、EOS区块链系统研究员","张涛","JLL 投资者 区块链投资人","無极","JLL 投资者  华迎控股集团董事长"],
    langY = ["Tang Jingjie","Sponsor of JLL China Blockchain Application Architect Blockchain Angel Investor","Kong Ling","Co-founder of JLL Chinese Community Promoters Chairman of ZhongjuBlockchain",
  "Lei Zi","Co-founder of JLL Blockchain Technologist Digital Currency Wallet Technologist","Tian Xu","JLL Project Operation Officer Early investors in digital assets Digital Asset Quantifier","Yan Yuhan",
"Community Operation Officer Community Practitioners Jingdong Internet Community Operation Expert","Xu Zhiqing","Community Operation Supervisor Tencent Community Management Expert","ChenKai",
"Content Operation Officer New media operation Former content writer of anAlibaba company","Zhang Zhen","Chief Product Design Officer Brand Designer","Wu Yurong",
"Zhang Ai","Digital Currency Angel Investor Co-founder of Biqu Consultants for many exchanges","Liang Kaien","Asia's top orator Board Chairman of Beyong the Limit Zhu Shao-ping Former Director of the Financial and Economic Commission of the NPC The Author of several policy and legal documents",
"Zhu Shao-ping","Former Director of the Financial and Economic Commission of the NPC The Author of several policy and legal","Wu Zhengkuan","China marketing guru Superspeaker","Shi Yan","China's top 10 planning lecturers Brand China Deputy Secretary General Founder of Dream Works Project",
"Full Stack Development Engineer Blockchain Technology Enthusiast Digital Currency Early Holder","Shen XiaoYu","FullStackdeveloper  Advanced Algorithmic Engineer  Proficient in java/C/C++/Python   Research Fellow of the ETH, EOS block chain system",
"Liu Xu","Block chain senior architect Encryption algorithm senior engineer A research fellow of the block chain consensus algorithm Research Fellow of the ETH, EOS block chain system",
"Zhang Tao","JLL investors Block chain investors","Wu ji","JLL investors  Chairman of Hua Ying holding group"],
    num = 37;
    for(var i = 0; i < num; i++) {
      var item = document.getElementsByClassName('lang'+ i)[0],
      test = document.getElementsByClassName('lang'+ i)[1];
      if( item !== undefined ) {
        if (!step) {
          item.innerHTML = langZ[i]
        } else {
          item.innerHTML = langY[i]
        }
      }
      if (test !== undefined) {
        if (!step) {
          
          test.innerHTML = langZ[i]
        } else {
          test.innerHTML = langY[i]
        }
      }
    }
   }
})();
