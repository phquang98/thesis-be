import { uAccRepo } from "~/resources/UserAccount/UserAccount.repository";
import { TUAccController } from "~/types/business";
import { BaseError } from "~/utils";

// redundant, as irl this don't make sense, client must know account_name if already know user_id
// export const readUserAccCtr: TUAccController = async (req, res, _next) => {};
