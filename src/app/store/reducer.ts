import { createReducer, on, Action } from '@ngrx/store';
import { setPredictionResult, setLabel } from './actions';

export interface PredictionState {
  prediction: number[];
  selectedLabelIndex: number;
}
export const initialState: PredictionState = {
  prediction: [],
  selectedLabelIndex: null,
};
const reducer = createReducer(
  initialState,
  on(setPredictionResult, (state, { result }) => ({
    ...state,
    prediction: result,
  })),
  on(setLabel, (state, { index }) => ({ ...state, selectedLabelIndex: index }))
);
export function appReducer(state: PredictionState, action: Action) {
  return reducer(state, action);
}
