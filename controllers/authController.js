const User = require('../models/User');
class Authcontroller{
   static async register(req,res){
    try {
        const {username, password} = req.body;
        const user= new User({username,password});
        await user.save();

        const token = user.generateAuthToken()
        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
   }

   static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findByCredentials(username, password);
      
      const token = user.generateAuthToken();
      res.json({ token });  
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

}

module.exports = Authcontroller;
