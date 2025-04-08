import axios from "axios";

const API_URL = "http://localhost:8080/api/courses";

export const getAllCourses = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    } else {
      console.error("Error Message:", error.message);
    }
    throw error;
  }
};

// Get course by ID
export const getCourseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
