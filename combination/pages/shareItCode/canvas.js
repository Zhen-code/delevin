const _wxml = (obj) => {
  return `
  <view class="report_box">
    <view class="main_box">
      <view class="out_box">
        <text class="out_name">` + obj.name + `</text>
        <view class="out_day">
          <image src="` + obj.bookUrl + `" class="lis_image"></image>
          <text class="day_img_danwei">` + obj.phone + `</text>
        </view>
        <text class="out_title">` + obj.text + `</text>
       </view>
      <view class="cose_img_div">
        <image src="` + obj.codeUrl + `" class="codeUrl_img"></image>
      </view>
    </view>
  </view>
  `
};
let _style = (_w, _h, _scale, obj) => {
  let newW = _w * _scale;
  let newH = _h * _scale;
  let bookW = newW * 0.211;
  let headW = newW * 0.21;
  let codeW = newW * 0.24;
  let main_box_len = 38 * _scale;
  return {
    report_box: {
      backgroundColor: "#F7CF29",
      boxSizing: "border-box",
      width: newW,
      height: newH,
    },
    main_box: {
      backgroundColor: "#fff",
      marginRight: main_box_len,
      marginBottom: 0,
      marginTop: (newH / 2) / 2,
      marginLeft: main_box_len,
      // height: (newH - ((headW / 2) + main_box_len * 6)),
      boxSizing: "border-box",
      borderRadius: (7.5 * _scale)
    },
    data_box: {
      flexDirection: 'row',
      justifyContent: "space-around",
      alignItems: "center",
    },
    out_box: {
      height: (50 * _scale),
      textAlign: "center",
      marginTop: (12 * _scale),
      marginBottom: (40 * _scale),
    },
    out_name: {
      color: "#333333",
      fontSize: (14 * _scale),
      height: (22 * _scale),
      textAlign: "left",
      marginTop: (12 * _scale),
      marginLeft: (24 * _scale),
      fontWeight: "bold"
    },
    out_title: {
      color: "#999999",
      fontSize: (14 * _scale),
      height: (20 * _scale),
      textAlign: "left",
      marginTop: (12 * _scale),
      marginLeft: (24 * _scale),
      marginRight: (24 * _scale),
    },
    out_day: {
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      height: (28 * _scale),
      marginTop: (12 * _scale),
      marginLeft: (24 * _scale),
    },
    day_img_danwei: {
      fontSize: (12 * _scale),
      height: (bookW / 3.9),
      color: "#999999",
      width: newW - (90 * _scale) - bookW,
      flexDirection: 'row',
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "left",
      marginTop: (5 * _scale),
      marginLeft: (4 * _scale),
    },
    lis_image: {
      width: (bookW / 3.9),
      height: (bookW / 3.9),
      // borderRadius: (10 * _scale),
      verticalAlign: "middle",
    },
    listen_right: {
      width: newW - (90 * _scale) - bookW,
      height: bookW,
      textAlign: "left",
    },
    cose_img_div: {
      flex: 1,
      textAlign: "center",
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "center",
      marginTop: (40 * _scale),
      marginBottom: (40 * _scale),
    },
    codeUrl_img: {
      width: (codeW * 2.2),
      height: (codeW * 2.2),
    },
  };
}

module.exports._wxml = _wxml;
module.exports._style = _style