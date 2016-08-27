"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainForm = function () {
  function MainForm($el, localStorageMgr, sessionStorageMgr) {
    _classCallCheck(this, MainForm);

    this.$el = $el;
    this.localStorageMgr = localStorageMgr;
    this.sessionStorageMgr = sessionStorageMgr;
    this.setEvents();
  }

  _createClass(MainForm, [{
    key: "setEvents",
    value: function setEvents(eventRender) {
      var _this = this;

      $("#session-btn").on("click", function (event) {
        var id = _this.sessionStorageMgr.getSize();
        var updTime = Date.now();
        var name = _this.$el.find("input").val();
        var data = { updTime: updTime, name: name };
        _this.sessionStorageMgr.setStorage("id_" + id, JSON.stringify(data));
        event.preventDefault();
      });

      $("#local-btn").on("click", function (event) {
        var id = _this.localStorageMgr.getSize();
        var updTime = Date.now();
        var name = _this.$el.find("input").val();
        var data = { updTime: updTime, name: name };
        _this.localStorageMgr.setStorage("id_" + id, JSON.stringify(data));
        event.preventDefault();
      });

      $("#clear-btn").on("click", function (event) {
        console.log("event=", event);
        _this.localStorageMgr.clearAll();
        _this.sessionStorageMgr.clearAll();
        event.preventDefault();
      });

      this.$el.on("submit", function (event) {
        console.log("submit event=", event);
        event.preventDefault();
      });
    }
  }]);

  return MainForm;
}();

;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StorageMgr = function () {
    function StorageMgr(eventMgr) {
        _classCallCheck(this, StorageMgr);

        this.eventMgr = eventMgr;
    }

    _createClass(StorageMgr, [{
        key: "clearAll",
        value: function clearAll() {
            localStorage.clear();
            sessionStorage.clear();
            this.eventMgr.fire();
        }
    }, {
        key: "setStorage",
        value: function setStorage(key, value) {
            this.storage.setItem(key, value);
            this.eventMgr.fire();
        }
    }, {
        key: "getKeyList",
        value: function getKeyList() {
            return Object.keys(this.storage).sort();
        }
    }, {
        key: "getStorage",
        value: function getStorage(key) {
            return this.storage.getItem(key);
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return this.storage.length;
        }
    }, {
        key: "storage",
        get: function get() {
            return null;
        }
    }]);

    return StorageMgr;
}();

;

var LocalStorageMgr = function (_StorageMgr) {
    _inherits(LocalStorageMgr, _StorageMgr);

    function LocalStorageMgr() {
        _classCallCheck(this, LocalStorageMgr);

        return _possibleConstructorReturn(this, (LocalStorageMgr.__proto__ || Object.getPrototypeOf(LocalStorageMgr)).apply(this, arguments));
    }

    _createClass(LocalStorageMgr, [{
        key: "storage",
        get: function get() {
            return localStorage;
        }
    }]);

    return LocalStorageMgr;
}(StorageMgr);

;

var SessionStorageMgr = function (_StorageMgr2) {
    _inherits(SessionStorageMgr, _StorageMgr2);

    function SessionStorageMgr() {
        _classCallCheck(this, SessionStorageMgr);

        return _possibleConstructorReturn(this, (SessionStorageMgr.__proto__ || Object.getPrototypeOf(SessionStorageMgr)).apply(this, arguments));
    }

    _createClass(SessionStorageMgr, [{
        key: "storage",
        get: function get() {
            return sessionStorage;
        }
    }]);

    return SessionStorageMgr;
}(StorageMgr);

;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableView = function () {
  function TableView($el, storageMgr) {
    _classCallCheck(this, TableView);

    this.$el = $el;
    this.storageMgr = storageMgr;
  }

  _createClass(TableView, [{
    key: "render",
    value: function render() {
      var _this = this;

      var $tbody = this.$el.find("tbody");
      $tbody.empty();
      var keyList = this.storageMgr.getKeyList();
      keyList.forEach(function (key) {
        var itm = _this.storageMgr.getStorage(key);

        var _JSON$parse = JSON.parse(itm);

        var updTime = _JSON$parse.updTime;
        var name = _JSON$parse.name;

        var html = "<tr data-key=\"" + key + "\"><td>" + _this._format(updTime) + "</td><td>" + name + "</td></tr>";
        $tbody.append(html);
      });
    }
  }, {
    key: "_format",
    value: function _format(date) {
      var d = new Date(date);
      return d.getHours() + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    }
  }]);

  return TableView;
}();

;
"use strict";

var initialize = function initialize() {
  console.log("initialize");

  var eventMgr = {};
  var localStorageMgr = new LocalStorageMgr(eventMgr);
  var sessionStorageMgr = new SessionStorageMgr(eventMgr);

  var sessionTbl = new TableView($("#session-tbl"), sessionStorageMgr);
  var localTbl = new TableView($("#local-tbl"), localStorageMgr);

  eventMgr.fire = function () {
    sessionTbl.render();
    localTbl.render();
  };

  var mainForm = new MainForm($("#mainFm"), localStorageMgr, sessionStorageMgr);

  eventMgr.fire();
};

window.addEventListener("storage", function (event) {
  console.log("storage event fire!", event);
});

$(document).ready(initialize);
