const jwt = require("jsonwebtoken");
const Users = require("../models/user"); // Pastikan Anda mengimpor model yang benar
const Admin = require("../models/admin"); // Pastikan Anda mengimpor model yang benar
require('dotenv').config();

function verifyUser(role) {
  return async function (req, res, next) {
    let token = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!token) {
        console.log("ada masalah");
      return res.redirect("/login");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError" && refreshToken) {
          try {
            const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            console.log("ini id",refreshDecoded.userId );
            let user = await Users.findOne({
              where: { id_user: refreshDecoded.userId, refresh_token: refreshToken },
            });

            if (!user) {
              user = await Admin.findOne({
                where: { id_labor: refreshDecoded.userId, refresh_token: refreshToken },
              });
              if (!user) {
                return res.redirect("/auth/login");
              }
            }

            const newToken = jwt.sign(
              { userId: user.id_user || user.id_labor, email: user.email, role: user.role },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "20s" }
            );

            res.cookie("token", newToken, { httpOnly: true });
            req.userId = user.id_user || user.id_labor;
            req.userRole = user.role;
            req.userEmail = user.email;
            return next();
          } catch (refreshErr) {
            res.clearCookie('token');
            res.clearCookie('refreshToken');
            return res.redirect("/login");
          }
        } else {
          res.clearCookie('token');
          res.clearCookie('refreshToken');
          return res.redirect("/login");
        }
      } else {
          req.userId = decoded.userId;
          req.userRole = decoded.role;
          req.userEmail = decoded.email;
          console.log("role", req.userRole);

        if (role && req.userRole !== role) {
          // Redirect based on role
          if (req.userRole === "user") {
            return res.redirect("/userhome");
          } else if (req.userRole === "admin") {
            return res.redirect("/adminprofile");
          }
          return res.render('notfound');
        }
        next();
      }
    });
  };
}

module.exports = verifyUser;
