import { company } from "../model/company.model.js";
import cloudinary from "../utils/Cloudinary.js";
import getDataUri from "../utils/datauri.js";
export const registerCompany = async (req, resp) => {
  try {
    const { name, description, website, location } = req.body;
     const file = req.file;
    let logoUrl = "";
    if (file) {
      const fileuri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(
        fileuri.content
      );

      logoUrl = cloudResponse.secure_url;
    }
    if (!name) {
      return resp.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let Company = await company.findOne({ name });

    if (Company) {
      return resp.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    Company = await company.create({
      name,
      description,
      website,
      location,
      logo: logoUrl || "",
      userid: req.id,
    });

    return resp.status(201).json({
      message: "Company created successfully",
      Company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getcompany = async (req, resp) => {
  try {
    const userid = req.id;

    const Companies = await company.find({ userid });

    if (Companies.length === 0) {
      return resp.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return resp.status(200).json({
      Companies,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return resp.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getcompanybyid= async(req,resp)=>
{
    try {
        const id =req.params.id;

        const Company = await company.findById(id)

        if(!company)
        {
            return resp.status(404).json({
                message:'Conpany not found',
                success:false
            })
        }
        return resp.status(200).json({
               Company,
                success:true
            })
    } catch (error) {
       console.log(error);
        
    }
}

export const updatecompany=async (req,resp)=>
{
    const {name,description,location,website}=req.body;
    const updatedata={name,description,location,website};


    const Company=await company.findByIdAndUpdate(req.params.id,updatedata,{ returnDocument: "after" })

    if(!Company){
        return resp.status(404).json({
            message:'Company not found',
            success:false
        })
    }

     return resp.status(200).json({
            message:'Company data Updated',
            success:true
        })
}