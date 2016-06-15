'use strict';

import React from 'react';

require('styles//Test.less');

class TestComponent extends React.Component {
  render() {
    return (
      <div className="test-component">
        Please edit src/components///TestComponent.js to update this component!
      </div>
    );
  }
}

TestComponent.displayName = 'TestComponent';

// Uncomment properties you need
// TestComponent.propTypes = {};
// TestComponent.defaultProps = {};

export default TestComponent;
