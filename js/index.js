window.onbeforeunload = function () {
  (function postData() {
    var req = new XMLHttpRequest();
    req.open("POST", 'http://localhost:3000/customers', false);
    req.setRequestHeader("Content-Type", "application/json");
    var a = todo.innerHTML;
    a = {
      'id': id,
      'content': a
    };
    var b = JSON.stringify(a);
    req.send(b);
  })();
};

var todo = document.getElementById("add-todo"),
    newTodo = document.querySelector("#add-todo-item input"),
    selectAll = document.querySelector(".down"),
    editor = document.getElementById('editor'),
    leftItems = document.querySelector('.left b'),
    clear = document.querySelector('.clear'),
    dragContainer = document.getElementById('dragContainer'),
    addItems,
    completeItems,
    allItems,
    k = 0;

//通用计数
function leftSum() {
  allItems = document.querySelectorAll('.add-item');
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].className == 'add-item') {
      k++;
    }
  }
  leftItems.innerHTML = k;
  k = 0;
}


  newTodo.addEventListener('keypress',fistAdd,false);
    function fistAdd(event) {
    if (newTodo.value.trim() != "" && event.keyCode == 13) {
      var addItem = document.createElement('div');
      addItem.innerHTML =
        ' <div class="add-item" draggable="true">\n' +
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
        '  </div>';

      selectAll.style.visibility = 'visible';
      editor.style.visibility = "visible";
      dragContainer.className = "add-todo-item";
      dragContainer.insertBefore(addItem, editor);
      dragContainer.children[dragContainer.children.length - 2].children[0].children[1].innerText = newTodo.value;
      if (completeBox.style.borderWidth == '1px') {
        addItem.children[0].style.display = 'none';
      }
      newTodo.value = "";
      leftSum();

      if(activeBox.style.borderWidth == '1px' || completeBox.style.borderWidth == '1px') {
        allBox.style.borderWidth = 'none';
      }else {
        allBox.style.cssText = 'border:1px solid rgba(0, 0, 0, 0.4);\n' +
          '    border-radius: 3px;';
      }
    }
  }


    //删除
  todo.addEventListener('click', function (event) {
    if(event.target.classList == 'use-icon2' || event.target.classList == 'icon delete') {

      if( event.target.classList == 'use-icon2') {
        event.target.parentNode.style.display = 'none';
        event.target.parentNode.className = '';
      } else {
        event.target.parentNode.parentNode.style.display = 'none';
        event.target.parentNode.parentNode.className = '';
      }
      leftSum();
    }
  },false);

//勾选
todo.addEventListener('click', function checkItem(event) {
  if(event.target.classList == 'use-icon1' || event.target.classList == 'icon eglass-circle') {
    // alert(event.target.classList)
    if (event.target.classList == 'icon eglass-circle') {
      event.target.children[1].classList.toggle('check-shift');
      event.target.parentNode.nextElementSibling.classList.toggle('text-shift');
      event.target.parentNode.parentNode.classList.toggle('complete-item');
      if(completeBox.style.borderWidth == '1px') {
        event.target.parentNode.parentNode.style.display = 'none';
      }
    } else {
      event.target.children[0].children[1].classList.toggle('check-shift');
      event.target.nextElementSibling.classList.toggle('text-shift');
      event.target.parentNode.classList.toggle('complete-item');
      if(completeBox.style.borderWidth == '1px') {
        event.target.parentNode.style.display = 'none';
      }
    }
  }
  completeItems = document.querySelectorAll('.complete-item');
  if(completeItems.length > 0){
    clear.style.visibility = 'visible';
  }

  leftSum();

  if(allBox.style.borderWidth == '1px' && leftItems.innerText == 0) {
    selectAll.classList.add('selectAll-shift');
  }else if(allBox.style.borderWidth == '1px' && leftItems.innerText != 0){
    selectAll.classList = 'icon down';
  }

  allItems = document.querySelectorAll('.add-item');
  if(allItems.length == 0){
    clear.style.visibility = "hidden";
    selectAll.parentNode.className = 'icon down';
    selectAll.style.visibility = 'hidden';
    editor.style.visibility = "hidden";
    newTodo.value = '';
  }
  // console.log(event.target.children[1].className)
}, false);


var active = document.querySelector('.active'),
   complete = document.querySelector('.complete'),
   all = document.querySelector('.all'),
   activeBox = document.querySelector('.active span');
   completeBox = document.querySelector('.complete span'),
   allBox = document.querySelector('.all span'),
   selectAll =document.querySelector('.down'),
   clear = document.querySelector('.clear');

  //active界面
  todo.addEventListener('click', function () {
    if(activeBox.style.borderWidth == '1px') {
      if (event.target.classList == 'use-icon1' || event.target.classList == 'icon eglass-circle') {
        if (event.target.classList == 'icon eglass-circle') {
          event.target.parentNode.parentNode.className = 'add-item complete-item';
          event.target.parentNode.parentNode.style.display = 'none';
        } else {
          event.target.parentNode.className = 'add-item complete-item';
          event.target.parentNode.style.display = 'none';
        }
      }
      leftSum();
    }
  },false);

  active.addEventListener('click', function () {
    addItems = document.querySelectorAll('.add-item');
    completeItems = document.querySelectorAll('.complete-item');

    for(var i = 0; i < addItems.length; i++) {
      addItems[i].style.display = 'flex';
    }
    for(var i = 0; i < completeItems.length; i++) {
      completeItems[i].style.display = 'none';
    }
    activeBox.style.cssText = 'border:1px solid rgba(0, 0, 0, 0.4);\n' +
      '    border-radius: 3px;';
    completeBox.style.border = 'none';
    allBox.style.border = 'none';
  });

  //all界面
  all.addEventListener('click', function () {
    allItems = document.querySelectorAll('.add-item');
    for(var i = 0; i < allItems.length; i++) {
      allItems[i].style.display = 'flex';
    }
    allBox.style.cssText = 'border:1px solid rgba(0, 0, 0, 0.4);\n' +
      '    border-radius: 3px;';
    activeBox.style.border = 'none';
    completeBox.style.border = 'none';
  });

  //complete界面
  complete.addEventListener('click', function () {
    addItems = document.querySelectorAll('.add-item');
    completeItems = document.querySelectorAll('.complete-item');

    for (var i = 0; i < addItems.length; i++) {
      addItems[i].style.display = 'none';
    }

    for (var i = 0; i < completeItems.length; i++) {
      completeItems[i].style.display = 'flex';
    }
    completeBox.style.cssText = 'border:1px solid rgba(0, 0, 0, 0.4);\n' +
      '    border-radius: 3px;';
    allBox.style.border = 'none';
    activeBox.style.border = 'none';
  },false);

  // clear操作
  clear.addEventListener('click', function () {
    completeItems = document.querySelectorAll('.complete-item');
    for(var i = 0; i < completeItems.length; i++) {
      completeItems[i].style.display = 'none';
      completeItems[i].className = '';
    }

  },false);

  //全选或收起操作

  //all界面的全选，全选或全不选
selectAll.addEventListener('click', function () {
  selectAll.classList.toggle('selectAll-shift');
  allItems = document.querySelectorAll('.add-item');
    if (allBox.style.borderWidth == '1px' && selectAll.classList.contains('selectAll-shift')) {
      for (var i = 0; i < allItems.length; i++) {
        allItems[i].className = 'add-item complete-item';
        allItems[i].children[0].children[0].children[1].classList.add('check-shift');  //svg特殊属性,不可写
        allItems[i].children[1].classList.add('text-shift');
      }
    } else if(allBox.style.borderWidth == '1px' && !selectAll.classList.contains('selectAll-shift')){
        for (var i = 0; i < allItems.length; i++) {
          allItems[i].className = 'add-item';
          allItems[i].children[0].children[0].children[1].classList.toggle('check-shift');  //svg特殊属性,不可写
          allItems[i].children[1].classList.toggle('text-shift');
        }
    }

//active界面
    if (activeBox.style.borderWidth == '1px' && selectAll.classList.contains('selectAll-shift')) {
      for (var i = 0; i < allItems.length; i++) {
        allItems[i].className = 'add-item complete-item';
        allItems[i].children[0].children[0].children[1].classList.add('check-shift');  //svg特殊属性,不可写
        allItems[i].children[1].classList.add('text-shift');
        allItems[i].style.display = 'none';
      }
    } else if(activeBox.style.borderWidth == '1px' && !selectAll.classList.contains('selectAll-shift')){
      for (var i = 0; i < allItems.length; i++) {
        allItems[i].className = 'add-item';
        allItems[i].children[0].children[0].children[1].classList.toggle('check-shift');  //svg特殊属性,不可写
        allItems[i].children[1].classList.toggle('text-shift');
        allItems[i].style.display = 'flex';
      }
    }
//complete界面
    if (completeBox.style.borderWidth == '1px') {
      if (selectAll.classList.contains('selectAll-shift')) {
        for (var i = 0; i < allItems.length; i++) {
          allItems[i].className = 'add-item complete-item';
          allItems[i].children[0].children[0].children[1].classList.add('check-shift');  //svg特殊属性,不可写
          allItems[i].children[1].classList.add('text-shift');
          allItems[i].style.display = 'flex';
        }
      } else if (!selectAll.classList.contains('selectAll-shift')) {
        for (var i = 0; i < allItems.length; i++) {
          allItems[i].className = 'add-item';
          allItems[i].children[0].children[0].children[1].classList.toggle('check-shift');  //svg特殊属性,不可写
          allItems[i].children[1].classList.toggle('text-shift');
          allItems[i].style.display = 'none';
        }
      }
    }
    leftSum();
}
,false);

//编辑,清空时相当于删除
  todo.addEventListener('dblclick', function (event) {
      if (event.target.classList.contains('todo-text')) {
        event.target.contentEditable = "true";
        event.target.focus();
        event.target.style.outline = 'none';
        event.target.addEventListener('keypress', function (e) {
          if(e.keyCode == 13) {
            e.target.contentEditable = "false";
            if(e.target.innerText.trim() == ''){
              e.target.parentNode.className = '';
              e.target.parentNode.style.display = 'none';
            }
          }
          leftSum();
        });
      }
  },false);



  //优先级
  var start, end;
  //拖拽元素
  dragContainer.addEventListener('dragstart', function (event) {
    if(event.target.classList.contains('add-item')){
      start = event.target;
    }
  },false);

  dragContainer.addEventListener('dragenter', function (event) {
    end = event.target;
    dragContainer.insertBefore(start.parentNode, end.parentNode.parentNode);
  },false);


  //因为在除了dragstart,drop
  // 以外的事件，包括dragover,dragenter,dragleave中，
  // drag data store出于安全原因处于保护模式，因此不可访问。失败

//换肤
var changes = document.querySelector('.images');
var body = document.querySelector('body');
changes.addEventListener('click',function (e) {
    if(e.target.tagName == 'IMG') {
      // alert(1)
      body.style.backgroundImage = 'url(' + e.target.src + ')';
    }
  },false);

  //登陆注册
  var tick = document.querySelector('.tickshift');
  tick.onclick = function () {
    tick.classList.toggle('tick-shift');
  }

  var lr = document.getElementById('login-register'),
      login = document.querySelector('.loginItem'),
      register = document.querySelector('.register'),
      login1 = document.querySelector('.loginItem1'),
      register1 = document.querySelector('.register1'),
      setUsername = document.getElementById('set-username'),
      setPassword = document.getElementById('set-password'),
      passwordPattern = /^(?=.*_)(?=.*\d)(?=.*[a-zA-Z]).{6,18}$/,
      logErrTips = document.querySelector('.info'),
      rgstErrTips = document.querySelector('.rginfo'),
       ls = document.getElementById('login-submit'),
       rs = document.getElementById('register-submit'),
       rgUser = document.getElementById('username'),
       rgPass = document.getElementById('password');

  var loginView = document.getElementById('loginView');
  var registerView = document.getElementById('registerView');
  login.addEventListener('click', function () {
    loginView.style.display = 'block';
    registerView.style.display = 'none';
  },false);

  register.addEventListener('click', function () {
    loginView.style.display = 'none';
    registerView.style.display = 'block';
  },false);

  login1.addEventListener('click', function () {
    loginView.style.display = 'block';
    registerView.style.display = 'none';
  },false);

  register1.addEventListener('click', function () {
    loginView.style.display = 'none';
    registerView.style.display = 'block';
  },false);

  ls.addEventListener('click', function () {
    if(setUsername.value == '') {
      logErrTips.innerHTML = "请输入用户名";
    }else if(setPassword.value == '') {
      logErrTips.innerHTML = "请输入密码";
    }
  },false);

  rs.addEventListener('click', function () {
    if(rgUser.value == '') {
      rgstErrTips.innerHTML = "用户名不能为空";
    } else if(rgPass.value == '') {
      rgstErrTips.innerHTML = "密码不能为空";
    }else if(!passwordPattern.test(rgPass.value)) {
      rgstErrTips.innerHTML = "请输入密码为6到16位字符（含数字、字母、下划线）"
    }else if(localStorage.getItem(rgUser.value)) {
      // alert(111);
      rgstErrTips.innerHTML = '该用户名已存在！';
    } else {
      rgstErrTips.innerHTML = '注册成功！';
    }
  },false);

 var exit = document.querySelector('.exit');

  exit.addEventListener('click', function () {
   lr.style.display = 'none';
 },false);


 //local storage当地缓存(永久缓存，刷新页面不会丢失)
  var k = 0, j = 0, d = 0, id, currentID;

  rs.addEventListener('click', function () {
    if(rgstErrTips.innerHTML == '注册成功！') {
      var username = rgUser.value;
      var password = rgPass.value;
      localStorage.setItem(username, k++);
      localStorage.setItem(password, j++);
        id = username;
    }

    setTimeout(function () {
      rgUser.value = '';
      rgPass.value = '';
      rgstErrTips.innerHTML = '';
      var lr = document.getElementById('login-register'),
        lrBox = document.getElementById('lorg'),
        logout = document.getElementById('exit-logout');
        lrBox.style.display = 'none';
        logout.style.display = 'block';
        lr.style.display = 'none';
    },250);
  }, false);


  ls.addEventListener('click', function () {
    if(setUsername.value != '' && setPassword.value != '') {
        var userName = setUsername.value;
        var passWord = setPassword.value;
        if(localStorage.getItem(userName) && localStorage.getItem(passWord)
          && localStorage.getItem(userName) === localStorage.getItem(passWord)) {
         // alert(666)

          (function getData() {
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
              currentID = json[d].id;
              if (content != null) {
                todo.innerHTML = content;
                reloadAbleJSFn("../js/iconfont.js");
                reloadAbleJSFn("../js/index.js");
              }
            };
          })();
          logErrTips.innerHTML = '登陆成功！';

          lr.style.display = 'block';
          loginView.style.display = 'block';
          registerView.style.display = 'none';
         setTimeout(function () {
           setUsername.value = '';
           setPassword.value = '';
           logErrTips.innerHTML = '';
           var lr = document.getElementById('login-register'),
             lrBox = document.getElementById('lorg'),
             logout = document.getElementById('exit-logout');
             lrBox.style.display = 'none';
             logout.style.display = 'block';
             lr.style.display = 'none';
         },250);
        } else {
          logErrTips.innerHTML = '用户名或密码错误！';
        }
      }
  }, false);


// 登陆注册的操作
  function openLogin() {
    lr.style.display = 'block';
    loginView.style.display = 'block';
    registerView.style.display = 'none';
  }

  function openRegister() {
    lr.style.display = 'block';
    loginView.style.display = 'none';
    registerView.style.display = 'block';
  }


  //退出登陆，注销操作
function exitLogin() {
  (function postData() {
    var req = new XMLHttpRequest();
    req.open("POST",'http://localhost:3000/customers',true);
    req.setRequestHeader("Content-Type","application/json");
    var a = todo.innerHTML;
    a = {
      'id': id,
      'content': a
    };
    var b = JSON.stringify(a);
    req.send(b);
  })();
  lr.style.display = 'block';
  loginView.style.display = 'block';
  registerView.style.display = 'none';
  rgUser.value = '';
  rgPass.value = '';
  rgstErrTips.innerHTML = '';

  todo.innerHTML = ' <div id="add-todo-item" class="add-todo-item">\n' +
    '        <span>\n' +
    '            <svg class="icon down" aria-hidden="true">\n' +
    '                <use xlink:href="#icon-down"></use>\n' +
    '            </svg>\n' +
    '        </span>\n' +
    '        <input type="text" placeholder="What needs to be done?" autofocus>\n' +
    '    </div>\n' +
    '\n' +
    '    <div id="dragContainer">\n' +
    '        <div id="editor" draggable="false" style="visibility: hidden">\n' +
    '              <div class="left"><span><b></b>    items left</span></div>\n' +
    '               <div class="all"><span>All</span></div>\n' +
    '               <div class="active"><span>Active</span></div>\n' +
    '               <div class="complete"><span>Complete</span></div>\n' +
    '              <div class="clear"><span>Clear completed</span></div>\n' +
    '       </div>\n' +
    '    </div>';
  reloadAbleJSFn("../js/iconfont.js");
  reloadAbleJSFn("../js/index.js");
}

function logOut() {
  if(confirm("您确定要注销当前账户吗？")) {
    localStorage.removeItem(currentID);
    currentID = null;
    var todo = document.getElementById("add-todo"),
      lr = document.getElementById('login-register');
    todo.innerHTML = ' <div id="add-todo-item" class="add-todo-item">\n' +
      '        <span>\n' +
      '            <svg class="icon down" aria-hidden="true">\n' +
      '                <use xlink:href="#icon-down"></use>\n' +
      '            </svg>\n' +
      '        </span>\n' +
      '        <input type="text" placeholder="What needs to be done?" autofocus>\n' +
      '    </div>\n' +
      '\n' +
      '    <div id="dragContainer">\n' +
      '        <div id="editor" draggable="false" style="visibility: hidden">\n' +
      '              <div class="left"><span><b></b>    items left</span></div>\n' +
      '               <div class="all"><span>All</span></div>\n' +
      '               <div class="active"><span>Active</span></div>\n' +
      '               <div class="complete"><span>Complete</span></div>\n' +
      '              <div class="clear"><span>Clear completed</span></div>\n' +
      '       </div>\n' +
      '    </div>';
    reloadAbleJSFn("../js/iconfont.js");
    reloadAbleJSFn("../js/index.js");
    lr.style.display = 'block';
  }
}

function reloadAbleJSFn(newJS)
{
  var scriptObj = document.createElement("script");
  scriptObj.src = newJS;
  scriptObj.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(scriptObj);
}
