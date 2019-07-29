
//数据模拟
if(!HoneyComb){

	var HoneyComb = Object.create(null);
	
	HoneyComb.init = function(data, callback){

		var _d = {
			code: 0,
			isNeedLogin: true,
			token: '',
			re_nickName: "",
			re_headImg: "",
			lead_nickName: "",
			lead_headImg: "",
			isStarted: true,
			isExpired: false,
			startTime: "2017-02-03 13:20:00",
			endTime: "2017-02-03 13:20:00",
			lead_phone:'17151561541'

		}
		callback(_d);

	}

	HoneyComb.acceptShare = function(data,callback){

		var _d = {
			code: 0,
			status:1,
			phone: 18500558394,
			isNew: true,
			coupons: 
				[
					{
						couponTypeName: "折扣券",
						expiredDate: "2017-02-03 13:20:00",
						couponTyp: 100,
						discount : 100
					}
				], 
		    extendInfo:
		    	{
			    	redirectUrl: ""
				}
		}

		callback(_d);


	}

	HoneyComb.GetGoUrl = function(isDiDi){
			
		return { url:"" }

	}

	HoneyComb.setShare = function(data,isChange){
		
	}

	HoneyComb.clickShare = function(data,isChange){
		
	}

	HoneyComb.getUrlParams = function(){
		var e = window.location.search,
            t = new Object;
        if (-1 != e.indexOf("?")) for (var a = e.substr(1).split("&"), n = 0; n < a.length; n++) {
                var r = a[n].split("=");
                t[r[0]] = decodeURI(r[1])
            }
        return t;
	}

	HoneyComb.GetSourceFromUA = function(){
		
		return { source:"weixin" }
	
	}

	HoneyComb.checkPhoneValid = function(phone){
		
		return /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|110)[0-9]{8}$/.test(phone);

	}

	HoneyComb.sendEvent = function(eventName, attrs){
		console.log(eventName);
	}

	HoneyComb.doLogin = function(data,callback){
		
		var _d = {
			code: 0,
			token: ""
		};

		callback(_d);

	}

	HoneyComb.getRecommendData = function(data,callback){
		
		var _d = {
			code: 0,
			recommend_count: 50,
			rebate_coupon_amount :200,
			rebate_cash_amount:100
		}

		callback(_d);

	}

	HoneyComb.getBigData = function(data,callback){
		
		var _d = {

			code: 0,
			idiomsList:[
			{
					id: 5,
					name: '秉烛夜游'
				},
				{
					id: 6,
					name: '游山玩水'
				},
				{
					id: 7,
					name: '水泄不通'
				},
				{
					id: 8,
					name: '同前最后'
				},
				{
					id: 9,
					name: '后拥前呼'
				},
				{
					id: 10,
					name: '胡越同舟'
				},
				{
					id: 11,
					name: '秉烛夜游'
				},
				{
					id: 12,
					name: '游山玩水'
				},
				{
					id: 13,
					name: '水泄不通'
				},
				{
					id: 14,
					name: '同前最后'
				},
				{
					id: 15,
					name: '后拥前呼'
				},
				{
					id: 16,
					name: '胡越同舟'
				},
				{
					id: 17,
					name: '骤风急雨'
				},
				{
					id: 18,
					name: '雨过天晴'
				},
				{
					id: 19,
					name: '轻歌曼舞'
				}

			],
			rankList:[
			{
				id: 2,
				num: 14550,
				rank: 3
			},
			{
				id: 4,
				num: 54561,
				rank: 2
			},
			{
				id: 9,
				num: 108455,
				rank: 1
			},
			],
			myTeam:{
				rank: 2,
				num: 54561,
				myNum: 25
			},
			lastIdiom: "轻歌曼舞",
			lastIdiomWord: ['wu']
		}

		callback(_d);

	}


	HoneyComb.getBigData1 = function(data,callback){
		
		var _d = {

			code: 0,
			idiomsList:[
				{
					id: 1,
					name: '四通八达'
				},
				{
					id: 2,
					name: '大步流星'
				},
				{
					id: 3,
					name: '四通八达'
				},
				{
					id: 4,
					name: '大步流星'
				}
			],
			rankList:[
			{
				id: 2,
				name: "车内办公狂",
				num: 143,
				rank: 3
			},
			{
				id: 4,
				name: "深夜加班党",
				num: 1123,
				rank: 2
			},
			{
				id: 9,
				name: "路痴俱乐部",
				num: 4123,
				rank: 1
			},
			],
			myTeam:{
				rank: 1,
				num: 4123,
				myNum: 25
			},
			lastIdiom: "轻歌曼舞",
			lastIdiomWord: "wu"
		}

		callback(_d);

	}

	HoneyComb.getCampaignData = function(data,callback){
		
		var _d = {
			code: 0,
			re_teamId: "",
			lead_teamId: "" ,
			teamlist:[
				{
				   	id: 1,
					name: "出行小鲜肉",
				},
				{
				   	id: 3,
					name: "副驾演说家",				
				},
				{
				   	id: 6,
					name: "守时好拼客",
				}
			]
		}

		callback(_d);
	}

	HoneyComb.setLeadData = function(data,callback){
			
		var _d = { code:0 };

		callback(_d);

	}
}
