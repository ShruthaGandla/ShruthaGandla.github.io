import React from "react";
import ReactDOM from "react-dom";
import './css/style.css';
import Grid from './components/Grid';

class App extends React.Component{
  render(){
    return (
      <div> <Grid/></div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
