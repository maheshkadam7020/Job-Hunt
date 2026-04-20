import { job } from "../model/job.model.js";

export const postjob = async (req, resp) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      position,
      jobtype,
      company,
    } = req.body;

    const userid = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !position ||
      !jobtype ||
      !company ||
      !experience
    ) {
      return resp.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const Job = await job.create({
      title,
      description,
      requirements,
      salary,
      location,
      experience,
      position,
      jobtype,
      company,
      created_by: userid,
    });

    return resp.status(201).json({
      message: "New Job created successfully",
      success: true,
      Job,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getalljobs = async (req, resp) => {
  try {
    const keyword = req.query.keyword?.trim();

    let query = {};

    if (keyword && keyword !== "") {
      query = {
        $or: [
          {
            title: { $regex: keyword, $options: "i" },
          },
          {
            description: { $regex: keyword, $options: "i" },
          },
        ],
      };
    }

   

    const Job = await job
      .find(query)
      .populate({
        path: "company",
      })
      .sort({
        createdAt: -1,
      });

    return resp.status(200).json({
      Job,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return resp.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const getjobbyid=async (req,resp)=>
{
    try {
        const id =req.params.id;

    const Job =await job.findById(id).populate([{path:"applications"},{path:"company"}]);

    if(!Job)
        {
            return resp.status(404).json({
                message:'No Jobs available',
                success:false
            })
        }

        return resp.status(200).json({
            Job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }

}

export const getadminjobs=async (req,resp)=>
{
    try {
        const id =req.id;

        const Job=await job.find({created_by:id}).populate({
            path:"company"
        });

        if(!Job)
        {
            return resp.status(404).json({
                message:'No Jobs available',
                success:false
            })
        }

        return resp.status(200).json({
            Job,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}