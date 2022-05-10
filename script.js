"use strict";
console.log('cdn active');
var leadConnector = (function () {
    function leadConnector(text) {
        this.text = text;
        this.alerta(this.text);
    }
    leadConnector.prototype.alerta = function (text) {
        alert(text);
    };
    return leadConnector;
}());
