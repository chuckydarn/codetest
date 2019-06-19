import React, {Component} from 'react';
import Factoids from './components/Factoids';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
    this.getDogs = this.getDogs.bind(this);
  }

  componentWillMount() {
    this.getDogs();
  }

  getDogs() {
    fetch(`http://localhost:9000/dogs`)
    .then(res => res.json())
    .then(body => this.setState({ dogs: body.dogs })
    )
    .catch(err => err);
  }

  render() {
    return (
      <div className="app">
        <div className="card">
          {this.state.dogs.map(dog =>
            <div key={dog.id}>
              <h3>This is {dog.name}.</h3>
              <img src={require(`./assets/${dog.name}.png`)} alt={dog.name}></img>
              <Factoids dogId={dog.id} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
