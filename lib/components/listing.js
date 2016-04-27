'use strict';

// Libraries
var React = require('react');

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
  var css_manager = props.css_manager;
  return React.createElement(
    'article',
    { className: css_manager('listings.wrapper') },
    React.createElement(
      'div',
      { className: 'content_left' },
      React.createElement(
        'div',
        { className: css_manager('listings.img') },
        React.createElement(ImgTag, { asset: event('asset') })
      )
    ),
    React.createElement(
      'div',
      { className: 'content_right' },
      React.createElement(
        'h1',
        { className: css_manager('listings.title') },
        event('title')
      ),
      React.createElement(
        'span',
        { className: css_manager('listings.date') },
        React.createElement(DateDisplay, {
          start: event('start_time'),
          finish: event('finish_time')
        })
      ),
      React.createElement(GuestList, { url: event('guestlist'), css: css_manager('guestlist') }),
      React.createElement(BookBtn, { url: event('booking'), css: css_manager('book') })
    )
  );
};