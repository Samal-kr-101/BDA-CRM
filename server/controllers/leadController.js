import Lead from "../models/Lead.js";


// CREATE LEAD
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);

  } catch (error) {
    res.status(500).json(error);
  }
};


// GET ALL LEADS
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();

    res.status(200).json(leads);

  } catch (error) {
    res.status(500).json(error);
  }
};


// DELETE LEAD
export const deleteLead = async (req, res) => {
  try {

    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead Deleted",
    });

  } catch (error) {
    res.status(500).json(error);
  }
};