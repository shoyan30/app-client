import PropTypes from 'prop-types';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const FloorTable = ({ floors, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2">#</th>
            <th className="border border-gray-200 px-4 py-2">FLOOR_NAME</th>
            <th className="border border-gray-200 px-4 py-2">IS_ACTIVE</th>
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
              <td className="border border-gray-200 px-4 py-2 relative">
                <div className="dropdown dropdown-top dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    <HiDotsHorizontal className="text-2xl" />
                  </div>
                  <div className='absolute top-50 right-50'>
                    <ul tabIndex={0} className="dropdown-content menu bg-gray-200 rounded-box z-1 w-40 shadow-sm">
                      <li><button onClick={() => onEdit(floor)}><FaEdit className="text-green-600 text-xl" />EDIT</button></li>
                      <li><button onClick={() => onDelete(floor.ID)}><AiFillDelete className="text-red-800 text-xl" />DELETE</button></li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

FloorTable.propTypes = {
  floors: PropTypes.arrayOf(
    PropTypes.shape({
      ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      FLOOR_NAME: PropTypes.string.isRequired,
      IS_ACTIVE: PropTypes.bool.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default FloorTable;
