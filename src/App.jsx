// import React from 'react';
// import { Navibar } from './Components/Navbar/Navbar';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import { Login } from './Pages/Login/Login';
// import { Signup } from './Pages/Signup/Signup';
// import { Recuiterdashboard } from './DashBoards/Recuiterdashboard/Recuiterdashboard';
// import PostJob from './DashBoards/Recuiterdashboard/Postjob/PostJob';
// import MyPosting from './DashBoards/Recuiterdashboard/MyPosting/MyPosting';
// import Jobseekerdashboard from './DashBoards/Jobseekerdashboard/Jobseekerdashboard';
// import Home from './Pages/Home/Home';

// const App = () => {
//   return (
//     <div className="app-container">
//       <Navibar />
//       <main className="content-area">
//         <Routes>
//           {/* Default route redirects to Home */}
//           <Route path="/Home" element={<Navigate to="/Home" replace />} />
          
//           {/* Main routes */}
//           <Route path="/Home" element={<Home />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Signup" element={<Signup />} />
          
//           {/* Admin Dashboard nested routes */}
//           <Route path="/AdminDashboard" element={<Recuiterdashboard />}>
//             <Route index element={<Navigate to="post_job" replace />} />
//             <Route path="post_job" element={<PostJob />} />
//             <Route path="my_posting" element={<MyPosting />} />
//           </Route>
          
//           {/* Jobseeker Dashboard */}
//           <Route path="/jobseekerDashboard" element={<Jobseekerdashboard />} />
          
//          {/* Fallback route for 404 */}
//            <Route path="/Home" element={<Navigate to="/Home" replace />} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default App;





import React from 'react';
import { Navibar } from './Components/Navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Pages/Login/Login';
import { Signup } from './Pages/Signup/Signup';
import { Recuiterdashboard } from './DashBoards/Recuiterdashboard/Recuiterdashboard';
import PostJob from './DashBoards/Recuiterdashboard/Postjob/PostJob';
import MyPosting from './DashBoards/Recuiterdashboard/MyPosting/MyPosting';
import Jobseekerdashboard from './DashBoards/Jobseekerdashboard/Jobseekerdashboard';
import Home from './Pages/Home/Home';
import MovieDetails from './DashBoards/Jobseekerdashboard/MovieDetails/Movie.Details';

const App = () => {
  return (
    <div className="app-container">
      <Navibar />
      <main className="content-area">
        <Routes>
          {/* Redirect root to Home */}
          <Route path="/" element={<Navigate to="/Home" replace />} />

          {/* Main routes */}
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />

          {/* Admin Dashboard with nested routes */}
          <Route path="/AdminDashboard" element={<Recuiterdashboard />}>
            <Route index element={<Navigate to="post_job" replace />} />
            <Route path="post_job" element={<PostJob />} />
            <Route path="my_posting" element={<MyPosting />} />
          </Route>

          {/* Jobseeker Dashboard */}
          <Route path="/UserDashboard" element={<Jobseekerdashboard />} />
   
        <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

