
	var d = d||{};

	d.rem = parseFloat($('html').css('font-size'));

	d.nowPage = 0;

	d.key = true;

	d.teamNames = {
		name_1:'出行小鲜肉',
		name_2:'车内办公狂',
		name_3:'副驾演说家',
		name_4:'深夜加班党',
		name_5:'认路活导航',
		name_6:'守时好拼客',
		name_7:'公交小能手',
		name_8:'出行老司机',
		name_9:'路痴俱乐部',
		name_10:'低碳出行者'
	}

	d.setRem = function(){
		$("html").css('font-size',d.rem + 'px !important')
		$(".p5-answer").css({width:innerWidth,height:innerHeight});
	}

	d.getRankList = function(rankList){

		var list = d.sortD(rankList,'rank')
			teamNames = d.teamNames;

		list.forEach(function(e,i,a){

			e.name = teamNames['name_'+e.id];

		});

		return list;

	}


	d.timeout = function(time,func){

		var _s = setTimeout(function(){

			func();
			clearTimeout(_s);

		},time);

	};


	d.sort = function(data){

		return data.sort(function(a,b){return b.id - a.id});

	}

	d.sortD = function(data,s){

		return data.sort(function(a,b){return a[s] - b[s]});

	}

	d.boatPath = {

		now:0,
		last:0,
		sum:0,
		one:[{x:8,y:7,el:'boat-r1'},{x:-4,y:2.3,el:'boat-r2'},{x:-9,y:4,el:'boat-r4'},{x:0,y:0,el:'boat-r6'}],
		two:[{x:8,y:7,el:'boat-r1'},{x:-4,y:2.3,el:'boat-r2'},{x:7,y:4,el:'p2-boat-3'},{x:-5,y:5.3,el:'p2-boat-4'}
			,{x:-9,y:4,el:'boat-r4'},{x:0,y:0,el:'boat-r6'}],
		timeout:100

	}


	d.boatTo = function(n){


		var boats = $('.boat-run'),
			path = d.isInputPhone?d.boatPath.two:d.boatPath.one,
			that,el;

		boats.forEach(function(el){

			d.whichTranEvent('transition',el,function(e){

				if(d.boatPath.now-d.boatPath.last == d.boatPath.sum){

					d.removeRun(path[d.boatPath.last].el);
					d.boatPath.last = d.boatPath.now;
					d.boatPath.sum = 1;


				}else{
					d.boatPath.now == path.length - 1&&(d.boatPath.timeout = 800);
					setTimeout(function(){
						d.key = true;
						that = path[d.boatPath.now];
						el = $('.'+that.el);
						el.css('transform','translate3d('+that.x+'rem,'+that.y+'rem,0)');
						el.find('.msg-all').removeClass('hide');
						d.boatPath.now >= path.length-1 ?'':d.boatPath.now++;
						$(".audio-wrap").removeClass('audio-opacity');
						if(d.boatPath.now == path.length - 1){
							d.timeout(2000,function(){

								$(".team-foucs").removeClass('hide');
							
							});
							
						}
					},d.boatPath.timeout);
				}

				});

		});

	}

	d.removeRun = function(el){

		var animations = d.animations;
		animations.forEach(function(e,i,a){
			if(e.el == el){
				a[i] = "";
			};
		});
	}

	d.addRun = function(el){

		var animations = d.animations;
		animations.forEach(function(e,i,a){
			if(e.el == el){
				a[i].isRun = true;
			};
		});

	}


	d.gotoRun = function(sum){

		d.boatPath.sum = sum;
		var path = d.isInputPhone?d.boatPath.two:d.boatPath.one,
			_el = path[d.boatPath.now].el;
		
		d.addRun(_el);
		var el = $('.'+_el);

		el.css('transform','translate3d('+path[d.boatPath.now].x+'rem,'+path[d.boatPath.now].y+'rem,0)');
		el.find('.msg-all').removeClass('hide');
		d.boatPath.now++;
		$(".audio-wrap").addClass('audio-opacity');

	}

	
	d.whichTranEvent = function(type,el,func){
		var _t,_key,_nowType,
		_el = el,
		_types = {
			transition:{
				'transition':'transitionend',
				'WebkitTransition':'webkitTransitionEnd'
			},
			animation:{
				'animation':'animationend',
				'WebkitAnimation':'webkitAnimationEnd'
			}
		}
		
 		_nowType = _types[type];

		for(_t in _nowType){
			(_el.style[_t] !== undefined)&&(_key = _nowType[_t]);
		}

	    _t&&el.addEventListener(_key,func);

	};


	d.resetLayout = function(s,n){


		var _rem = innerHeight,
			_el;
		$(s).each(function(e,i){

			_el = $(i);
			_el.css('top',(parseFloat(_el.css('top')) + _rem) + 'px');

		});

	};

	d.gotoDown = function(){

		var _rem = d.nowPage - innerHeight; 

		$('#slide-wrap').css('transform','translate3d(0,'+ (-_rem)+'px,0)');

		d.nowPage = _rem;
		d.nowIndex--;

	}


	d.gotoPage = function(n){

		var _rem = innerHeight + d.nowPage;
		d.nowIndex = d.nowIndex||1;

		$('#slide-wrap').css('transform','translate3d(0,'+ (-_rem)+'px,0)');

		d.nowPage = _rem;
		HoneyComb.sendEvent('Page'+d.nowIndex);
		d.nowIndex++;

	}

	d.gotoP6 = function(){

		$("#slide-wrap").css('margin-top',-innerHeight+'px');

	}

	d.gotoP7 = function(){

		$("#slide-wrap").css('margin-top',-innerHeight*2+'px');

	}

	d.initKeyboard = function(callback){

		d.userPhone = '';

		$("#phone-lable").find('li').click(function(e){

			var data = $(this).attr('data'),
				up = d.userPhone;
			if(data == 'back'){

				d.userPhone = up = up.substr(0,up.length-1);
				$('.phone-n').text(d.userPhone.substring(0,11));

			}else if(data == 'ok'){

				callback($('.phone-n').text());

			}else{
				d.userPhone += data;
				d.userPhone = d.userPhone.substring(0,11);
				$('.phone-n').text(d.userPhone.substring(0,11));
			}

		});

	};


	d.isNewUser = function(data){

		if(data.isNew&&d.isInputPhone){
			//新用户 展示新用户券
			$(".input-bg").attr('src','image/new_user.png');
			$(".input-n").remove();
			$(".red-u").removeClass('hide');
		}else{
			$(".input-bg").attr('src','image/old_user.png');
		}

	}

	d.toChangeListBoat = function(r){
		
		var isUpdata = d.upDataList(r);
		if(!isUpdata)return false;
		d.nowBoatIndex = d.nowBoatIndex || 0;
		
		var rem = d.rem,
			_that,_data;
		$(".b-list").forEach(function(el){
			_that = $(el);
			_data = _that.css('transform').replace(/[^0-9\-,-.]/g,'').split(',');
			_that.css('transform','translate('+(_data[0]*1 + r * rem * 8)+'px,'+ (_data[1]*1 + (-r) * rem * 5)+'px)');
		});

		d.createBoat(r);

	}

	d.createBoat = function(r){

		var n,
			f = d.isInputPhone?'':'-1';
			list = $('.b-list'),
			wrap = $(".b-list-wrap");

		if(r==1){
			n = 5;
			list.last().remove();
			wrap.prepend('<img class="b-list b-list-'+n+f+'" src="image/idlist.png" />');
		}else{
			n = 4;
			list.eq(0).remove();
			wrap.append('<img class="b-list b-list-'+n+f+'" src="image/idlist.png" />');
		}
		
	}


	d.upDataList = function(k){
		
		//d.getIdioms();
		var list = d.sort(d.list),
			f = d.flastIdiom,
			b = d.blastIdiom,
			show = [],
			key = true;


		if(k == 1){

			if(b>=list.length-5){
				f = list.length - 5;
				b = list.length;
				$(".up").addClass('up-no');
			}else{
				f = f + 5*k;
				b = b + 5*k;

			}
			
		}else{
			$(".up").removeClass('up-no');
			if(f <= 5){
				f = 0;
				b = 5;
				
			}else{
				f = f + 5*k; 
				b = b + 5*k;
				
			}
		}

		show = list.slice(f,b);

		$(".idioms-name").text('');
		$('.idioms-p').addClass('hide');
		show.forEach(function(e,i,a){
			// $(".idioms-id").eq(4-i).text(e.id);
			$(".idioms-name").eq(4-i).text(e.name).removeClass('hide');
			$('.idioms-p').eq(4-i).removeClass('hide');
		});

		if(d.flastIdiom == f && d.blastIdiom == b){
			key = false;
		}

		d.flastIdiom = f;
		d.blastIdiom = b;

		return key;

	}


	//GET 
	d.getIdioms = function(){
		var n = d.sortD(d.list,'id')[0].id;

		if(n > 1&&!d.isNoMore){
			HoneyComb.getBigData({
				token: d.token||'',
				phone: d.userPhon||'',
				data: {
					teamId: d.teamData.lead_teamId,
					idiomsId: n,
					size:30
				}
			},function(data){

				d.isError(data);

				if(data.idiomsList.length < 30){
					d.isNoMore = true;
				}

				d.list = d.list.concat(data.idiomsList);

			});	
		}

	}


	d.sendMsgCode = function(data,name,callback){

		var key = false,
			el = $(".idioms-thank"),
			info;


		switch(data.status)
		{
			case 2200:
				info = '不符合接龙的规则，成语无效哦';
				d.getLastIdiom();
			break;
			case 2201:
				info = '太慢了，成语被抢了！';
				d.getLastIdiom();
			break;
			case 2202:
				info = '不能自己接自己的成语哦！';	
				d.keyIndex = 8;
				d.setRank(data.status);
				d.timeout(1000,function(){
					$(".p5-answer").addClass('hide');
					$("#slide-wrap").removeClass('hide');
					d.gotoP7();
				});

				var name = d.teamNames['name_'+d.teamData.lead_teamId];
				HoneyComb.setShare({
					title: '冠军大奖近在咫尺？成语接龙'+name+'战队邀你加入！',
					icon:'http://static.campaign.xiaojukeji.com/80/image/share_icon.png',
					content: '世上最遥远的距离，或许就是奖励近在眼前，而我们却无能为力。'+name+'战队距离终点一步之遥！加入战队，大奖等你来抢！'
				},false);

			break;
			default:
			d.setRank(data.status);
			callback(data,name);
			
		}

		d.changeTips(info);

	}


	d.getLastIdiom = function(){

		HoneyComb.getBigData({
			token: d.token||'',
			phone: d.userPhone||'',
			data: {
				teamId: d.teamData.lead_teamId,
				idiomsId: '',
				size:30
			}
		},function(data){

			d.isError(data);
			d.list = data.idiomsList;
			d.lastIdiom = data.lastIdiom;
			d.lastIdiomWord = data.lastIdiomWord;
			$(".lastIdiom").text(data.lastIdiom);
			$(".p5-tips").find('span').text('‘'+data.lastIdiom[3]+'‘');

		});		

	}

	d.setRank = function(status){

		var name = d.teamData.lead_teamId;

		HoneyComb.getBigData({
			token: d.token||'',
			phone: d.userPhone||'',
			data: {
				teamId: d.teamData.lead_teamId,
				idiomsId: '',
				size:30
			}
		},function(data){

			var list = d.sort(data.idiomsList);

			$(".idioms-thank").find('span').eq(1).text(data.myTeam.num);
			
			var rank = d.getRankList(data.rankList),
				diff = data.myTeam.num - rank[1].num,
				tdiff = rank[0].num - data.myTeam.num,
				el;
		
			$(".list-b-boat").forEach(function(e,i){
				el = $(e);
				el.find('.boat-info-name').text(rank[i].name);
				el.find('.boat-info-sum').text(rank[i].num+'米');
			});

			var diffO = '你所在的'+ d.thisName +'战队目前排名第一，第二名的队伍只落后你们'+(data.myTeam.num - rank[1].num)+'米了！快邀请好友来助力，一同瓜分红包大奖！';
			var diffT = '你所在的'+ d.thisName +'队伍目前与其他队伍并列第一哦，快邀请好友来助力，一同瓜分红包大奖。';


			var tdiffO = '你所在的团队'+ d.thisName +'距离最终大奖只差'+(rank[0].num - data.myTeam.num)+'米,召唤好友来为你的团队助力吧!';
			var tdiffT = '你所在的'+ d.thisName +'队伍目前与其他队伍并列第一哦，快邀请好友来助力，一同瓜分红包大奖。';
			
			if(data.myTeam.rank == 1){
				$(".myteam-rank").text(diff == 0?diffT:diffO);
			}else{
				$(".myteam-rank").text(tdiff == 0?tdiffT:tdiffO);
			}

			if(status == '2103'&&status == '2110'){

				$('.idioms-thank').text('红包已存入您的滴滴“我的钱包-代金券”！您已帮助'+ d.teamNames('name_'+name) +'冲刺到'+( data.myTeam.num+1)+'米');

			}else{

				$('.idioms-thank').text('您已完成接力！需要等其他小伙伴接上你的成语才可以继续接力哦！');

			}
		});
		

	}

	d.getRandom = function(){

		var k = [[0.5,4],[3,7],[6,11]];
		var r = [];
		var a;

		for (var i = 0; i < 3; i++) {
			a = d.randomNum(k[i][0],k[i][1]);
			r.push({id:a,name:d.teamNames['name_'+a]});
		}

		return r;


	}


	d.randomNum = function(minnum, maxnum){

		var _a = Math.floor(minnum + Math.random() * (maxnum - minnum));

    	return _a == 0?1:_a;

	}

	d.isError = function(data){

		switch(data.code)
		{
			case 0:
				//console.log('接口正常!');
			break;
			case 1:
				window.location.href = 'error.html';
			break;

		}

	}

	d.changeTips = function(info){
		if(!info)return false;
		var tip2 = $(".p5-tips-2"),
			tip = $(".p5-tips");
		tip2.text(info).removeClass('hide');
		tip.addClass('hide');

		d.timeout(1200,function(){
			tip2.text('').addClass('hide');
			tip.removeClass('hide');
		});
	}


	d.requestAnimationFrame = function(){

		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; 
		
		setTimeout(function(){
			requestAnimationFrame(d.run);
		},200);


	};

	d.run = function(){
		var _d = d.animations;


		d.animations.forEach(function(e,i,a){
			if(!e.isRun)return false;
			e.temp >= e.sum ? (e.temp = 0):e.temp++;

			$('.'+e.el).css('background-position',100 - (100 / e.sum *e.temp) + '% 0');

		});

		d.requestAnimationFrame();

	}
	d.animations = [
		{el:'boat-r1',sum:3,temp:0,isRun:false},
		{el:'p5-bg',sum:2,temp:0,isRun:true},
		{el:'input-top',sum:1,temp:0,isRun:true},
		{el:'p2-boat-1',sum:3,temp:0,isRun:false},
		{el:'p2-boat-2',sum:3,temp:0,isRun:false},
		{el:'p2-boat-3',sum:3,temp:0,isRun:false},
		{el:'p2-boat-4',sum:3,temp:0,isRun:false},
		{el:'boat-r4',sum:3,temp:0,isRun:false},
		{el:'boat-r5',sum:3,temp:0,isRun:false},
		{el:'p5-boat',sum:3,temp:0,isRun:true},
		{el:'b-19',sum:1,temp:0,isRun:true},
		{el:'b-12',sum:1,temp:0,isRun:true},
		{el:'b-15-1',sum:1,temp:0,isRun:true}
	];








	


	