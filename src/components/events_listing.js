// Libraries
const React = require('react')
    , _     = require('lodash/core');

const CssManager = require('../utils/css_manager');

const EventsActions = require('../actions/events_actions');

const ViewportDetect = require('viewport-detection-es6');
const detect = new ViewportDetect();

// Components
const Nav      = require('./nav')
    , Listings = require('./listings');

class EventsListing extends React.Component{
  constructor(props){
    super(props);
    EventsActions.setKey(props.tabs.key);
    this.state = {css_manager: CssManager(this.props.css)};
  }

  /* Component life cycle */

  componentWillMount(){
    if (this.props.events && _.isArray(this.props.events)){
      EventsActions.add(this.props.events);
    }
  }

  componentDidMount(){
    EventsActions.fetch(this.props.api);
    this.device = detect.getDevice();
    this.size  = detect.windowSize();
    EventsActions.changeDevice(this.device);
    detect.trackSize(function(device, size){
      if (this.device !== device){
        this.device =  device;
        EventsActions.changeDevice(device);
      }

      this.size   = size;
    }.bind(this));
  }

  componentWillUnmount(){
  }

  render(){
    return (<div>
      <Nav items={this.props.tabs.items} css_manager={this.state.css_manager} />
      <Listings css_manager={this.state.css_manager}/>
    </div>);
  }
}

module.exports = EventsListing;
