import React, {Component} from 'react';
import Factoids from './components/Factoids';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      transform: 0,
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

  prev() {
    this.setState({
      transform: this.state.transform + 400
    })
  }

  next() {
    this.setState({
      transform: this.state.transform - 400
    })
  }

  render() {
    var style = {
      transform: `translateX(${this.state.transform}px)`
    }

    let prevBtn;
    let nextBtn;

    if(this.state.transform !== 0) {
      prevBtn = <button className="button transition-btn left" onClick={() => this.prev()}>&#11071;</button>
    }

    if(this.state.transform >= ((this.state.dogs.length-2)*-400)) {
      nextBtn = <button className="button transition-btn right" onClick={() => this.next()}>&#10547;</button>
    }

    return (
      <div className="app">
        <div className="container">
          {this.state.dogs.map(dog =>
            <div className="card" style={style} key={dog.id}>
              {prevBtn}

              <div className="card-content">
                <h3 className="card-title">This is {dog.name}.</h3>
                <img className="card-img" src={require(`./assets/${dog.name}.png`)} alt={dog.name}></img>
                <Factoids dogId={dog.id} />
              </div>

              {nextBtn}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
