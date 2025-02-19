import { useEffect, useState } from "react";
import axios from "axios";

const Branch = () => {
    const [branches, setBranches] = useState([{}]); //check
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // axios
        //     .post("http://192.168.61.207:8090/api/Xecute/v1/Perform", {}, {
        //         headers: { "Content-Type": "application/json" }
        //     })
        //     .then((response) => {
        //         const data = response.data;
        //         if (data.SUCCESS && data.EQResult.length > 0) {
        //             setBranches(data.EQResult[0].DynamicData);
        //         } else {
        //             setError("No branch data found.");
        //         }
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         setError(error.response ? error.response.data : error.message);
        //         setLoading(false);
        //     });
        let data = JSON.stringify([
            {
                "RESOURCE": "company.branch",
                "PARAMS": [
                    {
                        "PARAM": "Action",
                        "VALUE": "GETALL"
                    },
                    {
                        "PARAM": "UserId",
                        "VALUE": "ap"
                    }
                ]
            }
        ]);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://it-kayesh:8090/api/Xecute/v1/Perform',
            headers: {
                'app-token': 'ESL',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                //console.log(JSON.stringify(response.data));
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
            });
    }, []);

    if (loading) return <p>Loading branches...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Branch List</h3>
            </div>
            <div className="table-responsive">
                <table className="table card-table table-vcenter">
                    <thead>

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
