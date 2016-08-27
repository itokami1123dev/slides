var initialize = () => {
    console.log("initialize");

    let eventMgr = {};
    let localStorageMgr = new LocalStorageMgr(eventMgr);
    let sessionStorageMgr = new SessionStorageMgr(eventMgr);

    let sessionTbl = new TableView($("#session-tbl"), sessionStorageMgr);
    let localTbl = new TableView($("#local-tbl"), localStorageMgr);

    eventMgr.fire = () => {
        sessionTbl.render();
        localTbl.render();
    };

    let updTime = Date.now();
    let data = { updTime };
    if (!sessionStorageMgr.getStorage("tab_html")){
      sessionStorageMgr.setStorage("tab_html", JSON.stringify(data));
      localStorageMgr.setStorage("tab_html", JSON.stringify(data));
    }

    let mainForm = new MainForm($("#mainFm"), localStorageMgr, sessionStorageMgr);

    window.setInterval(() => {
      eventMgr.fire();
    }, 1000);
};

window.addEventListener("storage", function(event) {
    console.log("storage event fire!", event);
});

$(document).ready(initialize);
