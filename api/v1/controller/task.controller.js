const Task=require("../model/task.model")


const index=async (req,res)=>{
    const   data = await Task.find({
            deleted:false
        })
    
        console.log(data)
        res.json(data)
    
    
}


const detail=async (req,res)=>{
    const id=req.params.id
const   data = await Task.find({
        _id:id,
        deleted:false
    })


    res.json(data)


}

module.exports={
    index,
    detail
}