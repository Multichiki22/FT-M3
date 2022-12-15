"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise {
  constructor(executor) {
    if (typeof executor != "function") {
      throw TypeError("/executor.+function/");
    }
    this._state = "pending";
    this._handlerGroups = [];

    executor(
      (value) => {
        this._internalResolve(value);
      },
      (reason) => {
        this._internalReject(reason);
      }
    );
  }
  _internalResolve(data) {
    if (this._state === "pending") {
      this._state = "fulfilled";
      this._value = data;
      this._callHandlers();
    }
  }
  _internalReject(reason) {
    if (this._state === "pending") {
      this._state = "rejected";
      this._value = reason;
      this._callHandlers();
    }
  }
  _callHandlers() {
    while (this._handlerGroups.length > 0) {
      const group = this._handlerGroups.shift();
      this._state === "fulfilled" &&
        group.successCb &&
        group.successCb(this._value);
      this._state === "rejected" && group.errorCb && group.errorCb(this._value);
    }
  }
  then(handlerSuccess, handlerError) {
    this._handlerGroups.push({
      successCb: typeof handlerSuccess === "function" ? handlerSuccess : false,
      errorCb: typeof handlerError === "function" ? handlerError : false,
    });

    this._state !== "pending" && this._callHandlers();
  }
  catch(handlerError) {
    this.then(null, handlerError);
  }
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
