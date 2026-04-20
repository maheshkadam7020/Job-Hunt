import express from 'express'
import { getcompany, getcompanybyid, registerCompany, updatecompany } from '../controller/company.controller.js';
import isAuthicated from '../midleware/isAuthicated.js';
import { upload } from '../midleware/multer.js';


const router=express.Router();


router.route('/company/registercompany').post(isAuthicated,upload,registerCompany);
router.route('/company/updatecompany/:id').put(isAuthicated,updatecompany);
router.route('/company/get').get(isAuthicated,getcompany);
router.route('/company/getcompany/:id').get(isAuthicated,getcompanybyid);

export default router;