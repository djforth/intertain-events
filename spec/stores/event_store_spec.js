const _         = require("lodash");
const Immutable = require("immutable");

const EventsStore = require('../../src/stores/events_store');

const storeHelper    = require("react-jasmine").storeHelpers;
const defaultsHelper = require("react-jasmine").checkDefaults;

const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , checkMulti = require("@djforth/morse-jasmine/check_multiple_calls")
  , getMod     = require("@djforth/morse-jasmine/get_module")(EventsStore)
  , mockClass = require("@djforth/morse-jasmine/mock_class")
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(EventsStore);

let Data = require('../data/test_data');
let MockData = Immutable.fromJS(Data.getJSON(5));
let filtered = MockData.filter((d)=>{
  return d.get("filters").get("type") === "event"
})


describe("EventsStore", function() {
  let options = [
    {
      func:"_addEvents",
      action:{
        type:"ADD_EVENTS",
        data:"foo"
      },
      args:"foo",
      change:"adding"
    }
    , {
      func:"_changeDevice",
      action:{
        type:"CHANGE_DEVICE",
        device:"foo"
      },
      args:"foo",
      change:"device_change"
    }
    , {
      func:"_changeType",
      action:{
        type:"EVENT_TYPE",
        event_type:"sport"
      },
      args:"sport",
      change:"type_change"
    }
    , {
      func:"_fetch",
      action:{
        type:"FETCH"
        , api      : "/my/some/api"
        , progress : "progress"
      },
      args:["/my/some/api", "progress"],
      change:"fetching"
    }
    , {
      func:"_paginate",
      action:{
        type:"PAGINATE"
      },
      args:null,
      change:"paginate"
    }
    , {
      func:"_setTabKey",
      action:{
        type:"SET_KEY"
        , key: "mykey"

      },
      args:["mykey"],
      change:'key_set'
    }
  ]

  storeHelper.checkDispatcher(EventsStore, "registeredCallback", options);

  storeHelper.checkChangeEvents(()=>{
    return getMod('store');
  });

  describe('store functions', function() {
    let store, resolve, reject;
    beforeEach(function() {
      let promise = new Promise((res, rej)=>{
        resolve = res;
        reject  = rej;
      });
      store = getMod('store');
      stubs.addSpy(['AjaxManager', {title:'data', opts:['add', 'tabKey', 'getTabData']}]);
      spyManager.addSpy([
        'progress'
        , {title:'ajax', opts:['fetch']}
      ]);

      spyManager.getSpy("ajax").fetch.and.returnValue(promise);
      stubs.getSpy("data").getTabData.and.returnValue(filtered);

      stubs.setSpies([
        {title:'AjaxManager', func:"returnValue", value:spyManager.getSpy('ajax')}
      ]);
    });

    describe('_addEvents', function() {
      let data;
      beforeEach(function () {
        store._addEvents(MockData);
      });

      let calls = {
       "data.add":[()=>stubs.getSpy("data").add
       , ()=>[MockData]]
      }
      checkMulti(calls);
    });

    describe('fetch', function() {
      beforeEach(function() {
        store._fetch('api/path', spyManager.getSpy("progress"));
      });

      let calls = {
      "AjaxManager":[()=>stubs.getSpy("AjaxManager")
      , ['api/path']]
      , "ajax.fetch":[()=>spyManager.getSpy("ajax").fetch
       , ()=>[spyManager.getSpy("progress")]]
      }
      checkMulti(calls);

      it('should set fetch', function(done) {
        spyOn(store, "_addEvents");
        store._fetch('api/path', spyManager.getSpy("progress"));


        resolve(MockData);

        setTimeout(function() {
          expect(store._addEvents).toHaveBeenCalledWith(MockData)
            done();

          }, 100);
      });
    });

    describe('_setTabKey', function() {
      let data;
      beforeEach(function () {
        store._setTabKey("key");
      });

      let calls = {
       "data.tabKey":[()=>stubs.getSpy("data").tabKey
       , ()=>["key"]]
      }
      checkMulti(calls);

    });


    describe('tab functions', function() {
      afterEach(function () {
        store._changeType("all");
      });

      it('should default to all', function() {
        let type = getMod('type');
        expect(type).toEqual("all");
      });

      it('should set type', function() {
        store._changeType("event");
        let type = getMod('type');
        expect(type).toEqual("event");
      });

      it('should get type', function() {
        expect(store._getType()).toEqual("all");
      });
    });

    describe('_getEvents', function() {
      let data;
      beforeEach(function() {
        data = store._getEvents();
      });

      checkCalls(()=>{
        return stubs.getSpy("data").getTabData
      }, "data.getTabData", ()=>['all']);

      it('should return data', function() {
        expect(data).toEqual(filtered)
      });
    });
  });



});