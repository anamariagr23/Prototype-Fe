// import './App.css';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import MainPage from './components/MainPage';

// function App() {
//   return (
//     <div id="app">
//       <Header />
//       <MainPage />
//       <Footer />
//     </div>
//   );
// }

// export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes'; // Import the routing logic

const App: React.FC = () => {
  return (
    <div id="app">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
};

export default App;
