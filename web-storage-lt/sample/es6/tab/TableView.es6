class TableView {
  constructor($el, storageMgr) {
    this.$el = $el;
    this.storageMgr = storageMgr;
  }

  render() {
    let $tbody = this.$el.find("tbody");
    $tbody.empty();
    var keyList = this.storageMgr.getKeyList();
    keyList.forEach((key) => {
      let itm = this.storageMgr.getStorage(key);
      let {
        updTime
      } = JSON.parse(itm);
      let html = `<tr data-key="${key}"><td>${this._format(updTime)}</td></tr>`;
      $tbody.append(html);
    });
  }

  _format(date) {
    var d = new Date(date);
    return `${d.getHours()}:${("0"+d.getMinutes()).slice(-2)}:${("0"+d.getSeconds()).slice(-2)}`;
  }
};
