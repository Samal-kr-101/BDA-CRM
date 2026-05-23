import express from "express";

import FollowUp from "../models/FollowUp.js";

const router = express.Router();


// ADD FOLLOWUP
router.post("/", async (req, res) => {

  try {

    const followUp = new FollowUp(req.body);

    await followUp.save();

    res.status(201).json(followUp);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});


// GET FOLLOWUPS BY LEAD
router.get("/:leadId", async (req, res) => {

  try {

    const followUps = await FollowUp.find({
      leadId: req.params.leadId,
    });

    res.status(200).json(followUps);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;