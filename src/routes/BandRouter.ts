import express from "express";
import { BandBusiness } from "../business/band/BandBusiness";
import { BandController } from "../controller/BandController";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

export const bandRouter = express.Router()

const bandDatabase = new BandDatabase()
const bandBusiness = new BandBusiness(bandDatabase, new IdGenerator(), new Authenticator())
const bandController = new BandController(bandBusiness)

bandRouter.post("/register", (req, res) => bandController.registerBand(req, res))
bandRouter.get("/:idOrName", (req, res) => bandController.getBandByIdOrName(req, res))
