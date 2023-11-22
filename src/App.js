import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import route from "./route/route";
import "./App.css";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={route}></RouterProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
