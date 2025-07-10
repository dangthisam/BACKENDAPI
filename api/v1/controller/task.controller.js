const Task=require("../model/task.model")


const index=async (req,res)=>{
    const find={
        deleted:false
    }
    console.log(req.query)

   if(req.query.status){
    find.status=req.query.status
   }

   const sort={}
   if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey]=req.query.sortValue
   }

    const   data = await Task.find(find).sort(
        sort
    )
     
        res.json(data)
    
}


const detail=async (req,res)=>{
    const id=req.params.id
const   data = await Task.find({
        _id:id,
        deleted:false
    }).select("title")


    res.json(data)
}

module.exports={
    index,
    detail
}