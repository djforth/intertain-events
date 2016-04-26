'use strict';

// Libraries
var React = require('react');

module.exports = function (props) {
  var src = props.asset.get('src');
  var alt = props.asset.get('alt');
  return React.createElement('img', { src: src, alt: alt });
};