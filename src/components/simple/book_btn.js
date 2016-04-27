// Libraries
const React = require('react');

module.exports = function(props){
  if (!props.url) return '';
  return (
    <div className="clearfix">
      <div className={props.css.wrapper}>
        <a className={props.css.button}href={props.url}>
          Book a table
        </a>
      </div>
    </div>
  );
};
