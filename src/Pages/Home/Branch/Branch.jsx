import { useEffect, useState } from "react";
import axios from "axios";
import { IconChevronDown, IconEdit, IconPlus, IconRefreshDot } from "@tabler/icons-react";

const Branch = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    // ✅ Fetch all branches
    const fetchBranches = () => {
        setLoading(true);
        setError(null); // Reset error before fetching

        const data = JSON.stringify([
            {
                RESOURCE: "company.branch",
                PARAMS: [
                    { PARAM: "Action", VALUE: "GETALL" },
                    { PARAM: "UserId", VALUE: "ap" },
                ],
            },
        ]);

        const config = {
            method: "post",
            url: "http://192.168.61.207:8090/api/Xecute/v1/Perform",
            headers: {
                "app-token": "ESL",
                "Content-Type": "application/json",
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                if (response.data.SUCCESS && response.data.EQResult.length > 0) {
                    setBranches(response.data.EQResult[0].DynamicData);
                } else {
                    setError("No branch data found.");
                    setBranches([]); // Ensure branches reset if no data
                }
            })
            .catch((error) => {
                console.error("Error fetching branches:", error);
                setError("Error fetching data.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    // ✅ Delete Branch (POST request with JSON.stringify)
    const handleDelete = (branchId) => {
        let data = JSON.stringify([
            {
                RESOURCE: "company.branch",
                PARAMS: [
                    { PARAM: "Action", VALUE: "DELETE" },  // Correct action name
                    { PARAM: "Id", VALUE: branchId }, // Ensure correct parameter name
                    { PARAM: "UserId", VALUE: "ap" } // If required by API
                ],
            },
        ]);
    
        let config = {
            method: "post", // Using POST instead of DELETE
            url: "http://192.168.61.207:8090/api/Xecute/v1/Perform",
            headers: {
                "app-token": "ESL",
                "Content-Type": "application/json",
            },
            data: data,
        };
    
        axios
            .request(config)
            .then((response) => {
                if (response.data.SUCCESS) {
                    setBranches(branches.filter(branch => branch.Id !== branchId));
                } else {
                    console.error("Error deleting branch:", response.data.MESSAGE);
                }
            })
            .catch((error) => {
                console.error("Delete error:", error);
            });
    };
    

    // ✅ Refresh Button
    const handleRefresh = () => {
        fetchBranches(); // Re-fetch branch data
    };

    if (loading) return <p>Loading branches...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">Branch List</h3>
                <div className="btn-list">
                    <button onClick={handleRefresh} className="btn btn-outline-secondary">
                        <IconRefreshDot /> Refresh
                    </button>
                    <a href="#" className="btn btn-outline-success"><IconPlus /> Create</a>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table card-table table-vcenter">
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
                                    <td className="border p-2">
                                        {new Date(branch.StartDate).toLocaleDateString()}
                                    </td>
                                    <td className="border p-2">
                                        {branch.IsActive ? "Active" : "Inactive"}
                                    </td>
                                    <td className="border p-2 flex items-center gap-3 relative">
                                        <button>
                                            <IconEdit
                                                size={24}
                                                stroke={2}
                                                color="red"
                                                className="cursor-pointer"
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                setOpenDropdown(openDropdown === branch.Id ? null : branch.Id)
                                            }
                                            className="relative"
                                        >
                                            <IconChevronDown
                                                size={24}
                                                stroke={2}
                                                className="cursor-pointer text-gray-700"
                                            />
                                        </button>

                                        {openDropdown === branch.Id && (
                                            <div className="absolute left-10 top-full mt-2 bg-white border rounded shadow p-2">
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => handleDelete(branch.Id)} 
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="border p-2 text-center">
                                    No branches available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Branch;
