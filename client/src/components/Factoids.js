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
    fetch(`https://chuckydarn-opendrives.herokuapp.com/factoids`)
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
    fetch(`https://chuckydarn-opendrives.herokuapp.com/factoids/create`, {
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
    fetch(`https://chuckydarn-opendrives.herokuapp.com/factoids/${id}/destroy`, {
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
        <div className="factoids-body">
          <ul>
            {this.state.factoids.filter(factoid => factoid.dogId === this.props.dogId).map(factoid =>
              <li key={factoid.id} className="factoid">
                {factoid.factoid}
                <button className="button delete-btn" type="submit" onClick={(e, id) => {this.handleDelete(e, factoid.id)}}><span role="img" aria-label="Delete">✕</span></button>
              </li>
            )}
          </ul>
        </div>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" value={this.state.newFactoid} onChange={(e) => {this.handleChange(e)}} placeholder="Enter New Factoid" />
          <button type="submit"><span role="img" aria-label="Add">➕</span></button>
        </form>
      </div>
    );
  }
}

export default Factoids;
