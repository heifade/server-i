import { config } from "./server.config";
import fetch from "node-fetch";

export async function fetchHelper(url: string, data: any) {
  return await fetch(`${config.url}/${url}`, {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data)
  });
}
