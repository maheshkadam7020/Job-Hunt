import express from 'express';
import isAuthicated from '../midleware/isAuthicated.js';
import { appliedjob, applyjob, getapplicants, updatestatus } from '../controller/application.controller.js';

const router=express.Router();


router.route('/applyjob/:id').get(isAuthicated,applyjob);
router.route('/appliedjob').get(isAuthicated,appliedjob);
router.route('/updatestatus/:id').post(isAuthicated,updatestatus);
router.route('/applicant/:id').get(isAuthicated,getapplicants);

export default router;