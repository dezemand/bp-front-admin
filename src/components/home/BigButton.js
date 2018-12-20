import React, {Component} from 'react';

export default class BigButton extends Component {
  onClick = (e) => {
    e.preventDefault();
    if(typeof this.props.onClick === "function")
      this.props.onClick();
    return false;
  }

  render() {
    return (
      <a href="#" className={`BigButton type${this.props.type}`} onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }
}