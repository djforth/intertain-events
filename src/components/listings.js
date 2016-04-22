const React     = require('react')
    , Immutable = require('immutable');

const EventsActions = require('../actions/events_actions')
    , EventsStore = require('../stores/events_store');

// Components
const Listing = require('./listing');

class Listings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      events: Immutable.fromJS([])
      , show_pagination: true
    };
  }

  componentWillMount(){
    EventsStore.addChangeListener('added', this._getEvents.bind(this));
    EventsStore.addChangeListener('fetched', this._getEvents.bind(this));
    EventsStore.addChangeListener('paginate', this._getEvents.bind(this));
    EventsStore.addChangeListener('type_change', this._typeChange.bind(this));
    EventsStore.addChangeListener('stop_paginate'
      , this._hidePagiantion.bind(this)
    );
  }

  componentWillUnmount(){
    EventsStore.removeChangeListener('added', this._getEvents);
    EventsStore.removeChangeListener('fetched', this._getEvents);
    EventsStore.removeChangeListener('paginate', this._getEvents);
    EventsStore.removeChangeListener('stop_paginate', this._hidePagiantion);
    EventsStore.removeChangeListener('type_change', this._typeChange);
  }

  _hidePagiantion(){
    this.setState({show_pagination: false});
  }

  _typeChange(){
    this.setState({events: EventsStore._getEvents(), show_pagination: true});
  }

  _getEvents(){
    this.setState({events: EventsStore._getEvents()});
  }

  _loadMore(e){
    e.preventDefault();
    EventsActions.paginate();
  }

  _renderListing(){
    if (this.state.events.size === 0){
      return (<p><strong>There are no events available</strong></p>);
    }

    return this.state.events.map((event)=>{
      return (<Listing event={event} key={event.get('id')} />);
    });
  }

  _showPagination(){
    if (!this.state.show_pagination) return '';
    if (this.state.events.size === 0) return '';
    return (
      <div className="clearfix paginate">
        <a className="paginate_btn"
            href="#"
            onClick={this._loadMore.bind(this)}>
          Load More
        </a>
      </div>
    );
  }

  render(){
    return (
      <div className="book_area cardboard events panel clearfix">
        <div className="panel_content events-listing">
          {this._renderListing()}
        </div>

        {this._showPagination()}

      </div>
    );
  }
}

module.exports = Listings;
