import './app.scss';

export default function App({ children }) {
  return <div className="demo-app">{children}</div>;
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};
