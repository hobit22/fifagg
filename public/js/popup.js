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
			overflow: "hidden",
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
	/*
	$("body").on("click", ".hteam_arrow", function() {
		console.log("화살표클릭");
		let match = $(".matchDetail");
		match.removeClass("dn");
		match.addClass("dn");
		let hometeam = $("#popup_hometeam");
		hometeam.removeClass("dn");		
	});
	
	$("body").on("click", ".ateam_arrow", function() {
		console.log("화살표클릭");
		let match = $(".matchDetail");
		match.removeClass("dn");
		match.addClass("dn");
		let awayteam = $("#popup_awayteam");
		awayteam.removeClass("dn");		
	});
	
	$("body").on("click", ".go_detail", function() {
		let hometeam = $("#popup_hometeam");
		hometeam.removeClass("dn").addClass("dn");		
		let awayteam = $("#popup_awayteam");
		awayteam.removeClass("dn").addClass("dn");		
		
		
		let match = $(".matchDetail");
		match.removeClass("dn");
		
		
	});
	*/	
	
	$("body").on("click", "#layer_dim", function() {
		layer.close();
	});
	
});