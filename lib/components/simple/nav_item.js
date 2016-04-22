"use strict";

module.exports = function (props) {
  var css = "osw_l alpha button button_tertiary cardboard " + props.active;
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