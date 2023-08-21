const express = require("express");
const router = express.Router();
const service = require("../services/ranking");

router.get("/list/:experience/:from/:to", async function(req, res, next) {
  const result = await service.getRanking(req.params.experience, req.params.from, req.params.to);
  res.json(result);
});

router.get("/user/:experience/:user", async function(req, res, next) {
  const position = await service.getPosition(req.params.experience, req.params.user);
  const from = Math.max(position - 1, 0);
  const to = from <= 0 ? 2 : position + 1;
  res.json({
    position: position,
    list: await service.getRanking(req.params.experience, from, to) // add surrounding players,
  });
});

router.post("/score/:experience/:user/:score", async function(req, res, next) {
  const result = await service.postScore(req.params.experience, req.params.user, req.params.score);
  const from = Math.max(result - 1, 0);
  const to = from <= 0 ? 2 : result + 1;

  res.json({
    position: result + 1, // zero index based
    list: await service.getRanking(req.params.experience, from, to) // add surrounding players,
  });
});

module.exports = router;
