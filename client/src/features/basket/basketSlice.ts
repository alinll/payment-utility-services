import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";
import agent from "../../app/api/agent";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {serviceId: number}>(
  'basket/addBasketItemAsync',
  async ({serviceId}, thunkAPI) => {
    try {
      return await agent.Basket.addItem(serviceId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<void, {serviceId: number, name?: string}>(
  'basket/removeBasketItemAsync',
  async ({serviceId}, thunkAPI) => {
    try {
      return await agent.Basket.removeItem(serviceId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
);

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload
    }
  },
  extraReducers: (builder => {
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = 'pendingAddItem' + action.meta.arg.serviceId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = 'idle';
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = 'pendingAddItem';
      console.log(action.payload);
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      console.log(action);
      state.status = 'pendingRemoveItem' + action.meta.arg.serviceId + action.meta.arg.name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { serviceId } = action.meta.arg;
      const itemIndex = state.basket?.items.findIndex(i => i.serviceId === serviceId);
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket?.items.splice(itemIndex, 1);
      state.status = 'idle';
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      state.status = 'idle';
      console.log(action.payload);
    });
  })
})

export const { setBasket } = basketSlice.actions;