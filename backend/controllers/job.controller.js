import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "Something is missing ", success: false });
    }
    const ownsCompany = await Company.exists({ _id: companyId, userId });
    if (!ownsCompany) {
      return res.status(403).json({ message: "You do not own this company", success: false });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res
      .status(201)
      .json({ message: "Job posted successfully", job, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to post job", success: false });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keyword = String(req.query.keyword || "").trim().slice(0, 100);
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const query = {
      $or: [
        { title: { $regex: escapedKeyword, $options: "i" } },
        { description: { $regex: escapedKeyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load jobs", success: false });
  }
};

//student ke liye
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path:"applications",
        populate: { path: "applicant", select: "-password" }
      });
      
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load job", success: false });
  }
};
//admin kitne job post kiye hain
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path:'company',
      createdAt:-1
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load your jobs", success: false });
  }
};
