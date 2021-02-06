import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { FoodReducer, FoodState } from "../food/store/reducers/food.reducer";

export interface State {
  food: FoodState;
}

export const reducers: ActionReducerMap<State> = {
  food: FoodReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
