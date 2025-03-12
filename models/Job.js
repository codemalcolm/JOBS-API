const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide the company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide the company position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", // referencing the USer model
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

//checking user access to routes with /:jobId
JobSchema.methods.checkUserAccess = function(candidateUserId) {
  // candidateUserId is coming from req.user, this.createdBy is coming from the db
  const hasAccess = candidateUserId === this.createdBy
  return hasAccess
}

module.exports = mongoose.model("Job", JobSchema);
