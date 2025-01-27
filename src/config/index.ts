import * as dotenv from "dotenv"
import { Logger } from "@nestjs/common"


dotenv.config()

export type ConfigType = {
    PORT
    DB_URL
}