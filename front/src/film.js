import { Component } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';


export default class FilmsContainer extends Component{

  constructor(props){
    super()

    this.handleAddedFormChange = this.handleAddedFormChange.bind(this);
    this.addFilm = this.addFilm.bind(this);


    this.state = {
      films: [],
      chosenFilm: 0,

      page: 0,
      update: false,

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
            filmsContainer.getFilms()
            toast.success("Пленка добавлена")
          })
          .catch(function (error) {
            toast.error(error.message)
          })
  }

  getFilms(){
    let filmsContainer = this

    axios({
          method: 'get',
          url: '/film/',
          params: new URLSearchParams({skip: filmsContainer.state.page*5}),
      })
          .then(function (response) {
            filmsContainer.setState(
              {
                films: response.data,
                update: false
              }
            )

          })
          .catch(function (error) {
            filmsContainer.setState(
              {
                update: false
              }
            )
            toast.error(error)
          })
  }

  render() {
    let filmsContainer = this

    if (filmsContainer.state.update || filmsContainer.state.films.length === 0)
      this.getFilms()

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
              (film, i) => {
                if (i !== 5) return(
                <tr key = {film.id}>
                  <td>{film.manufacturer}</td>
                  <td>{film.name}</td>
                  <td>{film.type}</td>
                  <td>{film.iso}</td>
                  <td>
                  <i
                    className={filmsContainer.state.chosenFilm === film.id ? "bi-pin-angle-fill":"bi-pin"}
                    onClick={
                    () =>{filmsContainer.setState(
                        {
                          chosenFilm: film.id
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

        <div className="row mb-1 mt-n2">
          <div className="col-md-6">
          {this.state.page!==0 &&
            <i
              className="arrow bi-arrow-left"
              onClick={()=>{
                filmsContainer.setState(() =>({
                  page: filmsContainer.state.page - 1,
                  update: true
              }))}}
            />}
          </div>
          <div className="col-md-6">
          {this.state.films.length == 6 &&
            <i
              className="arrow bi-arrow-right"
              onClick={()=>{
                filmsContainer.setState(() =>({
                  page: filmsContainer.state.page + 1,
                  update: true
              }))
            }}
            />}
          </div>
        </div>

        <span className="border-top d-flex justify-content-center"/>

        <div className="row g-3 m-2 mt-0">
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
            <select
              name="type"
              type="text"
              value={this.state.addedFilm.type}
              onChange={this.handleAddedFormChange}
              className="form-select"
              placeholder="Тип"
            >
              <option>Тип...</option>
              <option value="monochrome negative">Монохромная негативная</option>
              <option value="monochrome positive">Монохромная позитивная</option>
              <option value="color negative">Цветная негативная</option>
              <option value="color positive">Цветная позитивная</option>
            </select>
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
