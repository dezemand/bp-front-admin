import React, {Component} from 'react'
import {List, ActionSheet} from 'antd-mobile'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Filter from './Filter'

export default class Actions extends Component {
  state = {sort: 2, showFilter: false, filter: 15};
  sortOptions = ["Alfabetisch", "Oud naar nieuw", "Nieuw naar oud", "Code"];

  get wrapProps() {
    const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
    return !isIPhone ? {} : {onTouchStart: e => e.preventDefault()};
  }

  onFilterChange = filter => this.setState({filter}, () => this.props.onChange(this.state.sort, this.state.filter));

  filterData = () => {
    this.setState({showFilter: !this.state.showFilter});
  }

  sortData = () => {
    let options = this.sortOptions.slice();
    options.push("Annuleren");

    ActionSheet.showActionSheetWithOptions({
      options,
      cancelButtonIndex: this.sortOptions.length,
      message: 'Sorteer data',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps: this.wrapProps,
    }, i => {
      if(i < this.sortOptions.length)
        this.setState({sort: i}, () => this.props.onChange(this.state.sort, this.state.filter));
    });
  }

  render() {
    return (
      <List renderHeader={() => "Acties"}>
        <List.Item onClick={() => this.props.refresh()} arrow="horizontal" extra={this.props.amount}>
          <FontAwesomeIcon fixedWidth icon="download" /> Haal lijst binnen
        </List.Item>
        <List.Item onClick={this.filterData} arrow="horizontal">
          <FontAwesomeIcon fixedWidth icon="filter"/> Filter
        </List.Item>
        <Filter show={this.state.showFilter} onChange={this.onFilterChange}/>
        <List.Item onClick={this.sortData} arrow="horizontal" extra={this.sortOptions[this.state.sort]}>
          <FontAwesomeIcon fixedWidth icon="sort-amount-down"/> Sorteer
        </List.Item>
      </List>
    )
  }
}
