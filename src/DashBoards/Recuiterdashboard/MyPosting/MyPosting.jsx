// import { getDoc, updateDoc } from 'firebase/firestore'
// import React, { useEffect, useState } from 'react'
// import { doc} from 'firebase/firestore'
// import { db } from '../../../configureFirebase/config';

// function MyPosting () {
//  const [jobs,setjobs]=useState([])
//  const [loading ,setloading ]=useState(true)

//   const loggedinuser=JSON.parse(localStorage.getItem("loggedInAdmin"))
// const loginUserName= loggedinuser.user.displayName
//   useEffect(()=>{
// const fetchingData=async()=>{
//   const docRef=doc(db,"Admins",
//        loggedinuser.user.displayName)
//   const getDocRef=await getDoc(docRef)
//   console.log(getDocRef)

// if (getDocRef.exists()){
//   const data=getDocRef.data()
//   console.log(data,"data")
//   setjobs(data.jobs ||[])
//   setloading(false)
// }



// }
// fetchingData()
//   },[])
//   if (loading){
//     return <p>Loading ......</p>
//   }

// const handleDeletjob=async(choosedJobIndex)=>{
//     let jobAfterDeletFilteration=jobs.filter((job,index)=>index!==choosedJobIndex)
//     console.log(jobAfterDeletFilteration)
//     alert("movie Dleted successfully..!!!")
//     setjobs(jobAfterDeletFilteration)
//     const docRef=doc(db,"Admins",loginUserName)
//     await updateDoc(docRef,{
//       jobs  :jobAfterDeletFilteration
//     })
//      alert("movie Dleted successfully..!!!")
//     setjobs(jobAfterDeletFilteration)
// }




//   return (
//     <div style={{display:"flex",justifyContent:"space-around",gap:"10px"}} >
// {jobs.length>0?<>
// {jobs.map((job,jobindex)=>{
//   return(
//     <div style={{border:"1px solid black",gap:"10px"}}>
//     <h1>{job.Movie}</h1>
//     <p>{job.Category}</p>
//     <p>{job.md}</p>
// <div style={{display:"flex",gap:"20px"}}>
//   <span style={{padding:"10px",marginBottom:"10px"}}><button>Edit</button></span>
//   <span onClick={()=>handleDeletjob(jobindex)} style={{padding:"10px",marginBottom:"10px"}}><button>Dlete</button></span>
// </div>
// </div>
//   )
// })}</>:<>"no Movies posted yet.."</>}
//     </div>
//   )
// }

// export default MyPosting
// ----------------------------------------------------------------------------------------------------------------------
// import { getDoc, updateDoc, doc } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react';
// import { db } from '../../../configureFirebase/config';

// function MyPosting() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const loggedinuser = JSON.parse(localStorage.getItem("loggedInAdmin"));
//   const loginUserName = loggedinuser.user.displayName;

//   useEffect(() => {
//     const fetchingData = async () => {
//       const docRef = doc(db, "Admins", loginUserName);
//       const getDocRef = await getDoc(docRef);

//       if (getDocRef.exists()) {
//         const data = getDocRef.data();
//         setJobs(data.jobs || []);
//         setLoading(false);
//       }
//     };
//     fetchingData();
//   }, []);

//   const handleDeletjob = async (choosedJobIndex) => {
//     const jobAfterDelete = jobs.filter((_, index) => index !== choosedJobIndex);
//     alert("Movie deleted successfully!");
//     setJobs(jobAfterDelete);

//     const docRef = doc(db, "Admins", loginUserName);
//     await updateDoc(docRef, { jobs: jobAfterDelete });
//   };

//   if (loading) {
//     return <p>Loading ......</p>;
//   }

//   return (
//     <div style={{
//       display: "flex",
//       flexWrap: "wrap",
//       gap: "20px",
//       justifyContent: "center",
//       padding: "20px"
//     }}>
//       {jobs.length > 0 ? (
//         jobs.map((job, index) => (
//           <div key={index} style={{
//             width: "30vw",
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             padding: "16px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             backgroundColor: "#fff",
//             textAlign: "center"
//           }}>
//             {job.posterUrl && (
//               <img
//                 src={job.posterUrl}
//                 alt={job.Movie}
//                 style={{ width: "100%", height: "360px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px" }}
//               />
//             )}
//             <p style={{ marginBottom: "10px" }}><strong>Movie Title:</strong>{job.Movie}</p>
//             <p><strong>Category:</strong> {job.Category}</p>
//             <p><strong>Movie Description:</strong> {job.md}</p>
//             {job.rating && (
//               <p>
//                 <strong>Rating:</strong> {"★".repeat(job.rating)}{"☆".repeat(5 - job.rating)}
//               </p>
//             )}
//             <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
//               <button style={{ padding: "6px 12px", cursor: "pointer" }}>Edit</button>
//               <button
//                 onClick={() => handleDeletjob(index)}
//                 style={{
//                   padding: "6px 12px",
//                   cursor: "pointer",
//                   backgroundColor: "#e74c3c",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px"
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No movies posted yet.</p>
//       )}
//     </div>
//   );
// }

// export default MyPosting;


import { getDoc, updateDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../configureFirebase/config';
import './MyPosting.css'; // Import external CSS

function MyPosting() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const loggedinuser = JSON.parse(localStorage.getItem("loggedInAdmin"));
  const loginUserName = loggedinuser.user.displayName;

  useEffect(() => {
  const fetchingData = async () => {
    const docRef = doc(db, "Admins", loginUserName);
    const getDocRef = await getDoc(docRef);

    if (getDocRef.exists()) {
      const data = getDocRef.data();
      const jobsWithIds = (data.jobs || []).map(job => ({
        ...job,
        id: job.id || `${job.Movie}-${Math.random().toString(36).substring(2, 7)}`
      }));
      setJobs(jobsWithIds);

      // Optional: Save back updated jobs with IDs
      if (jobsWithIds.some(j => !j.id)) {
        await updateDoc(docRef, { jobs: jobsWithIds });
      }

      setLoading(false);
    }
  };
  fetchingData();
}, []);

  const handleDeletjob = async (choosedJobIndex) => {
    const jobAfterDelete = jobs.filter((_, index) => index !== choosedJobIndex);
    alert("Movie deleted successfully!");
    setJobs(jobAfterDelete);

    const docRef = doc(db, "Admins", loginUserName);
    await updateDoc(docRef, { jobs: jobAfterDelete });
  };

  const handleCardClick = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  if (loading) {
    return <p>Loading ......</p>;
  }

  return (
    <div className="my-postings-container">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div
            key={index}
            className="my-posting-card"
            onClick={() => handleCardClick(index)}
          >
            {job.posterUrl && (
              <img
                src={job.posterUrl}
                alt={job.Movie}
                className="my-posting-image"
              />
            )}
            <h4 className="my-posting-title">{job.Movie}</h4>
            {job.rating && (
              <p className="my-posting-rating">
                {"⭐".repeat(job.rating)}{"☆".repeat(5 - job.rating)}
              </p>
            )}
            {expandedCardIndex === index && (
              <>
                <p><strong>Category:</strong> {job.Category}</p>
                <p><strong>IMDb:</strong> {job.md}</p>
                <div className="my-posting-buttons">
                  <button className="edit-button">Edit</button>
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletjob(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No movies posted yet.</p>
      )}
    </div>
  );
}

export default MyPosting;




