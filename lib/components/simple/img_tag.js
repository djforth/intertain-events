'use strict';

module.exports = function (props) {
  var src = props.asset.get('src');
  var alt = props.asset.get('alt');
  return React.createElement('img', { src: src, alt: alt });
};