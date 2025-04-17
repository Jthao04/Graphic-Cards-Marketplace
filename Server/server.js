const express = require("express");
const cors = require("cors");
const listingsRoutes = require("./routes/listings");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/listings", listingsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});