import React, {Component} from 'react';
import '../App.css';

class Factoids extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factoids: [],
      newFactoid: ""
    };
    this.getFactoids = this.getFactoids.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    this.getFactoids();
  }

  getFactoids() {
    fetch(`http://localhost:9000/factoids`)
    .then(res => res.json())
    .then(body => this.setState({ factoids: body.factoids })
    )
    .catch(err => err);
  }

  handleChange(e) {
    this.setState({newFactoid: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    if(!this.state.newFactoid){return};
    fetch(`http://localhost:9000/factoids/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        factoid: this.state.newFactoid,
        dogId: this.props.dogId
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      this.setState({ factoids: [...this.state.factoids, body.factoid] });
    });
    this.setState({newFactoid: ""});
  }

  handleDelete(e, id) {
    fetch(`http://localhost:9000/factoids/${id}/destroy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      this.setState({factoids: this.state.factoids.filter(factoid => factoid.id !== body)});
    })
  }

  render() {
    return (
      <div className="factoids">
        <div>
          <ul>
            {this.state.factoids.filter(factoid => factoid.dogId === this.props.dogId).map(factoid =>
              <li key={factoid.id} className="fact">
                {factoid.factoid}
                <button className="button" type="submit" onClick={(e, id) => {this.handleDelete(e, factoid.id)}}>✖️</button>
              </li>
            )}
          </ul>
        </div>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" value={this.state.newFactoid} onChange={(e) => {this.handleChange(e)}} placeholder="Enter New Factoid" />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default Factoids;
