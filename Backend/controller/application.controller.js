import { application } from "../model/application.model.js";
import { job } from "../model/job.model.js";

export const applyjob = async (req, resp) => {
  try {
    const userid = req.id;
    const jobid = req.params.id;
      
      
    if (!jobid) {
      return resp.status(400).json({
        message: "Job id required",
        success: false,
      });
    }
    const existingapplication = await application.findOne({
      applicant: userid,
      job: jobid,
    });

    if (existingapplication) {
      return resp.status(400).json({
        message: "Already applied to job",
        success: false,
      });
    }
    const Job = await job.findById(jobid);

    if (!Job) {
      return resp.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    const newapplication = await application.create({
      job: jobid,
      applicant: userid,
    });

    Job.applications.push(newapplication._id);
    await Job.save();
    return resp.status(200).json({
      message: "Job apply successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    
  }
};
export const appliedjob = async (req, resp) => {
  try {
    const userid = req.id;
    const Application = await application
      .find({ applicant: userid })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return resp.status(400).json({
        message: "No applications",
        success: false,
      });
    }

    return resp.status(200).json({
      Application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    
  }
};

export const getapplicants=async(req,resp)=>
{
  try {
    const jobid=req.params.id;

    const Job=await job.findById(jobid).populate({
      path:'applications',
      options:{sort:{createdAt:-1}},
      populate:{
        path:'applicant'
      }
    })

    if (!Job) {
      return resp.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    return resp.status(200).json({
        Job,
        success: true,
      });
  } catch (error) {
    console.log(error);
    
  }
}

export const updatestatus=async (req,resp)=>
{
  try {
    const {status}=req.body;

    const applicantionid=req.params.id;

    if(!status)
    {
      return resp.status(400).json({
        message: "Status is required",
        success: false,
      });
    }

    const Application=await application.findOne({_id:applicantionid});

    if(!Application)
    {
      return resp.status(400).json({
        message: "Application not found",
        success: false,
      });
    }

    Application.status=status.toLowerCase();
    await Application.save();

    return resp.status(200).json({
        message: "Status updated Successfully",
        success: true,
      });
  } catch (error) {
     console.log(error);
  }
}
