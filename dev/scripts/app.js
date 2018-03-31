import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView';

var config = {
  apiKey: "AIzaSyCVcHhl1NjTahUc2BNt01jMp1O_iY7TYsc",
  authDomain: "buisy-app.firebaseapp.com",
  databaseURL: "https://buisy-app.firebaseio.com",
  projectId: "buisy-app",
  storageBucket: "buisy-app.appspot.com",
  messagingSenderId: "340420571614"
};
firebase.initializeApp(config);


class App extends React.Component {
  render() {
    return (
      <div className="page">
        <MainView />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
