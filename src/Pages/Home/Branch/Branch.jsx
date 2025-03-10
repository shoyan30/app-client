import { useEffect, useState } from "react";
import axios from "axios";
import {
    IconCaretDownFilled,
    IconCircleCheckFilled,
    IconEdit,
    IconHelpCircleFilled,
    IconPlus,
    IconRefresh,
    IconTrashFilled,
    IconX,
} from "@tabler/icons-react";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";

const Branch = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        BusinessId: "",
        BranchName: "",
        OfficeAddress: "",
        ContactName: "",
        ContactNo: "",
        EmailAddress: "",
        StartDate: "",
        IsActive: "1",
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const ApiUrl = "http://192.168.61.207:8090/api/Xecute/v1/Perform";

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const action = isEditMode ? "UPDATE" : "INSERT";
        const formattedStartDate = `${formData.StartDate}:00`;
        const formattedIsActive = formData.IsActive ? "1" : "0";
        const requestData = {
            ...formData,
            StartDate: formattedStartDate,
            IsActive: formattedIsActive
        };


        if (isEditMode) {
            requestData.Id = formData.Id;
        };

        // Convert requestData object into PARAM-VALUE pairs
        const requestParams = Object.entries(requestData).map(([key, value]) => ({
            PARAM: key,
            VALUE: value
        }));

        const data = JSON.stringify([
            {
                RESOURCE: "company.branch",
                PARAMS: [
                    { PARAM: "Action", VALUE: action },
                    ...requestParams, // Spread the generated PARAM-VALUE pairs
                    { PARAM: "UserId", VALUE: "ap" },
                ],
            },
        ]);

        console.log("Sending data:", data);

        axios
            .post(ApiUrl, data, {
                headers: { "app-token": "ESL", "Content-Type": "application/json" },
            })
            .then((response) => {
                if (response.data.SUCCESS) {
                    fetchBranches();
                    resetForm();
                    // const modal = document.querySelector("#modal-info");
                    // const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
                    // bootstrapModal.hide();


                    const modalElement = document.getElementById("modal-info");
                    modalElement.removeAttribute("aria-hidden");
                    const modalInstance = Modal.getInstance(modalElement); // Get the existing Bootstrap modal instance

                    if (modalInstance) {
                        modalInstance.hide(); // Close the modal
                    }

                } else {
                    setError(`Failed to ${isEditMode ? "update" : "create"} branch.`);
                }
            })
            .catch((error) => {
                console.error("Error:", error.response ? error.response.data : error.message);
                if (error.response && error.response.data.errors) {
                    console.error("Validation Errors:", error.response.data.errors);
                }
               
            });
    };


    const fetchBranches = () => {
        setLoading(true);
        setError(null);

        const data = JSON.stringify([
            {
                RESOURCE: "company.branch",
                PARAMS: [
                    { PARAM: "Action", VALUE: "GETALL" },
                    { PARAM: "UserId", VALUE: "ap" },
                ],
            },
        ]);

        console.log("Fetching branches with data:", data); // Debugging: Log the data being sent

        axios
            .post(ApiUrl, data, {
                headers: { "app-token": "ESL", "Content-Type": "application/json" },
            })
            .then((response) => {
                if (response.data.SUCCESS && response.data.EQResult[0].DynamicData) {
                    setBranches(response.data.EQResult[0].DynamicData);
                } else {
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


    const resetForm = () => {
        setFormData({
            BusinessId: "",
            BranchName: "",
            OfficeAddress: "",
            ContactName: "",
            ContactNo: "",
            EmailAddress: "",
            StartDate: "",
            IsActive: "1",
        });
        setIsEditMode(false);
    };


    const handleEdit = (branch) => {
        setFormData({
            Id: branch.Id,
            BusinessId: branch.BusinessId,
            BranchName: branch.BranchName,
            OfficeAddress: branch.OfficeAddress,
            ContactName: branch.ContactName,
            ContactNo: branch.ContactNo,
            EmailAddress: branch.EmailAddress,
            StartDate: branch.StartDate.split("T")[0],
            IsActive: branch.IsActive ? "1" : "0",
        });
        setIsEditMode(true); // 
    };


    const handleDelete = (branchId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete this Branch!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const data = JSON.stringify([
                    {
                        RESOURCE: "company.branch",
                        PARAMS: [
                            { PARAM: "Action", VALUE: "DELETE" },
                            { PARAM: "Id", VALUE: branchId },
                            { PARAM: "UserId", VALUE: "ap" },
                        ],
                    },
                ]);
    
                axios
                    .post(ApiUrl, data, {
                        headers: { "app-token": "ESL", "Content-Type": "application/json" },
                    })
                    .then((response) => {
                        if (response.data.SUCCESS) {
                            setBranches((prevBranches) =>
                                prevBranches.filter((branch) => branch.Id !== branchId)
                            );
    
                            Swal.fire("Deleted!", "The branch has been removed.", "success");
                        } else {
                            Swal.fire("Error!", "Failed to delete the branch.", "error");
                        }
                    })
                    .catch((error) => {
                        console.error("Delete error:", error);
                        Swal.fire("Error!", "Something went wrong.", "error");
                    });
            }
        });
    };


    const handleRefresh = () => {
        fetchBranches();
    };


    useEffect(() => {
        fetchBranches();
    }, []);

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">Branch List</h3>
                <div className="card-actions">
                    <div className="mb-3">
                        <div className="btn-group w-100" role="group">
                            <button className="btn btn-primary active w-100" onClick={handleRefresh}>
                                <IconRefresh /> Refresh
                            </button>

                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-6 btn-success active w-100"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    More <IconCaretDownFilled />
                                </button>
                                <div className="dropdown-menu">
                                    <button
                                        className="dropdown-item btn btn-2 text-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal-info"
                                        onClick={resetForm} // Reset form for create mode
                                    >
                                        <IconPlus className="text-primary" /> Create
                                    </button>
                                    <a className="dropdown-item" href="#">
                                        <IconHelpCircleFilled /> Help
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for create/edit */}
            <div className="modal fade" id="modal-info" tabIndex="-1" aria-labelledby="modalReportLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalReportLabel">
                                {isEditMode ? "Edit Branch" : "New Branch"}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {/* Business ID */}
                                <div className="mb-3">
                                    <label htmlFor="businessId" className="form-label">Business ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="businessId"
                                        name="BusinessId"
                                        value={formData.BusinessId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Branch Name */}
                                <div className="mb-3">
                                    <label htmlFor="branchName" className="form-label">Branch Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="branchName"
                                        name="BranchName"
                                        value={formData.BranchName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Office Address */}
                                <div className="mb-3">
                                    <label htmlFor="officeAddress" className="form-label">Office Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="officeAddress"
                                        name="OfficeAddress"
                                        value={formData.OfficeAddress}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Contact Name */}
                                <div className="mb-3">
                                    <label htmlFor="contactName" className="form-label">Contact Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactName"
                                        name="ContactName"
                                        value={formData.ContactName}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Contact No */}
                                <div className="mb-3">
                                    <label htmlFor="contactNo" className="form-label">Contact No</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="contactNo"
                                        name="ContactNo"
                                        value={formData.ContactNo}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email Address */}
                                <div className="mb-3">
                                    <label htmlFor="emailAddress" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="emailAddress"
                                        name="EmailAddress"
                                        value={formData.EmailAddress}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Start Date and Time */}
                                <div className="mb-3">
                                    <label htmlFor="startDate" className="form-label">Start Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="startDate"
                                        name="StartDate"
                                        value={formData.StartDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Is Active Checkbox */}
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="isActive"
                                        name="IsActive"
                                        checked={formData.IsActive} // Use boolean
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="isActive" className="form-check-label">Active</label>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                {/* Modal Footer */}
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button> */}
                                    <button type="submit" className="btn btn-primary">
                                        {isEditMode ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table to display branches */}
            <div className="table-responsive">
                <table className="table card-table table-vcenter table-hover custom-table">
                    
                        <thead style={{ backgroundColor: '#a55eea' }}>
                            <tr className="text-center">
                                <th>Branch Name</th>
                                <th>Business ID</th>
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
                                <td colSpan="9" className="text-center">
                                    Loading branches...
                                </td>
                            </tr>
                        ) : branches.length > 0 ? (
                            branches.map((branch) => (
                                <tr key={branch.Id} className="border hover:bg-blue-200 transition duration-200 text-center">
                                    <td className="border p-2">{branch.BranchName}</td>
                                    <td className="border p-2">{branch.BusinessId}</td>
                                    <td className="border p-2">{branch.OfficeAddress}</td>
                                    <td className="border p-2">{branch.ContactName}</td>
                                    <td className="border p-2">{branch.ContactNo}</td>
                                    <td className="border p-2">{branch.EmailAddress}</td>
                                    <td className="border p-2">{new Date(branch.StartDate).toLocaleDateString()}</td>
                                    <td className="border p-2">
                                        {branch.IsActive ? (
                                            <IconCircleCheckFilled className="link-success" />
                                        ) : (
                                            <IconX />
                                        )}
                                    </td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button
                                                className="btn btn-danger active w-100 text-white"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modal-info"
                                                onClick={() => handleEdit(branch)}
                                            >
                                                <IconEdit /> Edit
                                            </button>

                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-dark active w-100"
                                                    data-bs-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <IconCaretDownFilled />
                                                </button>
                                                <div className="dropdown-menu">
                                                    <button onClick={() => handleDelete(branch.Id)} className="dropdown-item text-red ">
                                                        <IconTrashFilled className="link-danger" /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center p-4">
                                    No Data Found
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