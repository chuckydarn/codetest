import React, {Component} from 'react';
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
      <div className="App">
        <ul>
          {this.state.dogs.map(dog =>
            <li key={dog.id}>{dog.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
