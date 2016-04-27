// Libraries
const React = require('react');

module.exports = function(props){
  let css = `${props.css} ${props.active}`;
  return (
    <li>
      <a className={css} href="#" onClick={props.onclick}>
        {props.title}
      </a>
    </li>
  );
};
