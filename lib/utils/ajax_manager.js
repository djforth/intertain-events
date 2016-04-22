'use strict';

var _ = require('lodash/core'),
    Ajax = require('ajax-es6-module');

var ajaxManager = new Ajax();

module.exports = function (api) {
  var progress = void 0;
  ajaxManager.addUrl(api);

  var obj = {
    addProgress: function addProgress(p) {
      progress = _.isFunction(p) ? p : null;
      return obj;
    },
    fetch: function fetch() {
      return ajaxManager.fetch(progress).catch(function (err) {
        throw new Error(err);
      });
    }
  };

  return obj;
};