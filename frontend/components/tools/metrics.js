import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });
export default async function handler(req, res) {
  res.setHeader("Content-Type", register.contentType);
  const metrics = await register.metrix();
  res.status(200).send(metrics);
}
