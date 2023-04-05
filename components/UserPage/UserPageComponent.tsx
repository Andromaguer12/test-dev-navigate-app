import React, { useState } from 'react'
import styles from './UserPage.module.scss'
import { Typography, TextField } from '@mui/material'
import actions, { setUser, signOutAction, initialState as userDataObjectPattern } from '../../services/redux/reducers/user/actions';
import { selectUserInfo } from '../../services/redux/reducers/user/selector';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import {Button} from '@mui/material'
import Image from 'next/image';
import { getBase64 } from '../../constants/utils';
import { apiURL } from '../../constants/constants';
import { useRouter } from 'next/router';

export default function UserPageComponent() {
  const userState = useAppSelector(selectUserInfo);
  const fields = {...userDataObjectPattern.data}
  const [loading, setloading] = useState(false);
  const messageInitialState = {text: '', color: ''}
  const [message, setMessage] = useState<{ text: string, color: string }>(messageInitialState)
  const dispatch = useAppDispatch();
  const router = useRouter();
  delete fields.token;
  delete fields.favorites;

  const updateMessage = (text, color) => {
    setMessage({text, color})
    setTimeout(() => {
      setMessage(messageInitialState)
    }, 3000);
  }

  const updateProfile =  async (payload): Promise<any> => {
    setloading(true);
    try {
        const query = await fetch(apiURL+'/api/users/update-user-info', {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            payload: {
              email: userState.email,
              ...payload
            }
          }),
          headers: {
            "Content-Type": 'application/json',
            "Authorization": 'Bearer ' + window.sessionStorage.getItem('accessToken')
          }
        });
        const response = await query.json();
        if(query.status === 400) throw new Error(response?.error)
        dispatch(setUser(response?.user))
        updateMessage(response?.message, 'success')
        setloading(false);
    } catch (error) {
      updateMessage(error?.message, 'error')
      setloading(false);
    }
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target)
    const keys = Object.keys(fields).splice(0, 7)
    const keys2 = Object.keys(userDataObjectPattern.data.favorites)
    const payload = {
      favorites: {}
    }
    keys.forEach(key => {
      payload[key] = form.get(key);
    });
    keys2.forEach(key => {
      payload.favorites[key] = form.get(key);
    });
    updateProfile(payload);
  }

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await getBase64(file);
    updateProfile({image: base64})
  }

  const inputClick = () => document.getElementById("input-file").click()

  const signOut = () => {
    dispatch(signOutAction())
    window.sessionStorage.removeItem('accessToken')
    router.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.userForm}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Typography variant='h1'>{userState.name}</Typography>
            <Typography variant='h5'>{userState.description}</Typography>
          </div>
            <Button onClick={signOut}>Sign Out</Button>
          <div className={styles.image}>
            <input type="file" onChange={handleImage} hidden id="input-file" />
            <Image 
              alt="user-image"
              src={userState.image}
              width={150}
              height={150}
              crossOrigin='anonymous'
              onClick={inputClick}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <Typography variant='h3' style={{marginBottom: 20}}>PRIMARY INFO</Typography>
            {Object.keys(fields).splice(0, 7).map((field) => (
              <>
                <Typography variant='h5'>{field.toUpperCase()}</Typography>
                <TextField defaultValue={userState[field]} multiline className={styles.inputs} placeholder={field.toUpperCase()} name={field} variant="outlined" fullWidth />
              </>
            ))}
          </div>
          <div className={styles.section}>
            <div className={styles.subcontainer}>
              <Typography variant='h3' style={{marginBottom: 20}}>SECONDARY INFO</Typography>
              {Object.keys(userDataObjectPattern.data.favorites).map((field) => (
                <>
                  <Typography variant='h5'>{field.toUpperCase()}</Typography>
                  <TextField defaultValue={userState.favorites?.[field] ?? ''} className={styles.inputs} placeholder={field.toUpperCase()} name={field} variant="outlined" fullWidth />
                </>
              ))}
            </div>
            <div>
              <div className={styles.message}>
                <Typography variant='h6' sx={{ color: message.color === 'error' ? 'red' : 'green' }}>{message.text}</Typography>
              </div>
              <Button type="submit" sx={{ color: "#fff", marginBottom: '20px' }} fullWidth variant="contained" color='primary'>
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
