const Task=require("../model/task.model")

const helpPagination=require("../../v1/helper/pagination")
const searchKeyword=require("../../v1/helper/search")
const index=async (req,res)=>{
    const find={
        deleted:false
    }


   if(req.query.status){
    find.status=req.query.status
   }
  //start sort
   const sort={}
   if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey]=req.query.sortValue
   }
//end sort

//start pagination

     const countTasks = await Task.countDocuments(find);
    let objectPagination = helpPagination(
      {
        currentPage:1,
        limitPage:2
      },
      req.query,
      countTasks
    )


//end pagination

//start search
const objectSearch =searchKeyword(req.query);
if(objectSearch.regex){
      find.title=objectSearch.regex;
}

//end search


       const data = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitPage)
    .skip(objectPagination.skip);
     
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

const changeStatus=async (req,res)=>{

   try {
     const id=req.params.id
    
  await Task.updateOne({
    _id:id
  },{
    status:req.body.status
  })
    res.json({
        message:"success",
        status:200,
    
    })
    
   } catch (error) {
    res.json({
        message:error.message,
        status:400
    })
   }
}

const changeMutilStatus=async (req,res)=>{

    const {ids, key, value}=req.body

    console.log(ids)
    console.log(key)
    console.log(value)
    try {
        if(ids && key && value){
            await Task.updateMany(
                {
                    _id:{
                        $in:ids
                    }
                },
                {
                    [key]:value
                })
            }

            res.json({
                message:"success",
                status:200
            })
        
    } catch (error) {
        res.json({
            message:error.message,
            status:400
        })
        
    }


}

module.exports={
    index,
    detail,
    changeStatus, 
    changeMutilStatus
}