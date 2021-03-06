// Libraries
const React    = require('react')
    , _        = require('lodash/core');

const EventsActions = require('../actions/events_actions')
    , EventsStore = require('../stores/events_store');

const cssMixins  = require('morse-react-mixins').css_mixins;

// Components
const NavItem = require('./simple/nav_item');

function setKey(key){
  key = key.replace(/s$/, '');
  return key.toLowerCase();
}

class Nav extends React.Component{
  constructor(props){
    super(props);

    this.nav = [props.css_manager('tabs.wrapper'), {hidden: false}];
    this.state = {active: 'all', nav: this.getClasses(this.nav)};
  }

  _isActive(key){
    key = setKey(key);
    let type = EventsStore._getType().toLowerCase();
    return (type === key) ? this.props.css_manager('tabs.active') : '';
  }

  componentDidMount(){
    EventsStore.addChangeListener('device_change'
                                  , this._deviceChange.bind(this));
  }

  componentWillUnmount(){
    EventsStore.removeChangeListener('device_change', this._deviceChange);
    // SessionsStore.removeChangeListener('fetched', this._onLoaded);
  }

  _deviceChange(){
    this.nav[1].hidden = (EventsStore._getDevice() === 'mobile');
    this.setState({nav: this.getClasses(this.nav)});
  }

  _onClick(key, e){
    e.preventDefault();
    key = setKey(key);
    this.setState({active: key});
    EventsActions.change(key);
  }

  _openNav(e){
    e.preventDefault();
    this.nav = this.toggleCss(this.nav);
    this.setState({nav: this.getClasses(this.nav)});
  }

  _renderNavItems(){
    if (this.props.items){
      return _.map(this.props.items, (item)=>{
        return (<NavItem title={item}
                active={this._isActive(item)}
                css={this.props.css_manager('tabs.tab')}
                key={`nav_${item}`}
                onclick={this._onClick.bind(this, item)} />);
      });
    }

    return '';
  }

  render(){
    let cm = this.props.css_manager;
    return (
      <div className={cm('tabs.holder')}>
        <a className={cm('tabs.menu')}
            href="#"
            onClick={this._openNav.bind(this)}>
            Change Events Type
          </a>
        <nav className={this.state.nav}>

           <ul className={cm('tabs.tabs.holder')}>
              {this._renderNavItems()}
          </ul>
        </nav>
      </div>
    );
  }
}

Object.assign(Nav.prototype, cssMixins);

module.exports = Nav;
