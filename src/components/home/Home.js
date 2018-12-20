import React, {Component} from 'react';
import BigButton from './BigButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Home.css'

export default class Home extends Component {
  clickFee = () => {
    if(typeof this.props.onClick === "function")
      this.props.onClick("fee");
  }

  clickBalloon = () => {
    if(typeof this.props.onClick === "function")
      this.props.onClick("balloon");
  }

  render() {
    return (
      <div className="Home">
        <BigButton type={1} onClick={this.clickFee}>
          <div className="icon"><FontAwesomeIcon icon="sign-in-alt"/></div>
          <p>Entree</p>
        </BigButton>
        <BigButton type={2} onClick={this.clickBalloon}>
          <div className="icon"><FontAwesomeIcon icon="wind"/></div>
          <p>Ballonnen</p>
        </BigButton>
      </div>
    );
  }
}
