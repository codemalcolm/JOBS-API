const express = require("express");
const StatusCodes = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Credentials missing!");
  }

  const user = await User.create({ ...req.body });
  
  // getting token from an instance method
  const token = user.createJWT();
  
  res.status(StatusCodes.CREATED).json({ user: {name : user.name}, token });
};

const login = async (req, res) => {
  res.send("LOGIN");
};

module.exports = { login, register };
