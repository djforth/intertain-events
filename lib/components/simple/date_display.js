'use strict';

module.exports = function (props) {
  var st = props.start.get('fmt');
  var end = props.finish.get('fmt');
  // Thu 24 Mar | 6.00pm - 10.00pm
  return React.createElement(
    'span',
    null,
    React.createElement(
      'strong',
      null,
      st.format('ddd D MMM')
    ),
    ' | ',
    st.format('h:mm a'),
    ' - ',
    end.format('h:mm a')
  );
};