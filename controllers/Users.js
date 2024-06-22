const Users = require("../models/user.js");
const Admin = require("../models/admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const DataPendaftarModel = require("../models/pendaftar.js");


const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id_user", "first_name", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

// const listOfUsers = async () => {
//   try {
//     const users = await DataPendaftarModel.findAll({
//       attributes: ["id", "nama", "nim", "alasan_bergabung", "cv", "surat_komitmen"],
//     });
//     return users;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error; // Rethrow the error to be handled by the route handler
//   }
// };

const Register = async (req, res) => {
  const {
    first_name,
    email,
    password,
    confPassword
  } = req.body;
  if (password !== confPassword) {
    return res
      .status(400)
      .json({
        msg: "Password dan Confirm Password Tidak cocok"
      });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      first_name: first_name,
      email: email,
      password: hashPassword,
    });
    res.json({
      msg: "Register Berhasil"
    });
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    const admin = await Admin.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user && !admin) {
      return res.status(404).json({
        msg: "Email Tidak Ditemukan"
      });
    }

    if (user) {
      console.log('User found:', user);

      const match = await bcrypt.compare(req.body.password, user.password);
      console.log('User password match:', match);

      if (!match) {
        return res.status(400).json({
          msg: "Password Salah"
        });
      }
      const userId = user.id_user;
      const role = "user";
      const name = user.first_name;
      const email = user.email;
      const accessToken = jwt.sign({
          userId,
          name,
          email,
          role
        },
        process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "20s"
        }
      );
      const refreshToken = jwt.sign({
          userId,
          name,
          email,
          role
        },
        process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "1d"
        }
      );

      await Users.update({
        refresh_token: refreshToken
      }, {
        where: {
          id_user: userId
        }
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // expired dalam 1 hari
      });

      return res.status(200).json({
        role: "user",
        accessToken: accessToken
      });
    }

    if (admin) {
      console.log('Admin found:', admin);

      const match = await bcrypt.compare(req.body.password, admin.password);
      console.log('Admin password match:', match);

      if (!match) {
        return res.status(400).json({
          msg: "Password Salah"
        });
      }
      const userId = admin.id_labor;
      const name = admin.nama_labor;
      const role = "admin";
      const email = admin.email;
      const accessToken = jwt.sign({
          userId,
          name,
          email,
          role
        },
        process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "20s"
        }
      );
      const refreshToken = jwt.sign({
          userId,
          name,
          email,
          role
        },
        process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "1d"
        }
      );

      await Admin.update({
        refresh_token: refreshToken
      }, {
        where: {
          id_labor: userId
        }
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // expired dalam 1 hari
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // expired dalam 1 hari
      });

      return res.status(200).json({
        role: "admin",
        accessToken: accessToken
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.message
    });
  }
};

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id_user;
  await Users.update({
    refresh_token: null
  }, {
    where: {
      id_user: userId,
    },
  });
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

module.exports = {
  getUsers,
  Login,
  // listOfUsers,
  Logout,
};