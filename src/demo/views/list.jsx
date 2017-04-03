import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

class List extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })).isRequired,
  }

  static defaultProps = {
    name: 'sunxg',
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleAddBtnClick = this.handleAddBtnClick.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleAddBtnClick() {
    this.props.dispatch(actions.addTodo(this.state.text));
    this.setState({ text: '' });
    this.inputText.focus();
  }

  render() {
    const { todos } = this.props;
    const { text } = this.state;
    return (
      <div className="demo-list">首页=------{this.props.name}<br />
        <input ref={(input) => { this.inputText = input; }} type="text" value={text} onChange={this.handleChange} />
        <button onClick={this.handleAddBtnClick}>添加</button>
        <br />
        {todos.map(t => <div key={t.id}>{t.text}-{t.id}</div>)}
        <br />
        <Link to="/demo/detail">详情页</Link>
      </div>
    );
  }
}

export default connect(store => store)(List);
