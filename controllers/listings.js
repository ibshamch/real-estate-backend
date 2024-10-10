const getAllListings = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Listings fetched successfully",
    data: [
      {
        title: "Spanish House",
        property: "House",
        size: "5 Marla",
        type: "Sale",
        price: "$800,000",
        location: {
          city: "Lahore",
          state: "Punjab",
          country: "Pakistan",
          location: "DHA",
          phase: "Phase 6",
          block: "Block E",
          lat: "",
          long: "",
        },
        builtIn: 1969,
        features: {
          bathrooms: 4,
          bedrooms: 3,
          furnished: true,
          corner: true,
        },
        details: "Beatiful Spanish House in Lahore DHA",
        agentDetails: {
          name: "Sadaqat Ali",
          contact: "+923224688760",
          whatsapp: "+923224688760",
        },
        isFeatured: true,
        imageLinks: {
          mainImage: "https://example.com/house1.jpg",
          galleryImages: [
            "https://example.com/house1-1.jpg",
            "https://example.com/house1-2.jpg",
          ],
        },
      },
    ],
  });
};

module.exports = {
  getAllListings,
};
