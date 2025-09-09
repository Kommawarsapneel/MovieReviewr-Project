// import React, { useEffect, useState } from 'react'
// import { collection, getDocs } from "firebase/firestore"
// import { db } from '../../../configureFirebase/config';
// import "./DisplayJobs.css"
// const DisplayJobs = ({ selectJobsRole }) => {
//   const [allJobs, setallJobs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filDataaOnJobRole, setFilDataaOnJobRole] = useState([])

//   useEffect(() => {
//     const fetchingJobs = async () => {
//       try {
//         const recCollectionRef = collection(db, "Admins")
//         const allDocs = await getDocs(recCollectionRef)
//         let jobsFromDocs = []

//         allDocs.docs.forEach((doc) => {
//           const individualDocJobs = doc.data().jobs || []
//           individualDocJobs.forEach((singleJob) => {
//             jobsFromDocs.push(singleJob)
//           })
//         })

//         setallJobs(jobsFromDocs)
//         setLoading(false)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     fetchingJobs()
//   }, [])

//   useEffect(() => {
//     const roleBasedFilData = allJobs.filter((job) => job.Category === selectJobsRole)
//     setFilDataaOnJobRole(roleBasedFilData)
//   }, [selectJobsRole, allJobs])

//   if (loading) {
//     return <p>Loading jobs... please wait.</p>
//   }

//   return (

//     <div className="my-postings-container" style={{display:"grid",gridTemplateColumns:"auto auto auto auto"}} >
//  {(filDataaOnJobRole.length > 0 ? filDataaOnJobRole : allJobs).map((job, index) => (
//   <div
//     key={index}
//     style={{
//       border: '1px solid #ddd',
//       borderRadius: '10px',
//       padding: '15px',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       margin: '10px',
//       maxWidth: '300px',
//       width: '100%',
//     }}
//   >
//     {job.posterUrl && (
//       <img
//         src={job.posterUrl}
//         alt={job.Movie}
//         style={{
//           width: '100%',
//           height: '200px',
//           objectFit: 'cover',
//           borderRadius: '8px',
//           marginBottom: '10px',
//         }}
//       />
//     )}
//     <h4>{job.Movie}</h4>

//     {job.rating && (
//       <p style={{ margin: '5px 0' }}>
//         <span style={{ color: 'black', fontWeight: 'bold' }}>Rating: </span>
//         <span style={{ color: 'gold' }}>
//           {"⭐".repeat(job.rating)}{"☆".repeat(5 - job.rating)}
//         </span>
//       </p>
//     )}

//     <p><strong>Category:</strong> {job.Category}</p>
//     <p><strong>Movie Description:</strong> {job.md}</p>
//   </div>
// ))}

// </div>

//   )
// }

// export default DisplayJobs


import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from '../../../configureFirebase/config';
import "./DisplayJobs.css";
import { AiFillHeart } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { AiFillFacebook, AiOutlineWhatsApp, AiOutlineInstagram } from "react-icons/ai";

const slugify = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

const DisplayJobs = ({ selectJobsRole }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobsByRole, setFilteredJobsByRole] = useState([]);
  const [openShareIndex, setOpenShareIndex] = useState(null);

  const [likedJobs, setLikedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("likedJobs")) || [];
  });

  useEffect(() => {
    const fetchingJobs = async () => {
      try {
        const recCollectionRef = collection(db, "Admins");
        const allDocs = await getDocs(recCollectionRef);
        let jobsFromDocs = [];

        allDocs.docs.forEach((docSnap) => {
          const docId = docSnap.id;
          const jobs = docSnap.data().jobs || [];
          jobs.forEach((job, jobIndex) => {
            if (!job.likes) job.likes = 0;
            jobsFromDocs.push({
              ...job,
              adminId: docId,
              jobIndex,
              id: `${docId}_${jobIndex}`, // Ensuring unique job ID
            });
          });
        });

        setAllJobs(jobsFromDocs);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchingJobs();
  }, []);

  useEffect(() => {
  if (!selectJobsRole || selectJobsRole === "All Movies") {
    setFilteredJobsByRole(allJobs);
  } else {
    const roleBasedFilter = allJobs.filter((job) => {
      // Normalize both strings for comparison
      const jobCategory = job.Category?.toLowerCase().trim() || '';
      const selectedCategory = selectJobsRole.toLowerCase().trim();
      
      // Check if the job category includes the selected category
      // (e.g., "Action Movies" will match "Action")
      return jobCategory.includes(selectedCategory.replace(' movies', ''));
    });
    setFilteredJobsByRole(roleBasedFilter);
  }
}, [selectJobsRole, allJobs]);

  const handleLike = async (job) => {
    const currentLiked = JSON.parse(localStorage.getItem("likedJobs")) || [];

    if (currentLiked.includes(job.id)) return;

    const updatedJobs = [...allJobs];
    const jobToUpdate = updatedJobs.find((j) => j.id === job.id);
    if (!jobToUpdate) return;

    jobToUpdate.likes += 1;
    setAllJobs(updatedJobs);

    const adminDocRef = doc(db, "Admins", job.adminId);
    const adminSnapshot = await getDocs(collection(db, "Admins"));
    const targetAdmin = adminSnapshot.docs.find((doc) => doc.id === job.adminId);
    const jobsArray = targetAdmin.data().jobs || [];

    jobsArray[job.jobIndex].likes = (jobsArray[job.jobIndex].likes || 0) + 1;
    await updateDoc(adminDocRef, { jobs: jobsArray });

    const updatedLiked = [...currentLiked, job.id];
    localStorage.setItem("likedJobs", JSON.stringify(updatedLiked));
    setLikedJobs(updatedLiked);
  };

  if (loading) return <p>Loading Movies... please wait.</p>;

  return (
    <div className="job-grid">
      {(filteredJobsByRole.length > 0 ? filteredJobsByRole : allJobs).map((job, index) => (
        <Link
          to={`/movie/${slugify(job.Movie)}`}
          className="job-card"
          key={job.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          {job.posterUrl && (
            <img className="job-image" src={job.posterUrl} alt={job.Movie} />
          )}
          <h4 className="job-title">{job.Movie}</h4>

          {job.rating && (
            <p className="job-rating">
              <span className="rating-label">Rating: </span>
              <span className="rating-stars">
                {"⭐".repeat(job.rating)}{"☆".repeat(5 - job.rating)}
              </span>
            </p>
          )}

          <p><strong>Genre:</strong> {job.Category}</p>

          <div className="job-actions">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLike(job);
              }}
              className="like-button"
              disabled={likedJobs.includes(job.id)}
            >
              <AiFillHeart size={20} style={{ color: "red", marginRight: "6px" }} />
              {job.likes || 0}
            </button>

            <div className="share-button-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="share-main-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenShareIndex(openShareIndex === index ? null : index);
                }}
                style={{ backgroundColor: "skyblue", marginTop: "7px" }}
              >
                Share
              </button>

              {openShareIndex === index && (
                <div className="share-menu-vertical">
                  <FacebookShareButton
                    url={`${window.location.origin}/movie/${slugify(job.Movie)}`}
                    quote={`Check out this movie: ${job.Movie}`}
                    className="share-icon-button"
                  >
                    <AiFillFacebook size={24} color="#3b5998" />
                  </FacebookShareButton>

                  <WhatsappShareButton
                    url={`${window.location.origin}/movie/${slugify(job.Movie)}`}
                    title={`Check out this movie: ${job.Movie}`}
                    className="share-icon-button"
                  >
                    <AiOutlineWhatsApp size={24} color="#25D366" />
                  </WhatsappShareButton>

                  <button
                    className="copy-link-btn share-icon-button"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(`${window.location.origin}/movie/${slugify(job.Movie)}`);
                      alert("Link copied! Share it on Instagram.");
                    }}
                  >
                    <AiOutlineInstagram size={24} color="#C13584" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DisplayJobs;


 













