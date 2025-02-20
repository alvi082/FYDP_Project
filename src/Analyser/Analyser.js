import React from "react";
import "./Analyser.css";
function Dashboard() {
    // const jobCategories = [
    //     { title: "UI/UX Designer", vacant: 5, totalCV: 20 },
    //     { title: "Software Developer", vacant: 10, totalCV: 20 },
    //     { title: "SQTA Engineer", vacant: 8, totalCV: 20 },
    //     { title: "ML Engineer", vacant: 12, totalCV: 20 },
    // ];
//     return (
//         <div className="dashboard-container">
//             <header>
//                 <h1>Analyser Dashboard</h1>
//                 <p>Search for your desired job matching your skills</p>
//             </header>
//             <div className="summary-cards">
//                 <div className="card">TOTAL POSITION: 4</div>
//                 <div className="card">TOTAL VACANCY: 35</div>
//                 <div className="card">TOTAL CV COUNT: 1250</div>
//             </div>
//             {jobCategories.map((job, index) => (
//                 <div key={index} className="job-category">
//                     <div className="job-info">
//                         <h2>{job.title}</h2>
//                         <p>VACANT POSITION: {job.vacant}</p>
//                         <p>TOTAL CV COUNT: {job.totalCV}</p>
//                     </div>
//                      <div className="cv-section">
//                         {Array.from({ length: job.totalCV }, (_, i) => (
//                             <div key={i} className="cv-item">ShuvoCV.pdf</div>
//                         ))}
//                         <button className="summarize-button">Analyse</button>
//                     </div> 
                    
//                 </div>
//             ))}

//             {/* Footer Section */}
//             <div className="footer">
//                 <div className="footer-container">
//                     <h3>Contact Us</h3>
//                     <p>We are here to assist you. Reach out to us for more information or queries.</p>
//                     <div className="social-links">
//                         <a href="#">Facebook</a>
//                         <a href="#">Twitter</a>
//                         <a href="#">LinkedIn</a>
//                     </div>
//                     <div className="footer-bottom">
//                         <p>&copy; 2024 CV Management. All rights reserved.</p>
//                         <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

const data = [
    { rank: 1, cvName: "John_Doe_CV.pdf", matchRate: 95 },
    { rank: 2, cvName: "Jane_Smith_Resume.pdf", matchRate: 92 },
    { rank: 3, cvName: "Alex_Johnson_Portfolio.pdf", matchRate: 89 },
    { rank: 4, cvName: "Sarah_Miller_CV.pdf", matchRate: 85 },
    { rank: 5, cvName: "Mike_Patterson_Resume.pdf", matchRate: 82 },
  ];

  return (
    
    <div className="table-container">
          <header>
               <h1>Analyser Dashboard</h1>
               <p style={{ backgroundColor: "#f2f2f2", color: "#002147", fontWeight: "bold", padding: "5px", borderRadius: "5px" }}>
                    QA Engineer
               </p>
           </header>
      <table className="cv-table">
        <thead>
          <tr>
            <th className="rank-header">Rank</th>
            <th className="name-header">CV Name</th>
            <th className="match-header">Match Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="rank-cell">{item.rank}</td>
              <td className="name-cell">{item.cvName}</td>
              <td className="match-cell">{item.matchRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


 };

export default Dashboard;
