import React from 'react';
import { Outlet } from 'react-router-dom';

class ConferenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      starts: '',
      ends: '',
      description: '',
      max_presentations: '',
      max_attendees: '',
      location: '',
      locations: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeEnds = this.handleChangeEnds.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeMaxAttendees = this.handleChangeMaxAttendees.bind(this);
    this.handleChangeMaxPresentations = this.handleChangeMaxPresentations.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeStarts = this.handleChangeStarts.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.locations;

    const conferenceUrl = 'http://localhost:8000/api/conferences/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
      console.log(newConference);
      this.setState({
        name: '',
        starts: '',
        ends: '',
        description: '',
        max_presentations: '',
        max_attendees: '',
        location: '',
      });
    }
  }

  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleChangeStarts(event) {
    const value = event.target.value;
    this.setState({ starts: value });
  }

  handleChangeEnds(event) {
    const value = event.target.value;
    this.setState({ ends: value });
  }

  handleChangeDescription(event) {
    const value = event.target.value;
    this.setState({ description: value });
  }

  handleChangeMaxPresentations(event) {
    const value = event.target.value;
    this.setState({ max_presentations: value });
  }

  handleChangeMaxAttendees(event) {
    const value = event.target.value;
    this.setState({ max_attendees: value });
  }

  handleChangeLocation(event) {
    const value = event.target.value;
    this.setState({ location: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleChangeName} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.starts} onChange={this.handleChangeStarts} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" />
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.ends} onChange={this.handleChangeEnds} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" />
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea value={this.state.description} onChange={this.handleChangeDescription} id="description" rows="3" name="description" className="form-control"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.max_presentations} onChange={this.handleChangeMaxPresentations} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" />
                <label htmlFor="max_presentations">Maximum presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.max_attendees} onChange={this.handleChangeMaxAttendees} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" />
                <label htmlFor="max_attendees">Maximum attendees</label>
              </div>
              <div className="mb-3">
                <select value={this.state.location} onChange={this.handleChangeLocation} required name="location" id="location" className="form-select">
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return (
                      <option key={location.name} value={location.name}>{location.name}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        <Outlet />
      </div>
    );
  }
}

export default ConferenceForm;
