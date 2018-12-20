import React, {Component} from 'react'
import {SearchBar} from 'antd-mobile'


export default class Search extends Component {
  onChange = val => {
    this.props.onChange(val);
  }

  render() {
    return (
      <SearchBar placeholder="Zoek"
                 maxLength={32}
                 cancelText="Wissen"
                 showCancelButton={false}
                 onChange={this.onChange} />
    )
  }
}
