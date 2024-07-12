import { Router } from "express";

const router = Router();
export default router;

router.post("/login", (req, res) => {
  const body = { id: 1, mail: "test@mail.ru" };
  res.status(201);
  res.json(body);
});
