<template>
    <div>
        <el-row :gutter="10">
            <el-col v-for="item in data" :key="item.name" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="label">{{item.type||'原创'}}</span>
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="note">
                        <span class="b_label">{{ item.label || "javascript" }}</span>
                        <span>{{ item.date || "2020-01-20" }}</span>
                    </div>
                    <div class="f_content">
                        {{ item.content }}
                    </div>
                    <div class="f_botton">
                        <a :href="item.link" target="_blank">
                        <el-button style="float: right; padding: 3px 0" type="text">阅读全文</el-button>
                        </a>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import Button from '../../../src/button'
import Product from "./product";
export default {
    data() {
        return { data: [] };
    },
    // props:['data'],
    components: {
        // 'g-button': Button
    },
    mounted() {
        // console.log(this.data,'data')
        this.data = Product;
        console.log(Product, "Product");
    }
};
</script>

<style >
.el-card__header {
    padding: 10px 15px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.label {
    /* content: "\539F\521B"; */
    background-color: rgba(242, 174, 67, 0.25);
    color: #f2ae43;
    margin-right: 5px;
    font-size: 13px;
    height: 22px;
    padding: 2px 8px;
    border-radius: 10px;
    font-weight: 400;
}

.clearfix {
    color: #444444;
    font-size: 18px;
    font-weight: 500;
    font-family: -webkit-pictograph;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}

.box-card {
    margin-bottom: 20px;
    /* width: 480px; */
    position: relative;
}

.note {
    font-size: 15px;
    display: flex;
    justify-content: space-between;
}

.b_label {
    display: inline-block;
    margin: 0 3px;
    padding: 0 6px;
    color: #017e66;
    background-color: rgba(1, 126, 102, 0.08);
}

.f_content {
    margin: 20px;
    font-size: 15px;
    color: #666666;
    height: 150px;
}

.f_botton {
    position: absolute;
    bottom: 10px;
    right: 20px;
}
</style>
