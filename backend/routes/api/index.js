// backend/routes/api/index.js
const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const reviewsRouter = require("./reviews.js");
const bookingsRouter = require("./bookings.js");
const spotImagesRouter = require("./spotimages.js")
const reviewImagesRouter = require("./reviewimages.js")
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");

router.use(restoreUser);

router.get("/test", requireAuth, (req, res) => {
  res.json({ message: "success" });
});

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/spots", spotsRouter);

router.use("/reviews", reviewsRouter);

router.use("/bookings", bookingsRouter)

router.use("/spot-images", spotImagesRouter)

router.use("/review-images", reviewImagesRouter)

module.exports = router;
