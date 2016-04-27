"use strict";

// Libraries
var React = require('react');

module.exports = function (props) {
  if (!props.url) return null;
  return React.createElement(
    "div",
    { className: "clearfix" },
    React.createElement(
      "div",
      { className: props.css.wrapper },
      React.createElement(
        "a",
        { href: props.url, className: props.css.button },
        "Get on the guestlist"
      )
    )
  );
};