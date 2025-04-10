import { useEffect, useReducer, useState } from "react";
import useFloorService from "../../services/floorService";
import Swal from "sweetalert2";
import FloorTable from "./Components/FloorTable";
import FloorFormModal from "./Components/FloorFormModal";
import { floorReducer, initialState } from "../Home/floorReducer";
import { useNavigate } from "react-router-dom";

const FloorPage = () => {
    const [state, dispatch] = useReducer(floorReducer, initialState);
    const [isEditing, setIsEditing] = useState(false);
    const [editingFloor, setEditingFloor] = useState(null);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const floorService = useFloorService();
    const navigate = useNavigate();

    const fetchFloors = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const floors = await floorService.fetchFloors();
            dispatch({ type: 'SET_FLOORS', payload: floors });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        }
    };

    useEffect(() => { fetchFloors(); }, []);

    const handleBack = () => navigate('/');

    const handleEditFloor = (floor) => {
        setIsEditing(true);
        setEditingFloor(floor);
        setErrors({});
        setIsModalOpen(true);
    };

    const handleDeleteFloor = async (floorId) => {
        try {
            await floorService.deleteFloor(floorId);
            dispatch({ type: 'DELETE_FLOOR', payload: floorId });
            Swal.fire('Success', 'Floor deleted successfully', 'success');
        } catch (error) {
            Swal.fire('Error', error.message || 'Failed to delete floor', 'error');
        }
    };

    const handleSubmit = async (data) => {
        try {
            const payload = {
                FLOOR_NO: data.FLOOR_NO,
                FLOOR_NAME: data.FLOOR_NAME,
                IS_ACTIVE: data.IS_ACTIVE === "true"
            };

            if (isEditing) {
                await floorService.updateFloor(editingFloor.ID, payload);
                dispatch({ type: 'UPDATE_FLOOR', payload: { ...editingFloor, ...payload } });
                Swal.fire('Success', 'Floor updated successfully', 'success');
            } else {
                const newFloor = await floorService.createFloor(payload);
                dispatch({ type: 'ADD_FLOOR', payload: newFloor });
                Swal.fire('Success', 'Floor created successfully', 'success');
            }
            setIsModalOpen(false);
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
            Swal.fire('Error', error.message || 'Operation failed', 'error');
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <button onClick={handleBack} className="btn btn-neutral">
                    ← Back to Home
                </button>
                <button 
                        onClick={() => {
                            setIsEditing(false);
                            setEditingFloor(null);
                            setErrors({});
                            setIsModalOpen(true);
                        }}
                    className="btn btn-primary"
                >
                    + Create New Floor
                </button>
            </div>

            {state.isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : state.error ? (
                <div className="alert alert-error">
                    <span>Error loading floors: {state.error}</span>
                    <button className="btn btn-sm" onClick={fetchFloors}>Retry</button>
                </div>
            ) : state.floors.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-lg">No floors found</p>
                    <button 
                        className="btn btn-primary mt-4" 
                        onClick={() => setIsEditing(false)}
                    >
                        Add First Floor
                    </button>
                </div>
            ) : (
                <>
                    <FloorTable
                        floors={state.floors}
                        onEdit={handleEditFloor}
                        onDelete={handleDeleteFloor}
                    />
                    {isModalOpen && (
                        <dialog id="floor_modal" className="modal" open>
                            <div className="modal-box">
                                <FloorFormModal
                                    onClose={() => setIsModalOpen(false)}
                                    onSubmit={(data) => {
                                        handleSubmit(data);
                                        setIsModalOpen(false);
                                    }}
                                    isEditing={isEditing}
                                    errors={errors}
                                />
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button onClick={() => setIsModalOpen(false)}>close</button>
                            </form>
                        </dialog>
                    )}
                </>
            )}
        </div>
    );
};

export default FloorPage;