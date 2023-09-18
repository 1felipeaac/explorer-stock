const { Router } = require("express");
const SalesController = require("../controllers/SalesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require('../middlewares/verifyUserAuthorization');


const salesRoutes = Router();

const salesController = new SalesController();

salesRoutes.use(ensureAuthenticated);
salesRoutes.use(verifyUserAuthorization(['admin', 'sale'])) // permissão de acesso somente a role = admin

salesRoutes.get("/", salesController.index);

module.exports = salesRoutes;