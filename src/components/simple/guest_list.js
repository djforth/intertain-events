// Libraries
const React = require('react');

module.exports = function(props){
  if (!props.url) return null;
  return (
    <div className="clearfix">
      <div className={props.css.wrapper}>
        <a href={props.url} className={props.css.button}>
          Get on the guestlist
        </a>
      </div>
    </div>
  );
};
