import { Link } from 'react-router';

export default class Index extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
  }

  static defaultProps = {
    name: 'sunxg',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="demo-index">首页=------{this.props.name}<br />
        <Link to="/demo/detail">详情页</Link>
      </div>
    );
  }
}
