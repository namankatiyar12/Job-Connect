import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";


export const applyJob=async (req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({message:"Job id is required",
                success:false
            });
        }
        //check if the user has applied for the job before
        const existingApplication=await Application.findOne({job:jobId,applicant:userId});
        if(existingApplication){
            return res.status(400).json({message:"You have already applied for this job",
                success:false
                });
        }
        //check if the job exist
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message:"Job not found",
                success:false
                });
        }
        //create a new application
        const newApplication=await Application.create({
            job:jobId,
            applicant:userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        });

    }catch(error){
        return res.status(500).json({message:"Unable to apply for this job", success:false});
    }
}
export const getAppliedJobs=async(req,res)=>{
    try {
        const userId=req.id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application.length){
            return res.status(404).json({message:"No jobs applied",
                success:false
                });
        }
        return res.status(200).json({
            success:true,
            application
            });
    } catch (error) {
        return res.status(500).json({message:"Unable to load applications", success:false});
    }
}
//admin dekhega kitne log us job pe apply kiye hai
export const getApplicants=async (req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findOne({ _id: jobId, created_by: req.id }).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
                select:'-password',
                options:{sort:{createdAt:-1}}
                }
        });
        if(!job){
            return res.status(404).json({message:"Job not found",
                success:false
                });
        }
        return res.status(200).json({
            success:true,
            job
            });
    } catch (error) {
        return res.status(500).json({message:"Unable to load applicants", success:false});
    }
}
export const updateStatus=async (req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(400).json({message:"Status is required",
                success:false
                });
        }
        const application=await Application.findById(applicationId).populate('job');
        if(!application){
            return res.status(404).json({message:"Application not found",
                success:false
                });
        }
        const allowedStatuses = ['pending', 'accepted', 'rejected'];
        const normalizedStatus = String(status).toLowerCase();
        if (!allowedStatuses.includes(normalizedStatus)) {
            return res.status(400).json({message:"Invalid application status", success:false});
        }
        if (String(application.job.created_by) !== String(req.id)) {
            return res.status(403).json({message:"You do not own this job", success:false});
        }
        application.status=normalizedStatus;
        await application.save();
        return res.status(200).json({
            success:true,
            message:"Status updated successfully",
            application
            });
    } catch (error) {
        return res.status(500).json({message:"Unable to update application status", success:false});
    }
};