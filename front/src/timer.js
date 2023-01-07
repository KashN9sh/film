import { Component } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

import {filmTypes, developerTypes} from './sources'


export default class TimerContainer extends Component{
  constructor(props){
    super()

  }

  render(){
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

        <span className="border-top d-flex justify-content-center"/>

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

        <div className="row g-3 mt-0">
          <button
            type="button"
            className="btn btn-dark"
          >Старт</button>
        </div>
      </div>
    )
  }
}
