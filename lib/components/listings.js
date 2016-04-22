'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    Immutable = require('immutable');

var EventsActions = require('../actions/events_actions'),
    EventsStore = require('../stores/events_store');

// Components
var Listing = require('./listing');

var Listings = function (_React$Component) {
  _inherits(Listings, _React$Component);

  function Listings(props) {
    _classCallCheck(this, Listings);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Listings).call(this, props));

    _this.state = {
      events: Immutable.fromJS([]),
      show_pagination: true
    };
    return _this;
  }

  _createClass(Listings, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      EventsStore.addChangeListener('added', this._getEvents.bind(this));
      EventsStore.addChangeListener('fetched', this._getEvents.bind(this));
      EventsStore.addChangeListener('paginate', this._getEvents.bind(this));
      EventsStore.addChangeListener('type_change', this._typeChange.bind(this));
      EventsStore.addChangeListener('stop_paginate', this._hidePagiantion.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      EventsStore.removeChangeListener('added', this._getEvents);
      EventsStore.removeChangeListener('fetched', this._getEvents);
      EventsStore.removeChangeListener('paginate', this._getEvents);
      EventsStore.removeChangeListener('stop_paginate', this._hidePagiantion);
      EventsStore.removeChangeListener('type_change', this._typeChange);
    }
  }, {
    key: '_hidePagiantion',
    value: function _hidePagiantion() {
      this.setState({ show_pagination: false });
    }
  }, {
    key: '_typeChange',
    value: function _typeChange() {
      this.setState({ events: EventsStore._getEvents(), show_pagination: true });
    }
  }, {
    key: '_getEvents',
    value: function _getEvents() {
      this.setState({ events: EventsStore._getEvents() });
    }
  }, {
    key: '_loadMore',
    value: function _loadMore(e) {
      e.preventDefault();
      EventsActions.paginate();
    }
  }, {
    key: '_renderListing',
    value: function _renderListing() {
      if (this.state.events.size === 0) {
        return React.createElement(
          'p',
          null,
          React.createElement(
            'strong',
            null,
            'There are no events available'
          )
        );
      }

      return this.state.events.map(function (event) {
        return React.createElement(Listing, { event: event, key: event.get('id') });
      });
    }
  }, {
    key: '_showPagination',
    value: function _showPagination() {
      if (!this.state.show_pagination) return '';
      if (this.state.events.size === 0) return '';
      return React.createElement(
        'div',
        { className: 'clearfix paginate' },
        React.createElement(
          'a',
          { className: 'paginate_btn',
            href: '#',
            onClick: this._loadMore.bind(this) },
          'Load More'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'book_area cardboard events panel clearfix' },
        React.createElement(
          'div',
          { className: 'panel_content events-listing' },
          this._renderListing()
        ),
        this._showPagination()
      );
    }
  }]);

  return Listings;
}(React.Component);

module.exports = Listings;