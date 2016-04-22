const EventsAction = require("../../src/actions/events_actions");


const actionHelper = require("react-jasmine").checkActions;

describe("EventsAction", function() {

  let options = [
    {
      action:"add",
      handler:"addEvents",
      args:["foo"],
      dispactchArgs:{
        type   : "ADD_EVENTS",
        data: "foo"
      }
    }
    , {
      action:"change",
      handler:"changeType",
      args:["foo"],
      dispactchArgs:{
        type   : "EVENT_TYPE"
        , event_type : "foo"
      }
    }
    , {
      action:"changeDevice",
      handler:"changeDevice",
      args:['mobile'],
      dispactchArgs:{
        type: "CHANGE_DEVICE"
        , device: 'mobile'
      }
    }
    , {
      action:"fetch",
      handler:"fetchData",
      args:["foo", "progress"],
      dispactchArgs:{
        type       : "FETCH"
        , api      : "foo"
        , progress : "progress"
      }
    }
    , {
      action:"paginate",
      handler:"paginate",
      args:[],
      dispactchArgs:{
        type: "PAGINATE"
      }
    }
    , {
      action:"setKey",
      handler:"setKey",
      args:["foo"],
      dispactchArgs:{
        type: "SET_KEY"
        , key: "foo"
      }
    }
  ];

  actionHelper(EventsAction, "EventsDispatcher", options);

});