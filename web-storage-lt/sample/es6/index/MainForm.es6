class MainForm {
  constructor($el, localStorageMgr, sessionStorageMgr) {
    this.$el = $el;
    this.localStorageMgr = localStorageMgr;
    this.sessionStorageMgr = sessionStorageMgr;
    this.setEvents();
  }

  setEvents(eventRender) {
    $("#session-btn").on("click", (event) => {
      var id = this.sessionStorageMgr.getSize();
      var updTime = Date.now();
      var name = this.$el.find("input").val();
      var data = { updTime, name };
      this.sessionStorageMgr.setStorage("id_" + id, JSON.stringify(data));
      event.preventDefault();
    });

    $("#local-btn").on("click", (event) => {
      var id = this.localStorageMgr.getSize();
      var updTime = Date.now();
      var name = this.$el.find("input").val();
      var data = { updTime, name };
      this.localStorageMgr.setStorage("id_" + id, JSON.stringify(data));
      event.preventDefault();
    });

    $("#clear-btn").on("click", (event) => {
      console.log("event=", event);
      this.localStorageMgr.clearAll();
      this.sessionStorageMgr.clearAll();
      event.preventDefault();
    });

    this.$el.on("submit", (event) => {
      console.log("submit event=",event);
      event.preventDefault();
    });
  }

};
