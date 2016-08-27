class MainForm {
    constructor($el, localStorageMgr, sessionStorageMgr) {
        this.$el = $el;
        this.localStorageMgr = localStorageMgr;
        this.sessionStorageMgr = sessionStorageMgr;
        this.setEvents();
    }

    setEvents(eventRender) {
        $("#reset-btn").on("click", (event) => {
            let localData = this.localStorageMgr.getStorage("tab_html");
            let localTime = JSON.parse(localData).updTime;
            let sessionData = this.sessionStorageMgr.getStorage("tab_html");
            let sessionTime = JSON.parse(sessionData).updTime;
            if (localTime !== sessionTime){
              alert("別タブ開かれてない？？後勝ちよ");
              return false;
            }

            let updTime = Date.now();
            let data = { updTime };
            this.sessionStorageMgr.setStorage("tab_html", JSON.stringify(data));
            this.localStorageMgr.setStorage("tab_html", JSON.stringify(data));
            event.preventDefault();
        });

        $("#clear-btn").on("click", (event) => {
            this.localStorageMgr.clearAll();
            this.sessionStorageMgr.clearAll();
        });

        this.$el.on("submit", (event) => {
            console.log("submit event=", event);
            event.preventDefault();
        });
    }

};
