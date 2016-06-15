/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import Test2Component from 'components//Test2Component.js';

describe('Test2Component', () => {
  let component;

  beforeEach(() => {
    component = createComponent(Test2Component);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('test2-component');
  });
});
