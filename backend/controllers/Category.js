const Category = require("../models/Category");

// create category fun
exports.createCategory = async(req, res)=> {
    try {
        // fetch data
        const {name, description} = req.body;
        // validation
        if(!name || !description) {
            // 400 bad request
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        // return res
        return res.status(200).json({
            success: true,
            message: "Category created successfully"
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// showAllCategories handler fun
exports.showAllCategories = async(req, res) => {
    try {
        const allCategories = await Category.find({}, 
            {
                name:true, 
                description: true
            });
        return res.status(200).json({
            success: true,
            data: allCategories,
            message: "All Categories fetched successfully!"
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// categoryPageDetails
exports.categoryPageDetails = async(req, res) => {
    try{
        // get categoryId
        const {categoryId} = req.body;
        // get courses for specified courseId
        const selectedCategory = await Category.findById(categoryId)
        .populate("courses")
        .exec();
        // validation
        if(!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data not found"
            });
        }
        // get different category courses
        const differentCategories = await Category.find({
            _id: {
                $ne: categoryId
            }
        })
        .populate("courses")
        .exec();
        // get top selling courses
        const topCategories = await Category.aggregate([
            {
                $lookup: {
                  from: "courses",
                  localField: "courses",
                  foreignField: "_id",
                  as: "courseDetails",
                },
              },
              {
                $project: {
                  _id: 1,
                  courseCount: { $size: "$courseDetails" },
                },
              },
              {
                $sort: { courseCount: -1 },
              },
              {
                $limit: 10,
              },
        ]);




        // return sab
        return res.status(200).json({
            success: true,
            message: "CategoryPage details Fetched successfully!",
            data: {
                selectedCategory,
                differentCategories,
                topCategories,
            },
        });

    } catch(err) {
        console.log("Error: ", err);
        return res.status(200).json({
            success: false,
            message: "Internal Server error"
        });
    }
}