import { setupWorker } from "msw/browser";
import { threadHandlers } from "./handlers/threadHandlers";
import { userHandlers } from "./handlers/userHandlers";

export const worker = setupWorker(...threadHandlers, ...userHandlers);
