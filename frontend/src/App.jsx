import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ApplicationList } from "./components/ApplicationList.jsx";
import { MyJobList } from "./components/MyJobList.jsx";
import { Navigation } from "./components/Navigation";
import { JobList } from "./components/JobList";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (

    <AuthProvider>
      <Router>
        <div className="min-vh-100 bg-light">
          <Navigation />
          <Container className="py-4">
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route path="/applications" element={<ApplicationList />} />
              <Route path="/my-jobs" element={<MyJobList />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
