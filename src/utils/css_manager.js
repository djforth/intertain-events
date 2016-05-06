const _    = require('lodash/core');
_.defaultsDeep = require('lodash/defaultsDeep');
_.get = require('lodash/get');

const styles = {
  book: {
    wrapper: 'booking distressed'
    , button: 'button button_book_small'
  }
  , guestlist: {
    wrapper: 'booking distressed'
    , button: 'button button_guestlist'
  }

  , listings: {
    date: 'date eta'
    , img: 'image_container bookings_event'
    , title: 'osw_l beta'
    , wrapper: 'event'
  }

  , panel: {
    wrapper: 'book_area cardboard events panel clearfix'
    , inner: 'panel_content events-listing'
  }

  , paginate: {
    button: 'paginate_btn'
    , wrapper: 'clearfix paginate'

  }

  , tabs: {
    holder: 'tabbed_navigation'
    , menu: 'osw_l alpha button button_tertiary cardboard menu_trigger'
    , wrapper: 'tabbed_navigation_wrapper clearfix'
    , tabs_holder: 'menu_navigation tertiary_navigation clearfix'
    , tab: 'osw_l alpha button button_tertiary cardboard'
    , active: 'active'
  }
};

module.exports = function(css){
  let event_styles =  _.defaultsDeep(css, styles);
  return function(comp){
    let es = event_styles[comp];
    return _.get(event_styles, comp, null);
  };
};
