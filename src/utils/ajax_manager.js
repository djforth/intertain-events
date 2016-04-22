const _    = require('lodash/core')
    , Ajax = require('ajax-es6-module');

const ajaxManager = new Ajax();

module.exports = function(api){
  let progress;
  ajaxManager.addUrl(api);

  var obj = {
    addProgress: (p)=>{
      progress = (_.isFunction(p)) ? p : null;
      return obj;
    }
    , fetch: ()=>{
      return ajaxManager.fetch(progress)
        .catch((err)=>{
          throw new Error(err);
        });
    }
  };

  return obj;
};
