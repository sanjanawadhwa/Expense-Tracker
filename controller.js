const model = require('../models/model');

// post:http://localhost:8080/api/categories
async function create_Categories(req,res){
  const Create = new model.Categories({
    type:"Investment",
    color:'#FCBE44',//dark
  })

  await Create.save(function(err){
    if(!err)return res.json(Create);
    return res.status(400).json({message:'Error while creating categories ${err}'});
  });
}

// get:http://localhost:8080/api/categories
async function get_Categories(req,res){
  let data = await model.Categories.find({})

  // Code for getting only type and color as response on Postman
  let filter = await data.map(v => Object.assign({},{type:v.type,color:v.color}));
  return res.json(filter);
}

// post:http://localhost:8080/api/transaction
async function create_transaction(req,res){
  if(!req.body)return res.status(400).json("Post HTTP Data not Provided");
  let{name,type,amount} = req.body;

  const create = await new model.transaction(
    {
      name,
      type,
      amount,
      date: new Date()
    }
  );

  create.save(function(err){
    if(!err)return res.json(create);
    return res.status(400).json({message: 'Error while creating transaction ${err}'});
  });
}

// get:http://localhost:8080/api/transaction
async function get_transaction(req,res){
  let data = await model.transaction.find({});
  return res.json(data);
}
// delete:http://localhost:8080/api/transaction
async function delete_transaction(req,res){
  if(!req.body)res.status(400).json({message:"Request body not Found"});
  await model.transaction.deleteOne(req.body,function(err){
    if(!err)res.json("Record Deleted...!");
  }).clone().catch(function(err){res.json("Error While Deleting Transaction Record")});
}
// get:http://localhost:8080/api/labels
async function get_Labels(req,res){
  model.transaction.aggregate([
    {
      $lookup : {
        from:"categories",
        localField:'type',
        foreignField:"type",
        as:"categories_info"
      }
    },
    {
      $unwind:"$categories_info"
    }
  ]).then(result=> {
    let data=result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}));
    res.json(data);
  }).catch(error=>{
    res.status(400).json("Lookup Collection Error");
  })
}


module.exports = {
    create_Categories,
    get_Categories,
    create_transaction,
    get_transaction ,
    delete_transaction,
    get_Labels

}