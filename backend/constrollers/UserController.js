const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
class UserController {
    static async getUserDetails(req, res, next) {
        try {
            const query = req.query
            let fields = '';
            let sort = {_id: -1};
            if (query && query.fields) {
                fields = query.fields.split(',')
            }

            const users = await User.getUserDetails({
                is_deleted: false
            }, fields, 10, 0, sort);
            
            res.status(200).send({
                message: "",
                status: true,
                data: users
            })
        } catch (error) {
            res.status(500).send({
                message: "Internal Server Error",
                status: false
            })
        }
    }

    static async createUserDetails(req, res, next) {
        try {
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                return res.status(400).send({errors: errors.array()})
            }

            const user = {
                first_name: req.body.first_name,
                last_name : req.body.last_name,
                customer : req.body.customer,
                email : req.body.email,
                username: req.body.email,
                is_trial_user : req.body.is_trial_user,
                roles : req.body.roles
            }
            await User.saveUser(user);
            
            res.status(200).send({
                message: "User Added Successfuly...",
                status: true,
                data: []
            })
        } catch (error) {
            res.status(500).send({
                message: "Internal Server Error",
                status: false
            })
        }
    }

    static async updateUserDetails(req, res, next) {
        try {
            const updateData = {};
            const query = {};
            const body = req.body;
            
            if (req.method === 'DELETE') {
                if ( req && req.query && req.query._id ) {
                    query['_id'] = req.query._id
                    updateData['is_deleted'] = true;
                } 
            } else {
                if ( body && body._id ) {
                    query['_id'] = body._id
                } else {
                    return res.status(400).send({
                        message: "Required parameters missing",
                        status: true,
                        data: []
                    })
                }
                return res.status(400).send({
                    message: "Required parameters missing",
                    status: true,
                    data: []
                })
            }

            console.log(query)

            if ( body && body.first_name) {
                updateData['first_name'] = body.first_name;
            }

            if ( body && body.last_name) {
                updateData['last_name'] = body.last_name;
            }

            if ( body && body.is_deleted) {
                updateData['is_deleted'] = body.is_deleted;
            }

            if ( body && body.roles) {
                updateData['roles'] = body.roles;
            }

            if ( body && body.customer) {
                updateData['customer'] = body.customer;
            }

            if ( body && body.is_trial_user) {
                updateData['is_trial_user'] = body.is_trial_user;
            }

            const result = await User.updateUserDetails(query, {$set: updateData});

            if ( result ) {
                return res.status(200).send({
                    message: "Updated Successfully",
                    status: true,
                    data: []
                })
            }

            res.status(200).send({
                message: "Sorry unable to update the data.",
                status: true,
                data: []
            })

            
        } catch (error) {
            res.status(500).send({
                message: "Internal Server Error",
                status: false
            })
        }
    }

    // static async deleteUserDetails(req, res, next) {
    //     try {
    //         res.status(200).send({
    //             message: "",
    //             status: true,
    //             data: []
    //         })
    //     } catch (error) {
    //         res.status(500).send({
    //             message: "Internal Server Error",
    //             status: false
    //         })
    //     }
    // }

    static async getUserCount(req, res, next){
        try {
            res.status(200).send({
                message:"",
                status: true,
                count: await User.userCount({})
            })
        } catch (error) {
            res.status(500).send({
                message: "Internal Server Error",
                status: false
            })
        }
    }

    static async login(req, res, next) {
        try {
            let query = req.body;
            if (query && !query.email) {
                return res.status(400).send({
                    message: "Please enter username",
                    status: false,
                    token:""
                });
            }

            if (query && !query.password) {
                return res.status(400).send({
                    message: "Please enter password",
                    status: false,
                    token:""
                });
            }

            let userDetails = await User.getUserDetails({username:query.email}, ["first_name", "last_name", "customer", "roles", "username"]);

            if (userDetails && !userDetails.length) {
                return res.status(400).send({
                    message: "User not found",
                    status: false,
                    token:""
                });
            }

            userDetails = userDetails[0];
            let payload = {
                username: userDetails,
                name: userDetails.first_name + " " + userDetails.last_name,
                customer: userDetails.customer,
                role: userDetails.roles
            }

            const token = jwt.sign({ user: payload }, process.env.APP_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
            return res.json({ token: token, message: "Login successfully...", status:true });

        } catch (error) {
            console.log(error)
            res.status(500).send({
                message: 'Internal server error.',
                status: 'FAILED',
                token:""
            });
        }
    }
}

module.exports = UserController;