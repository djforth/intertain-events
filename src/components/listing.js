
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
  return (
    <article className="event">
      <div className="content_left">
        <div className="image_container bookings_event">
          <ImgTag asset={event('asset')} />
        </div>
      </div>
      <div className="content_right">
        <h1 className="osw_l beta">{event('title')}</h1>
        <span className="date eta">
          <DateDisplay
            start={event('start_time')}
            finish={event('finish_time')}
          />
        </span>
        <GuestList url={event('guestlist')} />
        <BookBtn url={event('booking')} />
      </div>
    </article>
  );
};
