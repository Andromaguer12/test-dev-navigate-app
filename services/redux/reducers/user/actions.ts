import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type userObject = {
  name: string
  email: string
  token: string
  description: string
  phoneNumber: string
  address: string
  country: string
  image: string
  favorites: {
    food: string
    color: string
    hobby: string
  }
}

export const initialState: { data: userObject } = {
  data: {
    name: '',
    email: '',
    token: '',
    description: '',
    phoneNumber: '',
    address: '',
    country: '',
    image: '',
    favorites: {
      food: '',
      color: '',
      hobby: ''
    }
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.data = action.payload;
    },
    signOutAction: (state) => {
      state = initialState
    }
  }
});

export const { setUser, signOutAction } = userSlice.actions;

export default userSlice.reducer;
