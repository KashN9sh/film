import { Component } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';


export default class DeveeloperContainer extends Component{

  constructor(props){
    super()

    this.handleAddedFormChange = this.handleAddedFormChange.bind(this);
    this.addDevelopeer = this.addDevelopeer.bind(this);


    this.state = {
      developers: [],
      chosenDeveloper: 0,

      page: 0,
      update: false,

      addedDeveloper:{
        manufacturer: "",
        name: "",
        type: "",
      }

    }
  }

  handleAddedFormChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      addedDeveloper: { ...this.state.addedDeveloper, [name]: value}
    });
  }

  addDevelopeer() {
    let developersContainer = this

    axios({
          method: 'post',
          url: '/developer/',
          data: developersContainer.state.addedDeveloper
      })
          .then(function (response) {
            developersContainer.getFilms()
            toast.success("Проявитель добавлен")
          })
          .catch(function (error) {
            toast.error(error.message)
          })
  }

  getFilms(){
    let developersContainer = this

    axios({
          method: 'get',
          url: '/developer/',
          params: new URLSearchParams({skip: developersContainer.state.page*5}),
      })
          .then(function (response) {
            developersContainer.setState(
              {
                developers: response.data,
                update: false
              }
            )

          })
          .catch(function (error) {
            developersContainer.setState(
              {
                update: false
              }
            )
            toast.error(error)
          })
  }

  render() {
    let developersContainer = this

    if (developersContainer.state.update || developersContainer.state.developers.length === 0)
      this.getFilms()

    return(
      <div className="col border p-3 m-3 mt-3 rounded">
        <h2>Проявители</h2>

        <div className="table-responsive">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th>Производитель</th>
                <th>Название</th>
                <th>Тип</th>
                <th></th>

              </tr>
            </thead>
            <tbody>

            {this.state.developers.map(
              (developer, i) => {
                if (i !== 5) return(
                <tr key = {developer.id}>
                  <td>{developer.manufacturer}</td>
                  <td>{developer.name}</td>
                  <td>{developer.type}</td>
                  <td>
                  <i
                    className={developersContainer.state.chosenDeveloper === developer.id ? "bi-pin-angle-fill":"bi-pin"}
                    onClick={
                    () =>{developersContainer.setState(
                        {
                          chosenDeveloper: developer.id
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
                developersContainer.setState(() =>({
                  page: developersContainer.state.page - 1,
                  update: true
              }))}}
            />}
          </div>
          <div className="col-md-6">
          {this.state.developers.length == 6 &&
            <i
              className="arrow bi-arrow-right"
              onClick={()=>{
                developersContainer.setState(() =>({
                  page: developersContainer.state.page + 1,
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
              value={this.state.addedDeveloper.manufacturer}
              onChange={this.handleAddedFormChange}
              className="form-control"
              placeholder="Производитель"
              />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="name"
              value={this.state.addedDeveloper.name}
              onChange={this.handleAddedFormChange}
              className="form-control"
              placeholder="Название"
            />
          </div>

          <div className="col-md-6">
            <select
              name="type"
              type="text"
              value={this.state.addedDeveloper.type}
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

          <button
            type="button"
            className="btn btn-dark"
            onClick={this.addDevelopeer}
          >Добавить проявитель</button>

        </div>

    </div>
    )
  }
}
