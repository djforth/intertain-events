'use strict';

// Libraries
var React = require('react');

module.exports = function (props) {
  if (!props.url) return '';
  return React.createElement(
    'div',
    { className: 'clearfix' },
    React.createElement(
      'div',
      { className: props.css.wrapper },
      React.createElement(
        'a',
        { className: props.css.button, href: props.url },
        'Book a table'
      )
    )
  );
};