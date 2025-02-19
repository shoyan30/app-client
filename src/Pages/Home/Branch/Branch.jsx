import { useEffect, useState } from "react";
import axios from "axios";

const Branch = () => {
    const [branches, setBranches] = useState([{}]); //check
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get("http://192.168.61.207:8090/api/Xecute/v1/Perform", {}, {
                headers: { "Content-Type": "application/json" }
            })
            .then((response) => {
                const data = response.data;
                if (data.SUCCESS && data.EQResult.length > 0) {
                    setBranches(data.EQResult[0].DynamicData);
                } else {
                    setError("No branch data found.");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response ? error.response.data : error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading branches...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Branch Details</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Branch Name</th>
                            <th className="border p-2">Business Name</th>
                            <th className="border p-2">Office Address</th>
                            <th className="border p-2">Contact Name</th>
                            <th className="border p-2">Contact No</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Start Date</th>
                            <th className="border p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.length > 0 ? (
                            branches.map((branch) => (
                                <tr key={branch.Id} className="border">
                                    <td className="border p-2">{branch.BranchName}</td>
                                    <td className="border p-2">{branch.BusinessName}</td>
                                    <td className="border p-2">{branch.OfficeAddress}</td>
                                    <td className="border p-2">{branch.ContactName}</td>
                                    <td className="border p-2">{branch.ContactNo}</td>
                                    <td className="border p-2">{branch.EmailAddress}</td>
                                    <td className="border p-2">{new Date(branch.StartDate).toLocaleDateString()}</td>
                                    <td className="border p-2">{branch.IsActive ? "Active" : "Inactive"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="border p-2 text-center">No branches available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Branch;
