
const EventsDispatcher = require("../../src/dispatchers/events_dispatcher");

const dispatcherHelper = require("react-jasmine").checkDispatcher;


describe("EventsDispatcher", function() {

  let options = [
    {
      handler:"addEvents",
      source:"ADD_EVENTS"
    }
    , {
      handler:"changeDevice",
      source:"CHANGE_DEVICE"
    }
    , {
      handler:"changeType",
      source:"EVENT_TYPE"
    }
    , {
      handler:"fetchData",
      source:"FETCH"
    }
    , {
      handler:"paginate",
      source:"PAGINATE"
    }
    , {
      handler:"setKey",
      source:"SET_KEY"
    }
  ];

  dispatcherHelper(EventsDispatcher, options);

});