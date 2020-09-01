
const systemInfo = wx.getSystemInfoSync();
let system = systemInfo.system.toLowerCase();
let _height = 0;
if (system.match("android")) {
	_height = 8;
} else if (system.match("ios")) {
	_height = 4;
}
// 胶囊按钮位置信息
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
const topHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight + _height;

module.exports = {
	topHeight
}