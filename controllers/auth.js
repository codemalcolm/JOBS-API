const express = require("express");

const register = (req, res) => {
  res.send("REGISTER");
};

const login = (req, res) => {
  res.send("LOGIN");
};

module.exports = { login, register };
