import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LeadList from "./pages/LeadList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FollowUp from "./pages/FollowUp";
import AddLead from "./pages/AddLead";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <ProtectedRoute>

              <Layout>
                <Dashboard />
              </Layout>

            </ProtectedRoute>
          }
        />


        {/* LEADS */}
        <Route
          path="/leads"
          element={
            <ProtectedRoute>

              <Layout>
                <LeadList />
              </Layout>

            </ProtectedRoute>
          }
        />


        {/* ADD LEAD */}
        <Route
          path="/add-lead"
          element={
            <ProtectedRoute>

              <Layout>
                <AddLead />
              </Layout>

            </ProtectedRoute>
          }
        />


        {/* FOLLOW-UP */}
        <Route
          path="/followup/:id"
          element={
            <ProtectedRoute>

              <Layout>
                <FollowUp />
              </Layout>

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;