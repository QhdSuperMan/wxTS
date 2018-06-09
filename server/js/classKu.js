var classKu = (function(){
    var obj = {
        // 验证class
        hasClass: function(el, className) {
            var classBox = el.getAttribute('class').split(' ')
            if (classBox.indexOf(classname) === -1 ) {
                return false
            } else {
                return true
            }
        },
        //添加class
        addClass: function (el, className) {
            var classBox = el.getAttribute('class').split(' ')
            if (classBox.indexOf(className) != -1) {
                return
            }
            classBox.push(className);
            el.setAttribute('class', classBox.join(' '))
        },
        // 删除class
        delClass: function (el, className) {
            var classBox = el.getAttribute('class').split(' ');
            var step = classBox.indexOf(className);
            if(step === -1) {
                return false
            } else {
                classBox.splice(step, 1)
                el.setAttribute('class', classBox.join(' '))
            }
        },
        // 节流
        throttel: function (func, day) {
            var timer = false, argu = Array.prototype.splice.call(arguments, 2)
            return function() {
                if(timer) {
                    return
                }
                func.apply(this, argu)
                timer = true
                setTimeout (function () {
                    timer = false
                }, day)
            }
        },
        // 防抖
        shake: function (func, day) {
            var timer, argu = Array.prototype.splice.call(arguments, 2)
            return function() {
                if(timer) {
                    window.clearTimeout(timer)
                }
                timer = setTimeout (function () {
                    func.apply(this, argu)
                }, day)
            }
        },
        // 添加事件，兼容性写法
        addEvent: function (el, someThink, func) {
            if (window.addEventListener) {
                el.addEventListener(someThink, func)
            } else {
                el.attachEvent(`on${someThink}`, func)
            }
        },
        // 移除事件
        removeEvent: function (el, someThink, func) {
            if (window.addEventListener) {
                el.removeEventListener(someThink, func)
            } else {
                el.detachEvent(`on${someThink}`, func)
            }
        },
        // 兼容监听滚轮事件
        mouseScroll: function (el, func) {
            if(el.addEventListener) {
                this.addEvent(el, 'DOMMouseScroll', func)
            }
            el.onmousewheel =  func
        },
        // 获取屏幕滚动的高度
        getScrollTop: function () {
            return document.documentElement.scrollTop | document.body.scrollTop
        },
        // scrollTop 自定义函数
        scrollTop: function (startTop, endTop ,time = 500, s = 5) {
            var num = time / s ,step =endTop -startTop, argu = step / num, timer ,i = 0;
            timer = setInterval(function(){
                i += 1
                startTop += argu
                if(i > num) {
                    window.clearInterval(timer)
                } else {
                    window.scrollTo(0,startTop)
                }
            },s)
        },
        // 获取元素到body的位置
        getOffsetTopByBody: function(el){
            var offsetTop = 0
            while(el && el.tagName !== 'BODY') {
                offsetTop += el.offsetTop
                el = el.offsetParent
            }
            return offsetTop
        },
        // 返回一个值的索引.临时方法
        getValueIndex: function (num, arr, step) {
            for (var i = 0; i < arr.length ; i++) {
                if (arr[i] > num) {
                    return i 
                } else if(arr[i] == num) {
                    if (step) {
                        return i + 1
                    } else {
                        return i
                    }
                }
            }
            return i
        },
        // 全屏浮层 需要在css添加class
        height: window.innerHeight,
        Maskcontroll: false,
        publichMask: function ({context}) {
            var _this = this
            if (!this.Maskcontroll) {
                var framend = document.createDocumentFragment(), 
                box =  document.createElement('div'), content =  document.createElement('div');
                this.addClass(box, 'maskBox')
                this.addClass(content,'maskContent')
                content.innerHTML = context
                content.appendChild(addButton())
                box.style.height = `${this.height}px`
                box.onclick = function (event) {
                    deleteMask(event)
                }
                box.ontouchmove = function (event) {
                    var event = window.event || event || arguments.callee.caller.arguments[0]
                    event.preventDefault()
                }
                content.ontouchmove = function (event) {
                    var event = window.event || event || arguments.callee.caller.arguments[0]
                    event.preventDefault()
                }
                setTimeout(()=>{
                    content.style.transform = 'translate3d(0,0,0)'
                },100)
                framend.appendChild(box)
                framend.appendChild(content)
                document.body.appendChild(framend)
                // 禁止scroll
                this.mouseScroll(box, (event) => { this.stopScroll(event) })
                this.mouseScroll(content, (event) => { this.stopScroll(event)})
                this.Maskcontroll = true
            } else {
                open()
            }
            function addButton () {
                var button = document.createElement('div');
                _this.addClass(button, 'maskButton')
                button.onclick = function (event) {
                    deleteMask(event)
                }
                return button
            }
            function deleteMask (event) {
                var event = window.event || event || arguments.callee.caller.arguments[0]
                var con = document.getElementsByClassName('maskContent')[0],bor = document.getElementsByClassName('maskBox')[0]
                event.stopPropagation()
                con.style.transform = 'translate3d(1920px,0,0)'
                bor.style.display = 'none'
            }
            function open () {
                var con = document.getElementsByClassName('maskContent')[0],bor = document.getElementsByClassName('maskBox')[0]
                con.innerHTML = context
                con.appendChild(addButton())
                con.style.transform = 'translate3d(0,0,0)'
                bor.style.display = 'block'
                bor.style.height = `${_this.height}px`
            }
        },
        // 禁止默认滚动
        stopScroll: function (event) {
            var event = window.event || event || arguments.callee.caller.arguments[0]
            event.preventDefault()
            event.stopPropagation()
            return false
        },
        // 随机数
        random: function (min, max) {
            return (Math.floor(Math.random() * (max - min) + min)) ===0 ? 1 : (Math.floor(Math.random() * (max - min) + min))
        },
        // 获取样式标的 keyframes 
        getKeyFrames:function(index){
            var styleSheet = document.styleSheets[index], keyframesRule = [];
            [].slice.call(styleSheet.cssRules).forEach(function(item){
                if (item.type === 7) {
                keyframesRule.push( item );
                }
            })
            return keyframesRule;
        },
        // 获取当前时间
        getTimes: function () {
            var date = new Date(),result = {}
            result.h = date.getHours();
            result.m = date.getMinutes();
            result.s = date.getSeconds();
            return result
        },
        // 随机正负数
        zf:function () {
            return Math.random() > 5 ? '' : '-'
        },
        // 计算两点间距离 y2 - y1 + x2 - x1 开平方
        computedTwoLink: function (y2, y1 , x2, x1) {
            return Math.sqrt((Math.pow(Math.abs(y2 - y1), 2) + Math.pow(Math.abs(x2 - x1), 2)))
        },
        // 星空连线 参数 球的数量 连线的半径
        canvasBG: function (canvas, sum = 100 , radius = 100) {
            //初始化变量
            if (window.innerWidth < 1200) {
                canvas.style.display = 'none'
            }
            var cxt = canvas.getContext('2d'),width = window.innerWidth, height = window.innerHeight,box = [],clent = {x:1000,y:1000};
            function iniaical () {
                width = window.innerWidth
                height = 840
                canvas.width = width
                canvas.height = height
            }
            function iniaicalBox () {
                box = []
                for(var i = 0; i < sum; i++) {
                    box.push(new ball())
                }
            }
            iniaical();
            iniaicalBox()
            // 小球类
            function ball(x, y, speed){
                this.x = x ? x : classKu.random(0, width);
                this.y = y ? y : classKu.random(0, height);
                this.r = 2;
                this.speedX =  (classKu.random(-1,2) ===0 ? 1 :classKu.random(-1,2) ) - 0;
                this.speedY =  (classKu.random(-1,2) ===0 ? 1 :classKu.random(-1,2) ) - 0;
                this.move = function () {
                    if (this.x + this.speedX >= width) {
                        this.x = width;
                        this.speedX = - this.speedX
                    } else if(this.x + this.speedX <= 0 ){
                        this.x = 0;
                        this.speedX = - this.speedX
                    } else {
                        this.x += this.speedX;
                    }
                    if (this.y + this.speedY >= height) {
                        this.y = height;
                        this.speedY = - this.speedY
                    } else if (this.y + this.speedY <= 0 ) {
                        this.y = 0;
                        this.speedY = - this.speedY
                    } else {
                        this.y += this.speedY;
                    }
                };
                this.draw =  function () {
                    cxt.beginPath();
                    cxt.fillStyle = 'rgba(255,255,255,0.3)';
                    cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, 0, 0);
                    cxt.fill()
                    cxt.closePath();
                }
            }
            function animate() {
                cxt.clearRect(0,0,width,height);
                box.forEach((val) => {
                    val.draw();
                    for(var i = 0; i < box.length; i++) {
                        if(classKu.computedTwoLink(box[i].y, val.y, box[i].x, val.x) < radius) {
                            cxt.beginPath();
                            cxt.moveTo(box[i].x, box[i].y)
                            cxt.lineTo(val.x, val.y)
                            cxt.lineWidth = 0.5
                            cxt.strokeStyle = "rgba(255,255,255,0.3)";
                            cxt.stroke();
                            cxt.closePath();
                        }
                        if (classKu.computedTwoLink(clent.y, val.y, clent.x, val.x) < radius) {
                            cxt.beginPath();
                            cxt.moveTo(clent.x, clent.y)
                            cxt.lineTo(val.x, val.y)
                            cxt.lineWidth = 0.05
                            cxt.strokeStyle = "rgba(255,255,255,0.1)";
                            cxt.stroke();
                            cxt.closePath();
                        }
                    }
                    val.move();
                })
                setTimeout(function(){
                    animate()
                }, 30)
            }
            canvas.onclick = function (event) {
                var event = window.event || event || arguments.callee.caller.arguments[0];
                if(box.length > 200) {
                    return 
                }
                for(var i = 0; i < 10; i++) {
                    box.push(new ball(event.clientX, event.clientY))
                }
            }
            canvas.onmousemove = function (event) {
                var event = window.event || event || arguments.callee.caller.arguments[0];
                clent.x = event.clientX;
                clent.y = event.clientY;
            }
            canvas.obmouseout = function (event) {
                clent.x = 10000;
                clent.y = 10000;
            }
            animate()
            classKu.addEvent(window,'resize', classKu.throttel(function() {
                iniaical();
                iniaicalBox()
            },50))
        },
        // 临时方法 main 方法的滚动
        scrollMain(img, text, box) {
            function getIndex () {
                for (var i = 0; i < box.length; i++) {
                    if (classKu.getScrollTop() + 900 > box[i]   && classKu.getScrollTop() + 600 <  (box[i + 1] === undefined ? 10000 : box[i + 1] )) {
                        return i
                    }
                }
            }
            var i = getIndex ()
            if( i !== undefined ) {
                for(var a = 0; a < img.length; a ++) {
                    if (a > i) {
                        this.delClass(img[a], 'active')
                    } else {
                        this.addClass(img[a], 'active')
                    }
                }
                for(var a = 0; a < text.length; a ++) {
                    if (a > i) {
                        this.delClass(text[a], 'active')
                    } else {
                        this.addClass(text[a], 'active')
                    }
                }
            } else {
                this.delClass(img[0], 'active')
                this.delClass(text[0], 'active')
            }
        }
     }
    return obj
})()