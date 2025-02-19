// import { useEffect, useState } from "react";
// import axios from "axios";

// const Users = () => {
//     const [branches, setBranches] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios
//             .get("http://192.168.61.207:8090/api/Xecute/v1/Perform")
//             .then((response) => {
//                 const data = response.data;

//                 // Extract DynamicData from EQResult
//                 if (data.SUCCESS && data.EQResult.length > 0) {
//                     setBranches(data.EQResult[0].DynamicData);
//                 } else {
//                     setError("No branch data found.");
//                 }
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error.message);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h1>Branch List</h1>
//             <ul>
//                 {branches.length > 0 ? (
//                     branches.map((branch) => (
//                         <li key={branch.Id} className="border p-2 m-2">
//                             <h2 className="font-bold">{branch.BranchName}</h2>
//                             <p>Business: {branch.BusinessName}</p>
//                             <p>Address: {branch.OfficeAddress}</p>
//                             <p>Contact: {branch.ContactName} ({branch.ContactNo})</p>
//                             <p>Email: {branch.EmailAddress}</p>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No branches available</p>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default Users;
