import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
// import { DragDropContext } from 'react-beautiful-dnd';
import createHistory from 'history/createHashHistory';

import App from '../App';
import configureStore from '../../store/configureStore';

const history = createHistory();
const store = configureStore(history);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {/* <DragDropContext
            onDragStart={this.handleDragStart}
            onDragUpdate={this.handleDragUpdate}
            onDragEnd={this.handleDragEnd}
          > */}
          <App />
          {/* </DragDropContext> */}
        </ConnectedRouter>
      </Provider>
    );
  }

  handleDragStart = () => {
    // TODO
  }

  handleDragUpdate = () => {
    // TODO
  }

  handleDragEnd = () => {
    // TODO the only one that is required
  }
}
