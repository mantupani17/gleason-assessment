const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String , required: true},
    customer: { type: String, required: true},
    username: { type: String, required: true},
    email : { type: String, required: true},
    roles : { type: String, required: true },
    is_trial_user: {type: Boolean},
    is_deleted: {type: Boolean, default: false},
})
 

const User = module.exports = mongoose.model('users', UserSchema);

User.saveUser = async function(user) {
    try {
        return await this.create(user);
    } catch (error) {
        console.log(error)
        return false
    }
}

User.getUserDetails = async function(query, select, limit, skip, sort) {
    try {
        query = query || {};
        select = select || ['food_name'];
        limit = limit || 10;
        skip = skip || 0;
        sort = sort || {_id:1};
        let results = await this.find(query)
            .select(select)
            .limit(limit)
            .skip(skip)
            .sort(sort); 
        return results
    } catch (error) {
        console.log(error)
        return [];
    }
}

User.updateUserDetails = async function(query, updateData) {
    try {
        return await this.findOneAndUpdate(query, updateData)
    } catch (error) {
        console.log(error)
        return false
    }
}

User.userCount = async function(query) {
    try {
        return await this.count(query);
    } catch (error) {
        return 0;
    }
}






