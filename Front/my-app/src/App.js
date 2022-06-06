import React, {Fragment, useEffect, useState} from 'react'
import io from "socket.io-client";
import axios from 'axios'

function App() {
  const [numbers, setNumbers] = useState([])
  const socket = io('http://localhost:3001/')

  useEffect(() => {
    fetchNumbers()
  }, []);

  async function fetchNumbers (){
    await axios.get('http://localhost:3001/').then((response) => socket.on('number', (number) => {
      setNumbers(number)
    }))
  }

  console.log(numbers)
  
  return (
    <Fragment>
    <h1>Estudando SocketIO</h1>
    <ul>
      {numbers.map((item)=>{
        return <li>{item.number}</li>
      })
      }
    </ul>
    </Fragment>
  );
}

export default App;
