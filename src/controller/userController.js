import userServies from "../services/userServies";
//write api handle for frontend useing 
let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parament"
        })
    }
    let  userData = await userServies.handleUserLogin(email, password); 
    return res.status(200).json({
        errCode : userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    }
    ); 
}

let handleGetAllUsers = async(req, res) => {
    let id = req.query.id; //ALL , id user
    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing',
            users: []
        })
    }
    let users = await userServies.getAllUser(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async(req, res) => {
    let message = await userServies.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditUsers = async(req, res) => {
    let data = req.body;
    let message =  await userServies.updateUserData(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async(req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing require parameter"
        })
    }
    let message = await userServies.deleteUser(req.body.id);
    return res.status(200).json(message);

}

let getAllCode = async(req, res) => {
    try {
        let data = await userServies.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    }catch(e) {
        console.log('Get all code: ', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server' 
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUsers: handleEditUsers,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode
}