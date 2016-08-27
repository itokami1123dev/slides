class StorageMgr {
    constructor(eventMgr) {
        this.eventMgr = eventMgr;
    }

    clearAll() {
        this.storage.clear();
        this.eventMgr.fire();
    }

    setStorage(key, value) {
        this.storage.setItem(key, value);
        this.eventMgr.fire();
    }

    getKeyList() {
        return Object.keys(this.storage).sort();
    }

    getStorage(key) {
        return this.storage.getItem(key);
    }

    getSize() {
        return this.storage.length;
    }

    get storage() {
        return null;
    }
};

class LocalStorageMgr extends StorageMgr {
    get storage() {
        return localStorage;
    }
};

class SessionStorageMgr extends StorageMgr {
    get storage() {
        return sessionStorage;
    }
};
