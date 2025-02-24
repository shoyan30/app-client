import axios from "axios";

const API_URL = "http://192.168.61.207:8090/api/Xecute/v1/Perform"; // Update with your actual API URL

const headers = {
  "Content-Type": "application/json",
  "app-token": "ESL",
};

// Fetch branch list
export const fetchBranches = async () => {
  const data = JSON.stringify([
    {
      RESOURCE: "company.branch",
      PARAMS: [{ PARAM: "Action", VALUE: "GETALL" }],
    },
  ]);

  try {
    const response = await axios.post(API_URL, data, { headers: headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

// Add or update a branch
export const saveBranch = async (branchData) => {
  try {
    if (branchData.id) {
      // Update existing branch
      const response = await axios.put(
        `${API_URL}/${branchData.id}`,
        branchData,
        { headers }
      );
      return response.data;
    } else {
      // Create new branch
      const response = await axios.post(API_URL, branchData, { headers });
      return response.data;
    }
  } catch (error) {
    console.error("Error saving branch:", error);
    throw error;
  }
};

// Delete branch
export const deleteBranch = async (branchId) => {
  const data = JSON.stringify([
    {
      RESOURCE: "company.branch",
      PARAMS: [{ PARAM: "Action", VALUE: "DELETE" }, { PARAM: "Id", VALUE: branchId }],
    },
  ]);

  try {
    const response = await axios.post(API_URL, data, { headers: headers });
    return response.data;
  } catch (error) {
    console.error("Error deleting branches:", error);
    throw error;
  }
};
