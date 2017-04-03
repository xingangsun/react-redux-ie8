import { browserHistory, Router, Route, IndexRedirect, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import App from './app';
import List from './views/list';
import Detail from './views/detail';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/demo" component={App}>
        <IndexRedirect to="list" />
        <Route path="list" component={List} />
        <Route path="detail" component={Detail} />
        <Redirect from="*" to="/demo" />
      </Route>
    </Router>
  </Provider>
), document.getElementById('mod-demo'));
