import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import AxiosSecure from "../../../Hooks/AxiosSecure";
import Swal from "sweetalert2";

const Home = () => {
    const [floors, setFloors] = useState([]);
    // const [editingFloor, setEditingFloor] = useState(null);
    const axiosSecure = AxiosSecure();

    const [editingFloor, setEditingFloor] = useState({
        UPDATED_DATE: "2025-03-16T12:00:00Z", // Example date from the database
    });

    const fetchFloors = async () => {
        try {
            const response = await axiosSecure.get('/floors'); // Fetch floors from the server
            setFloors(response.data); // Update the state with the fetched data
        } catch (error) {
            console.error("Error fetching floors:", error);
            Swal.fire('Error!', 'Failed to fetch floors.', 'error');
        }
    };

    // Convert the ISO date to the format required by datetime-local input
    const formatDateForInput = (isoDate) => {
        const date = new Date(isoDate);
        const offset = date.getTimezoneOffset() * 60000; // Adjust for timezone offset
        return new Date(date.getTime() - offset).toISOString().slice(0, 16);
    };

    // Handle changes to the datetime-local input
    const handleDateChange = (e) => {
        const newDate = new Date(e.target.value).toISOString(); // Convert back to ISO format
        setEditingFloor({ ...editingFloor, UPDATED_DATE: newDate });
    };

    useEffect(() => {
        axiosSecure.get('/floors')
            .then((response) => {
                setFloors(response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the floors data!", error);
            });
    }, [axiosSecure]);

    const handleDeleteFloor = (floorId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/floors/${floorId}`)
                    .then((response) => {
                        if (response.data.success) {
                            setFloors(floors.filter((floor) => floor.ID !== floorId));
                            Swal.fire('Deleted!', 'The floor has been deleted.', 'success');
                        } else {
                            Swal.fire('Error!', 'Failed to delete the floor.', 'error');
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting floor:', error);
                        Swal.fire('Error!', 'Failed to delete the floor.', 'error');
                    });
            }
        });
    };

    const handleEditFloor = (floor) => {
        setEditingFloor(floor);
        document.getElementById('edit_modal').showModal(); // Open the modal
    };

    const handleUpdateFloor = async () => {
        const payload = {
            ...editingFloor,
            IS_ACTIVE: editingFloor.IS_ACTIVE === "true", // Convert to boolean
            REVISION_NO: Number(editingFloor.REVISION_NO), // Convert to number
        };

        console.log("Request Payload:", payload); // Log the payload

        try {
            const response = await axiosSecure.put(`/floors/${editingFloor.ID}`, payload);
            if (response.data.success) {
                // Update the floors state (if needed)
                fetchFloors();

                // Show success message
                Swal.fire('Updated!', 'The floor has been updated.', 'success');

                // Close the modal
                document.getElementById('edit_modal').close(); // Close the modal
            } else {
                Swal.fire('Error!', 'Failed to update the floor.', 'error');
            }
        } catch (error) {
            console.error("Error updating floor:", error);
            Swal.fire('Error!', 'Failed to update the floor.', 'error');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between px-4">
                <div>
                    <p className="font-extrabold underline text-xl">FLOORS LIST:</p>
                </div>
                <div className="join">
                    <button className="btn join-item bg-zinc-400 rounded-md">Refresh</button>
                    <button className="btn join-item bg-green-400 rounded-md">Add New</button>
                </div>
            </div>
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">#</th>
                                <th className="border border-gray-200 px-4 py-2">FLOOR_NAME</th>
                                <th className="border border-gray-200 px-4 py-2">IS_ACTIVE</th>
                                <th className="border border-gray-200 px-4 py-2">CREATED_USER</th>
                                <th className="border border-gray-200 px-4 py-2">CREATED_DATE</th>
                                <th className="border border-gray-200 px-4 py-2">UPDATED_USER</th>
                                <th className="border border-gray-200 px-4 py-2">UPDATED_DATE</th>
                                <th className="border border-gray-200 px-4 py-2">REVISION_NO</th>
                                <th className="border border-gray-200 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {floors.map((floor, index) => (
                                <tr
                                    key={floor.ID}
                                    className="hover:bg-gray-50 transition-colors text-center"
                                >
                                    <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{floor.FLOOR_NAME}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {floor.IS_ACTIVE ? "Yes" : "No"}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{floor.CREATED_USER}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {new Date(floor.CREATED_DATE).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{floor.UPDATED_USER}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {new Date(floor.UPDATED_DATE).toLocaleString()}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">{floor.REVISION_NO}</td>

                                    <td className="border border-gray-200 px-4 py-2 relative">
                                        <div className="dropdown dropdown-top dropdown-end ">
                                            <div tabIndex={0} role="button" className="btn m-1"><HiDotsHorizontal className="text-2xl" /></div>
                                            <div className='absolute top-50 right-50'>
                                                <ul tabIndex={0} className="dropdown-content menu bg-gray-200 rounded-box z-1 w-40 shadow-sm ">
                                                    <li><button onClick={() => handleEditFloor(floor)}><FaEdit className="text-green-600 text-xl" />EDIT</button></li>
                                                    <li><button onClick={() => handleDeleteFloor(floor.ID)}><AiFillDelete className="text-red-800 text-xl" />DELETE</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* DaisyUI Modal for Editing */}
                <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Floor</h3>
                        {editingFloor && (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUpdateFloor();
                            }}>
                                {/* Floor Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Floor Name</label>
                                    <input
                                        type="text"
                                        value={editingFloor.FLOOR_NAME}
                                        onChange={(e) => setEditingFloor({ ...editingFloor, FLOOR_NAME: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Is Active */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Is Active</label>
                                    <select
                                        value={editingFloor.IS_ACTIVE}
                                        onChange={(e) => setEditingFloor({ ...editingFloor, IS_ACTIVE: e.target.value === 'true' })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>

                                {/* Created User */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Created User</label>
                                    <input
                                        type="text"
                                        value={editingFloor.CREATED_USER}
                                        onChange={(e) => setEditingFloor({ ...editingFloor, CREATED_USER: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Created Date */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Created Date</label>
                                    <input
                                        type="text"
                                        value={new Date(editingFloor.CREATED_DATE).toLocaleString()} // Format the date
                                        readOnly // Make the input read-only since it's a display field
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Updated User */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Updated User</label>
                                    <input
                                        type="text"
                                        value={editingFloor.UPDATED_USER}
                                        onChange={(e) => setEditingFloor({ ...editingFloor, UPDATED_USER: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Updated Date */}
                                <div className="mb-4">
                                    <label htmlFor="updatedDate" className="block text-sm font-medium text-gray-700">
                                        Updated Date
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="updatedDate"
                                        name="updatedDate"
                                        value={formatDateForInput(editingFloor.UPDATED_DATE)} // Format the date for the input
                                        onChange={handleDateChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Revision No */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Revision No</label>
                                    <input
                                        type="text"
                                        value={editingFloor.REVISION_NO}
                                        onChange={(e) => setEditingFloor({ ...editingFloor, REVISION_NO: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                {/* Modal Actions */}
                                <div className="modal-action">
                                    <button type="button" onClick={() => document.getElementById('edit_modal').close()} className="btn">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Home;

//