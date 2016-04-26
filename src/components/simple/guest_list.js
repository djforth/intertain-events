// Libraries
const React = require('react');

module.exports = function(props){
  if (!props.url) return '';
  return (
    <div className="clearfix">
      <div className="guestlist distressed">
        <a href={props.url} className="button button_guestlist">
          Get on the guestlist
        </a>
      </div>
    </div>
  );
};
