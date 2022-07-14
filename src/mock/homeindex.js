let Mock= require("mockjs")
let dayjs = require("dayjs")

//aa 拦截
let arr= [{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
    }, {
    date: '2016-05-04',
    name: '张小虎',
    address: '上海市普陀区金沙江路 1517 弄'
    }, {
    date: '2016-05-01',
    name: '李小虎',
    address: '上海市普陀区金沙江路 1519 弄'
    }, {
    date: '2016-05-03',
    name: '赵小虎',
    address: '上海市普陀区金沙江路 1516 弄'
}]
// Mock.mock("/api/aa","get",(options)=>{
//     console.log(options) //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
//正则
// Mock.mock(/\/api\/aa/,"get",(options)=>{
//     console.log(options) //{url:"/api/aa",type:"get",body:null}
//     return arr
// })
Mock.mock("/api/all","get",(options)=>{
    console.log(10,options) //{url:"/api/aa",type:"post",body:null}
    return {
        status:200,
        message:"success",
        tabledata:arr
    }
})
//增加数据
Mock.mock("/api/add","post",(options)=>{
    console.log(10,options) //{url:"/api/aa",type:"post",body:null}
    let body=JSON.parse(options.body)
    body.date= dayjs(new Date(body.date)).format("YYYY-MM-DD")
    // let {date,name,address}=body
    arr.push(body)
    return {
        status:200,
        message:"success",
        tabledata:arr
    }
})
// "/api/delete?index=0"
Mock.mock(/\/api\/delete\?index=\d/,"delete",(options)=>{
    console.log(10,options) //{url:"/api/aa",type:"post",body:null}
    let url= options.url
    let index = url.split("=")[1]
    let newarr = arr.splice(index,1)
    return {
        status:200,
        message:"删除成功",
        data:arr
    }
})
Mock.mock("/api/update","put",(options)=>{
    console.log(60,options) //{url:"/api/aa",type:"post",body:null}
    let body=JSON.parse(options.body)
    let {date,name,address,index} =body
    arr[index].date=date
    arr[index].name=name
    arr[index].address=address
    console.log(body)
    return {
        status:200,
        message:"success",
        data:arr
    }
})