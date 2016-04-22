const Event      = require('events');
const EventEmitter  = Event.EventEmitter;

const DataManager = require('@djforth/data_manager_fp');

// Flux
const EventsDispatcher = require('../dispatchers/events_dispatcher');
const AjaxManager  = require('../utils/ajax_manager');

let data = DataManager()
  , type = 'all'
  , paginate = 1
  , device = 'mobile';

const store = {
  // <<<<<<<<<<<<<<<< Event management >>>>>>>>>>
  emitChange(event){
    this.emit(event);
  }

  , addChangeListener(event, callback){
    this.on(event, callback);
  }

  , removeChangeListener(event, callback){
    this.removeListener(event, callback);
  }

  // <<<<<<<<<<<<<<< Fetching and processing session >>>>>>>>>>>>

  , _addEvents(events){
    data.add(events);
  }

  , _changeDevice(d){
    device = d;
  }

  , _changeType(et){
    if (type !== et) paginate = 1;
    type = et;
  }

  , _fetch(api, progress){
    let ajax = AjaxManager(api);
    ajax.fetch(progress).then((data)=>{
      this._addEvents(data);
      this.emitChange('fetched');
    });
  }

  , _getDevice(){
    return device;
  }

  , _getEvents(){
    let events = data.getTabData(type);
    if (events.size <= paginate * 6){
      this.emitChange('stop_paginate');
      return events;
    }
    return events.slice(0, paginate * 6);
  }

  , _getType(){
    return type;
  }

  , _paginate(){
    paginate++;
  }

  , _setTabKey(key){
    data.tabKey(key);
  }
};

const EventsStore = Object.assign({}, EventEmitter.prototype, store);
EventsStore.setMaxListeners(0);

const registeredCallback = function(payload){
  var action = payload.action;
  switch (action.type){
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
