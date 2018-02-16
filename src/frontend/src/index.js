import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import Index from './pages/change';
import stores from "./stores";
import {Provider} from "mobx-react";

class App extends Component {
    render() {
        return (
            <Provider coins={stores.coins}>
                <div className="App">
                    <Index/>
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
