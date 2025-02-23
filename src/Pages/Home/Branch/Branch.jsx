import { useEffect, useState } from "react";
import axios from "axios";
import { IconCaretDown, IconCircleCheck, IconEdit, IconPlus, IconRefreshDot, IconTrash, IconX } from "@tabler/icons-react";
import BranchModal from "./BranchModal";

const Branch = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);

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
                    setBranches([]); // Empty array if no data
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

    const handleSave = (formData) => {
        const action = selectedBranch ? "UPDATE" : "CREATE";
        const branchId = selectedBranch ? selectedBranch.Id : null;

        const params = [
            { PARAM: "Action", VALUE: action },
            { PARAM: "UserId", VALUE: "ap" },
            ...(action === "UPDATE" ? [{ PARAM: "Id", VALUE: branchId }] : []),
            ...Object.entries(formData).map(([key, value]) => ({ PARAM: key, VALUE: value })),
        ];

        const data = JSON.stringify([{
            RESOURCE: "company.branch",
            PARAMS: params,
        }]);

        axios.post("http://192.168.61.207:8090/api/Xecute/v1/Perform", data, {
            headers: { "app-token": "ESL", "Content-Type": "application/json" },
        })
        
            .then((response) => {
                if (response.data.SUCCESS) {
                    fetchBranches();
                }
            })
            .catch((error) => console.error("Save error:", error));
    };

    const openDropdown= () =>{
        setDropdownOpen(!isDropdownOpen);
        setIsRotated(!isRotated);
    }
    


    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="card-title">Branch List</h3>
            <div className="btn-list position-relative"> {/* Added position-relative for dropdown positioning */}
                <button onClick={handleRefresh} className="btn btn-secondary flex gap-2">
                    <IconRefreshDot /> Refresh
                </button>
                <button onClick={openDropdown} className="btn btn-success flex gap-2">
                <IconCaretDown></IconCaretDown> User
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-menu show position-absolute" style={{ top: '100%', right: 0 }}> {/* Adjusting position */}
                        <button className="dropdown-item flex gap-2" onClick={handleCreate}>
                        <IconPlus /> Create 
                        </button>
                    </div>
                )}
            </div>
        </div>

            <div className="table-responsive">
                <table className="table card-table table-vcenter table-hover custom-table">
                    <thead>
                        <tr className="text-center">
                            <th>Branch Name</th>
                            <th>Business Name</th>
                            <th>Office Address</th>
                            <th>Contact Name</th>
                            <th>Contact No</th>
                            <th>Email Address</th>
                            <th>Start Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="9" className="text-center">Loading branches...</td>
                            </tr>
                        ) : branches.length > 0 ? (
                            branches.map((branch) => (
                                <tr key={branch.Id} className="border hover:bg-blue-200 transition duration-200 text-center">
                                    <td className="border p-2">{branch.BranchName}</td>
                                    <td className="border p-2">{branch.BusinessName}</td>
                                    <td className="border p-2">{branch.OfficeAddress}</td>
                                    <td className="border p-2">{branch.ContactName}</td>
                                    <td className="border p-2">{branch.ContactNo}</td>
                                    <td className="border p-2">{branch.EmailAddress}</td>
                                    <td className="border p-2">{new Date(branch.StartDate).toLocaleDateString()}</td>
                                    <td className="border p-2">
                                        {branch.IsActive ? (
                                            <IconCircleCheck style={{ color: 'green' }} strokeWidth={2} />
                                        ) : (
                                            <IconX style={{ color: 'red' }} strokeWidth={2} />
                                        )}
                                    </td>
                                    <td className="border p-2 flex items-center justify-center gap-3 relative">
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
                                <td colSpan="9" className="text-center p-4">No Data Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <BranchModal
                showModal={showModal}
                setShowModal={setShowModal}
                branchData={selectedBranch}
                handleSave={handleSave}
            />
        </div>

    );
};

export default Branch;
