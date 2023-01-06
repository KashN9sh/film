import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import bootstrap from 'bootstrap'
import { Component } from 'react'

class Films extends Component{

render() {
    return(
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

function App() {
  axios({
        method: 'get',
        url: '/film/',
    })
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)

        })

  return (
    <div class="container text-center ">
      <div class="row align-items-start align-middle">
        <div class="col border p-3 m-3 rounded">

        </div>

        <div class="col border p-3 m-3 rounded" align="center">
          <Films/>
        </div>

        <div class="col border p-3 m-3 rounded">
          One of three columns
        </div>
      </div>
  </div>
  );
}

export default App;
