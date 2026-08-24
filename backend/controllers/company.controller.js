import { Company } from "../models/company.model.js";

import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerComapny = async (req, res) => {
  try {
    const { companyName } = req.body;
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
    return res.status(500).json({ message: "Unable to create company", success: false });
  }
};
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //logged in user id ki company
    const companies = await Company.find({ userId });
    if (companies.length === 0) {
      return res
        .status(404)
        .json({ message: "No company found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Company found", success: true, companies: companies });
  } catch (error) {
    return res.status(500).json({ message: "Unable to load companies", success: false });
  }
};
// get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findOne({ _id: companyId, userId: req.id });
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
    return res.status(500).json({ message: "Unable to load company", success: false });
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const company = await Company.findOne({ _id: req.params.id, userId: req.id });
    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }
    let logo = company.logo;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = {
      name,
      description,
      website,
      location,
      logo,
    };

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    return res.status(200).json({
      message: "company info updated",
      success: true,
      company: updatedCompany,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update company", success: false });
  }
};
