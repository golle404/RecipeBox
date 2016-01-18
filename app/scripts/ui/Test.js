'use strict';

var React = require('react');

var Test = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  render: function() {
    return (
      <div>Test</div>
    );
  }
});


module.exports = Test;
