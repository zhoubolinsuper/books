<template>
    <div>
        <h3>数据的增删改查</h3>
        <el-table 
        :data="tableData" 
        style="width: 100%">
            <el-table-column
            label="日期"
            prop="date"
            width="100px">
            </el-table-column>
            <el-table-column
            label="姓名"
            prop="name"
            width="100px">
            </el-table-column>
            <el-table-column
            label="地址"
            prop="address"
            width="400px">
            </el-table-column>
             <el-table-column
            align="right"
            width="400px">
            <template slot="header" slot-scope="scope">
                <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            </el-table-column>
            <el-table-column
            label="修改"
            width="400px"
            align="center">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope)">修改</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope)">删除</el-button>
            </template>
            </el-table-column>
            
        </el-table>
        <div>
            <el-button @click="addfn">添加用户</el-button>
        </div>
    <!-- 表单 -->
        <MyDialog 
        :form="form" 
        :dialogFormVisible="dialogFormVisible"
        :formLabelWidth="formLabelWidth"
        @confirmfn_my="confirmfn"
        @my_cancel="cancelfn"></MyDialog>
        <!-- <button @click="getkan"></button> -->
        <!-- 增加的业务 -->
        <AddDialog
        :addform="addform"
        :formLabelWidth="formLabelWidth"
        :incrementform="incrementform"
        @my_addconfirm="addconfirmfn"
        @my_addcancel="addcancelfn"></AddDialog>
    </div>
</template>

<script>
import MyDialog from "@/components/MyDialog.vue"
import dayjs from "dayjs"
import instance from "@/api/api.js"
import AddDialog from "@/components/AddDialog.vue"

export default {
    name:"index",
    data(){
        return {
            search:"",
            tableData: [],
            dialogFormVisible:false, //表单的显示隐藏
            form:{
                index:0,
                date:null,
                name:"",
                address:""
            },//表单的内容
            formLabelWidth:"120px",
            incrementform:false, //
            addform:{ //增加表单绑定的数据
                date:null,
                name:"",
                address:"",

            }
        }
    },
    components:{
        MyDialog,
        AddDialog
    },
    created(){
        this.getAll()
    },
    methods:{
        addfn(){
            this.incrementform=true
        },
        addconfirmfn(){
            this.incrementfn()
        .then(()=>{
            this.$message({
                type:"success",
                message:"添加成功",
                duration:3000,
                onClose:()=>{
                    this.incrementform=false
                    this.getAll()
                }
            })
        }).catch(()=>{

        })
        },
        addcancelfn(){

        },
        
        handleEdit(scope){
            this.form = scope.row
            this.form.index = scope.$index
            this.dialogFormVisible = true  
            console.log("111111",scope)
        },
        handleDelete(scope){
            console.log(scope)
            this.$confirm("确定删除吗","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.deletefn(scope.$index) //异步
                .then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
            
        },
        
        confirmfn(){
            this.dialogFormVisible=false
            this.form.date = dayjs(new Date(this.form.date)).format("YYYY-MM-DD")
            this.updatefn()
        },
        cancelfn(){
            this.dialogFormVisible = false
        },
        //增加业务
        async incrementfn(){
            let {date,name,address}=this.addform
            let {data}=await instance.post("/add",{date,name,address})
            console.log(data)
        },

        // 修改业务
        async updatefn(){
            let {date,name,address,index} = this.form
            let {data} =await instance.put("/update",{date,name,address,index})
        },
        //删除业务
        async deletefn(index){
            let {data} = instance.delete("/delete",{params:{index}})
            this.getAll()
        },
        //请求数据业务
        async getAll(){
            let {data}=await instance.get("/all")
            console.log(data)
            this.tableData = data.tabledata
        }
    }
}
</script>
