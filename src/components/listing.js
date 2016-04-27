// Libraries
const React = require('react');

// Components
const BookBtn     = require('./simple/book_btn')
    , DateDisplay = require('./simple/date_display')
    , ImgTag    = require('./simple/img_tag')
    , GuestList = require('./simple/guest_list');

function manage_event(event){
  return function(key){
    return event.get(key);
  };
}

module.exports = function(props){
  let event = manage_event(props.event);
  let css_manager = props.css_manager;
  return (
    <article className={css_manager('listings.wrapper')}>
      <div className="content_left">
        <div className={css_manager('listings.img')}>
          <ImgTag asset={event('asset')} />
        </div>
      </div>
      <div className="content_right">
        <h1 className={css_manager('listings.title')}>{event('title')}</h1>
        <span className={css_manager('listings.date')}>
          <DateDisplay
            start={event('start_time')}
            finish={event('finish_time')}
          />
        </span>
        <GuestList url={event('guestlist')} css={css_manager('guestlist')} />
        <BookBtn url={event('booking')} css={css_manager('book')} />
      </div>
    </article>
  );
};
