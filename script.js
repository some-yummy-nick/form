
(function() {
  /** @enum {number} */
  var READY_STATE = {
    'UNSENT': 0,
    'OPENED': 1,
    'HEADERS_RECEIVED': 2,
    'LOADING': 3,
    'DONE': 4
  };

  /*
   ** Функция возвращат объект XMLHttpRequest
   */
  function getXmlHttpRequest() {
    if (window.XMLHttpRequest) {
      try {
        return new XMLHttpRequest();
      } catch (e) {}
    } else if (window.ActiveXObject) {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e) {}
      try {
        return new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {}
    }
    return null;
  }

  function request(data, fn) {
    var xhr = getXmlHttpRequest();
    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + (new Date()).getTime());
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == READY_STATE.DONE) {
        fn(xhr.responseText);
      }
    });
    xhr.send(data);
  }

  var modal = document.querySelector(".js-modal");

  validate.init({
    messageValueMissing:"Пожалуйста заполните поле",
    messageTypeMismatchEmail:email.title,
    onSubmit: function (form) {

      if (!("FormData" in window)) {
        return;
      }

      var data = new FormData(form);
      request(data, function(response) {
        console.log(response);
        form.reset();
        modal.classList.add("active");
      });
      event.preventDefault();
    }
  });

})();







