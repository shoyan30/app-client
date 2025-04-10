import AxiosSecure from "../Hooks/AxiosSecure";
import Swal from "sweetalert2";

const useFloorService = () => {
  const axiosSecure = AxiosSecure();

  const fetchFloors = async () => {
    try {
      const response = await axiosSecure.get('/floors');
      return response.data;
    } catch (error) {
      console.error("Error fetching floors:", error);
      Swal.fire('Error!', 'Failed to fetch floors.', 'error');
      throw error;
    }
  };

  const createFloor = async (floorData) => {
    try {
      const response = await axiosSecure.post('/floors', floorData);
      return response.data;
    } catch (error) {
      console.error("Error creating floor:", error);
      throw error;
    }
  };

  const updateFloor = async (id, floorData) => {
    try {
      const response = await axiosSecure.put(`/floors/${id}`, floorData);
      return response.data;
    } catch (error) {
      console.error("Error updating floor:", error);
      throw error;
    }
  };

  const deleteFloor = async (id) => {
    try {
      const response = await axiosSecure.delete(`/floors/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting floor:", error);
      throw error;
    }
  };

  return {
    fetchFloors,
    createFloor,
    updateFloor,
    deleteFloor
  };
};

export default useFloorService;
