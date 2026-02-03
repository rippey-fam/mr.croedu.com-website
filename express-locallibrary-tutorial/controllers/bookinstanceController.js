const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");
const Users = require("../models/user");
const { body, validationResult } = require("express-validator");
const bookinstance = require("../models/bookinstance");

// Display list of all BookInstances.
exports.bookinstance_list = async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();

  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .populate("current_user")
    .exec();

  if (bookInstance === null) {
    // No results.
    const err = new Error("Book copy not found");
    err.status = 404;
    return next(err);
  }

  res.render("bookinstance_detail", {
    title: "Book: " + bookInstance.book.title,
    bookinstance: bookInstance,
  });
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = async (req, res, next) => {
  const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

  res.render("bookinstance_form", {
    title: "Create BookInstance",
    book_list: allBooks,
  });
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  // Validate and sanitize fields.
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),

  // Process request after validation and sanitization.
  async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a BookInstance object with escaped and trimmed data.
    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // There are errors.
      // Render form again with sanitized values and error messages.
      const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        errors: errors.array(),
        bookinstance: bookInstance,
      });
      return;
    }

    // Data from form is valid
    await bookInstance.save();
    res.redirect(bookInstance.url);
  },
];

// Display bookinstance delete form on GET.
exports.bookinstance_delete_get = async (req, res, next) => {
  // Get details of bookinstance and all their (in parallel)
  const bookinstance = await BookInstance.findById(req.params.id).exec();

  if (bookinstance === null) {
    // No results.
    res.redirect("/catalog/books");
    return;
  }

  res.render("bookinstance_delete", {
    title: "Delete Book Instance",
    bookinstance,
  });
};

// Handle book delete on POST.
exports.bookinstance_delete_post = async (req, res, next) => {
  await BookInstance.findByIdAndDelete(req.body.bookinstanceid);
  res.redirect("/catalog/bookinstances");
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = async (req, res, next) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};

// Display bookinstance checkout form on GET.
exports.bookinstance_checkout_get = async (req, res, next) => {
  // Get details of bookinstance and all their (in parallel)
  const bookinstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();
  const users = await Users.find().exec();

  if (bookinstance === null) {
    // No results.
    res.redirect("/catalog/books");
    return;
  }

  res.render("bookinstance_checkout", {
    title: "Checkout Book Instance",
    bookinstance,
    users,
  });
};

// Handle book checkout on POST.
exports.bookinstance_checkout_post = async (req, res, next) => {
  const user = await Users.findById(req.body.user);
  if (user === null) {
    res.redirect("/catalog/bookinstances");
    return;
  }
  const book = await BookInstance.findById(req.body.bookinstanceid);
  if (book.status !== "Available") {
    res.redirect(`/catalog/bookinstance/${req.body.bookinstanceid}`);
    return;
  }
  await BookInstance.findByIdAndUpdate(req.body.bookinstanceid, {
    current_user: req.body.user,
    status: "Loaned",
    due_back: new Date(),
  });
  res.redirect("/catalog/bookinstances");
};
