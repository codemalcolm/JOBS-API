const express = require("express");
const StatusCodes = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Credentials missing!");
  }

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ msg: "ok", user });
};

const login = async (req, res) => {
  res.send("LOGIN");
};

module.exports = { login, register };
