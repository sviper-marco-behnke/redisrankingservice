const express = require("express");
const router = express.Router();
const { createClient } = require("redis");

router.get("/list/:experience/:from/:to", async function(req, res, next) {
  const result = await getRanking(req.params.experience, req.params.from, req.params.to);
  res.json(result);
});

router.get("/user/:experience/:user", async function(req, res, next) {
  const result = await getPosition(req.params.experience, req.params.user);
  res.json(result); // zero index based
});

router.post("/score/:experience/:user/:score", async function(req, res, next) {
  const result = await postScore(req.params.experience, req.params.user, req.params.score);
  const from = Math.max(result - 1, 0);
  const to = from <= 0 ? 2 : result +1;

  res.json({
    position: result + 1, // zero index based
    list: await getRanking(from, to) // add surrounding players
  });
});

async function getRanking(experience, from, to) {
  const client = await createRedisClient();
  const result = await client.zRangeWithScores(experience, from, to);

  let position = from;
  return result.map(item => {
    item.position = ++position; // zero index based
    return item;
  });
}

async function getPosition(experience, user) {
  const client = await createRedisClient();
  const result = await client.zRank(experience, user);
  return result + 1; // zero index based
}

async function postScore(experience, user, score) {
  const client = await createRedisClient();

  await client.zAdd(experience, [{ score: score, value: user }]);
  return await client.zRank("ranking_01", user);
}

async function createRedisClient() {
  const client = createClient({
    url: "redis://redis:6379"
  });

  client.on("error", err => console.log("Redis Client Error", err));
  await client.connect();

  return client;
}

module.exports = router;
