const router = require('express').Router();
const jwt = require("jsonwebtoken")
const todoItemsModel = require('../models/todoModels');
const User = require('../models/userModel');


function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Acesso negado!" });

    try {
      const secret = process.env.SECRET;
  
      jwt.verify(token, secret);
  
      next();
    } catch (err) {
      res.status(400).json({ msg: "O Token é inválido!" });
    }
  }

router.post('/todo', checkToken, async (req, res)=>{
    try{
        const newItem = new todoItemsModel({
        text: req.body.text,
        check: req.body.check
    })
        const saveItem = await newItem.save()
        res.status(200).json(saveItem);
    }catch(err){
        res.json(err);
    }
})

router.get('/todos', checkToken, async (req, res)=>{
    try{
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    }catch(err){
        res.json(err);
    }
})

router.patch('/todo/:id', checkToken, async (req, res)=>{
    try{
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(updateItem);
    }catch(err){
        res.json(err);
    }
})

router.delete('/todo/:id', checkToken, async (req, res)=>{
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(204).json('Item Deleted');
    }catch(err){
        res.json(err);
    }
})

router.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id;
  
    const user = await User.findById(id, "-password");
  
    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
  
    res.status(200).json({ user });
  });
  

module.exports = router;