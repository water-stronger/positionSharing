<template>
    <div class="position">
      <!--<div class="back" @click="back"><-</div>-->
      <div class="show">
        <div class="sz_layout">
          <!-- 头部 -->
          <div class="sz_header">
            <div class="sz_header_box">
              <div class="city">
                <a href="javascript:;"><span>选择地点</span></a>
              </div>
              <div class="person">
                <span @click="back"></span>
              </div>
            </div>
          </div>
          <!--盒子占位置 -->
          <div class="h50"></div>
          <!--当前城市-->
          <div class="sz_current_city clearfix">
            <p>定位</p>
            <span>选择地点</span>
          </div>

          <!--热门城市-->
          <div class="sz_hot_city clearfix">
            <p>热门城市</p>
            <ul v-for="(area, index) in this.hotCity" :key="index" @click="getCity(area)">
              <li>{{area}}</li>
            </ul>
            <!--<ul>-->
              <!--&lt;!&ndash;<li>广州</li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li>深圳</li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li>上海</li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li>成都</li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li>北京</li>&ndash;&gt;-->
            <!--</ul>-->
          </div>
          <!--城市列表-->
          <div class="sz_list_city">
            <ul v-for="(area, index) in this.city" :key="index" @click="getCity(area)">
              <li>{{area}}</li>
            </ul>
          </div>
          <!--右侧字母-->
          <div class="sz_letter">
            <span></span>
            <ul>
              <li><b>A</b></li>
              <li><b>B</b></li>
              <li><b>C</b></li>
            </ul>
          </div>

        </div>
      </div>

    </div>
</template>

<script>
  const $ = require('jquery');
  // import {position} from '../../static/position.js';
export default {
  name: 'position',
  data() {
    return {
      city: [],
      data: [
        {
          "province": "海南",
          "city": "海口",
          "firstcode": "H",
          "areanum": "100001000",
          "pre": "",
          "area": "",
          "quanpin": "haikou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "海南",
          "city": "三亚",
          "firstcode": "S",
          "areanum": "100002000",
          "pre": "",
          "area": "",
          "quanpin": "sanya",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "海南",
          "city": "三沙",
          "firstcode": "S",
          "areanum": "100003000",
          "pre": "",
          "area": "",
          "quanpin": "sansha",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "广州",
          "firstcode": "G",
          "areanum": "101001000",
          "pre": "",
          "area": "",
          "quanpin": "guangzhou",
          "isdel": 0,
          "ishot": 1,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "韶关",
          "firstcode": "S",
          "areanum": "101002000",
          "pre": "",
          "area": "",
          "quanpin": "shaoguan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "深圳",
          "firstcode": "S",
          "areanum": "101003000",
          "pre": "",
          "area": "",
          "quanpin": "shenzhen",
          "isdel": 0,
          "ishot": 1,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "珠海",
          "firstcode": "Z",
          "areanum": "101004000",
          "pre": "",
          "area": "",
          "quanpin": "zhuhai",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "汕头",
          "firstcode": "S",
          "areanum": "101005000",
          "pre": "",
          "area": "",
          "quanpin": "shantou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "佛山",
          "firstcode": "F",
          "areanum": "101006000",
          "pre": "",
          "area": "",
          "quanpin": "foshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "江门",
          "firstcode": "J",
          "areanum": "101007000",
          "pre": "",
          "area": "",
          "quanpin": "jiangmen",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "湛江",
          "firstcode": "Z",
          "areanum": "101008000",
          "pre": "",
          "area": "",
          "quanpin": "zhanjiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "茂名",
          "firstcode": "M",
          "areanum": "101009000",
          "pre": "",
          "area": "",
          "quanpin": "maoming",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "肇庆",
          "firstcode": "Z",
          "areanum": "101010000",
          "pre": "",
          "area": "",
          "quanpin": "zhaoqing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "惠州",
          "firstcode": "H",
          "areanum": "101011000",
          "pre": "",
          "area": "",
          "quanpin": "huizhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "梅州",
          "firstcode": "M",
          "areanum": "101012000",
          "pre": "",
          "area": "",
          "quanpin": "meizhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "汕尾",
          "firstcode": "S",
          "areanum": "101013000",
          "pre": "",
          "area": "",
          "quanpin": "shanwei",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "河源",
          "firstcode": "H",
          "areanum": "101014000",
          "pre": "",
          "area": "",
          "quanpin": "heyuan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "阳江",
          "firstcode": "Y",
          "areanum": "101015000",
          "pre": "",
          "area": "",
          "quanpin": "yangjiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "清远",
          "firstcode": "Q",
          "areanum": "101016000",
          "pre": "",
          "area": "",
          "quanpin": "qingyuan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "东莞",
          "firstcode": "D",
          "areanum": "101017000",
          "pre": "",
          "area": "",
          "quanpin": "dongguan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "中山",
          "firstcode": "Z",
          "areanum": "101018000",
          "pre": "",
          "area": "",
          "quanpin": "zhongshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "潮州",
          "firstcode": "C",
          "areanum": "101019000",
          "pre": "",
          "area": "",
          "quanpin": "chaozhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "揭阳",
          "firstcode": "J",
          "areanum": "101020000",
          "pre": "",
          "area": "",
          "quanpin": "jieyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广东",
          "city": "云浮",
          "firstcode": "Y",
          "areanum": "101021000",
          "pre": "",
          "area": "",
          "quanpin": "yunfu",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广西",
          "city": "南宁",
          "firstcode": "N",
          "areanum": "102001000",
          "pre": "",
          "area": "",
          "quanpin": "nanning",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广西",
          "city": "柳州",
          "firstcode": "L",
          "areanum": "102002000",
          "pre": "",
          "area": "",
          "quanpin": "liuzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广西",
          "city": "桂林",
          "firstcode": "G",
          "areanum": "102003000",
          "pre": "",
          "area": "",
          "quanpin": "guilin",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广西",
          "city": "北海",
          "firstcode": "B",
          "areanum": "102005000",
          "pre": "",
          "area": "",
          "quanpin": "beihai",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广西",
          "city": "玉林",
          "firstcode": "Y",
          "areanum": "102009000",
          "pre": "",
          "area": "",
          "quanpin": "yulin",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "广西",
          "city": "贺州",
          "firstcode": "H",
          "areanum": "102012000",
          "pre": "",
          "area": "",
          "quanpin": "hezhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "成都",
          "firstcode": "C",
          "areanum": "104001000",
          "pre": "",
          "area": "",
          "quanpin": "chengdu",
          "isdel": 0,
          "ishot": 1,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "自贡",
          "firstcode": "Z",
          "areanum": "104002000",
          "pre": "",
          "area": "",
          "quanpin": "zigong",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "德阳",
          "firstcode": "D",
          "areanum": "104005000",
          "pre": "",
          "area": "",
          "quanpin": "deyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "绵阳",
          "firstcode": "M",
          "areanum": "104006000",
          "pre": "",
          "area": "",
          "quanpin": "mianyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "遂宁",
          "firstcode": "S",
          "areanum": "104008000",
          "pre": "",
          "area": "",
          "quanpin": "suining",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "内江",
          "firstcode": "N",
          "areanum": "104009000",
          "pre": "",
          "area": "",
          "quanpin": "neijiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "乐山",
          "firstcode": "L",
          "areanum": "104010000",
          "pre": "",
          "area": "",
          "quanpin": "leshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "南充",
          "firstcode": "N",
          "areanum": "104011000",
          "pre": "",
          "area": "",
          "quanpin": "nanchong",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "四川",
          "city": "宜宾",
          "firstcode": "Y",
          "areanum": "104012000",
          "pre": "",
          "area": "",
          "quanpin": "yibin",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "石家庄",
          "firstcode": "S",
          "areanum": "107001000",
          "pre": "",
          "area": "",
          "quanpin": "shijiazhuang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "唐山",
          "firstcode": "T",
          "areanum": "107002000",
          "pre": "",
          "area": "",
          "quanpin": "tangshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "秦皇岛",
          "firstcode": "Q",
          "areanum": "107003000",
          "pre": "",
          "area": "",
          "quanpin": "qinhuangdao",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "邯郸",
          "firstcode": "H",
          "areanum": "107004000",
          "pre": "",
          "area": "",
          "quanpin": "handan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "邢台",
          "firstcode": "X",
          "areanum": "107005000",
          "pre": "",
          "area": "",
          "quanpin": "xingtai",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "保定",
          "firstcode": "B",
          "areanum": "107006000",
          "pre": "",
          "area": "",
          "quanpin": "baoding",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "张家口",
          "firstcode": "Z",
          "areanum": "107007000",
          "pre": "",
          "area": "",
          "quanpin": "zhangjiakou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "承德",
          "firstcode": "C",
          "areanum": "107008000",
          "pre": "",
          "area": "",
          "quanpin": "chengde",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "沧州",
          "firstcode": "C",
          "areanum": "107009000",
          "pre": "",
          "area": "",
          "quanpin": "cangzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河北",
          "city": "廊坊",
          "firstcode": "L",
          "areanum": "107010000",
          "pre": "",
          "area": "",
          "quanpin": "langfang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山西",
          "city": "太原",
          "firstcode": "T",
          "areanum": "108001000",
          "pre": "",
          "area": "",
          "quanpin": "taiyuan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山西",
          "city": "大同",
          "firstcode": "D",
          "areanum": "108002000",
          "pre": "",
          "area": "",
          "quanpin": "datong",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山西",
          "city": "长治",
          "firstcode": "C",
          "areanum": "108004000",
          "pre": "",
          "area": "",
          "quanpin": "changzhi",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山西",
          "city": "晋中",
          "firstcode": "J",
          "areanum": "108009000",
          "pre": "",
          "area": "",
          "quanpin": "jinzhong",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山西",
          "city": "临汾",
          "firstcode": "L",
          "areanum": "108010000",
          "pre": "",
          "area": "",
          "quanpin": "linfen",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "内蒙古",
          "city": "呼和浩特",
          "firstcode": "H",
          "areanum": "109001000",
          "pre": "",
          "area": "",
          "quanpin": "huhehaote",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "内蒙古",
          "city": "包头",
          "firstcode": "B",
          "areanum": "109002000",
          "pre": "",
          "area": "",
          "quanpin": "baotou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "辽宁",
          "city": "沈阳",
          "firstcode": "S",
          "areanum": "110001000",
          "pre": "",
          "area": "",
          "quanpin": "shenyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "辽宁",
          "city": "大连",
          "firstcode": "D",
          "areanum": "110002000",
          "pre": "",
          "area": "",
          "quanpin": "dalian",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "辽宁",
          "city": "抚顺",
          "firstcode": "F",
          "areanum": "110004000",
          "pre": "",
          "area": "",
          "quanpin": "fushun",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "辽宁",
          "city": "丹东",
          "firstcode": "D",
          "areanum": "110006000",
          "pre": "",
          "area": "",
          "quanpin": "dandong",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "吉林",
          "city": "长春",
          "firstcode": "C",
          "areanum": "111001000",
          "pre": "",
          "area": "",
          "quanpin": "changchun",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "吉林",
          "city": "吉林",
          "firstcode": "J",
          "areanum": "111002000",
          "pre": "",
          "area": "",
          "quanpin": "jilin",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "吉林",
          "city": "四平",
          "firstcode": "S",
          "areanum": "111003000",
          "pre": "",
          "area": "",
          "quanpin": "siping",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "吉林",
          "city": "通化",
          "firstcode": "T",
          "areanum": "111005000",
          "pre": "",
          "area": "",
          "quanpin": "tonghua",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "吉林",
          "city": "白山",
          "firstcode": "B",
          "areanum": "111006000",
          "pre": "",
          "area": "",
          "quanpin": "baishan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "吉林",
          "city": "白城",
          "firstcode": "B",
          "areanum": "111008000",
          "pre": "",
          "area": "",
          "quanpin": "baicheng",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "吉林",
          "city": "延边朝鲜族自治州",
          "firstcode": "Y",
          "areanum": "111009000",
          "pre": "",
          "area": "",
          "quanpin": "yanbianchaoxianzuzizhizhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "黑龙江",
          "city": "哈尔滨",
          "firstcode": "H",
          "areanum": "112001000",
          "pre": "",
          "area": "",
          "quanpin": "haerbin",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "黑龙江",
          "city": "齐齐哈尔",
          "firstcode": "Q",
          "areanum": "112002000",
          "pre": "",
          "area": "",
          "quanpin": "qiqihaer",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "黑龙江",
          "city": "大庆",
          "firstcode": "D",
          "areanum": "112007000",
          "pre": "",
          "area": "",
          "quanpin": "daqing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "黑龙江",
          "city": "牡丹江",
          "firstcode": "M",
          "areanum": "112011000",
          "pre": "",
          "area": "",
          "quanpin": "mudanjiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "南京",
          "firstcode": "N",
          "areanum": "114001000",
          "pre": "",
          "area": "",
          "quanpin": "nanjing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "无锡",
          "firstcode": "W",
          "areanum": "114002000",
          "pre": "",
          "area": "",
          "quanpin": "wuxi",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "徐州",
          "firstcode": "X",
          "areanum": "114003000",
          "pre": "",
          "area": "",
          "quanpin": "xuzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "常州",
          "firstcode": "C",
          "areanum": "114005000",
          "pre": "",
          "area": "",
          "quanpin": "changzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "苏州",
          "firstcode": "S",
          "areanum": "114006000",
          "pre": "",
          "area": "",
          "quanpin": "suzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "南通",
          "firstcode": "N",
          "areanum": "114007000",
          "pre": "",
          "area": "",
          "quanpin": "nantong",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "淮安",
          "firstcode": "H",
          "areanum": "114009000",
          "pre": "",
          "area": "",
          "quanpin": "huaian",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "盐城",
          "firstcode": "Y",
          "areanum": "114010000",
          "pre": "",
          "area": "",
          "quanpin": "yancheng",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "扬州",
          "firstcode": "Y",
          "areanum": "114011000",
          "pre": "",
          "area": "",
          "quanpin": "yangzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "镇江",
          "firstcode": "Z",
          "areanum": "114012000",
          "pre": "",
          "area": "",
          "quanpin": "zhenjiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "泰州",
          "firstcode": "T",
          "areanum": "114013000",
          "pre": "",
          "area": "",
          "quanpin": "taizhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江苏",
          "city": "宿迁",
          "firstcode": "S",
          "areanum": "114014000",
          "pre": "",
          "area": "",
          "quanpin": "suqian",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "杭州",
          "firstcode": "H",
          "areanum": "115001000",
          "pre": "",
          "area": "",
          "quanpin": "hangzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "宁波",
          "firstcode": "N",
          "areanum": "115002000",
          "pre": "",
          "area": "",
          "quanpin": "ningbo",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "温州",
          "firstcode": "W",
          "areanum": "115003000",
          "pre": "",
          "area": "",
          "quanpin": "wenzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "嘉兴",
          "firstcode": "J",
          "areanum": "115004000",
          "pre": "",
          "area": "",
          "quanpin": "jiaxing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "湖州",
          "firstcode": "H",
          "areanum": "115005000",
          "pre": "",
          "area": "",
          "quanpin": "huzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "绍兴",
          "firstcode": "S",
          "areanum": "115006000",
          "pre": "",
          "area": "",
          "quanpin": "shaoxing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "金华",
          "firstcode": "J",
          "areanum": "115007000",
          "pre": "",
          "area": "",
          "quanpin": "jinhua",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "衢州",
          "firstcode": "Q",
          "areanum": "115008000",
          "pre": "",
          "area": "",
          "quanpin": "quzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "舟山",
          "firstcode": "Z",
          "areanum": "115009000",
          "pre": "",
          "area": "",
          "quanpin": "zhoushan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "台州",
          "firstcode": "T",
          "areanum": "115010000",
          "pre": "",
          "area": "",
          "quanpin": "taiz",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "浙江",
          "city": "丽水",
          "firstcode": "L",
          "areanum": "115011000",
          "pre": "",
          "area": "",
          "quanpin": "lishui",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "合肥",
          "firstcode": "H",
          "areanum": "116001000",
          "pre": "",
          "area": "",
          "quanpin": "hefei",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "芜湖",
          "firstcode": "W",
          "areanum": "116002000",
          "pre": "",
          "area": "",
          "quanpin": "wuhu",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "蚌埠",
          "firstcode": "B",
          "areanum": "116003000",
          "pre": "",
          "area": "",
          "quanpin": "bengbu",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "淮南",
          "firstcode": "H",
          "areanum": "116004000",
          "pre": "",
          "area": "",
          "quanpin": "huainan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "马鞍山",
          "firstcode": "M",
          "areanum": "116005000",
          "pre": "",
          "area": "",
          "quanpin": "maanshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "安庆",
          "firstcode": "A",
          "areanum": "116008000",
          "pre": "",
          "area": "",
          "quanpin": "anqing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "黄山",
          "firstcode": "H",
          "areanum": "116009000",
          "pre": "",
          "area": "",
          "quanpin": "huangshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "安徽",
          "city": "六安",
          "firstcode": "L",
          "areanum": "116013000",
          "pre": "",
          "area": "",
          "quanpin": "liuan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "福州",
          "firstcode": "F",
          "areanum": "117001000",
          "pre": "",
          "area": "",
          "quanpin": "fuzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "厦门",
          "firstcode": "X",
          "areanum": "117002000",
          "pre": "",
          "area": "",
          "quanpin": "xiamen",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "宁德",
          "firstcode": "N",
          "areanum": "117003000",
          "pre": "",
          "area": "",
          "quanpin": "ningde",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "莆田",
          "firstcode": "P",
          "areanum": "117004000",
          "pre": "",
          "area": "",
          "quanpin": "putian",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "泉州",
          "firstcode": "Q",
          "areanum": "117005000",
          "pre": "",
          "area": "",
          "quanpin": "quanzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "漳州",
          "firstcode": "Z",
          "areanum": "117006000",
          "pre": "",
          "area": "",
          "quanpin": "zhangzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "龙岩",
          "firstcode": "L",
          "areanum": "117007000",
          "pre": "",
          "area": "",
          "quanpin": "longyan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "三明",
          "firstcode": "S",
          "areanum": "117008000",
          "pre": "",
          "area": "",
          "quanpin": "sanming",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "福建",
          "city": "南平",
          "firstcode": "N",
          "areanum": "117009000",
          "pre": "",
          "area": "",
          "quanpin": "nanping",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "南昌",
          "firstcode": "N",
          "areanum": "118001000",
          "pre": "",
          "area": "",
          "quanpin": "nanchang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "景德镇",
          "firstcode": "J",
          "areanum": "118002000",
          "pre": "",
          "area": "",
          "quanpin": "jingdezhen",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "萍乡",
          "firstcode": "P",
          "areanum": "118003000",
          "pre": "",
          "area": "",
          "quanpin": "pingxiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "九江",
          "firstcode": "J",
          "areanum": "118004000",
          "pre": "",
          "area": "",
          "quanpin": "jiujiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "新余",
          "firstcode": "X",
          "areanum": "118005000",
          "pre": "",
          "area": "",
          "quanpin": "xinyu",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "鹰潭",
          "firstcode": "T",
          "areanum": "118006000",
          "pre": "",
          "area": "",
          "quanpin": "yingtan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "赣州",
          "firstcode": "G",
          "areanum": "118007000",
          "pre": "",
          "area": "",
          "quanpin": "ganzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "宜春",
          "firstcode": "Y",
          "areanum": "118008000",
          "pre": "",
          "area": "",
          "quanpin": "yichun",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "上饶",
          "firstcode": "S",
          "areanum": "118009000",
          "pre": "",
          "area": "",
          "quanpin": "shangrao",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "江西",
          "city": "抚州",
          "firstcode": "F",
          "areanum": "118011000",
          "pre": "",
          "area": "",
          "quanpin": "fuz",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "济南",
          "firstcode": "J",
          "areanum": "119001000",
          "pre": "",
          "area": "",
          "quanpin": "jinan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "青岛",
          "firstcode": "Q",
          "areanum": "119002000",
          "pre": "",
          "area": "",
          "quanpin": "qingdao",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "淄博",
          "firstcode": "Z",
          "areanum": "119003000",
          "pre": "",
          "area": "",
          "quanpin": "zibo",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "枣庄",
          "firstcode": "Z",
          "areanum": "119004000",
          "pre": "",
          "area": "",
          "quanpin": "zaozhuang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "东营",
          "firstcode": "D",
          "areanum": "119005000",
          "pre": "",
          "area": "",
          "quanpin": "dongying",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "烟台",
          "firstcode": "Y",
          "areanum": "119006000",
          "pre": "",
          "area": "",
          "quanpin": "yantai",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "潍坊",
          "firstcode": "W",
          "areanum": "119007000",
          "pre": "",
          "area": "",
          "quanpin": "weifang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "济宁",
          "firstcode": "J",
          "areanum": "119008000",
          "pre": "",
          "area": "",
          "quanpin": "jining",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "泰安",
          "firstcode": "T",
          "areanum": "119009000",
          "pre": "",
          "area": "",
          "quanpin": "taian",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "威海",
          "firstcode": "W",
          "areanum": "119010000",
          "pre": "",
          "area": "",
          "quanpin": "weihai",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "日照",
          "firstcode": "R",
          "areanum": "119011000",
          "pre": "",
          "area": "",
          "quanpin": "rizhao",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "临沂",
          "firstcode": "L",
          "areanum": "119013000",
          "pre": "",
          "area": "",
          "quanpin": "linyi",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "德州",
          "firstcode": "D",
          "areanum": "119014000",
          "pre": "",
          "area": "",
          "quanpin": "dezhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "山东",
          "city": "滨州",
          "firstcode": "B",
          "areanum": "119016000",
          "pre": "",
          "area": "",
          "quanpin": "binzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "郑州",
          "firstcode": "Z",
          "areanum": "120001000",
          "pre": "",
          "area": "",
          "quanpin": "zhengzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "开封",
          "firstcode": "K",
          "areanum": "120002000",
          "pre": "",
          "area": "",
          "quanpin": "kaifeng",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "洛阳",
          "firstcode": "L",
          "areanum": "120003000",
          "pre": "",
          "area": "",
          "quanpin": "luoyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "安阳",
          "firstcode": "A",
          "areanum": "120005000",
          "pre": "",
          "area": "",
          "quanpin": "anyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "焦作",
          "firstcode": "J",
          "areanum": "120008000",
          "pre": "",
          "area": "",
          "quanpin": "jiaozuo",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "濮阳",
          "firstcode": "P",
          "areanum": "120009000",
          "pre": "",
          "area": "",
          "quanpin": "puyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "南阳",
          "firstcode": "N",
          "areanum": "120013000",
          "pre": "",
          "area": "",
          "quanpin": "nanyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "商丘",
          "firstcode": "S",
          "areanum": "120014000",
          "pre": "",
          "area": "",
          "quanpin": "shangqiu",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "信阳",
          "firstcode": "X",
          "areanum": "120015000",
          "pre": "",
          "area": "",
          "quanpin": "xinyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "周口",
          "firstcode": "Z",
          "areanum": "120016000",
          "pre": "",
          "area": "",
          "quanpin": "zhoukou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "河南",
          "city": "济源",
          "firstcode": "J",
          "areanum": "120018000",
          "pre": "",
          "area": "",
          "quanpin": "jiyuan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "武汉",
          "firstcode": "W",
          "areanum": "121001000",
          "pre": "",
          "area": "",
          "quanpin": "wuhan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "黄石",
          "firstcode": "H",
          "areanum": "121002000",
          "pre": "",
          "area": "",
          "quanpin": "huangshi",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "十堰",
          "firstcode": "S",
          "areanum": "121003000",
          "pre": "",
          "area": "",
          "quanpin": "shiyan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "宜昌",
          "firstcode": "Y",
          "areanum": "121004000",
          "pre": "",
          "area": "",
          "quanpin": "yichang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "鄂州",
          "firstcode": "E",
          "areanum": "121006000",
          "pre": "",
          "area": "",
          "quanpin": "ezhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "荆州",
          "firstcode": "J",
          "areanum": "121009000",
          "pre": "",
          "area": "",
          "quanpin": "jingzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "黄冈",
          "firstcode": "H",
          "areanum": "121010000",
          "pre": "",
          "area": "",
          "quanpin": "huanggang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖北",
          "city": "恩施自治州",
          "firstcode": "E",
          "areanum": "121012000",
          "pre": "",
          "area": "",
          "quanpin": "enshizizhizhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "长沙",
          "firstcode": "C",
          "areanum": "122001000",
          "pre": "",
          "area": "",
          "quanpin": "changsha",
          "isdel": 0,
          "ishot": 1,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "株洲",
          "firstcode": "Z",
          "areanum": "122002000",
          "pre": "",
          "area": "",
          "quanpin": "zhuzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "湘潭",
          "firstcode": "X",
          "areanum": "122003000",
          "pre": "",
          "area": "",
          "quanpin": "xiangtan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "衡阳",
          "firstcode": "H",
          "areanum": "122004000",
          "pre": "",
          "area": "",
          "quanpin": "hengyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "岳阳",
          "firstcode": "Y",
          "areanum": "122006000",
          "pre": "",
          "area": "",
          "quanpin": "yueyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "常德",
          "firstcode": "C",
          "areanum": "122007000",
          "pre": "",
          "area": "",
          "quanpin": "changde",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "张家界",
          "firstcode": "Z",
          "areanum": "122008000",
          "pre": "",
          "area": "",
          "quanpin": "zhangjiajie",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "益阳",
          "firstcode": "Y",
          "areanum": "122009000",
          "pre": "",
          "area": "",
          "quanpin": "yiyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "郴州",
          "firstcode": "C",
          "areanum": "122010000",
          "pre": "",
          "area": "",
          "quanpin": "chenzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "永州",
          "firstcode": "Y",
          "areanum": "122011000",
          "pre": "",
          "area": "",
          "quanpin": "yongzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "怀化",
          "firstcode": "H",
          "areanum": "122012000",
          "pre": "",
          "area": "",
          "quanpin": "huaihua",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "娄底",
          "firstcode": "L",
          "areanum": "122013000",
          "pre": "",
          "area": "",
          "quanpin": "loudi",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "湖南",
          "city": "湘西土家族苗族自治州",
          "firstcode": "X",
          "areanum": "122014000",
          "pre": "",
          "area": "",
          "quanpin": "xiangxitujiazumiaozuzizhizhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "贵州",
          "city": "贵阳",
          "firstcode": "G",
          "areanum": "123001000",
          "pre": "",
          "area": "",
          "quanpin": "guiyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "云南",
          "city": "昆明",
          "firstcode": "K",
          "areanum": "124001000",
          "pre": "",
          "area": "",
          "quanpin": "kunming",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "云南",
          "city": "曲靖",
          "firstcode": "Q",
          "areanum": "124002000",
          "pre": "",
          "area": "",
          "quanpin": "qujing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "云南",
          "city": "红河",
          "firstcode": "H",
          "areanum": "124006000",
          "pre": "",
          "area": "",
          "quanpin": "honghe",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "云南",
          "city": "文山",
          "firstcode": "W",
          "areanum": "124007000",
          "pre": "",
          "area": "",
          "quanpin": "wenshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "云南",
          "city": "大理",
          "firstcode": "D",
          "areanum": "124010000",
          "pre": "",
          "area": "",
          "quanpin": "dali",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "云南",
          "city": "保山",
          "firstcode": "B",
          "areanum": "124011000",
          "pre": "",
          "area": "",
          "quanpin": "baoshan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "云南",
          "city": "丽江",
          "firstcode": "L",
          "areanum": "124013000",
          "pre": "",
          "area": "",
          "quanpin": "lijiang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "西藏",
          "city": "拉萨",
          "firstcode": "L",
          "areanum": "125001000",
          "pre": "",
          "area": "",
          "quanpin": "lasa",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "陕西",
          "city": "西安",
          "firstcode": "X",
          "areanum": "126001000",
          "pre": "",
          "area": "",
          "quanpin": "xian",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "陕西",
          "city": "咸阳",
          "firstcode": "X",
          "areanum": "126004000",
          "pre": "",
          "area": "",
          "quanpin": "xianyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "陕西",
          "city": "渭南",
          "firstcode": "W",
          "areanum": "126005000",
          "pre": "",
          "area": "",
          "quanpin": "weinan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "陕西",
          "city": "延安",
          "firstcode": "Y",
          "areanum": "126006000",
          "pre": "",
          "area": "",
          "quanpin": "yanan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "陕西",
          "city": "汉中",
          "firstcode": "H",
          "areanum": "126007000",
          "pre": "",
          "area": "",
          "quanpin": "hanzhong",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "陕西",
          "city": "安康",
          "firstcode": "A",
          "areanum": "126008000",
          "pre": "",
          "area": "",
          "quanpin": "ankang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "陕西",
          "city": "商洛",
          "firstcode": "S",
          "areanum": "126009000",
          "pre": "",
          "area": "",
          "quanpin": "shangluo",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "甘肃",
          "city": "兰州",
          "firstcode": "L",
          "areanum": "127001000",
          "pre": "",
          "area": "",
          "quanpin": "lanzhou",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "甘肃",
          "city": "庆阳",
          "firstcode": "Q",
          "areanum": "127012000",
          "pre": "",
          "area": "",
          "quanpin": "qingyang",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "青海",
          "city": "西宁",
          "firstcode": "X",
          "areanum": "128001000",
          "pre": "",
          "area": "",
          "quanpin": "xining",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "宁夏",
          "city": "银川",
          "firstcode": "Y",
          "areanum": "129001000",
          "pre": "",
          "area": "",
          "quanpin": "yinchuan",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "新疆",
          "city": "乌鲁木齐",
          "firstcode": "W",
          "areanum": "130001000",
          "pre": "",
          "area": "",
          "quanpin": "wulumuqi",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "上海市",
          "city": "上海",
          "firstcode": "S",
          "areanum": "113002000",
          "pre": "",
          "area": "",
          "quanpin": "shanghai",
          "isdel": 0,
          "ishot": 1,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "北京市",
          "city": "北京",
          "firstcode": "B",
          "areanum": "105002000",
          "pre": "",
          "area": "",
          "quanpin": "beijing",
          "isdel": 0,
          "ishot": 1,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "天津市",
          "city": "天津",
          "firstcode": "T",
          "areanum": "106002000",
          "pre": "",
          "area": "",
          "quanpin": "tianjin",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "重庆市",
          "city": "重庆",
          "firstcode": "C",
          "areanum": "103002000",
          "pre": "",
          "area": "",
          "quanpin": "chongqing",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        },
        {
          "province": "黑龙江",
          "city": "佳木斯",
          "firstcode": "J",
          "areanum": "112015000",
          "pre": "",
          "area": "",
          "quanpin": "jiamusi",
          "isdel": 0,
          "ishot": 0,
          "hotorder": 0,
          "id": 0,
          "state": 0
        }
      ],
      hotCity: ['广州','深圳','东莞','惠州','北京']
    }
  },
  methods: {
    back () {
      // this.$router.go(-1);
      this.$router.push('/first')
    },
    getCity (area) {
      // 选择地点
      //   console.log(area)
        var number = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","X","Y","Z"]
        for(var i = 0; i <= 25 ; i++){
            if(area === number[i]){
              // 这里的不能只写一个 =（这是赋值）
              // console.log(area);
              return
              // 注意return、break和continue的区别
            }
        }
      $(".sz_header_box .city span").html(area),
      $(".sz_current_city span").html(area),

      // $.ajax({
      //     url: 'http://172.20.10.2:3000/api',
      //     dataType: 'jsonp',
      //     data: {
      //       area: area
      //     },
      //     success: function (response) {
      //       // console.log("这是ajax的数据")
      //       // console.log(response)
      //     }
      //   }),
        this.$router.push({name: 'first', params: {area}})
        // this.$router.push({path: '/first', params: {area}})
    },
    getHotCityName() {

    },
    setLetter(){
    var strLetter = "";
    var arrLetter = [];
    // console.log(111)
    // console.log(this.data)
    for(var i = 0 ; i < this.data.length; i++){
      arrLetter[i] = this.data[i].firstcode;
      // arrLetter.push( this.data[i].firstcode)
    }
    // console.log(arrLetter);
    /*
    * 数组去重
    * */
    var arr = []; //新数组 存放过滤后的字母
    var obj = {}; // 对象
    for(var j = 0 ; j < arrLetter.length;j++ ){
      if(obj[arrLetter[j]]==undefined){
        arr.push(arrLetter[j]);
        obj[arrLetter[j]] = true;
      }
    }
    // console.log(obj);
    // console.log(arr);
    var result = arr.sort();//
    // console.log(result);
    for(var k = 0  ; k < result.length; k++){
      strLetter+="<li><b>"+result[k]+"</b></li>"
    }
    // console.log(strLetter);
    $(".sz_letter ul").html(strLetter);
    return  result;


  },

    /*
      * 2.0 热门城市
      * */
  //    setHotCity(){
  //   //定义一个数组 存放热门城市
  //   var arrHotCity = [];
  //   //遍历整个数据
  //   for(var i = 0 ;  i < this.data.length; i++ ){
  //     // ishot 等于1 是热门城市
  //     if(this.data[i].ishot == 1){
  //       //添加到空数组
  //       arrHotCity.push(this.data[i].city)
  //     }
  //   }
  //   var strHotCity = "";//字符串
  //   //遍历热门城市数组
  //   for(var j = 0 ;  j < arrHotCity.length;j++ ){
  //     //拼接字符串
  //     strHotCity+="<li>"+arrHotCity[j]+"</li>"
  //   }
  //   // console.log(arrHotCity);
  //   // console.log(strHotCity);
  //   //把拼接好的字符串渲染在页面
  //   $(".sz_hot_city ul").html(strHotCity);
  //   // console.log("2、热门城市")
  //
  // },

    /*
    * 3.0 城市的列表
    * */
    setCityList(){

      var arrFirstCode =  this.setLetter() ;

      // console.log(arrFirstCode);

      var strCityListHtml = "";// 用于拼接城市列表的字符串

      for(var j = 0 ; j < arrFirstCode.length;j++ ){

        // strCityListHtml+=" <li>"+arrFirstCode[j]+"</li>";
        this.city.push(arrFirstCode[j]);
        // console.log(this.city)

        for(var i = 0  ; i < this.data.length; i++){
          if(this.data[i].firstcode == arrFirstCode[j]){
            // console.log(this.data[i].city)
            this.city.push(this.data[i].city)
            // strCityListHtml+="<li>"+this.data[i].city+"</li>"
          }

        }
        // console.log(this.city)

      }
      /*
      * 把拼接好的字符串渲染在页面上
      *
      * */
      // console.log("3、城市列表")
      $(".sz_list_city ul").html(strCityListHtml)

    },

    /*
    * 4.0 点击字母 显示相应的城市
    * */
    setCityPosition(){

      $(".sz_letter ul li").click(function(){
        /*
        *
        *获取点击的盒子的文本 A
        *
        * */
        var valLetter = $(this).text();
        // console.log(valLetter);
        /*
        *
        * 查找包含 点击获取的字母A 的li标签
        * */
        var $dom = $(".sz_list_city ul").find("li:contains("+valLetter+")");
        // console.log($dom);

        var ttop = $dom.offset().top-50;
        // console.log(ttop);


        // $( 'body').stop().animate({scrollTop: ttop}, 500);
        $( 'html').stop().animate({scrollTop: ttop}, 500);
        // console.log("4、点击城市移动")
      })

    }

  },
  mounted() {
    // this.trigger()
    // position();
    // this.getCity(),
    this.setLetter(),
    // this.setHotCity(),
    this.setCityList(),
    this.setCityPosition()
  }
}
</script>
<style >
  .position{
    position: absolute;
    top: 0;
    /*bottom: 0;*/
    /*bottom会让路由出现*/
    width: 100%;
    background: white;
    font-size: 35px;
    color: black;
    z-index: 99999999
  }
  /*.back{*/

/*}*/
  .sz_layout {
    width: 100%;
    font-size: 16px;
    max-width: 640px;
    margin: 0 auto;
  }
  .sz_header {
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: #f0f0f0;
  }

  .sz_header .sz_header_box {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .sz_header .sz_header_box .city {
    float: left;
    padding: 0 15px;
    height: 50px;
    background: url("../public/img/arrow_down.png") no-repeat right center ;
    background-size: 20px 15px;
  }
  .sz_header .sz_header_box .city  span {
    display: block;
    padding: 0 5px;
  }
  .sz_header .sz_header_box .person {
    width: 50px;
    height: 50px;
    float: right;
  }
  .sz_header .sz_header_box .person span {
    display: block;
    width: 30px;
    height: 30px;
    background: url("../public/img/home.png") no-repeat center;
    background-size: 30px 30px;
    /*margin-bottom: 10px;*/
    margin: 10px auto;
  }
  .h50 {
    height: 50px;
  }

  .sz_current_city {
    width: 100%;
    padding: 10px 25px 10px 15px;
  }
  .sz_current_city p  {
    font-size: 16px;
    color:#666;
  }
  .sz_current_city span {
    display: block;
    float: left;
    padding: 10px 25px 10px 30px;
    color:#fff;
    background: url("../public/img/here.png") no-repeat ;
    background-color: red;
    background-position: 5px  center; /*  x   y */
    background-size: 20px 20px;
    border-radius: 5px;
    margin-top: 10px;
  }

  .sz_hot_city {
    width: 100%;
    padding: 0px 25px 0px 15px;
  }
  .sz_hot_city p {
    font-size: 20px;
    color:#666;
  }
  .sz_hot_city ul  {
    width: 100%;
  }
  .sz_hot_city ul li   {
    float: left;
    padding: 5px 10px ;
    border: 1px solid skyblue;
    font-size: 16px;
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 10px;
  }


  .sz_list_city {
    width: 100%;
    padding: 10px 25px 10px 15px;
  }
  .sz_list_city ul {
    width: 100%;
  }
  .sz_list_city ul li {
    width: 100%;
    height: 32px;
    line-height: 32px;
    border-bottom: 1px solid #ccc;
  }


  .sz_letter {
    width: 25px;
    position: fixed;
    right: 5px;
    top: 50px;
    z-index: 1000;
  }
  .sz_letter span {
    display: block;
    width: 25px;
    height: 25px;
    background: url("../public/img/topicon.png") no-repeat center ;
    background-size: 25px 25px;
  }
  .sz_letter ul {
    width: 25px;
  }
  .sz_letter ul li {
    width: 25px;
    height: 20px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }

</style>
