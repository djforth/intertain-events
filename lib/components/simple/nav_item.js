"use strict";

// Libraries
var React = require('react');

module.exports = function (props) {
  var css = props.css + " " + props.active;
  return React.createElement(
    "li",
    null,
    React.createElement(
      "a",
      { className: css, href: "#", onClick: props.onclick },
      props.title
    )
  );
};