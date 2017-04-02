import { browserHistory, Router, Route, IndexRedirect, Redirect } from 'react-router';

import App from './app';
import List from './views/list';
import Detail from './views/detail';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/demo" component={App}>
      <IndexRedirect to="list" />
      <Route path="list" component={List} />
      <Route path="detail" component={Detail} />
      <Redirect from="*" to="/demo" />
    </Route>
  </Router>
), document.getElementById('mod-demo'));
