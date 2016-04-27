// Libraries
const React = require('react');

module.exports = function(props){
  if (!props.url) return null;
  return (
    <div className="clearfix">
      <div className="booking distressed">
        <a className="button button_book_small" href={props.url}>
          Book a table
        </a>
      </div>
    </div>
  );
};
