// Libraries
const React = require('react');

module.exports = function(props){
  let st = props.start.get('fmt');
  let end = props.finish.get('fmt');
  // Thu 24 Mar | 6.00pm - 10.00pm
  return (<span>
    <strong>{st.format('ddd D MMM')}</strong>
    &nbsp;| {st.format('h:mm a')} - {end.format('h:mm a')}
  </span>);
};
