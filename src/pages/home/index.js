import React, { Component } from 'react';

import Member from 'pages/member/';

class Home extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <div>
                Home
                <Member />
            </div>
        );
    }
}

export default Home;
