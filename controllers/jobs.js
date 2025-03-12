const StatusCodes = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");
const ForbiddenError = require("../errors/forbidden");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.userId;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`Job with id: ${jobId} not found`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.userId;

  const { company, position, state } = req.body;

  if (!company && !position && !state) {
    throw new BadRequestError("No changes made");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    { ...req.body },
    { runValidators: true, new: true }
  );

  if (!job) {
    throw new NotFoundError(`Job with id: ${jobId} not found`);
  }

  res.status(StatusCodes.OK).json({ job });
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
  const userId = req.user.userId;
  const { jobId } = req.params;

  const deletedJob = await Job.findByIdAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if(!deletedJob){
    throw new NotFoundError(`Job with id: ${jobId} not found`);
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Successfully deleted document", deletedJob });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
