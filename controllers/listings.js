const getAllListings = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Listings fetched successfully",
    data: [
      { id: 1, title: "House 1", price: 250000 },
      { id: 2, title: "House 2", price: 300000 },
      { id: 3, title: "House 3", price: 280000 },
    ],
  });
};

module.exports = {
  getAllListings,
};
