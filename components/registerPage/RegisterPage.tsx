import React, { useState } from 'react'
import styles from './RegisterPage.module.scss'
import { Button, Checkbox, CircularProgress, FormControlLabel, TextField, Typography } from '@mui/material'
import { apiURL } from '../../constants/constants'
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const messageInitialState = {text: '', color: ''}
  const [message, setMessage] = useState<{ text: string, color: string }>(messageInitialState)
  const updateMessage = (text, color) => {
    setMessage({text, color})
    setTimeout(() => {
      setMessage(messageInitialState)
    }, 3000);
  }

  const registerCall = async (payload): Promise<any> => {
    setloading(true);
    try {
        const query = await fetch(apiURL+'/api/users/register-user', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": 'application/json'
          }
        });
        const response = await query.json();
        if(query.status === 400) throw new Error(response?.error)
        router.push('/')
        setloading(false);
        updateMessage(response?.message, 'success')
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
        name: form.get('name')
      }
    }
    if (object.payload.email && object.payload.password && object.payload.name) {
      await registerCall(object);
    }
  }

  const goToLogin = () => router.push('/')

  return (
    <div className={styles.container}>
      <form onSubmit={handleForm} className={styles.form}>
        <div className={styles.formContent}>
          <Typography className={styles.title} variant='h1'>User Registration</Typography>
          <Typography className={styles.title} variant='h4'>Sign up form</Typography>
          <TextField className={styles.textInputs} label='E-mail' variant="outlined" id="email" name="email" />
          <TextField className={styles.textInputs} label='Name' variant="outlined" id="name" name="name" />
          <TextField className={styles.textInputs} label='Password' variant="outlined" type='password' id="password" name="password" />
        </div>
        <div className={styles.buttonAndError}>
          <div className={styles.error}>
            <Typography variant='h6' sx={{ color: message.color === 'error' ? 'red' : 'green' }}>{message.text}</Typography>
          </div>
          <Button onClick={goToLogin} fullWidth sx={{ marginBottom: '10px' }} variant='outlined'>
            Already have account? Login
          </Button>
          <Button type='submit' fullWidth variant='contained'>
            {loading ? <CircularProgress color='secondary' /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}
