import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
  'account/signInUser',
  async(data, thunkApi) => {
    try {
      const user = await agent.Account.login(data);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({error: error.data})
    }
  }
)

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async(_, thunkApi) => {
    thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue({error: error.data})
    }
  },
  {
    condition: () => {
      if(!localStorage.getItem('user')) return false;
    }
  }
)

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      router.navigate('/');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Сеанс закінчився. Будь-ласка, увійдіть знову');
      router.navigate('/');
    })
    builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload;
    }),
    builder.addMatcher(isAnyOf(signInUser.rejected), (_state, action) => {
      console.log(action.payload);
    })
  })
})

export const { signOut, setUser } = accountSlice.actions;