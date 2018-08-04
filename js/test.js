(function postData() {
  var req = new XMLHttpRequest();
  req.open("POST",'http://localhost:3000/customers',true);
  req.setRequestHeader("Content-Type","application/json");
  var a = {
    username: "Jane",
    age: 22,
    job: "doctor"
  };
  var b = JSON.stringify(a);
  req.send(b);
  req.onreadystatechange = function()
  {
    //如果执行状态成功，那么就把返回信息写到指定的层里
    if (req.readyState == 4 && req.status == 200)
    {
      document.querySelector('.message box').innerHTML = req.responseText;
    }
  }
})();

