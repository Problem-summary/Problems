(function(win, $, lib){

    function levelsChoices(obj){
        //入参
        this.ids = (obj.ids != null) ? obj.ids : ['industryType','industryTypeSec','industryTypeThd'];
        this.names = (obj.names != null) ? obj.names : ['industryTypeName', 'industryTypeSecName', 'industryTypeThdName','agentName'];//参数a代表的是传入的1-（n-1）层取值的属性名
        this.objs = (obj.objs != null) ? obj.objs : ['firstTypes', 'secondTypes'];//存第2-（n-1）层对象的属性名
        this.id = (obj.id != null) ? obj.id : 'agentId';//存最后一层对象的ID
        this.name = (obj.name != null) ? obj.name : 'agents';//存最后一层对象的属性名
        this.api = (obj.api != null) ? obj.api : "";//接口名
        this.data = (obj.data != null) ? obj.data : null;//如果没传接口这个参数的话,e代表的是传入的json数据
        this.props = (obj.props != null) ? obj.props : null;//预览传入的参数，如果没传，那么默认每层都是选中第一个进行显示；如果传入该参数，那么预览的状态就是传入的状态
        this.func = (obj.func != null) ? obj.func : function () {};//回调函数，默认为空
        //出参returnArr[[返回的第0层]，【返回的第一层】，～，【返回的第n层】]
        this.returnArr=[];
        this.getData(obj);
    }

    levelsChoices.prototype = {
        //删除type行数的所有点击样式，并给点击的按钮添加样式
        removeAndAddClass : function (element, type) {
            for (var i = 0, len = $('li').length; i < len; i++) {
                if ($($('li')[i]).attr('type') == type) {
                    $($('li')[i]).find("span").removeClass("selected");
                }
            }
            element.find("span").addClass("selected");
        },
        //将第type层全部隐藏
        displayNone : function (type) {
            for (var i = 0, len = $('li').length; i < len; i++) {
                if ($($('li')[i]).attr('type') == type) {
                    $($('li')[i]).css('display', 'none');
                }
            }
        },
        //将第四层中的parent的第一层id等于传入id的li显示
        displayForthType : function (id) {
            var that=this;
            that.displayNone(4);
            for (var i = 0, len = $('li').length; i < len; i++) {
                if ($($('li')[i]).attr('type') == 4) {
                    if ($($('li')[i]).attr('parent').split("-")[0] == id) {
                        $($('li')[i]).css('display', 'block');
                    }
                }
            }
        },
        //将type层的下一层隐藏
        displayNextType : function (type, path) {
            var that=this;
            that.displayNone(type);
            var arr = [];
            for (var i = 0, len = $('li').length; i < len; i++) {
                if ($($('li')[i]).attr("type") == type) {
                    if ($($('li')[i]).attr('parent') == path) {
                        $($('li')[i]).css('display', 'block');
                        arr.push($($('li')[i]));
                    }
                }
            }
            return arr[0];
        },
        //选中所点击的圆圈所对应li的所有孩子
        search_byId : function (id, type) {
            for (var i = 0, len = $('li').length; i < len; i++) {
                if ($($('li')[i]).attr('parent').split("-")[type - 1] == id && $($('li')[i]).attr('type') > type) {
                    $($('li')[i]).find("i").addClass('ok');
                    if ($($('li')[i]).attr('type') == 4) {
                        $($('li')[i]).find("span").addClass('selected');
                    }
                }
            }
        },
        //移除所点击的圆圈所对应li的所有孩子的选中状态
        remove_byId : function (id, type) {
            for (var i = 0, len = $('li').length; i < len; i++) {
                if ($($('li')[i]).attr('parent').split("-")[type - 1] == id && $($('li')[i]).attr('type') > type) {
                    $($('li')[i]).find("i").removeClass('ok');
                    if ($($('li')[i]).attr('type') == 4) {
                        $($('li')[i]).find("span").removeClass('selected');
                    }
                }
            }

        },

        //最开始的初始化函数
        init : function () {
            $("li")[0].click();
        },

        //渲染函数
        render : function (level1, level2, level3, level4) {
            var obigDiv = $('<div class="big-div"></div>');
            var arr = [level1, level2, level3, level4];
            function renderUl(arr) {
                var odiv = $('<div class="small-div"></div>');
                var oul = $('<ul></ul>');
                for (var i = 0, len = arr.length; i < len; i++) {
                    var oli = $('<li idnum=' + arr[i].idnum + ' idname=' + arr[i].idname + ' value=' + arr[i].value + ' isLast=' + arr[i].isLast + ' isActive=' + arr[i].isActive + ' isChecked=' + arr[i].isChecked + '  isSomeChecked=' + arr[i].isSomeChecked + ' path=' + arr[i].path + ' parent=' + arr[i].parent + ' type=' + arr[i].type + '><span>' + arr[i].value + '</span><i></i></li>');
                    oul.append(oli.get(0));
                }
                odiv.append(oul.get(0));
                return odiv;
            }
            for (var i = 0, len = arr.length; i < len; i++) {
                obigDiv.append(renderUl(arr[i]).get(0));
            }
            $('body').append(obigDiv.get(0));

        },

        //所有li的点击切换事件处理函数
        click : function () {
            var that=this;
            $('div').on('click', 'li', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var idnum = $(this).attr('idnum');
                var path = $(this).attr('path');
                var parent = $(this).attr('parent');
                var type = $(this).attr('type');
                if (type == 1) {
                    that.removeAndAddClass($(this), 1);
                    //切第四层
                    that.displayForthType(idnum);
                    //切2、3层
                    var left = that.displayNextType(2, path);
                    if (left) {
                        that.displayNextType(3, left.attr("path"));
                    } else {
                        that.displayNone(3);
                    }
                    that.changeFather(path, parent);
                } else if (type == 2) {
                    that.removeAndAddClass($(this), 2);
                    //切第三层
                    that.displayNextType(3, path);
                    that.changeFather(path, parent);
                } else if (type == 3) {
                    that.removeAndAddClass($(this), 3);
                    that.changeFather(path, parent);
                } else if (type == 4) {
                    $(this).find('span').toggleClass('selected');
                    $(this).find('i').toggleClass('ok');
                    that.changeFather(path, parent);
                } else {

                }
            });
        },

        //所有圆圈的全选点击事件
        circleClick : function () {
            var that=this;
            $("div").on("click", 'i', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var type = $(this.parentNode).attr('type');
                var id = $(this.parentNode).attr('idnum');
                var path = $(this.parentNode).attr('path');
                var parent = $(this.parentNode).attr('parent');
                if (type != 4) {
                    if (!$(this).hasClass('ok')) {
                        $(this).addClass('ok');
                        $(this.parentNode).click();
                        that.search_byId(id, type);
                    } else {
                        $(this).removeClass('ok');
                        that.remove_byId(id, type);
                    }
                } else {
                    $(this.parentNode).click();
                }
                that.changeFather(path,parent);
            });

        },

        //得到返回出去的数组的函数
        getReturnArr : function () {
            var that=this;
                var arr = [[], [], [], []];
                for (var i = 0, len = $('li').length; i < len; i++) {
                    var idnum = $($('li')[i]).attr('idnum');
                    var value = $($('li')[i]).attr('value');
                    var path = $($('li')[i]).attr('path');
                    var type = $($('li')[i]).attr('type');
                    if ($($('li')[i]).find('i').hasClass('ok')) {
                        var obj = {};
                        switch (parseInt(type)) {
                            case 1 :
                                obj = {
                                    industryType: idnum,
                                    name: value,
                                    path: path,
                                    type: type
                                };
                                arr[0].push(obj);
                                break;
                            case 2 :
                                ;
                                obj = {
                                    industryTypeSec: idnum,
                                    name: value,
                                    path: path,
                                    type: type
                                };
                                arr[1].push(obj);
                                break;
                            case 3 :
                                obj = {
                                    industryTypeThd: idnum,
                                    name: value,
                                    path: path,
                                    type: type
                                };
                                arr[2].push(obj);
                                break;
                            case 4 :
                                obj = {
                                    agentId: idnum,
                                    name: value,
                                    path: path,
                                    type: type
                                };
                                arr[3].push(obj);
                                break;
                            default :
                                break;
                        }
                    }
                }
                return arr;
        },

        //预览
        yulan : function (props) {

            for (var i = 0, l1 = props.length; i < l1; i++) {
                for (var j = 0, l2 = props[i].length; j < l2; j++) {
                    for (var k = 0, l3 = $('li').length; k < l3; k++) {
                        if (props[i][j].path == $($('li')[k]).attr('path')) {
                            $('li')[k].click();
                        }
                    }
                }
            }
        },

        //控制部分选中的样式
        changeFather : function (path, parent) {
            //不是第一层的时候
            if (path != parent) {
                var childArr = [];
                for (var i = 0, len = $('li').length; i < len; i++) {
                    //记录传入的节点所有的兄弟
                    if ($($('li')[i]).attr('parent') == parent && $($('li')[i]).attr('type') != 1) {
                        childArr.push($('li')[i]);
                    }
                }
                var sum = 0;
                for (var i = 0, length = childArr.length; i < len; i++) {
                    if ($(childArr[i]).find('i').hasClass('ok')) {
                        sum++;
                    }
                }
                for (var i = 0, len = $('li').length; i < len; i++) {
                    //第一层改变方式
                    if ($($('li')[i]).attr('type') == 1 && $($('li')[i]).attr('path') == parent) {
                        if (sum == childArr.length) {
                            $($('li')[i]).find('i').removeClass('ok');
                            $($('li')[i]).find('i').removeClass('sub');
                            $($('li')[i]).find('i').addClass('ok');
                            $('li')[i].click();
                        }

                        else if (sum == 0) {
                            $($('li')[i]).find('i').removeClass('ok');
                            $($('li')[i]).find('i').removeClass('sub');
                            $('li')[i].click();
                        } else {
                            $($('li')[i]).find('i').removeClass('ok');
                            $($('li')[i]).find('i').removeClass('sub');
                            $($('li')[i]).find('i').addClass('sub');
                            $('li')[i].click();
                        }
                    }
                    //第二层以及一下的改变方式
                    if ($($('li')[i]).attr('type') > 1 && $($('li')[i]).attr('path') == parent) {
                        if (sum == childArr.length) {
                            $($('li')[i]).find('i').removeClass('ok');
                            $($('li')[i]).find('i').removeClass('sub');
                            $($('li')[i]).find('i').addClass('ok');
                            $('li')[i].click();
                        } else if (sum == 0) {
                            $($('li')[i]).find('i').removeClass('ok');
                            $($('li')[i]).find('i').removeClass('sub');
                            $('li')[i].click();
                        } else {
                            $($('li')[i]).find('i').removeClass('ok');
                            $($('li')[i]).find('i').removeClass('sub');
                            $($('li')[i]).find('i').addClass('sub');
                            $('li')[i].click();
                        }
                    }
                }
            }
        },

        //对数据的处理过程函数
        processInterfaceData : function(datas){
            var that=this;
            var l=datas.length;
            var level1=[];
            var level2=[];
            var level3=[];
            var level4=[];
            var ids = that.ids;
            var names = that.names;
            var objs = that.objs;
            var id = that.id;
            var name = that.name;
            var props = that.props;
            //处理数据，给数据加上我们需要的属性～
            //给第一层加上属性
            for(var i=0;i<l;i++){
                //给第一层的对象加上属性
                datas[i].parent=datas[i][ids[0]]+'-'+0+'-'+0+'-'+0;
                datas[i].path=datas[i][ids[0]]+'-'+0+'-'+0+'-'+0;
                datas[i].value=datas[i][names[0]];
                datas[i].idname=ids[0];
                datas[i].idnum=datas[i][ids[0]];
                level1.push(datas[i]);
                //给第一层下边的第四层增加属性
                if(datas[i][name]){
                    if(datas[i][name]){
                        for(var j=0;j<datas[i][name].length;j++){
                            datas[i][name][j].parent=datas[i][ids[0]]+'-'+0+'-'+0+'-'+0;
                            datas[i][name][j].path=datas[i][ids[0]]+'-'+0+'-'+0+'-'+datas[i][name][j][id];
                            datas[i][name][j].value=datas[i][name][j][names[3]];
                            datas[i][name][j].idname=id;
                            datas[i][name][j].idnum=datas[i][name][j][id];
                            level4.push(datas[i][name][j]);
                        }
                    }
                }
                // //给第二层添加属性
                var object=datas[i];
                var attr=objs[0];
                if(object[attr]){
                    for(var n=0;n<object[attr].length;n++){
                        //给第二层的对象加上属性
                        object[attr][n].parent=object[ids[0]]+'-'+0+'-'+0+'-'+0;
                        object[attr][n].path=object[ids[0]]+'-'+object[attr][n][ids[1]]+'-'+0+'-'+0;
                        object[attr][n].value=object[attr][n][names[1]];
                        object[attr][n].idname=ids[1];
                        object[attr][n].idnum=object[attr][n][ids[1]];
                        level2.push(object[attr][n]);
                        //给第二层下边的第四层添加属性
                        if(object[attr][n][name]){
                            for(var j=0;j<object[attr][n][name].length;j++) {
                                object[attr][n][name][j].parent = object[ids[0]] + '-' + object[attr][n][ids[1]] + '-' + 0 + '-' + 0;
                                object[attr][n][name][j].path = object[ids[0]] + '-' + object[attr][n][ids[1]] + '-' + 0 + '-' + object[attr][n][name][j][id];
                                object[attr][n][name][j].value = object[attr][n][name][j][names[3]];
                                object[attr][n][name][j].idname = id;
                                object[attr][n][name][j].idnum = object[attr][n][name][j][id];
                                level4.push(object[attr][n][name][j]);
                            }
                        }
                            //给第三层添加属性
                            var object2=object[attr][n];
                            if(object2[objs[1]]){
                                for(var m=0;m<object2[objs[1]].length;m++){
                                    //给第三层的对象添加属性
                                    object2[objs[1]][m].parent=object[ids[0]]+'-'+object[attr][n][ids[1]]+'-'+0+'-'+0;
                                    object2[objs[1]][m].path=object[ids[0]]+'-'+object[attr][n][ids[1]]+'-'+object2[objs[1]][m][ids[2]]+'-'+0;
                                    object2[objs[1]][m].value=object2[objs[1]][m][names[2]];
                                    object2[objs[1]][m].idname=ids[2];
                                    object2[objs[1]][m].idnum=object2[objs[1]][m][ids[2]];
                                    level3.push(object2[objs[1]][m]);
                                    //给第三层下边的第四层添加属性
                                    if(object2[objs[1]][m][name]){
                                        for(var la=0;la<object2[objs[1]][m][name].length;la++){
                                            object2[objs[1]][m][name][la].parent=object[ids[0]]+'-'+object[attr][n][ids[1]]+'-'+object2[objs[1]][m][ids[2]]+'-'+0;
                                            object2[objs[1]][m][name][la].path=object[ids[0]]+'-'+object[attr][n][ids[1]]+'-'+object2[objs[1]][m][ids[2]]+'-'+object2[objs[1]][m][name][la][id];
                                            object2[objs[1]][m][name][la].value=object2[objs[1]][m][name][la][names[3]];
                                            object2[objs[1]][m][name][la].idname=id;
                                            object2[objs[1]][m][name][la].idnum=object2[objs[1]][m][name][la][id];
                                            level4.push(object2[objs[1]][m][name][la]);
                                        }
                                    }
                                }
                            }
                    }
                }
            }
            that.render(level1,level2,level3,level4);
            that.click();
            if(props==null){
                that.init();
            }else{
                that.yulan(props);
                that.init();
            }
            that.circleClick();
        },
        //接收到传入的参数处理函数
        getData : function (obj) {
            var that=this;
            if(obj.api){
                $.ajax({
                    url: obj.api,
                    // data: obj.data || {},
                    type: obj.method || "GET",
                    headers: obj.header || "",
                    dataType: "JSON",
                    success: function (res) {
                        var datas=res.data;
                        that.processInterfaceData(datas);
                        return that.returnArr;
                    },
                    error: function (err, a, b) {
                        obj.error && obj.error(err);
                    }
                });
            }else if(obj.data){
                var datas=obj.data;
                that.processInterfaceData(datas);
                return that.returnArr;
            }else{
                console.log("您的传参有误");
            }
        }
    }
    lib.levelsChoices = levelsChoices;
})(window, jQuery, window['lib'] || (window['lib'] = {}))