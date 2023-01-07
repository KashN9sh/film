import logo from './logo.svg';
import './App.css';
import { Component } from 'react'
import { Toaster } from 'react-hot-toast';

import FilmsContainer from './film'
import DevelopersContainer from './developer'
import TimerContainer from './timer'


class App extends Component{

  constructor(){
    super()

    this.handleFilmChange = this.handleFilmChange.bind(this);
    this.handleDeveloperChange = this.handleDeveloperChange.bind(this);


    this.state = {
      film:null,
      developer:null
    }

  }

  handleFilmChange(film){
    this.setState({
      film:film
    })
  }

  handleDeveloperChange(developer){
    this.setState({
      developer:developer
    })
  }

  render(){
    return (
    <div className="container text-center ">

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#000000',
              color: '#FFFFFF',
            },
          }}
          />

          <div className="row align-items-start align-middle">
            <div className="col-md-6 p-0">

              <FilmsContainer onFilmChange={this.handleFilmChange}/>

              <DevelopersContainer onDeveloperChange={this.handleDeveloperChange}/>

            </div>

            <div className="col-md-6 p-0">

              {
                (this.state.film || this.state.developer) &&
                <TimerContainer film={this.state.film} developer={this.state.developer}/>
              }

            </div>
          </div>
      </div>
    );
  }
}

export default App;
