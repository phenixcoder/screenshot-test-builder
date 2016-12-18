require('./styles/styles.scss');
import React from 'react/addons';
import Root from './components/Root';

var attachElement = document.getElementById('main');

React.render(<Root />, attachElement);

// var appElement = React.createElement(Root, {name : initialName, items : initialItems});
// React.render(appElement, attachElement);