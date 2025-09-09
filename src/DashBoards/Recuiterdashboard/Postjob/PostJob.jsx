// import React, { useState } from 'react'
// import Button from 'react-bootstrap/Button';
// import { Form } from 'react-bootstrap';
// import { Modal } from 'react-bootstrap';
// import { db } from '../../../configureFirebase/config';
// import { doc ,updateDoc,arrayUnion} from 'firebase/firestore';
// import { setDoc } from "firebase/firestore";

// const PostJob=()=> {
//     const loggedinuser=JSON.parse(localStorage.getItem("loggedInAdmin"))
//     const [job,setjob]=useState({Category:"",Movie:"",md:""})
//     const [openModal,setopenmodal]=useState(false)
//     const handClick=()=>{
//           setopenmodal(true)
//     }
//     const handleClose= ()=>{
//         setopenmodal(false)
//     }

//   // const handlejobposting  = async ()=>{
//   //   // const recruiterDocRef = await doc(db,"recruiters",loggedinuser.user.displayName);
//   //   // await updateDoc(recruiterDocRef,{
//   //   //   jobs:arrayUnion(job),
//   //   // });
//   //     const recruiterDocRef = doc(
//   //       db,
//   //       "Admins",
//   //      loggedinuser.user.displayName
//   //     );
//   //     await updateDoc(recruiterDocRef,{
//   //       jobs: arrayUnion(job)
//   //     })
    
//   //   alert("Movie posted..")
//   //   handleClose();}

// const handlejobposting = async () => {
//   if (!job.Category || !job.Movie || !job.md) {
//     alert("Please fill all fields");
//     return;
//   }

//   const recruiterDocRef = doc(db, "Admins", loggedinuser.user.displayName);
  
//   await setDoc(recruiterDocRef, {
//     jobs: arrayUnion(job)
//   }, { merge: true });

//   alert("Movie posted.");
//   handleClose();
//   setjob({ Category: "", Movie: "", md: "" }); // Clear form
// };


//   return (
//     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
//         <Button variant="primary"  onClick={handClick}>Add Movie</Button>
//         <Modal show={openModal} onHide={handleClose} >
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
          
//              <Form> <Form.Group>
//                <Form.Label>Category:</Form.Label>
//                       <Form.Select aria-label="Default select example" onChange={(e)=>setjob({...job,Category:e.target.value})} required>
    
//       <option>Open this select menu</option>
//       <option value="Action Movies">Action Movies</option>
//       <option value="Comedy Movies">Comedy Movies</option>
//       <option value="Romance Movies ">Romance Movies </option>
//        <option value="Drama Movies ">Drama Movies </option>
//     </Form.Select>
//              </Form.Group>
            
//                     <Form.Group className='formGroup'>
//                       <Form.Label>Movie:</Form.Label>
//                       <Form.Control
//                       required
//                         type='text'
//                         placeholder='Movie Name'
//                         onChange={(e) => setjob({ ...job,Movie: e.target.value })}
//                       />
//                     </Form.Group>
//               <Form.Group className='formGroup'>
//                       <Form.Label>MovieDescription:</Form.Label>
//                       <Form.Control
//                       required
//                         as='textarea'
//                         onChange={(e) => setjob({ ...job, md: e.target.value })}
//                       />
//                     </Form.Group>
                    
            
                    
//                   </Form>
//         </Modal.Body>
//         <Modal.Footer>
          
//           <Button onClick={handlejobposting} >
//             Post
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
// }

// export default PostJob


// ----------------------------------------------main

// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import { Form, Modal } from 'react-bootstrap';
// import { db } from '../../../configureFirebase/config';
// import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

// const PostJob = () => {
//   const loggedinuser = JSON.parse(localStorage.getItem("loggedInAdmin"));
//   const [job, setJob] = useState({
//     Category: "",
//     Movie: "",
//     md: "",
//     posterUrl: "",
//     rating: ""
//   });
//   const [openModal, setOpenModal] = useState(false);

//   const handClick = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const handleJobPosting = async () => {
//     const { Category, Movie, md, posterUrl, rating } = job;
//     if (!Category || !Movie || !md || !posterUrl || !rating) {
//       alert("Please fill all fields");
//       return;
//     }

//     const recruiterDocRef = doc(db, "Admins", loggedinuser.user.displayName);
//     await setDoc(recruiterDocRef, {
//       jobs: arrayUnion(job)
//     }, { merge: true });

//     alert("Movie posted.");
//     handleClose();
//     setJob({ Category: "", Movie: "", md: "", posterUrl: "", rating: "" });
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <Button variant="primary" onClick={handClick}>Add Movie</Button>
//       <Modal show={openModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Post Movie</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Category:</Form.Label>
//               <Form.Select
//                 value={job.Category}
//                 onChange={(e) => setJob({ ...job, Category: e.target.value })}
//                 required
//               >
//                 <option value="">Open this select menu</option>
//                 <option value="Action Movies">Action Movie</option>
//                 <option value="Comedy Movies">Comedy Movie</option>
//                 <option value="Romance Movies">Romance Movie</option>
//                 <option value="Drama Movies">Drama Movie</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className='formGroup'>
//               <Form.Label>Movie:</Form.Label>
//               <Form.Control
//                 type='text'
//                 placeholder='Movie Name'
//                 value={job.Movie}
//                 onChange={(e) => setJob({ ...job, Movie: e.target.value })}
//               />
//             </Form.Group>

//             <Form.Group className='formGroup'>
//               <Form.Label>IMDb:</Form.Label>
//               <Form.Control
//                 as='textarea'
//                 value={job.md}
//                 onChange={(e) => setJob({ ...job, md: e.target.value })}
//               />
//             </Form.Group>

//             <Form.Group className='formGroup'>
//               <Form.Label>Poster URL:</Form.Label>
//               <Form.Control
//                 type='text'
//                 placeholder='https://example.com/image.jpg'
//                 value={job.posterUrl}
//                 onChange={(e) => setJob({ ...job, posterUrl: e.target.value })}
//               />
//             </Form.Group>

//             <Form.Group className='formGroup'>
//               <Form.Label>Rating (1 to 5):</Form.Label>
//               <Form.Select
//                 value={job.rating}
//                 onChange={(e) => setJob({ ...job, rating: e.target.value })}
//               >
//                 <option value="">Select rating</option>
//                 {[1, 2, 3, 4, 5].map(num => (
//                   <option key={num} value={num}>{num} ⭐</option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleJobPosting}>Post</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default PostJob;




























import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Modal } from 'react-bootstrap';
import { db } from '../../../configureFirebase/config';
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';

const PostJob = () => {
  const loggedinuser = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const [job, setJob] = useState({
    Category: "",
    Movie: "",
    md: "",
    posterUrl: "",
    rating: "",
    releaseYear: "",
    director: "",
    cast: "",
    duration: "",
    genre: ""
  });
  const [openModal, setOpenModal] = useState(false);

  const handClick = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleJobPosting = async () => {
    const { Category, Movie, md, posterUrl, rating, releaseYear, director, cast, duration, genre } = job;
    if (!Category || !Movie || !md || !posterUrl || !rating || !releaseYear || !director || !cast || !duration || !genre) {
      alert("Please fill all fields");
      return;
    }

    const recruiterDocRef = doc(db, "Admins", loggedinuser.user.displayName);
    await setDoc(recruiterDocRef, {
      jobs: arrayUnion(job)
    }, { merge: true });

    alert("Movie posted.");
    handleClose();
    setJob({
      Category: "", Movie: "", md: "", posterUrl: "", rating: "",
      releaseYear: "", director: "", cast: "", duration: "", genre: ""
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Button variant="primary" onClick={handClick}>Add Movie</Button>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Select
                value={job.Category}
                onChange={(e) => setJob({ ...job, Category: e.target.value })}
              >
                <option value="">Open this select menu</option>
                <option value="Action Movies">Action</option>
                <option value="Comedy Movies">Comedy</option>
                <option value="Romance Movies">Romance</option>
                <option value="Drama Movies">Drama</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Movie:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Movie Name'
                value={job.Movie}
                onChange={(e) => setJob({ ...job, Movie: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>IMDb Review:</Form.Label>
              <Form.Control
                as='textarea'
                value={job.md}
                onChange={(e) => setJob({ ...job, md: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Poster URL:</Form.Label>
              <Form.Control
                type='text'
                placeholder='https://example.com/image.jpg'
                value={job.posterUrl}
                onChange={(e) => setJob({ ...job, posterUrl: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Rating (1 to 5):</Form.Label>
              <Form.Select
                value={job.rating}
                onChange={(e) => setJob({ ...job, rating: e.target.value })}
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} ⭐</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Release Year:</Form.Label>
              <Form.Control
                type='number'
                placeholder='e.g., 2024'
                value={job.releaseYear}
                onChange={(e) => setJob({ ...job, releaseYear: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Director:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Director Name'
                value={job.director}
                onChange={(e) => setJob({ ...job, director: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Cast:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Actor 1, Actor 2, ...'
                value={job.cast}
                onChange={(e) => setJob({ ...job, cast: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Duration (in minutes):</Form.Label>
              <Form.Control
                type='number'
                placeholder='e.g., 120'
                value={job.duration}
                onChange={(e) => setJob({ ...job, duration: e.target.value })}
              />
            </Form.Group>

            <Form.Group className='formGroup'>
              <Form.Label>Genre:</Form.Label>
              <Form.Control
                type='text'
                placeholder='e.g., Thriller, Sci-Fi'
                value={job.genre}
                onChange={(e) => setJob({ ...job, genre: e.target.value })}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleJobPosting}>Post</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostJob;
