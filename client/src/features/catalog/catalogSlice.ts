import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Service } from "../../models/service";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const servicesAdapter = createEntityAdapter<Service>();

export const fetchServicesAsync = createAsyncThunk<Service[]>(
  'catalog/fetchServicesAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
)

export const fetchServiceAsync = createAsyncThunk<Service, number>(
  'catalog/fetchServiceAsync',
  async (serviceId, thunkAPI) => {
    try {
      return await agent.Catalog.details(serviceId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
)

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: servicesAdapter.getInitialState({
    servicesLoaded: false,
    status: 'idle'
  }),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(fetchServicesAsync.pending, (state) => {
      state.status = 'pendingFetchServices';
    });
    builder.addCase(fetchServicesAsync.fulfilled, (state, action) => {
      servicesAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.servicesLoaded = true;
    });
    builder.addCase(fetchServicesAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchServiceAsync.pending, (state) => {
      state.status = 'pendingFetchService';
    });
    builder.addCase(fetchServiceAsync.fulfilled, (state, action) => {
      servicesAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchServiceAsync.rejected, (state, action) => {
      console.log(action);
      state.status = 'idle';
    });
  })
})

export const servicesSelectors = servicesAdapter.getSelectors((state: RootState) => state.catalog);