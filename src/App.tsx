import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './component/main/main';
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h3>Hashedin Virtual Machine</h3>
            </header>
            <div className="App-body">
                <Main />
            </div>
        </div>
    );
}
export default App;
