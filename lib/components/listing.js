'use strict';

// Components
var BookBtn = require('./simple/book_btn'),
    DateDisplay = require('./simple/date_display'),
    ImgTag = require('./simple/img_tag'),
    GuestList = require('./simple/guest_list');

function manage_event(event) {
  return function (key) {
    return event.get(key);
  };
}

module.exports = function (props) {
  var event = manage_event(props.event);
  return React.createElement(
    'article',
    { className: 'event' },
    React.createElement(
      'div',
      { className: 'content_left' },
      React.createElement(
        'div',
        { className: 'image_container bookings_event' },
        React.createElement(ImgTag, { asset: event('asset') })
      )
    ),
    React.createElement(
      'div',
      { className: 'content_right' },
      React.createElement(
        'h1',
        { className: 'osw_l beta' },
        event('title')
      ),
      React.createElement(
        'span',
        { className: 'date eta' },
        React.createElement(DateDisplay, {
          start: event('start_time'),
          finish: event('finish_time')
        })
      ),
      React.createElement(GuestList, { url: event('guestlist') }),
      React.createElement(BookBtn, { url: event('booking') })
    )
  );
};