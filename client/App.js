import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';

const socket = io('/');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            text:'',
            name:''
        };
    }
};

export default hot(module)(App);