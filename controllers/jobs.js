const StatusCodes = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");
const ForbiddenError = require("../errors/forbidden");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) {
    throw new NotFoundError(`Job with id: ${jobId} not found`);
  }

  // user check
  if(req.user.userId !== job.createdBy){
    throw new ForbiddenError("You are not allowed to view this document")
  }

  res.status(StatusCodes.OK).json({ job });
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

  req.body.createdBy = req.user.userId;

  const job = await Job.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  res.send("deleteJob");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
