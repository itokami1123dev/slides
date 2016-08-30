var initialize = () => {
  console.log("initialize");

  var eventMgr = {};
  var localStorageMgr = new LocalStorageMgr(eventMgr);
  var sessionStorageMgr = new SessionStorageMgr(eventMgr);

  var sessionTbl = new TableView($("#session-tbl"), sessionStorageMgr);
  var localTbl = new TableView($("#local-tbl"), localStorageMgr);

  eventMgr.fire = () => {
    sessionTbl.render();
    localTbl.render();
  };

  var mainForm = new MainForm($("#mainFm"), localStorageMgr, sessionStorageMgr);

  eventMgr.fire();

};

window.addEventListener("storage", function(event) {
  console.log("storage event fire!", event);
});

$(document).ready(initialize);
