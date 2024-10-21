const getAllTestomonials = (req, res,next) => {
  res.status(200).json({
    status: "success",
    message: "Satisfied clients fetched successfully",
    data: [
      { id: 1, name: "John Doe", rating: 4.5 },
      { id: 2, name: "Jane Smith", rating: 4.8 },
      { id: 3, name: "Michael Johnson", rating: 4.7 },
    ],
  });
};

module.exports = { getAllTestomonials };
