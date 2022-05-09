import "module-alias/register";
import dotenv from "dotenv";

import { envChecker, initialCxnDB, server } from "~/config";

dotenv.config(); // read key-value pairs from .env
const port = process.env.EXPRESS_APP_PORT || 4000;

envChecker();
void initialCxnDB();

server.listen(port, () => {
  console.log(`Server started at port ${port}!`);
});
