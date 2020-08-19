Page({

  /**
   * 页面的初始数据
   */
  data: {
    nation: '',
    province: '',
    city: '',
    district: '',
    street: '',

    humidity: "89",
    temp: "27",
    text: "阴",
    windDir: "北风",
    windScale: "3",
    feelsLike: '',
    vis: '',
    sunset: '',

    tempMax_0: "35",
    tempMin_0: "25",
    textDay_0: "雷阵雨",
    textNight_0: "多云",

    tempMax_1: "35",
    tempMin_1: "25",
    textDay_1: "雷阵雨",
    textNight_1: "多云",

    tempMax_2: "35",
    tempMin_2: "25",
    textDay_2: "雷阵雨",
    textNight_2: "多云",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressDetail();
  },

  /**
   * 获取地理位置信息详情
   */
  getAddressDetail: function () {
    let that = this;
    wx.getLocation({
      type: 'wgs84', // 参考系
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log("纬度=" + latitude + " 经度=" + longitude);

        // 构建请求地址
        var qqMapApi = 'https://apis.map.qq.com/ws/geocoder/v1/' + "?location=" + latitude + ',' +
          longitude + "&key=" + 'FAPBZ-MFL3K-TMZJS-APDNB-BLMT2-QJBXI' + "&get_poi=1";

        that.sendRequest(qqMapApi);
      }
    })
  },

  /**
   * 
   */
  sendRequest: function (qqMapApi) {
    let that = this;
    // 调用请求
    wx.request({
      url: qqMapApi,
      data: {},
      method: 'GET',
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200 && res.data.status == 0) {
          // 从返回值中提取需要的业务地理信息数据
          that.setData({
            nation: res.data.result.address_component.nation
          });
          that.setData({
            province: res.data.result.address_component.province
          });
          that.setData({
            city: res.data.result.address_component.city
          });
          that.setData({
            district: res.data.result.address_component.district
          });
          that.setData({
            street: res.data.result.address_component.street
          });
          that.getCityId(res.data.result.address_component.district);
        }
      }
    })
  },
  getCityId: function (city_name) {
    let that = this;
    var city_url = "https://geoapi.heweather.net/v2/city/lookup?location=" + city_name + "&key=0b7e2b9fac804179b544e306025701f2";
    wx.request({
      url: city_url,
      method: 'GET',
      success: (res) => {
        console.log(res)
        if (res.statusCode == 200) {
          
          var weather_url_3d = "https://free-api.heweather.com/v7/weather/3d?location=" + res.data.location[0].id + "&key=0b7e2b9fac804179b544e306025701f2";
          that.getWeather3d(weather_url_3d);
          var weather_url_now = "https://free-api.heweather.com/v7/weather/now?location=" + res.data.location[0].id + "&key=0b7e2b9fac804179b544e306025701f2";
          that.getWeatherNow(weather_url_now);
        }
      }
    })
  },
  getWeather3d: function (weather_url) {
    let that = this;
    wx.request({
      url: weather_url,
      method: 'GET',
      success: (res) => {
        console.log(res)
        that.setData({
          tempMax_0: res.data.daily[0].tempMax,
          tempMin_0: res.data.daily[0].tempMin,
          textDay_0: res.data.daily[0].textDay,
          textNight_0: res.data.daily[0].textNight,
          sunset: res.data.daily[0].sunset,

          tempMax_1: res.data.daily[1].tempMax,
          tempMin_1: res.data.daily[1].tempMin,
          textDay_1: res.data.daily[1].textDay,
          textNight_1: res.data.daily[1].textNight,

          tempMax_2: res.data.daily[2].tempMax,
          tempMin_2: res.data.daily[2].tempMin,
          textDay_2: res.data.daily[2].textDay,
          textNight_2: res.data.daily[2].textNight,
        });
      }
    })
  },
  getWeatherNow: function (weather_url_now) {
    let that = this;
    wx.request({
      url: weather_url_now,
      method: 'GET',
      success: (res) => {
        console.log(res)
        that.setData({
          humidity: res.data.now.humidity,
          temp: res.data.now.temp,
          text: res.data.now.text,
          windDir: res.data.now.windDir,
          windScale: res.data.now.windScale,
          feelsLike: res.data.now.feelsLike,
          vis: res.data.now.vis,
          
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})