import { randomUUID } from "crypto";

export function requestId (req: any, _: any, next: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  req.id = randomUUID();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  next();
}