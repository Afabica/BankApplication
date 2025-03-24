import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

export default function handler(req, res) {
  res.setHeader("Content-Type", register.contentType);
  res.send(register.metrics());
}
