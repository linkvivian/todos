  var todo = document.getElementById("add-todo"),
    newTodo = document.querySelector("#add-todo-item input"),
    selectAll = document.querySelector(".down"),
    editor = document.getElementById('editor'),
    leftItems = document.querySelector('.left b'),
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
      // allItems = document.querySelectorAll('.add-item');
      // if(allItems.length == 0){
      //   selectAll.className = 'icon down';
      // }

    if (newTodo.value.trim() != "" && event.keyCode == 13) {
      var addItem = document.createElement('div');
      addItem.innerHTML =
        ' <div class="add-item">\n' +
        '     <span class="use-icon1">\n' +
        '          <svg class="icon eglass-circle" aria-hidden="true">\n' +
        '              <use xlink:href="#icon-circle"></use>\n' +
        '              <svg class="icon check" aria-hidden="true">\n' +
        '                  <use xlink:href="#icon-check"></use>\n' +
        '              </svg>' +
        '          </svg>\n' +
        '      </span>\n' +
        '      <span class="todo-text">' + newTodo.value + '</span>\n' +
        '      <span class="use-icon2">\n' +
        '          <svg class="icon delete" aria-hidden="true">\n' +
        '              <use xlink:href="#icon-del"></use>\n' +
        '          </svg>\n' +
        '      </span>\n' +
        '  </div>';
      selectAll.style.visibility = 'visible';
      editor.style.visibility = "visible";
      todo.className = "add-todo-item";
      todo.insertBefore(addItem, todo.children[todo.children.length - 1]);
      if (completeBox.style.borderWidth == '1px') {
        addItem.children[0].style.display = 'none';
      }
      newTodo.value = "";
      leftSum();
      allBox.style.cssText = 'border:1px solid rgba(0, 0, 0, 0.4);\n' +
        '    border-radius: 3px;';
    }
  }


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
    leftSum();

    if(allBox.style.borderWidth == '1px' && leftItems.innerText == 0) {
      selectAll.classList.add('selectAll-shift');
    }else if(allBox.style.borderWidth == '1px' && leftItems.innerText != 0){
      selectAll.classList = 'icon down';
    }

  }, false);

  todo.addEventListener('click', function (event) {
    if(event.target.classList == 'use-icon2' || event.target.classList == 'icon delete') {
      if( event.target.classList == 'use-icon2') {
        event.target.parentNode.style.display = 'none';
        event.target.parentNode.className = '';
        delete event.target.parentNode;
      } else {
        event.target.parentNode.parentNode.style.display = 'none';
        event.target.parentNode.parentNode.className = '';
        delete event.target.parentNode.parentNode;
      }
      leftSum();
    }
  },false);

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
  todo.addEventListener('click', function () {
    completeItems = document.querySelectorAll('.complete-item');
    if(completeItems.length != 0) {
      clear.style.visibility = 'visible';
    } else {
      clear.style.visibility = 'hidden';
    }
  },false);

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

  //clear操作
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