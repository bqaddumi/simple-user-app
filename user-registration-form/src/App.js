import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import SignUp from './components/signup';
import Users from './components/users';
import { getUsers } from './requestBody';



import './App.css';



function App() {

  const [users, setUsers] = React.useState([])



  useEffect(() => {

    fetch('http://localhost:3002/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData)
        setUsers(resData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  return (
    <div className="App">
      <SignUp />
      <Typography color="primary" variant="h2"> Current users</Typography>
      <Users users={users} />
    </div>
  );
}

export default App;
