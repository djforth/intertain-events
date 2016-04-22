var _ = require("lodash");

var ajax_manager = require('../../src/utils/ajax_manager')

const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , getMod     = require("@djforth/morse-jasmine/get_module")(ajax_manager)
  , mockClass = require("@djforth/morse-jasmine/mock_class")
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(ajax_manager)

xdescribe('ajax_manager', function() {
  let promise, ajax, ajaxClass, resolve, reject;
  beforeEach(function() {
    promise = new Promise(function(res, rej){
      resolve = res
      reject  =rej
    })
    spyManager.addSpy(["progress"]);
    stubs.addSpy({title:"ajaxManager", opts:["addUrl", "fetch"]})

    stubs.getSpy("ajaxManager").fetch.and.returnValue(promise);
    // stubs.getSpy("ajaxManager").and.returnValue(spyManager.getSpy("ajaxManager"));
    ajax = ajax_manager("my/api/call")
  });

  afterEach(function () {
    stubs.revertAll();
    spyManager.removeAll();
  });

  checkCalls(()=>{
    return stubs.getSpy("ajaxManager").addUrl
  }, "ajaxManager.addUrl", ()=>["my/api/call"]);

  it('should return obj', function() {
    expect(_.isPlainObject(ajax)).toBeTruthy();
  });

  describe('with progress', function() {
    let prom;
    beforeEach(function() {
      ajax.addProgress(spyManager.getSpy('progress'));
      prom = ajax.fetch()
    });

    checkCalls(()=>{
    return stubs.getSpy("ajaxManager").fetch
  }, "progress", ()=>[spyManager.getSpy('progress')]);

    it('should return success if promise resolved', function(done) {
      prom.then(function(data){
        expect(data).toEqual("data");
      });

      resolve("data");

      setTimeout(function() {
        done();
      }, 100);
    });

    it('should throw an error if rejected', function(done) {
      prom.catch(function(err){
        expect(err).toThrowError("error");
      });
      reject("error");

      setTimeout(function() {
        done();
      }, 100);
    });
  });


  describe('without progress', function() {
    let prom;
    beforeEach(function() {
      prom = ajax.fetch()
    });

    checkCalls(()=>{
    return stubs.getSpy("ajaxManager").fetch
  }, "progress", ()=>[undefined]);
  })

});