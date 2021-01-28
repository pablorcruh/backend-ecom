"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _middleware = require("../middleware");

var productController = _interopRequireWildcard(require("../controllers/products.controller"));

var router = (0, _express.Router)();
var upload = (0, _multer["default"])({
  limits: {
    fileSize: 1000000
  },
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  }
});
router.get('/', productController.getProducts);
router.get('/:productId/image', productController.getProductImage);
router.post('/', [_middleware.authJWT.verifyToken, _middleware.authJWT.isAdmin], productController.createProduct);
router.post('/:productId/image', upload.single('product'), productController.uploadImage, function (error, req, res, next) {
  res.status(400).send({
    error: error.message
  });
});
router.get('/:productId', productController.getProductById);
router.put('/:productId', [_middleware.authJWT.verifyToken, _middleware.authJWT.isAdmin], productController.updateProductById);
router["delete"]('/:productId', [_middleware.authJWT.verifyToken, _middleware.authJWT.isAdmin], productController.deleteProductById);
var _default = router;
exports["default"] = _default;