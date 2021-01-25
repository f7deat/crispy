import React, { Component } from 'react';
import './custom.css'
import Login from './components/Login';
import Home from './components/Home';

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }
    authenticated = () => {
        this.setState({
            isAuthenticated: true
        })
    }

    render() {
        return (
            <div className="h-full">
                {
                    this.state.isAuthenticated ? (<Home />) : (<Login authenticated={this.authenticated} />)
                }
            </div>

        );
    }
}
