var common;
(function (common) {
    var id = 1;
    function newId() {
        return +new Date + "" + id++;
    }
    common.newId = newId;
})(common || (common = {}));
