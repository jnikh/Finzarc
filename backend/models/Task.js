const mongoose = require('mongoose');
const taskShema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:
    {
      type:String,
      required:true
    },
    completed: {
        type: Boolean,
        default: false
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }

},{
    timestamps:true
})

const Task = mongoose.model('Task',taskShema)
module.exports = Task;