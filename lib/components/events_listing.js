'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Libraries
var React = require('react'),
    _ = require('lodash/core');

var CssManager = require('../utils/css_manager');

var EventsActions = require('../actions/events_actions');

var ViewportDetect = require('viewport-detection-es6');
var detect = new ViewportDetect();

// Components
var Nav = require('./nav'),
    Listings = require('./listings');

var EventsListing = function (_React$Component) {
  _inherits(EventsListing, _React$Component);

  function EventsListing(props) {
    _classCallCheck(this, EventsListing);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventsListing).call(this, props));

    EventsActions.setKey(props.tabs.key);
    _this.state = { css_manager: CssManager(_this.props.css) };
    return _this;
  }

  /* Component life cycle */

  _createClass(EventsListing, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.events && _.isArray(this.props.events)) {
        EventsActions.add(this.props.events);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      EventsActions.fetch(this.props.api);
      this.device = detect.getDevice();
      this.size = detect.windowSize();
      EventsActions.changeDevice(this.device);
      detect.trackSize(function (device, size) {
        if (this.device !== device) {
          this.device = device;
          EventsActions.changeDevice(device);
        }

        this.size = size;
      }.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(Nav, { items: this.props.tabs.items, css_manager: this.state.css_manager }),
        React.createElement(Listings, { css_manager: this.state.css_manager })
      );
    }
  }]);

  return EventsListing;
}(React.Component);

module.exports = EventsListing;