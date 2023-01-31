import { Component } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

import {filmTypes, developerTypes} from './sources'


export default class TimerContainer extends Component{
  constructor(props){
    super()
    this.myTimer = this.myTimer.bind(this)
    this.state = {
      recipes: [],
      chosenRecipe: 0,
      remainingSeconds: 0,

      interval: null,

      current_film_id: null,
      current_developer_id: null,

      page: 0,
    }
  }

  myTimer(){
    this.setState({
      remainingSeconds: this.state.remainingSeconds - 1
    })
      console.log(this.state.remainingSeconds)
      if (this.state.remainingSeconds == 0) clearInterval(this.state.interval);
  }

  getRecipes(){
    let timerContainer = this

    axios({
          method: 'post',
          url: '/recipe/filter',
          data: {
            film_id: this.props.film.id,
            developer_id: this.props.developer.id
          }
      })
          .then(function (response) {
            timerContainer.setState(() =>({
              recipes: response.data,
              current_film_id: timerContainer.props.film.id,
              current_developer_id: timerContainer.props.developer.id
          }))
            toast.success("Рецепты найдены")
          })
          .catch(function (error) {
            timerContainer.setState(
              {
                recipes: [],
                current_film_id: timerContainer.props.film.id,
                current_developer_id: timerContainer.props.developer.id
              }
            )
            toast.error(error.message)
          })
  }

  render(){
    if (
      this.props.film && this.props.developer &&(
          this.props.film.id !== this.state.current_film_id || this.props.developer.id !== this.state.current_developer_id
        )
      )
      this.getRecipes()


    return(
      <div className="border p-3 m-3 rounded">
        <h2>Таймер</h2>
        {
            this.props.film &&

            <div className="table-responsive">
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>Производитель</th>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>ISO</th>
                  </tr>
                </thead>
                <tbody>
                    <tr key = {this.props.film.id}>
                      <td>{this.props.film.manufacturer}</td>
                      <td>{this.props.film.name}</td>
                      <td>{filmTypes[this.props.film.type]}</td>
                      <td>{this.props.film.iso}</td>
                      <td>
                      </td>
                    </tr>
                </tbody>
              </table>

            </div>
          }

          {
            (this.props.film && this.props.developer) &&
              <span className="border-top d-flex justify-content-center"/>
          }

          {
            this.props.developer &&

            <div className="table-responsive">
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>Производитель</th>
                    <th>Название</th>
                    <th>Тип</th>
                  </tr>
                </thead>
                <tbody>
                    <tr key = {this.props.developer.id}>
                      <td>{this.props.developer.manufacturer}</td>
                      <td>{this.props.developer.name}</td>
                      <td>{developerTypes[this.props.developer.type]}</td>
                      <td>
                      </td>
                    </tr>
                </tbody>
              </table>

            </div>
          }

          {this.state.recipes.length !== 0 ?
            <div>
              <span className="border-top d-flex justify-content-center"/>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>ISO</th>
                    <th>Время</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>

                {this.state.recipes.map(
                  (recipe, i) => {
                    if (i !== 9) return(
                    <tr key = {recipe.id}>
                      <td>{recipe.iso}</td>
                      <td>{recipe.time}</td>
                      <td>
                      <i
                        className={this.state.chosenRecipe === i ? "bi-pin-angle-fill":"bi-pin"}
                        onClick={
                        () =>{this.setState(
                            {
                              chosenRecipe: i
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
              <div className="row g-3 mt-0">
              { this.state.remainingSeconds !== 0 && <h1>{this.state.remainingSeconds}</h1> }
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => {this.setState({
                    remainingSeconds: this.state.recipes[this.state.chosenRecipe].time,
                    interval: setInterval(this.myTimer, 1000)
                  }) }}
                >Старт</button>
              </div>
            </div> : (this.props.film && this.props.developer) && <h3>Рецептов не найдено</h3>

        }

      </div>
    )
  }
}
