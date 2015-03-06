function ck(file) {
    $(document).ready(function(){
        var str = $('#script_body').text();
        $.getJSON(file, function(json){
            var def = {
                tooltipsc: $('#tooltipscript').text(),
                detailsc: $('#detailscript').text(),
                armysc: $('#armyscript').text()
            };
            var t = doT.template(str, undefined, def);
            $('#content').html(t(json)).ready(function(){
                if (json.attackers.length < 2){
                    $('.multi-army').css({'display':'none'});
                    $('.single-army').css({'display':'block'});
                }
                if (json.buildings.length === 0){
                    $('.destroy, .damage-block').css({'display':'none'});
                }
                if (json.loot.length === 0){
                    $('.loot, .loot-block').css({'display':'none'});
                }
                if (json.defenders.length === 0){
                    $('.def-persons, .def-title, .def-army').css({'display':'none'});
                    $('.none').css({'display':'block'});
                }
                get_modal();
                button_anim();
                tooltip(json);
                army_show();
            });
        });
    });
}

// Открытие/закрытие дополнительных окон
function get_modal(){
    console.log("Module window is active");
    $('.main')
        .css("display", "block")
        .animate({opacity: 1}, "slow", function(){
            $(this).find('.close, .close2').click(function(){
                $('.main, .modal-report')
                    .animate({opacity:0}, "slow", function(){
                    $(this).css("display", "none");
                });
            });
        });
    $(".share").click(function(){
        myshow($('.modal-report'));
        $('.agreed, .close3').click(function(){
            myhide($('.modal-report'));
        });
        $('.report_number').text('[r'+getRandom(100000).toString()+']');
    });
    $('.person').click(function(){
        var detail = $(this).nextAll('.details-army');
        console.log(detail);
            detail
                .css({"display":"block"})
                .animate({opacity: 1}, "slow", function(){
                $('.close4').click(function(){
                    detail.animate({opacity:0}, "slow", function(){
                        $(this).css("display", "none");
                    });
                });
            });
    });
    function myshow(showobject){
        showobject
            .css("display", "block")
            .animate({opacity: 1}, "slow");
    }
    function myhide(hideobject){
        hideobject
            .animate({opacity:0}, "slow", function(){
                $(this).css("display", "none");
            });
    }
}

//Выдвигающееся окно для большой армии
function army_show(){
    $(".show-army-button").click(function(){
        $(this).css({'display':'none'});
        var army = $(this).parents('.army');
        var xw = army.outerWidth(true);
        var xh = army.outerHeight(true);
        army
            .css({
                'position':'absolute',
                'z-index':'10',
                'width':xw,
                'height':xh
            })
            .animate({height: xh*3}, "slow", function(){
                var scrollbox = $(this).children('.scrollbox');
                var sc = $(this).children('.scroll');
                sc.css({'visibility':'visible'});
                var t = 5;
                $(this).mousewheel(function(event){
                    var step = 30;
                    if (event.deltaY<0) {
                        if (t+step<90) {
                            t += step;
                        }
                        else{
                            t = 90;
                        }
                        sc.children('.drag').css({'top': t+"%"});
                        scrollbox.scrollTop(t);
                    }
                    else{
                        if (t-step>5) {
                            t -= step;
                        }
                        else{
                            t = 5;
                        }
                        sc.children('.drag').css({'top': t+"%"});
                        scrollbox.scrollTop(t);
                    }
                });
                sc.mousemove(function( event ) {
                    $(this).click(function() {
                        var xt = $(this).position();
                        //console.log(xt.top);
                        //$(this).children('.drag').css({'top': event.pageY-xt.top});
                    });
                });
                var roll = scrollbox.find('.roll');
                roll.css({'display':'block'});
                roll.click(function(){
                    sc.css({'visibility':'hidden'});
                    $(this).css({'display':'none'});
                    army
                        .animate({height: xh}, "slow", function(){
                            $(this).css({
                                'position':'relative',
                                'width': '100%'
                            });
                            $(this)
                                .find('.show-army-button')
                                .css({'display':'block'});
                        });
                });
            });
    });
}

//Встплывающее окно
function tooltip(json){
    console.log("Tooltip enable");
    $('.person').hover(function(){
        var x = $(this).position();
        var xh = $(this).outerHeight(false);
        $(this).next(".tooltip").css({
            'visibility':'visible',
            'top': x.top+xh,
            'left': x.left
        });
    },function(){
        $(this).next(".tooltip").css({
            'visibility':'hidden',
            'top': 'auto',
            'left': 'auto'
        });
    });
}

function getRandom(size){
    return Math.floor(Math.random()*size);
}

//Анимация кнопок
function button_anim(){
    $(document).ready(function(){
        console.log("Button animation is active");
        var agreed = $(".agreed");
        var repeat = $(".repeat");
        var archive = $(".archive");
        var close2 = $(".close2");
        agreed.hover(agreed_hover, agreed_default);
        agreed.click(agreed_on_click);
        repeat.hover(repeat_hover, repeat_default);
        repeat.click(repeat_on_click);
        archive.hover(archive_hover, archive_default);
        archive.click(archive_on_click);
        close2.hover(close2_hover, close2_default);
        close2.click(close2_on_click);
    });

    function agreed_on_click(){
        $(this).css("background-position","0 -300px");
        $(".bgl4").css("background-position","-63px -60px");
        $(".bgr4").css("background-position","-80px -60px");
    }

    function agreed_default(){
        $(this).css("background-position","0 -240px");
        $(".bgl4").css("background-position","-63px 0");
        $(".bgr4").css("background-position","-80px 0");
    }

    function agreed_hover(){
        $(this).css("background-position","0 -260px");
        $(".bgl4").css("background-position","-63px -20px");
        $(".bgr4").css("background-position","-80px -20px");
    }

    function repeat_on_click(){
        $(this).css("background-position","0 -300px");
        $(".bgl1").css("background-position","-63px -60px");
        $(".bgr1").css("background-position","-80px -60px");
    }

    function repeat_default(){
        $(this).css("background-position","0 -240px");
        $(".bgl1").css("background-position","-63px 0");
        $(".bgr1").css("background-position","-80px 0");
    }

    function repeat_hover(){
        $(this).css("background-position","0 -260px");
        $(".bgl1").css("background-position","-63px -20px");
        $(".bgr1").css("background-position","-80px -20px");
    }

    function archive_on_click(){
        $(this).css("background-position","0 -80px");
        $(".bgl2").css("background-position","0 0");
        $(".bgr2").css("background-position","-16px 0");
    }

    function archive_default(){
        $(this).css("background-position","0 -220px");
        $(".bgl2").css("background-position","-31px -60px");
        $(".bgr2").css("background-position","-48px -60px");
    }

    function archive_hover(){
        $(this).css("background-position","0 -160px");
        $(".bgl2").css("background-position","-31px 0");
        $(".bgr2").css("background-position","-48px 0");
    }

    function close2_on_click(){
        $(this).css("background-position","0 -220px");
        $(".bgl3").css("background-position","-31px -60px");
        $(".bgr3").css("background-position","-48px -60px");
    }

    function close2_default(){
        $(this).css("background-position","0 -160px");
        $(".bgl3").css("background-position","-31px 0px");
        $(".bgr3").css("background-position","-48px 0px");
    }

    function close2_hover(){
        $(this).css("background-position","0 -200px");
        $(".bgl3").css("background-position","-31px -40px");
        $(".bgr3").css("background-position","-48px -40px");
    }
}