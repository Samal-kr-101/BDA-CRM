import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();


// CREATE LEAD
router.post("/", async (req, res) => {
  try {

    const lead = new Lead(req.body);

    await lead.save();

    res.status(201).json(lead);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// GET ALL LEADS
router.get("/", async (req, res) => {
  try {

    const leads = await Lead.find();

    res.status(200).json(leads);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// UPDATE LEAD
router.put("/:id", async (req, res) => {
  try {

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedLead);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// DELETE LEAD
router.delete("/:id", async (req, res) => {
  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

export default router;