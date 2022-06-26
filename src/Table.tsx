import React from 'react';
import csgo from './assets/csgo.png';
import lol from './assets/lol.png';
import dota2 from './assets/dota2.png';
import { ColumnConfig } from './column-config';
import { EsportsTitle, Tournament } from './api/tournamentsApi';
import './Table.scss';
export default class Table extends React.Component<{ data: Tournament[]; }> {

  constructor(props: { data: Tournament[]; } | Readonly<{ data: Tournament[]; }>){
    super(props);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
  }
  
  getKeys(this: Table) {
    return Object.values(ColumnConfig).map((header) => {
      return header.accessor;
    });
  }

  getHeaders = () => {
    var headers = ColumnConfig;
    return headers.map((key: any, index: number) => {
      return <th className='column-header' key={index}>{key.header}</th>
    })
  }
  
  getRowsData(this: Table) {
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row: any, index: number) => {
      return <tr key={index}>
        {keys.map((property: string, idx) => {
          return this.getRowCell(idx, row, property)
        })}
      </tr>
    })
  }

  getRowCell(idx: number, row: any, property: string) {
    var cell;
    if (property === 'title') {
      cell = this.renderTitle(row['title']);
    } else {
      cell = row[property] ? row[property] : '-';
    }
    return <td key={idx}>{cell}</td>
  }

  renderTitle(param: String) {
    var imageTag;
    switch (param) {
      case EsportsTitle.CSGO:
        imageTag = <img src={csgo} alt="csgo" />
        break;
      case EsportsTitle.DOTA2:
        imageTag = <img src={dota2} alt="dota2" />
        break;
      case EsportsTitle.LOL:
        imageTag = <img src={lol} alt="lol" />
        break;
      default:
        break;
    }
    return imageTag;
  }

  render(): React.ReactNode {
    return (
      <table className='tournaments'>
        <thead className='table-header'>
          <tr>{this.getHeaders()}</tr>
        </thead>
        <tbody className='table-body'>
          {this.getRowsData()}
        </tbody>
      </table>
    );
  }
}