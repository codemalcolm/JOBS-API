const StatusCodes = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError } = require("../errors");

const getAllJobs = async (req, res) => {
  console.log(req.user);

  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  res.send("getJob");
};

const updateJob = async (req, res) => {
  res.send("updateJob");
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  // const createdBy = {res.user}
  if (!company || !position) {
    throw new BadRequestError("Please provide company and position");
  }

  req.body.createdBy = req.useruserId;

  const job = await Job.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  res.send("deleteJob");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
