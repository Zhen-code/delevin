/* 背景颜色一览：
red:嫣红  orange:桔橙 yellow:明黄 olive:橄榄  green:森绿；
cyan:天青  blue:海蓝  purple:姹紫  mauve:木槿 pink:桃粉；
brown:棕褐 grey:玄灰  gray:草灰  black:墨黑 white:雅白 */

var agentMenus = {
  activeUrl: 'home',
  list: [{
    currentUrl: "home",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab1_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab1_24_pre@2x.png",
    btnType: 0,
    title: "首页"
  }, {
    currentUrl: "aspect",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab2_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab2_24_pre@2x.png",
    btnType: 0,
    title: "看点"
  }, {
    currentUrl: "message",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab3_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab4_24_pre@2x.png",
    btnType: 0,
    title: "消息"
  }, {
    currentUrl: "mine",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab4_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab4_24_pre@2x.png",
    btnType: 0,
    title: "我的"
  }]
}

var masterMenus = {
  activeUrl: 'brokerHome',
  list: [{
    currentUrl: "brokerHome",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab1_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab1_24_pre@2x.png",
    btnType: 0,
    title: "首页"
  }, {
    currentUrl: "brokerListings",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab9_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab9_24_pre@2x.png",
    btnType: 0,
    title: "房源"
  }, {
    currentUrl: "brokerMessage",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab3_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab3_24_pre@2x.png",
    btnType: 0,
    title: "消息"
  }, {
    currentUrl: "brokerMine",
    unCheckImgUrl: "/assets/image/tabbar/icon_tab4_24_nor@2x.png",
    checkedImgUrl: "/assets/image/tabbar/icon_tab4_24_pre@2x.png",
    btnType: 0,
    title: "我的"
  }]
}

module.exports = {
  agentMenuData: agentMenus,
  masterMenuData: masterMenus
}