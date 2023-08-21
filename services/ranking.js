const { createClient } = require("redis");
const service = {};

service.getRanking = async function(experience, from, to) {
  const client = await createRedisClient();
  const result = await client.zRangeWithScores(experience, from, to);

  let position = from;
  return result.map(item => {
    item.position = ++position; // zero index based
    return item;
  });
};

service.getPosition = async function(experience, user) {
  const client = await createRedisClient();
  const result = await client.zRank(experience, user);
  return result + 1; // zero index based
};

service.postScore = async function(experience, user, score) {
  const client = await createRedisClient();

  await client.zAdd(experience, [{ score: score, value: user }]);
  return await client.zRank(experience, user);
};

async function createRedisClient() {
  const client = createClient({
    url: "redis://redis:6379"
  });

  client.on("error", err => console.log("Redis Client Error", err));
  await client.connect();

  return client;
}

module.exports = service;
