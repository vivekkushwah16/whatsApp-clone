import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "./Reducer";

export const StateContext = createContext();
function StateProvider(props) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {props.children}
    </StateContext.Provider>
  );
}

export default StateProvider;

export const useStateValue = () => useContext(StateContext);
