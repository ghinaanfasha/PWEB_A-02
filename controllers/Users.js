const Users = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

const Register = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) {
        return res.status(400).json({msg: "Password dan Confirm Password Tidak cocok"});
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register Berhasil"});
    } catch(error) {
        console.log(error);
    }
}

const Login = async(req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            }
        });
        if(!user) {
            return res.status(404).json({msg : "Email Tidak Ditemukan"}) 
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) {
            return res.status(400).json({msg:"Password Salah"});
        }
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
    

        //simpan refreshtoken ke database
        await Users.update({refresh_token: refreshToken}, {
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly : true,
            maxAgw: 24 * 60 * 60 * 1000 //expired dalam 1 hari
        });

        res.json({accessToken});
    } catch (error) {
        res.status(500).json({ msg:error.message});
    }
}

const Logout = async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            return res.sendStatus(204);
        }
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) 
            return res.sendStatus(204);
        const userId = user[0].id;
        await Users.update({refreshToken: null},{
            where: {
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}

module.exports = {
    getUsers, Login
}