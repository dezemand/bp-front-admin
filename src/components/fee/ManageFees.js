import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/index.es'
import Header from '../Header'
import Search from '../manage/Search'
import {WhiteSpace, Toast} from 'antd-mobile'
import DataList from './DataList'
import Actions from './Actions'
import Api from '../../api/Api'
import './ManageFees.css'


export default class ManageFees extends Component {
  state = {search: "", data: [], sort: 3, filter: 15};
  api = new Api();

  onSearch = search => {
    this.setState({search});
  }

  get actions() {
    if(this.state.search === "") {
      return (
        <div>
          <WhiteSpace/>
          <Actions refresh={this.refresh}
                   amount={this.state.data.length}
                   onChange={this.onActionsChange}
                   setData={this.setData}/>
        </div>
      );
    } else return (<div/>);
  }

  refresh = () => {
    this.api.listFee().then(res => {
      this.setState({data: res.list});
    }).catch(e => {
      Toast.fail("Server error.");
      console.log(e);
    });
  }

  onActionsChange = (sort, filter) =>{
    this.setState({sort, filter});
  }

  setData = (data) => {
    this.setState({data});
  }

  get filteredData() {
    return this.state.data.filter(entry => {
      if(entry.method === 0 && entry.state === 1 && (this.state.filter & 1) === 0) return false;
      if(entry.method === 1 && entry.state === 0 && (this.state.filter & 2) === 0) return false;
      if(entry.method === 0 && entry.state === 0 && (this.state.filter & 4) === 0) return false;
      if(entry.state === 2 && (this.state.filter & 8) === 0) return false;
      return true;
    });
  }

  get sortedData() {
    return this.filteredData.sort((a, b) => {
      switch(this.state.sort) {
        case 0:
          return a.firstName > b.firstName ? 1 : (a.firstName < b.firstName ? -1 : 0);
        case 1:
          return a.lastName > b.lastName ? 1 : (a.lastName < b.lastName ? -1 : 0);
        case 2:
          return a.created > b.created ? 1 : (a.created < b.created ? -1 : 0);
        case 3:
          return a.created < b.created ? 1 : (a.created > b.created ? -1 : 0);
        case 4: default:
          let aCode = a.code || 99999999, bCode = b.code || 99999999;
          return aCode > bCode ? 1 : (aCode < bCode ? -1 : 0);
      }
    });
  }

  get data() {
    let data = this.sortedData;
    if(this.state.search === "")
      return data;
    return data.filter(entry => {
      if(entry.code.toString().indexOf(this.state.search) !== -1) return true;
      if(`${entry.firstName} ${entry.lastName}`.toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1) return true;
      return false;
    });
  }

  render() {
    return (
      <div className="App">
        <Header goHome={this.props.goHome}>
          Beheer <FontAwesomeIcon icon="angle-right"/> Entree
        </Header>
        <Search onChange={this.onSearch}/>
        {this.actions}
        <WhiteSpace/>
        <DataList data={this.data}
                  api={this.api}
                  refresh={this.refresh}
                  search={this.state.search}/>
      </div>
    )
  }
}
