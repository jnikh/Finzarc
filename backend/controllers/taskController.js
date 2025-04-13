const Task =require('../models/Task')

class TaskController{
  static async getAllTask(req,resp){
    const task = await Task.find({owner: req.userId})
    resp.status(200).json(task)
  }
  catch (error){
    console.log('error',error.message)
  }

  static async createTask (req,resp){
 try {
    const task = new Task({
        ...req.body,
        owner:req.userId
    });
    await task.save();
    resp.status(200).json(task);
 } catch (error) {
    console.log('error',error.message)
    resp.status(400).json({message:error.message})
 }
  }

  static async updateTask(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' });
    }

    try {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.userId
      });

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      updates.forEach(update => task[update] = req.body[update]);
      await task.save();
      
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deletTask(req,resp){
    try {
        const task = await Task.findOneAndDelete({
          _id: req.params.id,
          owner: req.userId
        });
  
        if (!task) {
          return resp.status(404).json({ message: 'Task not found' });
        }
  
        resp.json({ message: 'Task deleted successfully' });
      } catch (error) {
        resp.status(500).json({ message: error.message });
      }
  }
}

module.exports = TaskController