const Users = require("../models/UserModel.js");

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

router.get('/userhome', (req, res) => {
    const userEmail = req.session.user.email; 
    res.render('userhome', { username: userEmail });
});