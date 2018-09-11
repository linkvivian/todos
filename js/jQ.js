$(document).ready(function(){
  $('#add-todo-item input').keypress(function () {
    if ($('#add-todo-item input').val() != "" && event.keyCode == 13) {
      $('#dragContainer').show();
      $('#dragContainer').addClass('add-todo-item');
      var $newTodo = $(' <div class="add-item" draggable="true">\n' +
        '     <span class="use-icon1">\n' +
        '          <svg class="icon eglass-circle" aria-hidden="true">\n' +
        '              <use xlink:href="#icon-circle"></use>\n' +
        '              <svg class="icon check" aria-hidden="true">\n' +
        '                  <use xlink:href="#icon-check"></use>\n' +
        '              </svg>' +
        '          </svg>\n' +
        '      </span>\n' +
        '      <span class="todo-text">' +  '</span>\n' +
        '      <span class="use-icon2">\n' +
        '          <svg class="icon delete" aria-hidden="true">\n' +
        '              <use xlink:href="#icon-del"></use>\n' +
        '          </svg>\n' +
        '      </span>\n' +
        '  </div>');
      $newTodo.css('display','flex');
      $newTodo.fadeIn(400);
      $('#editor').before($newTodo);
      $('#dragContainer').children().eq($('#dragContainer').children().length-2).children().eq(1).text($('#add-todo-item input').val());
      $('#add-todo-item input').val('');
      $('#editor').fadeIn(400);
      $('#selectAll').css('visibility','visible');
      if($('.complete span').css('borderWidth') != '1px' && $('.active span').css('borderWidth') != '1px'){
        $('.all span').addClass('box');
      }

      if($('.complete span').css('borderWidth') == '1px'){
        $newTodo.hide();
      }
      $('.left span b').html($('.add-item').length - $('.complete-item').length);
    }
  });
});

//事件冒泡
$('#add-todo').bind('click', function (event) {
  var $target = $(event.target);
//   console.log($target.parent().html().trim() == '<use xlink:href="#icon-del"></use>')
  //删除
  if($target.parent().html().trim() == '<use xlink:href="#icon-del"></use>') {
    $target.parent().parent().parent().slideUp(200);
    $target.parent().parent().parent().css('opacity', '0');
    $target.parent().parent().parent().removeClass('add-item');
    $target.parent().parent().parent().removeClass('complete-item');
    $('.left span b').html($('.add-item').length - $('.complete-item').length);
  }

  //勾选
  if($target.children().eq(1).html().trim() == '<use xlink:href="#icon-check"></use>') {
    $target.parent().next().toggleClass('text-shift');
    $target.parent().parent().toggleClass('complete-item');
    if ($target.parent().next().hasClass('text-shift')) {
      $target.children().eq(1).show();
    } else {
      $target.children().eq(1).hide();
    }
    $('.left span b').html($('.add-item').length - $('.complete-item').length);

    //有未完成事项，就显示清除
    if ($('.complete-item').length > 0) {
      $('.clear').css('visibility', 'visible');
    }
    //所有和完成的数量不同，全选箭头不变
    if ($('.complete-item').length != $('.add-item').length) {
      $('.down').css('opacity', '0.2');
    }

    //没有任何事项，还原刚开始的版本
    if ($('.add-item').length == 0) {
      $('#selectAll').css('visibility', 'hidden');
      $('.down').css('opacity', '0.2');
      $('#editor').hide();
      $('.clear').css('visibility', 'hidden');
      $('#add-todo-item input').val('');
    }

    //在不同界面的勾选或删除
    //1.active界面
    if ($('.active span').css('borderWidth') == '1px') {
      if ($target.children().eq(1).html().trim() == '<use xlink:href="#icon-check"></use>') {
        $target.parent().next().toggleClass('text-shift');
        $target.parent().parent().addClass('complete-item');
        $target.children().eq(1).show();
        $target.parent().parent().hide();
      }
      $('.left span b').html($('.add-item').length - $('.complete-item').length);
    }
    //2.complete界面
    if ($('.complete span').css('borderWidth') == '1px') {
      if ($target.children().eq(1).html().trim() == '<use xlink:href="#icon-check"></use>') {
        $target.parent().next().toggleClass('text-shift');
        $target.parent().parent().removeClass('complete-item');
        $target.children().eq(1).hide();
        $target.parent().parent().hide();
      }
      $('.left span b').html($('.add-item').length - $('.complete-item').length);
    }
  }
});
//all界面
$('.all').click(function () {
  $('.add-item').css('display', 'flex');
  $('.all span').addClass('box');
  $('.active span').removeClass('box');
  $('.complete span').removeClass('box');
});

//切换操作界面
//active界面
$('.active').click(function () {
  $('.active span').addClass('box');
  $('.all span').removeClass('box');
  $('.complete span').removeClass('box');
  $('.complete span').css('borderWidth', 'none');
  $('.add-item').css('display', 'flex');
  $('.complete-item').hide();
});

//complete界面
$('.complete').click(function () {
  $('.add-item').hide();
  $('.complete-item').css('display', 'flex');

  $('.complete span').addClass('box');
  $('.active span').removeClass('box');
  $('.all span').removeClass('box');
});

// clear操作
$('.clear').click(function () {
  $('.complete-item').remove();
  if($('.add-item').length == 0){
    $('#selectAll').css('visibility','hidden');
    $('.down').css('opacity','0.2');
    $('#editor').hide();
    $('.clear').css('visibility','hidden');
    $('#add-todo-item input').val('');
  }
});


//全选或收起操作
$('#selectAll').click(function () {
  //all界面的全选，全选或全不选
  if($('#selectAll').css('opacity') == '0.2'){
    $('#selectAll').css('opacity', '0.6');
    if ($('.all span').css('borderWidth') == '1px'){
      for(var i = 0; i < $('.add-item').length; i++) {
        $('.add-item').eq(i).addClass('complete-item');
        $('.add-item').eq(i).children().first().children().first().children().eq(1).show();
        $('.add-item').eq(i).children().eq(1).addClass('text-shift');
      }
    }
  }else{
    $('#selectAll').css('opacity', '0.2');
    if ($('.all span').css('borderWidth') == '1px'){
      for(var i = 0; i < $('.add-item').length; i++) {
        $('.add-item').eq(i).removeClass('complete-item');
        $('.add-item').eq(i).children().first().children().first().children().eq(1).hide();
        $('.add-item').eq(i).children().eq(1).removeClass('text-shift');
      }
    }
  }
  $('.left span b').html($('.add-item').length - $('.complete-item').length);
//active界面
  if ($('.active span').css('borderWidth') == '1px' && $('#selectAll').css('opacity') == '0.6') {
    for (var i = 0; i < $('.add-item').length; i++) {
      $('.add-item').eq(i).addClass('complete-item');
      $('.add-item').eq(i).children().first().children().first().children().eq(1).show();
      $('.add-item').eq(i).children().eq(1).addClass('text-shift');
      $('.add-item').eq(i).hide();
    }
    $('.left span b').html($('.add-item').length - $('.complete-item').length);
  } else if($('.active span').css('borderWidth') == '1px' && $('#selectAll').css('opacity') == '0.2'){
    for (var i = 0; i < $('.add-item').length; i++) {
      $('.complete-item').children().first().children().first().children().eq(1).hide();
      $('.complete-item').children().eq(1).removeClass('text-shift');
      $('.add-item').eq(i).removeClass('complete-item');
      $('.add-item').eq(i).show();
      $('.complete-item').hide();
      $('.left span b').html($('.add-item').length - $('.complete-item').length);
    }
  }
//complete界面
  if ($('.complete span').css('borderWidth') == '1px') {
    if ($('#selectAll').css('opacity') == '0.6') {
      for (var i = 0; i < $('.add-item').length; i++) {
        $('.add-item').eq(i).addClass('complete-item');
        $('.add-item').eq(i).children().first().children().first().children().eq(1).show();
        $('.add-item').eq(i).children().eq(1).addClass('text-shift');
        $('.complete-item').show();
      }
      $('.left span b').html(0);
    } else if ($('#selectAll').css('opacity') == '0.2') {
      for (var i = 0; i < $('.add-item').length; i++) {
        $('.add-item').eq(i).removeClass('complete-item');
        $('.add-item').eq(i).children().first().children().first().children().eq(1).hide();
        $('.add-item').eq(i).children().eq(1).removeClass('text-shift');
        $('.add-item').show();
      }
      $('.left span b').html($('.add-item').length);
    }
  }

  if($('.complete-item').length > 0){
    $('.clear').css('visibility','visible');
  }
});

//换肤
$('.images').click(function (e) {
  if(e.target.tagName == 'IMG') {
    // alert(1)
    $('body').css('backgroundImage', 'url(' + e.target.src + ')');
  }
});

//编辑,清空时相当于删除
$('#add-todo').bind('dblclick', function (event) {
  var $target = $(event.target);
  if ($target.hasClass('todo-text')) {
    $target.prop('contentEditable', "true");
    $target.focus();
    $target.css('outline', 'none');
    $target.keypress(function (e) {
      if(e.keyCode == 13) {
        $(e.target).removeAttr('contentEditable');
        if($(e.target).text().trim() == ''){
          $(e.target).parent().remove();
        }
      }
      $('.left span b').html($('.add-item').length);
    });
  }
});

//拖拽事件
var start, end;
//拖拽元素
$("#dragContainer").bind("dragstart", function (e) {
  if($(e.target).hasClass('add-item')){
    start = $(e.target);
  }
});
$("#dragContainer").bind("dragenter", function (e) {
  end = $(e.target);
  end.parent().before(start);
});
//nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
window.onbeforeunload = function () {
  $(function postData() {
    var req = new XMLHttpRequest();
    req.open("POST", 'http://localhost:3000/customers', false);
    req.setRequestHeader("Content-Type", "application/json");
    var a = $('#todoContainer').html();
    a = {
      'id': id,
      'content': a
    };
    var b = JSON.stringify(a);
    req.send(b);
  })
};

//登陆注册
$('.tick-word').click(function () {
  this.toggleClass('tick-shift');
});

var lr = $('#login-register'),
  login = $('.loginItem'),
  register = $('.register'),
  login1 = $('.loginItem1'),
  register1 = $('.register1'),
  setUsername = $('#set-username'),
  setPassword = $('#set-password'),
  logErrTips = $('.info'),
  rgstErrTips = $('.rginfo'),
  ls = $('#login-submit'),
  rs = $('#register-submit'),
  rgUser = $('#username'),
  rgPass = $('#password');

var loginView = $('#loginView');
var registerView = $('#registerView');
login.click(function () {
  loginView.show();
  registerView.hide();
});

register.click(function () {
  loginView.hide();
  registerView.show();
});

login1.click( function () {
  loginView.show();
  registerView.hide();
});

register1.click(function () {
  loginView.hide();
  registerView.show();
});

ls.click(function () {
  if(setUsername.val() == '') {
    logErrTips.html("请输入用户名");
  }else if(setPassword.val() == '') {
    logErrTips.html("请输入密码");
  }
});

rs.click(function () {
  if(rgUser.val() == '') {
    rgstErrTips.html("用户名不能为空");
  } else if(rgPass.val() == '') {
    rgstErrTips.html("密码不能为空");
  }else if(localStorage.getItem(rgUser.value)) {
    rgstErrTips.html('该用户名已存在！');
  } else {
    rgstErrTips.html('注册成功！');
  }
});

var exit = $('.exit');
exit.click(function () {
  lr.hide();
});

//local storage当地缓存(永久缓存，刷新页面不会丢失)
var h = 0, j = 0, d = 0, id;

rs.click(function () {
  if(rgstErrTips.html() == '注册成功！') {
    var username = rgUser.val();
    var password = rgPass.val();
    localStorage.setItem(username, h++);
    localStorage.setItem(password, j++);
    id = username;
  }

  setTimeout(function () {
    rgUser.val('');
    rgPass.val('');
    rgstErrTips.html();
    $('#lorg').hide();
    $('#exit-logout').show();
    $('#login-register').hide();
  },250);
});

ls.click(function () {
  if(setUsername.val() != '' && setPassword.val() != '') {
    var userName = setUsername.val();
    var passWord = setPassword.val();
    if(localStorage.getItem(userName) && localStorage.getItem(passWord)
      && localStorage.getItem(userName) === localStorage.getItem(passWord)) {
      $(function getData() {
        var req = new XMLHttpRequest();
        req.open("GET", 'http://localhost:3000/customers', true);
        req.send();
        req.onload = function(){
          var json = JSON.parse(req.responseText);
          for(var i = 0, len = json.length; i < len; i++){
            if(json[i].id == userName){
              d = i;
              break;
            }
          }
          var content = json[d].content;
          id = json[d].id;
          if (content != null) {
            $('#todoContainer').html(content);
            reloadAbleJSFn("../js/iconfont.js");
            reloadAbleJSFn("../js/jQ.js");
          }
        };
      })
      logErrTips.html('登陆成功！');

      setTimeout(function () {
        setUsername.val('');
        setPassword.val('');
        logErrTips.html('');
        $('#lorg').hide();
        $('#exit-logout').show();
        $('#login-register').hide();
      },250);
    } else {
      logErrTips.html('用户名或密码错误！');
    }
  }
});

// 登陆注册的操作
function openLogin() {
  lr.show();
  loginView.show();
  registerView.hide();
}

function openRegister() {
  lr.show();
  loginView.hide();
  registerView.show();
}

//退出登陆，注销操作
function exitLogin() {
  $(function postData() {
    var req = new XMLHttpRequest();
    req.open("POST",'http://localhost:3000/customers',true);
    req.setRequestHeader("Content-Type","application/json");
    var a = $('#todoContainer').html();
    a = {
      'id': id,
      'content': a
    };
    console.log(a)
    var b = JSON.stringify(a);
    req.send(b);
  })
  lr.show();
  loginView.show();
  registerView.hide();
  rgUser.val('');
  rgPass.val('');
  rgstErrTips.html('');
}

function logOut() {
  if(confirm("您确定要注销当前账户吗？")) {
    localStorage.removeItem(id);
    id = null;
    $('#todoContainer').html('<div id="add-todo">\n' +
      '        <div id="add-todo-item" class="add-todo-item">\n' +
      '        <span>\n' +
      '            <svg class="icon down" aria-hidden="true">\n' +
      '                <use xlink:href="#icon-down"></use>\n' +
      '            </svg>\n' +
      '        </span>\n' +
      '            <input type="text" placeholder="What needs to be done?" autofocus>\n' +
      '        </div>\n' +
      '\n' +
      '        <div id="dragContainer">\n' +
      '            <div id="editor" draggable="false" style="visibility: hidden">\n' +
      '                <div class="left"><span><b></b>    items left</span></div>\n' +
      '                <div class="all"><span>All</span></div>\n' +
      '                <div class="active"><span>Active</span></div>\n' +
      '                <div class="complete"><span>Complete</span></div>\n' +
      '                <div class="clear"><span>Clear completed</span></div>\n' +
      '            </div>\n' +
      '        </div>\n' +
      '    </div>');
    reloadAbleJSFn("../js/iconfont.js");
    reloadAbleJSFn("../js/jQ.js");
    $('#login-register').show();
  }
}

function reloadAbleJSFn(newJS)
{
  var scriptObj = document.createElement("script");
  scriptObj.src = newJS;
  scriptObj.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(scriptObj);
}