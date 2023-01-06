import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import bootstrap from 'bootstrap'
import { Component } from 'react'

class FilmsContainer extends Component{

  constructor(props){
    super()

    this.handleAddedFormChange = this.handleAddedFormChange.bind(this);
    this.addFilm = this.addFilm.bind(this);


    this.state = {
      films: [],
      chosen_film: 0,

      page: 0,

      addedFilm:{
        manufacturer: "",
        name: "",
        type: "",
        iso: "",
      }

    }
  }

  handleAddedFormChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      addedFilm: { ...this.state.addedFilm, [name]: value}
    });
  }

  addFilm() {
    let filmsContainer = this

    axios({
          method: 'post',
          url: '/film/',
          data: filmsContainer.state.addedFilm
      })
          .then(function (response) {
            console.log(response.data)
            filmsContainer.setState(
              {
                films: [...filmsContainer.state.films, response.data]
              }
            )
          })
          .catch(function (error) {
            console.log(error)
          })
  }

  getFilms(){
    let filmsContainer = this

    axios({
          method: 'get',
          url: '/film/',
          params: new URLSearchParams({skip: filmsContainer.state.page*10}),
      })
          .then(function (response) {
            console.log(response.data)

            filmsContainer.setState(
              {
                films: response.data
              }
            )
          })
          .catch(function (error) {
            console.log(error)
          })
  }

  componentDidMount(){

    if (this.state.films.length === 0){
      this.getFilms()
    }

  }

  render() {
    let filmsContainer = this

    return(
      <div className="col border p-3 m-3 mt-3 rounded">
        <h2>Пленки</h2>
        <div className="table-responsive">
        <table className="table table-striped text-center">
          <thead>
            <tr>
              <th>Производитель</th>
              <th>Название</th>
              <th>Тип</th>
              <th>ISO</th>
              <th></th>

            </tr>
          </thead>
          <tbody>

          {this.state.films.map(
            film => {return(
              <tr key = {film.id}>
                <td>{film.manufacturer}</td>
                <td>{film.name}</td>
                <td>{film.type}</td>
                <td>{film.iso}</td>
                <td>
                <i
                  className={filmsContainer.state.chosen_film === film.id ? "bi-pin-angle-fill":"bi-pin"}
                  onClick={
                  () =>{filmsContainer.setState(
                      {
                        chosen_film: film.id
                      }
                    )
                  }}
                  />
                </td>
              </tr>
            )}
          )}
          </tbody>
        </table>
        </div>

        <div className="row g-3 m-1">
          <div className="col-md-6">
            <input
              type="text"
              name="manufacturer"
              value={this.state.addedFilm.manufacturer}
              onChange={this.handleAddedFormChange}
              className="form-control"
              placeholder="Производитель"
              />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="name"
              value={this.state.addedFilm.name}
              onChange={this.handleAddedFormChange}
              className="form-control"
              placeholder="Название"
            />
          </div>

          <div className="col-md-6">
            <input
              name="type"
              type="text"
              value={this.state.addedFilm.type}
              onChange={this.handleAddedFormChange}
              className="form-control"
              placeholder="Тип"
            />
          </div>

          <div className="col-md-6">
            <input
              name="iso"
              type="text"
              value={this.state.addedFilm.iso}
              onChange={this.handleAddedFormChange}
              className="form-control"
              placeholder="ISO"
            />
          </div>

          <button
            type="button"
            className="btn btn-dark"
            onClick={this.addFilm}
          >Добавить пленку</button>

        </div>

    </div>
    )
  }
}

function App() {

  return (
    <div className="container text-center ">
      <div className="row align-items-start align-middle">

        <FilmsContainer/>

        <div className="col border p-3 m-3 rounded" align="center">
        </div>

        <div className="col border p-3 m-3 rounded">
          One of three columns
        </div>
      </div>
  </div>
  );
}

export default App;
