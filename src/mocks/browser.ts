import { setupWorker } from "msw/browser";
import { threadHandlers } from "./handlers/threadHandlers";
import { userHandlers } from "./handlers/userHandlers";
import { koreanTestHandlers } from "./handlers/koreanTestHandlers";

export const worker = setupWorker(...threadHandlers, ...userHandlers, ...koreanTestHandlers);
