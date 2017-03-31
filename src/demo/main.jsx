import App from './app';
import Index from './views/index';
import Detail from './views/detail';

const { browserHistory, Router, Route, IndexRedirect, Redirect } = ReactRouter;

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/demo" component={App}>
      <IndexRedirect to="index" />
      <Route path="index" component={Index} />
      <Route path="detail" component={Detail} />
      <Redirect from="*" to="/demo" />
    </Route>
  </Router>
), document.getElementById('mod-demo'));
