import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware) //persistReducer is wrapped up too
);

const persistor = persistStore(store);

export { store };
export { persistor };
