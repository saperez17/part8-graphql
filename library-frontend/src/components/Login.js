import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'


const Login = (props) => {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            
        }
    })

    useEffect(() => {
        if (result.data){
            const token = result.data.login.value;
            props.setToken(token);
            localStorage.setItem('libraryapp-user-token', token)
            setUsername('');
            setPassword('')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])
    const formHandler = (e) => {
        e.preventDefault();
        login({ variables: { username, password } })
    }



  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form className="mt-4">
        <div>
          <label for="username">Username: </label>
          <input typeKC="text" name="username" placeholder="username"  value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div>
          <label for="password">Password: </label>
          <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button type="submit" onClick={formHandler}>login</button>
      </form>
    </div>
  );
};

export default Login;
