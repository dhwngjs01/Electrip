const express = require("express");
const router = express.Router();
const controller = require("../controller/adminController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../../util/jwtAuth");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

const multer = require("multer");
const allowedImageTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 5 * 1024 * 1024,
    fields: 20,
  },
});
const uploadImage = [
  function parseImageUpload(req, res, next) {
    upload.single("car_image")(req, res, (error) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "이미지는 한 개만, 5MB 이하로 업로드해 주세요.",
        });
      }

      return next();
    });
  },
  async function validateAndStoreImage(req, res, next) {
    if (!req.file) {
      return next();
    }

    const { fileTypeFromBuffer } = await import("file-type");
    const detectedType = await fileTypeFromBuffer(req.file.buffer);
    const extension = allowedImageTypes.get(detectedType?.mime);

    if (!extension) {
      return res.status(400).json({
        success: false,
        message: "JPEG, PNG 또는 WebP 이미지만 업로드할 수 있습니다.",
      });
    }

    const filename = `${crypto.randomUUID()}${extension}`;
    const uploadDirectory = path.join(
      __dirname,
      "../../public/uploads/images"
    );
    await fs.mkdir(uploadDirectory, { recursive: true });
    await fs.writeFile(path.join(uploadDirectory, filename), req.file.buffer, {
      flag: "wx",
    });
    req.file.filename = filename;

    return next();
  },
];

router.use(authMiddleware, adminMiddleware);

router.get("/dashboard", controller.getDashboard);
router.get("/users", controller.getAllUsers);
router.patch("/users/:id", controller.userStateControl);

router.get("/cars", controller.getAllCars);
router.get("/cars/:car_no", controller.getCarInfo);
router.get("/cars/reservations/:car_no", controller.getCarReservations);
router.patch("/cars/:car_no", controller.carStateControl);
router.post("/cars", uploadImage, controller.addCar);
router.put("/cars/:car_no", uploadImage, controller.editCar);
router.delete("/cars/:car_no", controller.deleteCar);

router.get("/zones", controller.getAllZones);
router.get("/zones/:zone_no", controller.getZoneInfo);
router.post("/zones", controller.addZone);
router.patch("/zones/:zone_no", controller.zoneStateControl);
router.put("/zones/:zone_no", controller.editZone);
router.delete("/zones/:zone_no", controller.deleteZone);

router.get("/reservations", controller.getAllReservations);
router.get("/reservations/:reserve_no", controller.getReserveInfo);

module.exports = router;
