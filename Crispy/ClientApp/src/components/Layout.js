import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { DatePicker } from 'antd';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
        <div>
            <DatePicker />
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
