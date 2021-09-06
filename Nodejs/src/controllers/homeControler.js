import db from '../models/index'
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        })
    } catch (error) {
        console.error(error)
    }

}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = CRUDService.createNewUser(req.body)
    console.log(message)
    // res.json(req.body)
    return res.send('post crud from server')
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log(data)

    res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    // console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // res.json(userData)
        // Check user data not found

        res.render('editCRUD', {
            user: userData,
        })
    } else {
        return res.send('User not found')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);

    return res.render('displayCRUD.ejs', {
        dataTable: allUsers,
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;

    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete the user success');
    } else {
        return res.send('User not found!')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}