const Dispatcher = require('flux').Dispatcher;

const EventsDispatcher = Object.assign(new Dispatcher(), {
  addEvents: function(action){
    var payload = {
      source: 'ADD_EVENTS'
      , action: action
    };
    this.dispatch(payload);
  }
  , changeDevice: function(action){
    var payload = {
      source: 'CHANGE_DEVICE'
      , action: action
    };
    this.dispatch(payload);
  }
  , changeType: function(action){
    var payload = {
      source: 'EVENT_TYPE'
      , action: action
    };
    this.dispatch(payload);
  }
  , fetchData: function(action){
    var payload = {
      source: 'FETCH'
      , action: action
    };
    this.dispatch(payload);
  }
  , paginate: function(action){
    var payload = {
      source: 'PAGINATE'
      , action: action
    };
    this.dispatch(payload);
  }
  , setKey: function(action){
    var payload = {
      source: 'SET_KEY'
      , action: action
    };
    this.dispatch(payload);
  }
});

module.exports = EventsDispatcher;
