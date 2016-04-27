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
      { className: "booking distressed" },
      React.createElement(
        "a",
        { className: "button button_book_small", href: props.url },
        "Book a table"
      )
    )
  );
};