var React = require("react")
const _ = require("lodash")
    , ReactDOM  = require('react-dom')
    , TestUtils = require("react-addons-test-utils");

console.log('f');
const EventListing   = require("../../src/components/events_listing");

const Immutable = require("immutable");
// Test Helpers
// const componentHelper = require("react-jasmine").componentHelpers
//     , storeListeners = require("react-jasmine").checkListeners
//     , jasmineReactHelpers = require("react-jasmine");

// const checkCalls = require("@djforth/morse-jasmine/check_calls")
//   , checkMulti = require("@djforth/morse-jasmine/check_multiple_calls")
//   , getMod     = require("@djforth/morse-jasmine/get_module")(EventListing)
//   , mockClass = require("@djforth/morse-jasmine/mock_class")
//   , spyManager = require("@djforth/morse-jasmine/spy_manager")()
//   , stubs      = require("@djforth/morse-jasmine/stub_inner")(EventListing);

let tabs = {
  key:"type"
  , items:['All', 'Events', "Sports"]
};

let api = 'api/events/foo'

let Data = require('../data/test_data');
let MockData = Data.getJSON(5);

// let storeStubs = [
//     {title:"addChangeListener"},
//     {title:"removeChangeListener"}
//   ];

// //Stub components
// let spys = [
//   {
//     fn:function(){
//       return  (<div>nav</div>);
//     },
//     title:"Nav"
//   }
// ];

describe('Events Listing', function() {
  let listing, EventsStore, EventsActions;
  // let spied   = jasmineReactHelpers.spyOnComponents(spys, EventListing);
  beforeEach(function() {
    console.log("React>>>>>>>>>>>", EventListing)
    // EventsStore = getMod("EventsStore");
    // storeListeners.stubStore(EventsStore, storeStubs);

    // stubs.addSpy({title:"EventsActions", opts:['add', 'fetch', 'setKey']})

    // listing = TestUtils.renderIntoDocument(<EventListing api={api} tabs={tabs} events={MockData} /> );
  });

  it('is react component', function() {
    console.log("React>>>>>>>>>>>", EventListing)
    // expect(TestUtils.isCompositeComponent(listing)).toBeTruthy()
  });

  xdescribe("props and state defaults", function() {
    var propsDefaults = {
        api: api
        , tabs: tabs
        , events: MockData
      };

    var stateDefaults = {};

    componentHelper.checkPropsAndState(()=>{
      return listing;
    }, propsDefaults, stateDefaults);
  });

  xdescribe('constructor and willMount', function() {
    checkCalls(()=>{
        return stubs.getSpy("EventsActions").setKey
      }, "EventsActions.setKey", ()=>["type"]);


  });

  xdescribe('componentWillMount', function() {
    checkCalls(()=>{
        return stubs.getSpy("EventsActions").add
      }, "EventsActions.add", ()=>[MockData]);
  });

  xdescribe('componentDidMount', function() {
    checkCalls(()=>{
        return stubs.getSpy("EventsActions").fetch
      }, "EventsActions.fetch", ()=>['api/events/foo', listing._progress]);
  });
});