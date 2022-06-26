/* eslint-disable array-callback-return */
import { Tournament } from './api/tournamentsApi';
import React from 'react';

type ColumnHeaders = {
  header: string;
  accessor: string;
};

export default class Table extends React.Component<{ data: Tournament[]; headers: ColumnHeaders[]; }> {
  constructor(props: { data: Tournament[]; headers: ColumnHeaders[]; } | Readonly<{ data: Tournament[]; headers: ColumnHeaders[]; }>){
    super(props);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.getHeader = this.getHeader.bind(this);
  }
  
  getKeys = function(this: Table) {
    return Object.values(this.props.headers).map((header) => {
      return header.accessor;
    });
  }

  getHeader = () =>{
    var headers = this.props.headers;
    return headers.map((key: any, index: React.Key | null | undefined) => {
      return <th key={index}>{key.header}</th>
    })
  }
  
  getRowsData = function(this: Table){
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row: any, index: React.Key | null | undefined) => {
      return <tr key={index}>
        {keys.map((property: string, idx) => {
          return <td key={idx}>{row[property]}</td>
        })}
      </tr>
    })
  }

  render(): React.ReactNode {
    return (
      <table>
        <thead>
          <tr>{this.getHeader()}</tr>
        </thead>
        <tbody>
          {this.getRowsData()}
        </tbody>
      </table>
    );
  }
}