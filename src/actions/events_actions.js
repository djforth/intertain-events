const EventsDispatcher = require('../dispatchers/events_dispatcher');

var add = (data)=>{
  EventsDispatcher.addEvents({
    type: 'ADD_EVENTS'
    , data: data
  });
};

var change = (event_type)=>{
  EventsDispatcher.changeType({
    type: 'EVENT_TYPE'
    , event_type: event_type
  });
};

var changeDevice = (device)=>{
  EventsDispatcher.changeDevice({
    type: 'CHANGE_DEVICE'
    , device: device
  });
};

var fetch = (api, progress)=>{
  EventsDispatcher.fetchData({
    type: 'FETCH'
    , api: api
    , progress: progress
  });
};

var paginate = ()=>{
  EventsDispatcher.paginate({
    type: 'PAGINATE'
  });
};

var setKey = (key)=>{
  EventsDispatcher.setKey({
    type: 'SET_KEY'
    , key: key
  });
};

module.exports = {
  add: add
  , change: change
  , changeDevice: changeDevice
  , fetch: fetch
  , paginate: paginate
  , setKey: setKey
};
