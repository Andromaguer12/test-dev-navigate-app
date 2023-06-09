import React, { useState } from 'react'
import styles from './LoginPage.module.scss'
import { Button, Checkbox, CircularProgress, FormControlLabel, InputLabel, TextField, Typography } from '@mui/material'
import { apiURL } from '../../constants/constants'
import { useDispatch } from 'react-redux';
import { setUser } from '../../services/redux/reducers/user/actions';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../services/redux/store';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState('');
  const messageInitialState = {text: '', color: ''}
  const [message, setMessage] = useState<{ text: string, color: string }>(messageInitialState)
  const updateMessage = (text, color) => {
    setMessage({text, color})
    setTimeout(() => {
      setMessage(messageInitialState)
    }, 3000);
  }

  const loginCall = async (payload): Promise<any> => {
    setloading(true);
    try {
      const query = await fetch(apiURL+'/api/users/login', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": 'application/json'
        }
      });
      const response = await query.json();
      if(query.status === 400) throw new Error(response?.error)
      window.sessionStorage.setItem("accessToken", response?.token)
      dispatch(setUser(response?.user))
      router.push('/user-dashboard')
      setloading(false);
  } catch (error) {
    updateMessage(error?.message, 'error')
    setloading(false);
  }
    return ''
  }

  const handleForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target)
    const object = {
      payload: {
        email: form.get('email'),
        password: form.get('password'),
        remember: form.get('remember')
      }
    }
    if (object.payload.email && object.payload.password) {
      await loginCall(object);
    }
  }

  const goToRegister = () => router.push('/register')

  return (
    <div className={styles.container}>
      <form onSubmit={handleForm} className={styles.form}>
        <div className={styles.formContent}>
          <Typography className={styles.title} variant='h1'>User Login</Typography>
          <Typography className={styles.title} variant='h4'>Sign in, in the world's first info register app!</Typography>
          <TextField className={styles.textInputs} label='E-mail' variant="outlined" id="email" name="email" />
          <TextField className={styles.textInputs} label='Password' variant="outlined" type='password' id="password" name="password" />
          <FormControlLabel control={<Checkbox name='remember' />} label="Remember me" />
        </div>
        <div className={styles.buttonAndError}>
          <div className={styles.error}>
            <Typography variant='h6' sx={{ color: message.color === 'error' ? 'red' : 'green' }}>{message.text}</Typography>
          </div>
          <Button onClick={goToRegister} fullWidth sx={{ marginBottom: '10px' }} variant='outlined'>
            Register
          </Button>
          <Button type='submit' fullWidth variant='contained'>
            {loading ? <CircularProgress color='secondary' /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}
