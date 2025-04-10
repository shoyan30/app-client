import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";

const FloorFormModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isEditing,
  errors 
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <dialog 
      id="floor_modal" 
      className="modal modal-bottom sm:modal-middle"
      aria-labelledby="modal-title"
      aria-modal="true"
      open={isOpen}
    >
      <div className="modal-box">
        <h3 id="modal-title" className="font-bold text-lg">
          {isEditing ? "Edit Floor" : "Add New Floor"}
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="_csrf" value={window.csrfToken} />
          {!isEditing && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Floor No</label>
              <input
                type="text"
                {...register("FLOOR_NO", { 
                  required: "Floor number is required",
                  minLength: {
                    value: 2,
                    message: "Minimum length is 2 characters"
                  }
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-invalid={errors?.FLOOR_NO ? "true" : "false"}
              />
              {errors?.FLOOR_NO && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.FLOOR_NO.message}
                </p>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Floor Name</label>
            <input
              type="text"
              {...register("FLOOR_NAME", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

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

          <div className="modal-action">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

FloorFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

export default FloorFormModal;
