import React, { Component } from 'react';
import './custom.css'
import Login from './components/Login';
import Home from './components/Home';
import axios from 'axios';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    authenticated = (isAuthenticated) => {
        this.setState({
            isAuthenticated: isAuthenticated
        })
    }

    componentDidMount() {
        axios.get('/Home/IsAuthenticated').then(response => {
            this.authenticated(response.data);
        })
    }

    render() {

        return (
            <div className="h-full">
                {
                    this.state.isAuthenticated ? (<Home authenticated={this.authenticated} />) : (<Login authenticated={this.authenticated} />)
                }
            </div>

        );
    }
}
