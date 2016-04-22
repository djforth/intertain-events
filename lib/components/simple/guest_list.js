"use strict";

module.exports = function (props) {
  if (!props.url) return '';
  return React.createElement(
    "div",
    { className: "clearfix" },
    React.createElement(
      "div",
      { className: "guestlist distressed" },
      React.createElement(
        "a",
        { href: props.url, className: "button button_guestlist" },
        "Get on the guestlist"
      )
    )
  );
};