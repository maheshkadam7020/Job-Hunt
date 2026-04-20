import express from 'express'
import { getprofile, login, logout, register, updateprofile } from '../controller/user.controller.js';
import isAuthicated from '../midleware/isAuthicated.js';
import { upload } from '../midleware/multer.js';


const router=express.Router();

router.route('/register').post(upload,register);
router.route('/login').post(login);
router.route('/logout').delete(logout);
router.route('/profile').get(isAuthicated,getprofile)
router.route('/update/profile').post(isAuthicated,upload,updateprofile)

export default router;