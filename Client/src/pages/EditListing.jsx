import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditListing = () => {
  // Get listing ID from URL
  const { id } = useParams();  
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = import.meta.env.VITE_API_URL;

        const response = await fetch(`${apiUrl}/api/listings/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch listing");
        }

        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(listing),
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      alert("Listing updated successfully!");
      // Redirect to the dashboard after editing
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error updating listing:", error);
      alert("Failed to update listing.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gpuName" className="block">GPU Name</label>
          <input
            type="text"
            id="gpuName"
            name="gpuName"
            value={listing.gpuName}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block">Description</label>
          <textarea
            id="description"
            name="description"
            value={listing.description}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="category" className="block">Category</label>
          <select
            id="category"
            name="category"
            value={listing.category}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          >
            <option value="Nvidia">Nvidia</option>
            <option value="AMD">AMD</option>
            <option value="Intel">Intel</option>
          </select>
        </div>

        <div>
          <label htmlFor="sellerPrice" className="block">Price</label>
          <input
            type="number"
            id="sellerPrice"
            name="sellerPrice"
            value={listing.sellerPrice}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="condition" className="block">Condition</label>
          <select
            id="condition"
            name="condition"
            value={listing.condition}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Listing</button>
        </div>
      </form>
    </div>
  );
};

export default EditListing;
