


const objectPagination = (objectPagination , query , countRecords )=>{
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
       }
       objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitPage;

       
            const totalPage = (countRecords/objectPagination.limitPage);
            objectPagination.totalPage=Math.ceil(totalPage);
            return objectPagination;

}

module.exports =objectPagination;