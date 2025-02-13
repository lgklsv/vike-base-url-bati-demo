import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { type Context, Hono } from "hono";
import { env } from "hono/adapter";
import { compress } from "hono/compress";
import app from "./hono-entry.js";
import { baseServer } from "./base";

const envs = env<{ NODE_ENV?: string; PORT?: string }>({ env: {} } as unknown as Context<{
  Bindings: { NODE_ENV?: string; PORT?: string };
}>);

const nodeApp = new Hono().basePath(baseServer);

nodeApp.use(compress());

nodeApp.use(
  "/*",
  serveStatic({
    root: `./dist/client/`,
  }),
);

nodeApp.route("/", app!);

const port = envs.PORT ? parseInt(envs.PORT, 10) : 3000;

console.log(`Server listening on http://localhost:${port}${baseServer}`);
serve({
  fetch: nodeApp.fetch,
  port: port,
});
