const layer = {
	/**
	* 팝업 호출 
	*
	* @param String url 팝업 URL
	* @param Integer width 팝업 너비
	* @param Integer height 팝업 높이 
	*  #layer_popup 
	*  #layer_dim -> 레이어 배경
	*/
	popup : function(url, width, height) {		
		if (!url) return;
		
		width = width || 1200;
		height = height || 800;
		
		/** 없는 경우 추가 */
		if ($("#layer_dim").length == 0) {
			$("body").append("<div id='layer_dim'></div>");
		}
		
		if ($("#layer_popup").length == 0) {
			$("body").append("<div id='layer_popup'></div>");
		}
		
		let $layerDim = $("#layer_dim");
		let $layerPopup = $("#layer_popup");
		
		$layerDim.removeClass("dn");
		$layerPopup.removeClass("dn");
		
		$layerDim.css({
			position: "fixed",
			width: "100%", 
			height: "100%",
			top: 0,
			left: 0,
			background : "rgba(0,0,0,0.7)",
			zIndex : 100,
			cursor : "pointer",
		});
		
		const xpos = parseInt(($(window).width() - width) / 2);
		const ypos = parseInt(($(window).height() - height) / 2);
		$layerPopup.css({
			position: "fixed",
			width : width + "px",
			height : height + "px",
			left : xpos + "px",
			top : ypos + "px",
			background : "#ffffff",
			zIndex: 101,
			border : "1px solid #dddddd",
			borderRadius : "20px",
			//overflow: "hidden",
		});
		
		$.ajax({
			url : url,
			type : "get",
			dataType : "text",
			success : function(res) {
				//console.log(res);
				$layerPopup.html(res);
			},
			error : function(err) {
				console.error(err);
			}
		});
		
	},
	/**
	* 팝업 닫기 
	*
	*/
	close : function() {
		$("#layer_dim, #layer_popup").remove();
	}
};




$(function() {
	$(".icon").click(function () {				
		
		const matchid = Object.values($(this).data())[0];
		//console.log(matchid);
		layer.popup('/match?matchId='+matchid);
	});
	
	$("body").on("click", ".hteam_arrow", function() {
		console.log("홈팀 화살표클릭");
		const team = Object.values($(this).data())[0];
		const matchId = Object.values($(this).data())[1];
		console.log(team);
		console.log( matchId);
		let match = $(".matchInfo");
		match.removeClass("dn");
		match.addClass("dn");
		
		$.ajax({
			url : '/squad?matchId='+matchId+'&team='+team,
			type : "get",
			dataType : "html",
			success : function(res) {
				console.log(res);
				$(".squadbox").replaceWith(res);
				let hometeam = $("#popup_hometeam");
				let arrow = $(".arrow");
				arrow.removeClass("dn");
				arrow.addClass("dn");
				hometeam.removeClass("dn");
				let go_detail= $(".go_detail.right");
				go_detail.removeClass("dn");
			},
			error : function(err) {
				console.error(err);
			}
		});
		
		
	});
	
	$("body").on("click", ".ateam_arrow", function() {
		console.log("어웨이팀 화살표클릭");
		const team = Object.values($(this).data())[0];
		const matchId = Object.values($(this).data())[1];
		console.log(team);
		console.log( matchId);
		let match = $(".matchInfo");
		match.removeClass("dn");
		match.addClass("dn");
		
		$.ajax({
			url : '/squad?matchId='+matchId+'&team='+team,
			type : "get",
			dataType : "html",
			success : function(res) {
				//console.log(res);
				$(".squadbox").replaceWith(res);
				let awayteam = $("#popup_awayteam");
				let arrow = $(".arrow");
				arrow.removeClass("dn");
				arrow.addClass("dn");
				awayteam.removeClass("dn");
				let go_detail= $(".go_detail.left");
				go_detail.removeClass("dn");
			},
			error : function(err) {
				console.error(err);
			}
		});
	});
	
	$("body").on("click", ".go_detail", function() {
		let hometeam = $("#popup_hometeam");
		hometeam.removeClass("dn").addClass("dn");		
		let awayteam = $("#popup_awayteam");
		awayteam.removeClass("dn").addClass("dn");		
		let match = $(".matchInfo");
		match.removeClass("dn");
		let go_detail = $(".go_detail");
		go_detail.removeClass("dn");
		go_detail.addClass("dn");
		let arrow = $(".arrow");
		arrow.removeClass("dn");
	});
	
	$("body").on("click", "#layer_dim", function() {
		layer.close();
	});
	/*
	$("body").on("mouseenter", ".player_wrap dd.player_name" ,function(){
		console.log("마우스 들어옴!");
		$(this).closest(".player").find("img.player_img").removeClass("dn");
	});
	$("body").on("mouseout", ".player_wrap dd.player_name" ,function(){
		console.log("마우스 나감!");
		$(this).closest(".player").find("img.player_img").addClass("dn");
	});
	*/
});
