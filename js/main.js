	
	$('html,body').on('touchmove',function(e){
        e.preventDefault();
    });

    document.addEventListener('WeixinJSBridgeReady',function(){
    	
    	document.getElementById('audio').play();

    },false);

    $(".yes-btn").click(function(){
    	if(d.key){
    		d.key = false;
        	d.gotoPage();
    		d.gotoRun(4);	
    	}
    });

    $(".boat-1, .boat-2, .boat-3").click(function(){

    	d.teamData.lead_teamId = $(this).attr('data');
    	d.thisName = d.teamNames['name_'+d.teamData.lead_teamId];
    	getTeamInfo(d.teamData);

    	d.timeout(600,function(){
    		d.gotoP6();
    		$("#slide-wrap").addClass('hide');
    	});

    	$(".b-13").addClass('toTop-2');
    	$(".b-15, .b-15-1").addClass('toTop-3');
    	$(".b-16, .b-17").addClass('toBottom-1');
    	$(".boat-1, .boat-2, .boat-3, .boat-r4, .boat-r5, .chose").addClass('toOpacity');
    	$(".idioms-thank").find('span').eq(0).text(d.thisName);
    
    });

    $(".boat-r1").click(function(){
    	if(d.key){
			d.keyIndex = 2;
    		d.keyPan = false;
			d.gotoPage();
			d.gotoRun(2);	
			$(".arrow, #orientLayer").addClass('hide');
    	}
    });

    $(".audio-wrap").click(function(){

    	var el = $(this),
    		audio = document.getElementById('audio');
    	if(el.hasClass('audio-close')){
    		audio.play();
    		el.removeClass('audio-close');
    	}else{
    		audio.pause();
    		el.addClass('audio-close');
    	}
    });

    $(".btn-send").click(function(){
    	d.keyIndex = 6;
    	var name = $("#idIdiom").val();
    	var key = checkHand(name);
    	if(key){
	    	HoneyComb.acceptShare({
	    		phone:d.userPhone||'',
				token:d.token||'',
				isAuto:false,
				strategy_factor:{
					idioms:name,
					team_id:d.teamData.lead_teamId
				}
	    	},function(data){
	    		d.isError(data);
	    		d.sendMsgCode(data,name,turnP7);

	    	});
    	}else{
    		$("#idIdiom").val('');
    	}

    });

	$("#idIdiom").focus(function(){

		$(this).attr('placeholder','');
	
	});

	$("#idIdiom").blur(function(){

		$(this).attr('placeholder','点击输入成语');
	
	});

	FastClick.attach(document.body);

	var wrap = new Hammer(document.getElementById("content"));

	d.keyIndex = 1;
	wrap.get('pan').set({ direction: Hammer.DIRECTION_ALL });

	wrap.on("pandown", function(ev) {
		
		if(d.keyIndex == 7){
			d.keyIndex = 6;
			d.gotoDown();
		}

	});

	wrap.on("panup", function(ev) {
		if(d.keyIndex==1){
    		d.keyIndex = 2;
    		d.keyPan = false;
			d.gotoPage();
			d.gotoRun(2);	
			$(".arrow").addClass('hide');
    	}else if(d.keyIndex == 6){
    		d.keyIndex = 7;
    		d.gotoPage();
    	}
	});



    function checkHand(idiom){

		var code = CheckIdiom.doCheck(idiom,d.lastIdiom,d.lastIdiomWord);

		var key = false,
			info;
		switch(code)
		{
			case 1:
				info = '成语检测成功';
				key = true;
			break;
			case 2:
				info = '字典未初始化';
				key = false;
			break;
			case 3:
				info = '您的输入有误哦';
				key = false;
			break;
			case 4:
				info = '这好像不是一个成语哦';
				key = false;
			break;
			case 5:
				info = '不符合同音或同字的接龙规则';
				key = false;
			break;
		}

		d.changeTips(info);
		return key;

    }

    $(".rank-btn").click(function(){
    	d.gotoPage();
    	$("#slide-wrap").css('transition-duration','2s');
    	d.keyIndex = 7;
    });

    $(".up").click(function(){
    	d.toChangeListBoat(1);
    });

    $(".down").click(function(){
    	d.toChangeListBoat(-1);
    });

    $(".rule-btn").click(function(){

    	$(".other, .rule-r").removeClass('hide');

    });

    d.redMove = true;
    $(".share").click(function(){
  /*
    	if(d.redMove){
    		d.redMove = false;
    		$(".h-4").removeClass('hide');
	    	d.timeout(1500,function(){
	    		d.redMove = true;
	    		$(".h-4").addClass('hide');
	    	});
    	}*/
    	
    	if(d.redMove){
    		d.redMove = false;
    		$(".arrow_share").removeClass('hide');
    		$(".b-22").addClass('hide');
	    	d.timeout(2000,function(){
	    		d.redMove = true;
	    		$(".arrow_share").addClass('hide');
	    		$(".b-22").removeClass('hide')
	    	});
    	}

    });

    $(".other").click(function(){
    	$(".other, .rule-r, share-top").addClass('hide');
    });

    $(".rule").click(function(){

    	$(".other, .rule-r").removeClass('hide');

    });


	var loadImgData = [

		'image/b_3.png',
		'image/b_5.png',     
		'image/b_8.png',
		'image/b_12.png',
		'image/bar_bg.png',
		'image/boat_1.png',
		'image/boat_2.png',
		'image/boat_bottom.png',
		'image/boat_last.png',
		'image/chose_1.png',
		'image/chose_2.png',
		'image/idlist.png',
		'image/input_bg.png',
		'image/input_top.png',
		'image/new_user.png',
		'image/old_user.png',
		'image/p5_bg.png',
		'image/p5_bottom.png',
		'image/rule_r.png',
		'image/title.png'

	];

	Teemo.self.setData(loadImgData);

	Teemo.load.start();
	

	Teemo.load.on('loading',function(e){

		var _p = e.nowProgress/e.allProgress;
		$('.loading-b').css('width',8.8*_p + 'rem');
		$("#pre").text(Math.floor(_p*100)+'%');

	});

	Teemo.load.on('complete',function(e){

		document.getElementById('audio').play();
		d.setRem();
		$('#loading').remove();
		$('#content, .audio-wrap').removeClass('hide');
		d.requestAnimationFrame();

		//init
		HoneyComb.init({
			appid:'89048ed3c23fa03d32b1c3fc7fe53aef',
			isNeedLogin:false,
			isNeedPrivateInfo:false,
			role:1,
			channel:'',
			isNeedLeadInfo:false,
			origin_id:'',
			cId:'',
			aId:''
		},function(data){

			d.isError(data);
			HoneyComb.sendEvent('Pageloading');
			HoneyComb.setShare({
				title: '知识就是金钱？成语接龙，大奖等你来抢！',
				icon:'http://static.campaign.xiaojukeji.com/80/image/share_icon.png',
				content: '你是成语大咖？这次给你个机会，用知识点字成金！用智慧制霸全国！'
			},false);
			if(data.token||localStorage.userPhone){
				$('.input-n').remove();
				d.isInputPhone = false;
				$('.p2').remove();
				d.token = data.token;
				d.userPhone = localStorage.userPhone;
				getUserInfo({token:data.token,phone:d.userPhone});

			}else{
				$('.input-n').removeClass('hide');
				d.isInputPhone = true;
				d.resetLayout('.p3, .p4, .p6, .p7',22);
				d.initKeyboard(function(data){

					d.userPhone = data;

					try
					   {
					   localStorage.userPhone = data;
					   }
					catch(err)
					   {
					   	
					   }

					if(HoneyComb.checkPhoneValid(data)){
							
						getUserInfo({phone:d.userPhone});
						d.timeout(2000,function(){
							d.gotoPage();
							d.gotoRun(2);
						});

					}else{
						d.userPhone = '';
						$(".phone-tip").text('请输入正确的手机号!');
						$(".phone-n").text('');
					}
				});
			};
			d.boatTo();
		});	
	});

	

	function getUserInfo(data){

		//新用户发券

		$(".input-n").addClass('hide');
		HoneyComb.acceptShare({
			token:data.token||'',
			phone:d.userPhone||'',
			isAuto:true,
			strategy_factor:{
				idioms:''
			}

		},function(data){

			d.isError(data);
			//展示新用户券信息
			d.isNew = data.isNew;

			d.isNewUser(data);

			HoneyComb.getCampaignData({
				token: d.token||'',
				phone: d.userPhone||''
			},function(data){

				d.teamData = data;
				setUserTeam(data);
				setRefereeTeam(data);
			});

		});

	}

	function setRefereeTeam(data){

		if(data.re_teamId){

			$(".boat-2").attr('data',data.re_teamId)
						.find('.boat-info-name')
						.text(d.teamNames['name_'+data.re_teamId]);
		}


	}

	function setUserTeam(data){

		var id = data.lead_teamId;
		if(id){
			var path = d.boatPath;
			$('.boat-2').addClass('boat-2-1').attr('data',id).find('.boat-info-name').text(d.teamNames['name_'+id]);
			$('.boat-1, .boat-3').addClass('hide');
			$('.chose').eq(1).removeClass('hide');
		}else{
			$('.chose').eq(0).removeClass('hide');
			var team = data.teamlist[0]?data.teamlist:d.getRandom();

			$('.boat-1, .boat-2, .boat-3').forEach(function(e,i){

				$(e).attr('data',team[i].id);
				$(e).find('.boat-info-name').text(d.teamNames['name_'+team[i].id]);

			});
		}

	}


	function getTeamInfo(data){

		HoneyComb.getBigData({
			token: d.token||'',
			phone: d.userPhone||'',
			data: {
				teamId: data.lead_teamId,
				idiomsId: '',
				size:30
			}
		},function(data){

			d.isError(data);
			setIdiom(data);

		});		   
	}


	function setIdiom(data){
		
		var list = d.sort(data.idiomsList),
			name = list[0].name;
		$(".p5-answer").removeClass('hide');
		$("#orientLayer").addClass('hide');
		$(".lastIdiom").text(name);
		$(".p5-tips").find('span').text('“'+name[3]+'”');

		var rank = d.getRankList(data.rankList),
			el;
		$(".list-b-boat").forEach(function(e,i){
			el = $(e);
			el.find('.boat-info-name').text(rank[i].name);
			el.find('.boat-info-sum').text(rank[i].num+'米');
		});

		d.list = list;
		d.lastIdiom = data.lastIdiom;
		d.lastIdiomWord = data.lastIdiomWord;

	}


	function turnP7(data,name){

		var id = parseInt(d.list[0].id) + 1;
		d.list.push({id:id,name:name});

		d.flastIdiom = 0;
		d.blastIdiom = 5;
		d.upDataList(-1);

		$(".p5-answer").addClass('hide');
		$("#slide-wrap, #orientLayer").removeClass('hide');

		var name = d.teamNames['name_'+d.teamData.lead_teamId];
		HoneyComb.setShare({
			title: '冠军大奖近在咫尺？成语接龙'+name+'战队邀你加入！',
			icon:'http://static.campaign.xiaojukeji.com/80/image/share_icon.png',
			content: '世上最遥远的距离，或许就是奖励近在眼前，而我们却无能为力。'+name+'战队距离终点一步之遥！加入战队，大奖等你来抢！'
		},false);

	}


	








