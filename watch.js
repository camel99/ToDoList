
var app = app || {};

app.watch = (function () {

  function getCurrentTime() {
    var today = new Date(),
      hour = today.getHours(),
      minute = today.getMinutes(),
      second = today.getSeconds(),
      currentTime;

    hour = (hour < 10 ? "0" : "") + hour;
    minute =(minute <10 ? "0" : "") + minute;
    second = (second < 10 ? "0" : "") + second;

    currentTime = hour + ":" + minute + ":" + second;
    return currentTime;
  }


  return  {
    initWatch: function (watchElement) {
      watchElement.innerHTML = getCurrentTime();
      setInterval(function () {
        watchElement.innerHTML = getCurrentTime();
      }, 1000);
    }

  }
}());