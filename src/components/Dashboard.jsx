import { useState, useEffect } from "react";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";
import StarRating from "./StarRating"; // Import the StarRating component
import { Link } from "react-router-dom";
import axios from "axios";
function Dashboard() {

  const baseUrl = `https://669fd2c4b132e2c136ff474c.mockapi.io/testimonials`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [currentData, setCurrentData] = useState(null);



  
  // Toggle main modal
  function handleModal() {
    setIsModalOpen(!isModalOpen);
    if (isModalOpen) {
      setCurrentData(null);
    }
  }

  // Fetch data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(baseUrl);
        setTestimonials(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  // Handle delete modal open
  function handleDeleteModalOpen(id) {
    setCurrentId(id);
    setIsDeleteModalOpen(true);
  }

  // Handle delete modal close
  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false);
    setCurrentId(null);
  }

  // Handle update modal open
  function handleUpdateModalOpen(data) {
    setCurrentData(data);
    setIsModalOpen(true);
  }

  // Delete data
  function handleDelete() {
    fetch(`${baseUrl}/${currentId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTestimonials((prevTestimonials) =>
            prevTestimonials.filter((item) => item.id !== currentId)
          );
          handleDeleteModalClose();
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((error) => {
        console.error("Error deleting testimonial:", error);
      });
  }

  // Add data
  function handleAdd(newTestimonial) {
    setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
  }

  // Update data
  function handleUpdate(updatedTestimonial) {
    setTestimonials((prevTestimonials) =>
      prevTestimonials.map((item) =>
        item.id === updatedTestimonial.id ? updatedTestimonial : item
      )
    );
  }

  return (
    <div>
      <Link to={"/"}>
        <button className="rounded-pill button-home">Home</button>
      </Link>
      <div className="d-flex justify-content-between mt-5 mx-5">
        <h3 className="mx-2" style={{ color: "#17a2b8" }}>Dashboard</h3>
        <button
          onClick={handleModal}
          className="bg-info px-5 rounded-pill button-add"
        >
          add+
        </button>
        {isModalOpen && (
          <UpdateModal
            isOpen={isModalOpen}
            onClose={handleModal}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            initialData={currentData}
          />
        )}
      </div>
      <div className="py-5 mx-5" style={{ overflow: "auto" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="bg-info">
              <th className="p-2">Title</th>
              <th className="p-2">Body</th>
              <th className="p-2 text-center">Rating</th>
              <th className="p-2 text-center">Image</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Jobtitle</th>
              <th className="p-2 text-center">Update</th>
              <th className="p-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((item) => (
              <tr key={item.id}>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.body}</td>
                <td className="text-center p-2">
                  <StarRating rating={item.rating} /> {/* Display stars here */}
                </td>
                <td className="text-center p-2">
                  <img style={{ width: "100px", height: "100px", borderRadius: "15px" }} src={item.image} alt="photo" />
                </td>
                <td className="text-center p-2">{item.name}</td>
                <td className="text-center p-2">{item.jobTitle}</td>
                <td className="text-center p-2">
                  <i
                    className="fa-solid fa-pen-to-square update"
                    onClick={() => handleUpdateModalOpen(item)}
                  ></i>
                </td>
                <td className="text-center p-2">
                  <i
                    className="fa-solid fa-trash-can delete"
                    onClick={() => handleDeleteModalOpen(item.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
