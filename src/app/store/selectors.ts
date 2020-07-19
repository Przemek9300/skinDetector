import { PredictionState } from './reducer';
import { State, createFeatureSelector, createSelector } from '@ngrx/store';

export const selectState = createFeatureSelector<PredictionState>('appState');
export const selectPredictionResult = createSelector(
  selectState,
  (state) => state.prediction
);
export const selectSelectedIndexLabel = createSelector(
  selectState,
  (state) => state.selectedLabelIndex
);
