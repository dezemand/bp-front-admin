import React, {Component} from 'react'
import {List, ActionSheet, Modal, Toast} from 'antd-mobile'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class DataList extends Component {
  get wrapProps() {
    const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
    return !isIPhone ? {} : {onTouchStart: e => e.preventDefault()};
  }

  deleteData(data) {
    Modal.alert("Verwijderen", `Weet je zeker dat je ${data.name} wil verwijderen?`, [
      {text: "Annuleren", onPress: () => {}, style: 'default'},
      {text: "Verwijderen", onPress: () => {
        this.props.api.remove(data.uuid).then(res => {
          this.props.refresh();
        }).catch(e => {
          Toast.fail("Server error.");
          console.log(e);
        })
      }},
    ]);
  }

  changeDataState(data) {
    const options = ["Onbetaald", "Betaald", "Behandeld", "Annuleren"];
    ActionSheet.showActionSheetWithOptions({
      options,
      cancelButtonIndex: options.length - 1,
      message: `Wijzig status voor ${data.name}`,
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps: this.wrapProps,
    }, i => {
      if(i === options.length - 1) return;
      this.props.api.updateState(data.uuid, i).then(res => {
        this.props.refresh();
      }).catch(e => {
        Toast.fail("Server error.");
        console.log(e);
      });
    });
  }

  onClickData = (data) => {
    const options = ["Verander status", "Verwijder", "Annuleer"];
    ActionSheet.showActionSheetWithOptions({
      options,
      cancelButtonIndex: options.length - 1,
      destructiveButtonIndex: options.length - 2,
      message: `Wijzig ${data.firstName} ${data.lastName}`,
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps: this.wrapProps,
    }, i => {
      switch(i) {
        case 0: // Status
          this.changeDataState(data);
          break;
        case 1: // Verwijder
          this.deleteData(data);
          break;
        default:
          return;
      }
    });
  }

  getState(data) {
    if(data.state === 0)
      return (<span><FontAwesomeIcon fixedWidth icon="times"/> Onbetaald</span>);
    if(data.state === 1)
      return (<span><FontAwesomeIcon fixedWidth icon="check"/> Betaald</span>);
    if(data.state === 2)
      return (<span><FontAwesomeIcon fixedWidth icon="check-double"/> Behandeld</span>);
    return (`Onbekend (${data.state})`);
  }

  render() {
    if(this.props.data.length === 0)
      return (<div className="noResults"><FontAwesomeIcon icon="times-circle"/> Geen resultaten</div>);
    return (
      <List renderHeader={() => "Data"}>
        {this.props.data.map(data => (
          <List.Item extra={data.code || ""}
                     key={data.uuid}
                     align="top"
                     arrow="horizontal"
                     multipleLine onClick={() => this.onClickData(data)}>
            {this.getState(data)}
            <List.Item.Brief>{data.amount}x voor {data.name}</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    )
  }
}
