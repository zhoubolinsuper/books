let Mock= require("mockjs")
//aa 拦截
let arr=["shangsan","lisi","wangwu"]
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options) //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
//正则
Mock.mock(/\/api\/aa/,"get",(options)=>{
    console.log(options) //{url:"/api/aa",type:"get",body:null}
    return arr
})
Mock.mock("/api/ab","post",(options)=>{
    console.log(10,options) //{url:"/api/aa",type:"post",body:null}
    return {
        status:200,
        message:"success",
        data:arr
    }
})