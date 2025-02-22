import { useEffect, useState } from "react";
import axios from "axios";
import { IconEdit, IconPlus, IconRefreshDot, IconTrash } from "@tabler/icons-react";
import BranchModal from "./BranchModal";

const Branch = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);

    const fetchBranches = () => {
        setLoading(true);
        setError(null);

        const data = JSON.stringify([{
            RESOURCE: "company.branch",
            PARAMS: [
                { PARAM: "Action", VALUE: "GETALL" },
                { PARAM: "UserId", VALUE: "ap" },
            ],
        }]);

        axios.post("http://192.168.61.207:8090/api/Xecute/v1/Perform", data, {
            headers: { "app-token": "ESL", "Content-Type": "application/json" },
        })
        .then((response) => {
            if (response.data.SUCCESS && response.data.EQResult.length > 0) {
                setBranches(response.data.EQResult[0].DynamicData);
            } else {
                setError("No branch data found.");
                setBranches([]);
            }
        })
        .catch(() => {
            setError("Error fetching data.");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const handleDelete = (branchId) => {
        const data = JSON.stringify([{
            RESOURCE: "company.branch",
            PARAMS: [
                { PARAM: "Action", VALUE: "DELETE" },
                { PARAM: "Id", VALUE: branchId },
                { PARAM: "UserId", VALUE: "ap" }
            ],
        }]);
        console.log(data)

        axios.post("http://192.168.61.207:8090/api/Xecute/v1/Perform", data, {
            headers: { "app-token": "ESL", "Content-Type": "application/json" },
        })
        .then((response) => {
            if (response.data.SUCCESS) {
                setBranches(branches.filter(branch => branch.Id !== branchId));
            }
        })
        .catch((error) => console.error("Delete error:", error));
    };

    const handleRefresh = () => {
        fetchBranches();
    };

    const handleEdit = (branch) => {
        setSelectedBranch(branch);
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedBranch(null);
        setShowModal(true);
    };

    // New handleSave function for creating and updating branches
    const handleSave = (formData) => {
        const action = selectedBranch ? "UPDATE" : "CREATE"; // Determine the action
        const branchId = selectedBranch ? selectedBranch.Id : null; // Get the branch ID if editing
        
        console.log(action);
        
        // Prepare the request data
        const params = [
            { PARAM: "Action", VALUE: action },
            { PARAM: "UserId", VALUE: "ap" },
            // Only include the ID if we're updating
            ...(action === "UPDATE" ? [{ PARAM: "Id", VALUE: branchId }] : []),
            ...Object.entries(formData).map(([key, value]) => ({ PARAM: key, VALUE: value })),
        ];
    
        const data = JSON.stringify([{
            RESOURCE: "company.branch",
            PARAMS: params,
        }]);
    
        console.log(data);
    
        axios.post("http://192.168.61.207:8090/api/Xecute/v1/Perform", data, {
            headers: { "app-token": "ESL", "Content-Type": "application/json" },
        })
        .then((response) => {
            console.log("Response:", response.data); // Log response data for debugging
            if (response.data.SUCCESS) {
                fetchBranches(); // Refresh the branch list
            }
        })
        .catch((error) => {
            console.error("Save error:", error);
            if (error.response) {
                console.error("Response data:", error.response.data); // Log response details
            }
        });
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
                    <button onClick={handleCreate} className="btn btn-outline-success">
                        <IconPlus /> Create
                    </button>
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
                                    <td className="border p-2">{new Date(branch.StartDate).toLocaleDateString()}</td>
                                    <td className="border p-2">{branch.IsActive ? "Active" : "Inactive"}</td>
                                    <td className="border p-2 flex items-center gap-3 relative">
                                        <button onClick={() => handleEdit(branch)}>
                                            <IconEdit size={24} stroke={2} className="cursor-pointer text-primary" />
                                        </button>
                                        <button onClick={() => handleDelete(branch.Id)}>
                                            <IconTrash size={24} stroke={2} className="cursor-pointer text-danger" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="border p-2 text-center">No branches available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <BranchModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                branchData={selectedBranch} 
                handleSave={handleSave} // Pass handleSave to the modal
            />
        </div>
    );
};

export default Branch;
