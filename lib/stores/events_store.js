'use strict';

var Event = require('events');
var EventEmitter = Event.EventEmitter;

var DataManager = require('@djforth/data_manager_fp');

// Flux
var EventsDispatcher = require('../dispatchers/events_dispatcher');
var AjaxManager = require('../utils/ajax_manager');

var data = DataManager(),
    type = 'all',
    paginate = 1,
    device = 'mobile';

var store = {
  // <<<<<<<<<<<<<<<< Event management >>>>>>>>>>

  emitChange: function emitChange(event) {
    this.emit(event);
  },
  addChangeListener: function addChangeListener(event, callback) {
    this.on(event, callback);
  },
  removeChangeListener: function removeChangeListener(event, callback) {
    this.removeListener(event, callback);
  }

  // <<<<<<<<<<<<<<< Fetching and processing session >>>>>>>>>>>>

  ,
  _addEvents: function _addEvents(events) {
    data.add(events);
  },
  _changeDevice: function _changeDevice(d) {
    device = d;
  },
  _changeType: function _changeType(et) {
    if (type !== et) paginate = 1;
    type = et;
  },
  _fetch: function _fetch(api, progress) {
    var _this = this;

    var ajax = AjaxManager(api);
    ajax.fetch(progress).then(function (data) {
      _this._addEvents(data);
      _this.emitChange('fetched');
    });
  },
  _getDevice: function _getDevice() {
    return device;
  },
  _getEvents: function _getEvents() {
    var events = data.getTabData(type);
    if (events.size <= paginate * 6) {
      this.emitChange('stop_paginate');
      return events;
    }
    return events.slice(0, paginate * 6);
  },
  _getType: function _getType() {
    return type;
  },
  _paginate: function _paginate() {
    paginate++;
  },
  _setTabKey: function _setTabKey(key) {
    data.tabKey(key);
  }
};

var EventsStore = Object.assign({}, EventEmitter.prototype, store);
EventsStore.setMaxListeners(0);

var registeredCallback = function registeredCallback(payload) {
  var action = payload.action;
  switch (action.type) {
    case 'ADD_EVENTS':
      EventsStore._addEvents(action.data);
      EventsStore.emitChange('adding');
      break;
    case 'CHANGE_DEVICE':
      EventsStore._changeDevice(action.device);
      EventsStore.emitChange('device_change');
      break;
    case 'EVENT_TYPE':
      EventsStore._changeType(action.event_type);
      EventsStore.emitChange('type_change');
      break;
    case 'FETCH':
      EventsStore._fetch(action.api, action.progress);
      EventsStore.emitChange('fetching');
      break;
    case 'PAGINATE':
      EventsStore._paginate();
      EventsStore.emitChange('paginate');
      break;
    case 'SET_KEY':
      EventsStore._setTabKey(action.key);
      EventsStore.emitChange('key_set');
      break;
    default:
      throw new Error('Not an action');
  }
};

EventsStore.dispatchToken = EventsDispatcher.register(registeredCallback);
EventsStore.setMaxListeners(0);

module.exports = EventsStore;