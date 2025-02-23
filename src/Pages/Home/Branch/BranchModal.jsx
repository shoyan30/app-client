import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const BranchModal = ({ showModal, setShowModal, branchData, handleSave }) => {
    const [formData, setFormData] = useState({
        BusinessId: "",
        BranchName: "",
        OfficeAddress: "",
        ContactName: "",
        ContactNo: "",
        EmailAddress: "",
        StartDate: "",
        IsActive: "1"
    });

    // Populate the form when branchData is provided (for editing)
    useEffect(() => {
        if (branchData) {
            setFormData({
                BusinessId: branchData.BusinessId || "",
                BranchName: branchData.BranchName || "",
                OfficeAddress: branchData.OfficeAddress || "",
                ContactName: branchData.ContactName || "",
                ContactNo: branchData.ContactNo || "",
                EmailAddress: branchData.EmailAddress || "",
                StartDate: branchData.StartDate ? branchData.StartDate.split("T")[0] : "",
                IsActive: branchData.IsActive ? "1" : "0"
            });
        }
    }, [branchData]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData); // Pass the updated form data
        setShowModal(false); // Close modal after saving
    };

    return (
        <div className={`modal ${showModal ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {branchData ? "Update Branch" : "Create Branch"}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Business</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="BusinessId"
                                    value={formData.BusinessId}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Branch Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="BranchName"
                                    value={formData.BranchName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Office Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="OfficeAddress"
                                    value={formData.OfficeAddress}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contact Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ContactName"
                                    value={formData.ContactName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Contact No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ContactNo"
                                    value={formData.ContactNo}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="EmailAddress"
                                    value={formData.EmailAddress}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Start Date and Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    name="StartDate"
                                    value={formData.StartDate}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="IsActive"
                                    checked={formData.IsActive}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label">Active</label>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {branchData ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PropTypes validation
BranchModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    branchData: PropTypes.object,
    handleSave: PropTypes.func.isRequired
};

export default BranchModal;
