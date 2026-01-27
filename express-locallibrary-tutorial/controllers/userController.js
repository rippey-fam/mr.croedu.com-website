const User = require("../models/user");
const BookInstance = require("../models/bookinstance");
const { body, validationResult } = require("express-validator");

// Display list of all Users.
exports.user_list = async (req, res, next) => {
  const allUsers = await User.find().sort({ family_name: 1 }).exec();
  res.render("user_list", {
    title: "User List",
    user_list: allUsers,
  });
};

exports.user_detail = async (req, res, next) => {
  // Get details of user and all their books (in parallel)
  const [user, allBookInstancesByUser] = await Promise.all([
    User.findById(req.params.id).exec(),
    BookInstance.find({ current_user: req.params.id }, "title summary").exec(),
  ]);

  if (user === null) {
    // No results.
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }

  res.render("user_detail", {
    title: "User Detail",
    user,
    user_books: allBookInstancesByUser,
  });
};

// Display User create form on GET.
exports.user_create_get = (req, res, next) => {
  res.render("user_form", { title: "Create User" });
};

// Handle User create on POST.
exports.user_create_post = [
  // Validate and sanitize fields.
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("date_of_birth", "Invalid date of birth")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("card_id", "Must be a valid card number")
    .trim()
    .isLength({ min: 14, max: 14 })
    .withMessage("Library card number must be 14 digits")
    .escape(),
  // isNumber
  // isUnique

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create User object with escaped and trimmed data
    const user = new User({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      card_id: req.body.card_id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("user_form", {
        title: "Create User",
        user,
        errors: errors.array(),
      });
      return;
    }

    // Data from form is valid.
    // Save and redirect to new user record.
    await user.save();
    res.redirect(user.url);
  },
];
