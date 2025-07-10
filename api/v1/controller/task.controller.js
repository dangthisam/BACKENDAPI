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
    }).select("title")


    res.json(data)
}

module.exports={
    index,
    detail
}