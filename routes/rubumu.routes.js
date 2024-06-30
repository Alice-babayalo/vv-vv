import express from "express";
import authMiddleware from "../middleware/authorisation.js";
import {addRubumu, allRubumu, updateRubumu, getRubumu, deleteRubumu, albumsWithAtleast3Photos} from "../controllers/rubumu.controller.js"


const rubumuRoute = express.Router();

rubumuRoute.post("/add", authMiddleware, addRubumu)
rubumuRoute.get("/all", allRubumu)
rubumuRoute.get("/AllAlbumsWithAtleast3Photos", albumsWithAtleast3Photos)
rubumuRoute.patch("/update/:id", authMiddleware, updateRubumu)
rubumuRoute.delete("/delete/:id", authMiddleware, deleteRubumu)
rubumuRoute.get("/get/:id", getRubumu)

export default rubumuRoute;