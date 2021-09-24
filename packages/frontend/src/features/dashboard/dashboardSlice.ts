import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Configuration, Data,
  DataApi
} from "generated-api";
import { RootState } from "../../app/store";
import { authHeaderMiddleware } from "../auth/authService";

export interface DashboardState {
  pieChart: { data: Data[], loading: boolean };
  table: { data: Data[], loading: boolean };
  barChart: { data: Data[], loading: boolean };
  timeSeries: { data: Data[], loading: boolean };
}

const initialState: DashboardState = {
  pieChart: { data: [], loading: false },
  table: { data: [], loading: false },
  barChart: { data: [], loading: false },
  timeSeries: { data: [], loading: false },
};

const api = () =>
  new DataApi(
    new Configuration({
      basePath: process.env.REACT_APP_API_URL || window.location.origin,
    })
  );

export const loadPieChartData = createAsyncThunk(
  "dashboard/loadPieChartData",
  async () =>  api().withPreMiddleware(authHeaderMiddleware).getData({ type: 'FOR_PIE_CHART' })
);

export const loadTableData = createAsyncThunk(
  "dashboard/loadTableData",
  async () =>  api().withPreMiddleware(authHeaderMiddleware).getData({ type: 'FORTABLE' })
);

export const loadTimeSeriesData = createAsyncThunk(
  "dashboard/loadTimeSeriesData",
  async () =>  api().withPreMiddleware(authHeaderMiddleware).getData({ type: 'FOR_TIME_SERIES' })
);

export const loadBarChartData = createAsyncThunk(
  "dashboard/loadBarChartData",
  async () =>  api().withPreMiddleware(authHeaderMiddleware).getData({ type: 'FOR_BAR_CHART' })
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

  // to refactor to avoid repetition
  extraReducers: (builder) => {
    builder
      .addCase(loadPieChartData.pending, (state) => {
        state.pieChart.loading = true;
      })
      .addCase(loadPieChartData.fulfilled, (state, action) => {
        state.pieChart.loading = false;
        state.pieChart.data = action.payload;
      })
      .addCase(loadBarChartData.pending, (state) => {
        state.barChart.loading = true;
      })
      .addCase(loadBarChartData.fulfilled, (state, action) => {
        state.barChart.loading = false;
        state.barChart.data = action.payload;
      })
      .addCase(loadTableData.pending, (state) => {
        state.table.loading = true;
      })
      .addCase(loadTableData.fulfilled, (state, action) => {
        state.table.loading = false;
        state.table.data = action.payload;
      })
      .addCase(loadTimeSeriesData.pending, (state) => {
        state.timeSeries.loading = true;
      })
      .addCase(loadTimeSeriesData.fulfilled, (state, action) => {
        state.timeSeries.loading = false;
        state.timeSeries.data = action.payload;
      });
  },
});

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;