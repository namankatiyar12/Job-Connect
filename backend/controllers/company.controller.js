import { Company } from "../models/company.model.js";

import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerComapny = async (req, res) => {
  try {
    const { companyName } = req.body;
    console.log(companyName);

    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    let company = await Company.findOne({
      name: companyName,
    });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company name already exists", success: false });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company: company,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id ki company
    const companies = await Company.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "No company found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Company found", success: true, companies: companies });
  } catch (error) {
    console.log(error);
  }
};
// get company by id
export const getCompanyById = async (req, res) => {
  try {
    
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    console.log("Received ID:", req.params.id);

    // const company = await Company.findById(req.params.id);

    console.log("Found company:", company);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateCompany = async (req, res) => {
  try {
     console.log("Update ID:", req.params.id);
     const existingCompany = await Company.findById(req.params.id);
console.log("Existing Company:", existingCompany);



    const { name, description, website, location } = req.body;

    let updateData = {
      name,
      description,
      website,
      location,
    };

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company info updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};