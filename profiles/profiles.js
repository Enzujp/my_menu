const User = require("../models/User");

const getOtherUsers = async (req, res) => {
    try {
        let user = await User.findOne({username: req.params.username})
        await user.save()
        if (!user) {
            res.status(404).json({
                message: "No users with this username was found"
            })
        }
    } catch (error) {
        res.status(500).json({
            Error : error
        })
    }
}


const updateProfile = async (req, res) => {
    try {
        const user = await User.findOne({username: req.username})
        const { name, username, email, favoriteRecipe } = req.body
        user.name = name
        user.username = username
        user.email = email
        user.favoriteRecipe = favoriteRecipe
        await user.save()
        res.status(200).json({
            message: "Userprofile successfully updated!"
        })

    } catch (error) {
        res.status(500).json({
            error: error,
            message: "Error encountered whilst trying to update."
        })
    }
}


// const contactRecipeOwner = async(req, res) => {
//     try {
//         let { name, email, message, authorMail, authorTitle } =  req.body
//         message = `Hello `
//     } catch (error) {
//         res.status(500).json({
//             message: "Couldn't process this request at this moment, please try again later"
//         })
//     }
// }