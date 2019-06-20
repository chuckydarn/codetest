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
    let pixels;
    if(window.innerWidth <= 1000){
      pixels = 300;
    } else {
      pixels = 400;
    }
    this.setState({
      transform: this.state.transform + pixels
    })
  }

  next() {
    let pixels;
    if(window.innerWidth <= 1000){
      pixels = 300;
    } else {
      pixels = 400;
    }
    this.setState({
      transform: this.state.transform - pixels
    })
  }

  render() {
    var style = {
      transform: `translateX(${this.state.transform}px)`
    }

    let prevBtn;
    let nextBtn;

    if(this.state.transform !== 0) {
      prevBtn = <button className="button transition-btn left" onClick={() => this.prev()}><span role="img" aria-label="Previous">👈</span></button>
    }

    if(this.state.transform >= ((this.state.dogs.length-2)*-400)) {
      nextBtn = <button className="button transition-btn right" onClick={() => this.next()}><span role="img" aria-label="Next">👉</span></button>
    }

    return (
      <div className="app">
        <div className="app-body">
          <div className="container">
            {prevBtn}
            {this.state.dogs.map(dog =>
              <div className="card" style={style} key={dog.id}>


                <div className="card-content">
                  <h3 className="card-title">This is <span>{dog.name}</span></h3>
                  <img className="card-img" src={require(`./assets/${dog.name}.png`)} alt={dog.name}></img>
                  <Factoids dogId={dog.id} />
                </div>
              </div>
            )}
            {nextBtn}
          </div>
        </div>
        <footer>
          <span>Cuteness Overload Courtsey of <a href="https://twitter.com/dog_rates" target="_blank">@Dog_rates</a></span>
          <span>Built by <a href="chuckydarn.com" target="_blank">Charlie Haag</a></span>
        </footer>
      </div>
    );
  }
}

export default App;
