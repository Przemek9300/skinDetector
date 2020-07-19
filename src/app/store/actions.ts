import { createAction, props } from '@ngrx/store';

export const setPredictionResult = createAction(
  '[Skin] Set Prediction Result',
  props<{ result: number[] }>()
);
export const setLabel = createAction(
  '[Skin] Set Label',
  props<{ index: number }>()
);
