var express = require("express");
var axios = require("axios")
var router = express.Router();

/* GET admindaftar. */
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/backend/admin/modul"
    );
    const data = response.data;
    res.render("adminmodul", { data }); // Pass data as a local variable to the EJS template
  } catch (error) {
    console.log("Error! : " + error);
    res.status(500).send("Internal Server Error"); // Send an error response
  }
});

module.exports = router;
