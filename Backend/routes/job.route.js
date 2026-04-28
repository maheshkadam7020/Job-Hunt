import express from 'express';
import isAuthicated from '../midleware/isAuthicated.js';
import { deleteJob, getadminjobs, getalljobs, getjobbyid, postjob } from '../controller/job.controller.js';

const router=express.Router();


router.route('/admin/postjob').post(isAuthicated,postjob);
router.route('/jobs/get').get(getalljobs);
router.route('/admin/job').get(isAuthicated,getadminjobs);
router.route('/getjob/:id').get(getjobbyid);
router.route('/job/delete/:id').delete(isAuthicated,deleteJob);

export default router;