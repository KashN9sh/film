import logo from './logo.svg';
import './App.css';

import { Toaster } from 'react-hot-toast';

import FilmsContainer from './film'
import DevelopersContainer from './developer'


function App() {

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

        <FilmsContainer/>

        <DevelopersContainer/>

        <div className="col border p-3 m-3 rounded">
          One of three columns
        </div>
      </div>
  </div>
  );
}

export default App;
