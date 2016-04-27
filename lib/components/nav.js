'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Libraries
var React = require('react'),
    _ = require('lodash/core');

var EventsActions = require('../actions/events_actions'),
    EventsStore = require('../stores/events_store');

var cssMixins = require('morse-react-mixins').css_mixins;

// Components
var NavItem = require('./simple/nav_item');

function setKey(key) {
  key = key.replace(/s$/, '');
  return key.toLowerCase();
}

var Nav = function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav(props) {
    _classCallCheck(this, Nav);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Nav).call(this, props));

    _this.nav = [props.css_manager('tabs.wrapper'), { hidden: false }];
    _this.state = { active: 'all', nav: _this.getClasses(_this.nav) };
    return _this;
  }

  _createClass(Nav, [{
    key: '_isActive',
    value: function _isActive(key) {
      key = setKey(key);
      var type = EventsStore._getType().toLowerCase();
      return type === key ? this.props.css_manager('tabs.active') : '';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      EventsStore.addChangeListener('device_change', this._deviceChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      EventsStore.removeChangeListener('device_change', this._deviceChange);
      // SessionsStore.removeChangeListener('fetched', this._onLoaded);
    }
  }, {
    key: '_deviceChange',
    value: function _deviceChange() {
      this.nav[1].hidden = EventsStore._getDevice() === 'mobile';
      this.setState({ nav: this.getClasses(this.nav) });
    }
  }, {
    key: '_onClick',
    value: function _onClick(key, e) {
      e.preventDefault();
      key = setKey(key);
      this.setState({ active: key });
      EventsActions.change(key);
    }
  }, {
    key: '_openNav',
    value: function _openNav(e) {
      e.preventDefault();
      this.nav = this.toggleCss(this.nav);
      this.setState({ nav: this.getClasses(this.nav) });
    }
  }, {
    key: '_renderNavItems',
    value: function _renderNavItems() {
      var _this2 = this;

      if (this.props.items) {
        return _.map(this.props.items, function (item) {
          return React.createElement(NavItem, { title: item,
            active: _this2._isActive(item),
            css: _this2.props.css_manager('tabs.tab'),
            key: 'nav_' + item,
            onclick: _this2._onClick.bind(_this2, item) });
        });
      }

      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      var cm = this.props.css_manager;
      return React.createElement(
        'div',
        { className: cm('tabs.holder') },
        React.createElement(
          'a',
          { className: cm('tabs.menu'),
            href: '#',
            onClick: this._openNav.bind(this) },
          'Change Events Type'
        ),
        React.createElement(
          'nav',
          { className: this.state.nav },
          React.createElement(
            'ul',
            { className: cm('tabs.tabs.holder') },
            this._renderNavItems()
          )
        )
      );
    }
  }]);

  return Nav;
}(React.Component);

Object.assign(Nav.prototype, cssMixins);

module.exports = Nav;