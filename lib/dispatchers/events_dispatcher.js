'use strict';

var Dispatcher = require('flux').Dispatcher;

var EventsDispatcher = Object.assign(new Dispatcher(), {
  addEvents: function addEvents(action) {
    var payload = {
      source: 'ADD_EVENTS',
      action: action
    };
    this.dispatch(payload);
  },
  changeDevice: function changeDevice(action) {
    var payload = {
      source: 'CHANGE_DEVICE',
      action: action
    };
    this.dispatch(payload);
  },
  changeType: function changeType(action) {
    var payload = {
      source: 'EVENT_TYPE',
      action: action
    };
    this.dispatch(payload);
  },
  fetchData: function fetchData(action) {
    var payload = {
      source: 'FETCH',
      action: action
    };
    this.dispatch(payload);
  },
  paginate: function paginate(action) {
    var payload = {
      source: 'PAGINATE',
      action: action
    };
    this.dispatch(payload);
  },
  setKey: function setKey(action) {
    var payload = {
      source: 'SET_KEY',
      action: action
    };
    this.dispatch(payload);
  }
});

module.exports = EventsDispatcher;