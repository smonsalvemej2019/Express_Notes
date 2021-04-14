const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


//lets create a route for our api
//the goal of this route is to send the members as json so templates can display it

//returning all members
router.get('/',(req,res)=> res.json(members))//we call this from postman
//the '/' is going to be equivalent to 'api/members/' because we are defining the route within the index file 

//returning a single member
router.get('/:id', (req,res)=>{//we can pass parameters to our string

    //first we check if the id exist using some
    const found = members.some(member => member.id === parseInt(req.params.id));//the some function is standard js

    if(found){
    //we are going to use the filter method
    //we parse the .param.id because is is pass as a string
    res.json(members.filter(member=>member.id === parseInt(req.params.id)));//the filter function is standard js
    }else{
        res.status(400).json({msg: `No member with id#:${req.params.id} exist`});
    }
})

//Lets use posts requests
//create member
router.post('/', (req, res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name||!newMember.email){
        res.status(400).json({msg:'Please include the email and name'});
    }

    members.push(newMember);
    //res.json(members);
    res.redirect('/');
})

//put request
router.put('/:id', (req,res)=>{//we can pass parameters to our string

    //first we check if the id exist using some
    const found = members.some(member => member.id === parseInt(req.params.id));//the some function is standard js

    if(found){
    //we are going to use the filter method
    const updMember = req.body;
    console.log(updMember);
    members.forEach((member) => {
        console.log(req.params.id);
        if(member.id === parseInt(req.params.id)){
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email;
            
            res.json({msg: 'Member Updated', member});
        }
    });
    }else{
        res.status(400).json({msg: `No member with id#:${req.params.id} exist`});
    }
})

//delete members
router.delete('/:id', (req,res)=>{//we can pass parameters to our string

    //first we check if the id exist using some
    const found = members.some(member => member.id === parseInt(req.params.id));//the some function is standard js

    if(found){
    //we are going to use the filter method
    //we parse the .param.id because is is pass as a string
    res.json({msg : 'member deleted', members: members.filter(member=>member.id !== parseInt(req.params.id))});//the filter function is standard js
    }else{
        res.status(400).json({msg: `No member with id#:${req.params.id} exist`});
    }
})
module.exports = router;
