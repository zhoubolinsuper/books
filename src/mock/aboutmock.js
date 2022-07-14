let Mock= require("mockjs")
//aa 拦截
let arr=["1","2","3","4"]
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options) //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
//正则
Mock.mock(/\/api\/asd/,"get",(options)=>{
    console.log(options) //{url:"/api/aa",type:"get",body:null}
    return arr
})
Mock.mock("/api/acd","post",(options)=>{
    console.log(10,options) //{url:"/api/aa",type:"post",body:null}
    return {
        status:200,
        message:"success",
        data:arr
    }
})