import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import ToDo from "./pages/ToDo";
import Login from "./pages/Login";
import { TodoProvider } from "./context/TodoContext";
import { LoginContextProvider } from "./context/LoginContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Provider } from "./components/ui/provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      {" "}
      <LoginContextProvider>
        <TodoProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/login" element={<Login />} />

                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/new"
                  element={
                    <ProtectedRoute>
                      <ToDo />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </TodoProvider>
      </LoginContextProvider>
    </Provider>
  </StrictMode>
);
