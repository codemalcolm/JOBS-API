const express = require('express');
const router = express.Router();

const {getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob} = require('../controllers/jobs')

router.route('/jobs').get(getAllJobs)
router.route('/jobs').get(getJob)
router.route('/jobs').post(createJob)
router.route('/jobs').put(updateJob)
router.route('/jobs').delete(deleteJob)

module.exports = router