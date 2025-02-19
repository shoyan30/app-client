import { useEffect, useState } from "react";
import axios from "axios";
import { IconChevronDown, IconEdit, IconPlus, IconRefreshDot } from "@tabler/icons-react";

const Branch = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        let data = JSON.stringify([
            {
                RESOURCE: "company.branch",
                PARAMS: [
                    { PARAM: "Action", VALUE: "GETALL" },
                    { PARAM: "UserId", VALUE: "ap" },
                ],
            },
        ]);

        let config = {
            method: "post",
            maxBodyLength: Infinity,
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
                const data = response.data;
                if (data.SUCCESS && data.EQResult.length > 0) {
                    setBranches(data.EQResult[0].DynamicData);
                } else {
                    setError("No branch data found.");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError("Error fetching data.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading branches...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h3 className="card-title">Branch List</h3>
                <div className="btn-list">
                    <a href="#" className="btn btn-outline-secondary"><IconRefreshDot/> Refresh</a>
                    <a href="#" className="btn btn-outline-success"><IconPlus/>Create</a>
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
                                        {/* Edit Button */}
                                        <button>
                                            <IconEdit
                                                size={24}
                                                stroke={2}
                                                color="red"
                                                className="cursor-pointer"
                                            />
                                        </button>

                                        {/* Dropdown Button */}
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

                                        {/* Dropdown Menu */}
                                        {openDropdown === branch.Id && (
                                            <div className="absolute left-10 top-full mt-2 bg-white border rounded shadow p-2">
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => alert(`Deleted ${branch.BranchName}`)}
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
