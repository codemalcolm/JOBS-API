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

  const salt = await bcrypt.genSalt(10);
  // hashing password
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name: name, email: email, password: hashedPassword };

  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ msg: "ok", user });
};

const login = async (req, res) => {
  res.send("LOGIN");
};

module.exports = { login, register };
