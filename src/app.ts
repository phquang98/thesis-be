import "module-alias/register";
import dotenv from "dotenv";

import { envChecker } from "~/config/env";
import { initialCxnDB } from "~/config/dataSrc";
import { server } from "~/config/server";

dotenv.config(); // read key-value pairs from .env
const port = process.env.EXPRESS_APP_PORT || 4000;

const env = envChecker();
console.log("ENV", env);
void initialCxnDB();

server.listen(port, () => {
  console.log(`Server started at port ${port}!`);
});
