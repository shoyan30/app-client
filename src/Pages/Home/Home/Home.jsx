import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import AxiosSecure from "../../../Hooks/AxiosSecure";
import Swal from "sweetalert2";

const Home = () => {
    const [floors, setFloors] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // Track form mode
    const [editingFloor, setEditingFloor] = useState(null); // Store the floor being edited
    const axiosSecure = AxiosSecure();

    // React Hook Form for Combined Create/Edit
    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            FLOOR_NO: "",
            FLOOR_NAME: "",
            IS_ACTIVE: "true",
        },
    });

    // Fetch floors from the server
    const fetchFloors = async () => {
        try {
            const response = await axiosSecure.get('/floors');
            setFloors(response.data);
        } catch (error) {
            console.error("Error fetching floors:", error);
            Swal.fire('Error!', 'Failed to fetch floors.', 'error');
        }
    };

    useEffect(() => {
        fetchFloors();
    }, [axiosSecure]);

    // Handle Delete Floor
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

    // Handle Edit Floor (Open Modal and Set Values)
    const handleEditFloor = (floor) => {
        setIsEditing(true); // Set form to edit mode
        setEditingFloor(floor);

        // Set form values
        setValue("FLOOR_NAME", floor.FLOOR_NAME);
        setValue("IS_ACTIVE", floor.IS_ACTIVE.toString());
        document.getElementById('floor_modal').showModal();
    };

    // Handle Create Floor (Open Modal and Reset Form)
    const handleAddFloor = () => {
        setIsEditing(false); // Set form to create mode
        reset({
            FLOOR_NO: "",
            FLOOR_NAME: "",
            IS_ACTIVE: "true",
        });
        document.getElementById('floor_modal').showModal();
    };

    // Handle Form Submission (Create or Update)
    const onSubmit = async (data) => {
        const payload = {
            FLOOR_NO: data.FLOOR_NO,
            FLOOR_NAME: data.FLOOR_NAME,
            IS_ACTIVE: data.IS_ACTIVE === "true",
            UPDATED_DATE: new Date().toISOString(),
        };

        try {
            let response;
            if (isEditing) {
                // Update existing floor
                response = await axiosSecure.put(`/floors/${editingFloor.ID}`, {
                    ...editingFloor,
                    ...payload,
                });
                

            } else {
                // Create new floor
                response = await axiosSecure.post('/floors', payload);
            }

            if (response.data.success) {
                fetchFloors(); // Refresh the floors list
                Swal.fire(
                    isEditing ? 'Updated!' : 'Created!',
                    `The floor has been ${isEditing ? 'updated' : 'created'}.`,
                    'success'
                );
                document.getElementById('floor_modal').close(); // Close the modal
            } else {
                Swal.fire('Error!', `Failed to ${isEditing ? 'update' : 'create'} the floor.`, 'error');
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} floor:`, error);
            Swal.fire('Error!', `Failed to ${isEditing ? 'update' : 'create'} the floor.`, 'error');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between px-4">
                <div>
                    <p className="font-extrabold underline text-xl">FLOORS LIST:</p>
                </div>
                <div className="join">
                    <button className="btn join-item bg-zinc-400 rounded-md" onClick={fetchFloors}>Refresh</button>
                    <button className="btn join-item bg-green-400 rounded-md" onClick={handleAddFloor}>Add New</button>
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
                                <tr key={floor.ID} className="hover:bg-gray-50 transition-colors text-center">
                                    <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{floor.FLOOR_NAME}</td>
                                    <td className="border border-gray-200 px-4 py-2">
                                        {floor.IS_ACTIVE ? "Yes" : "No"}
                                    </td>
                                    <td className="border border-gray-200 px-4 py-2">---</td>
                                    <td className="border border-gray-200 px-4 py-2">---</td>
                                    <td className="border border-gray-200 px-4 py-2">---</td>
                                    <td className="border border-gray-200 px-4 py-2">---</td>
                                    <td className="border border-gray-200 px-4 py-2">---</td>
                                    <td className="border border-gray-200 px-4 py-2 relative">
                                        <div className="dropdown dropdown-top dropdown-end">
                                            <div tabIndex={0} role="button" className="btn m-1">
                                                <HiDotsHorizontal className="text-2xl" />
                                            </div>
                                            <div className='absolute top-50 right-50'>
                                                <ul tabIndex={0} className="dropdown-content menu bg-gray-200 rounded-box z-1 w-40 shadow-sm">
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

                {/* Combined Create/Edit Floor Modal */}
                <dialog id="floor_modal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">
                            {isEditing ? "Edit Floor" : "Add New Floor"}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Floor No (Only for Create) */}
                            {!isEditing && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Floor No</label>
                                    <input
                                        type="text"
                                        {...register("FLOOR_NO", { required: true })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            )}

                            {/* Floor Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Floor Name</label>
                                <input
                                    type="text"
                                    {...register("FLOOR_NAME", { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            {/* Is Active */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Is Active</label>
                                <select
                                    {...register("IS_ACTIVE", { required: true })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            {/* Modal Actions */}
                            <div className="modal-action">
                                <button type="button" onClick={() => document.getElementById('floor_modal').close()} className="btn">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {isEditing ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default Home;