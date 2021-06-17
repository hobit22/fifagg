
$(function() {
	$(".more").click(function () {
		console.log("더보기 클릭");
		const match = $(this).closest(".match_wrap").find(".match_summary").last();
		const nickname = $(this).closest(".data_wrap").find(".accessId").data('accessid');		
		const id = $(this).closest(".data_wrap").find(".nickname").data('nickname');
		const limit = $(this).data("limit")+10;
		
		const data ={
			limit,
			nickname,
			id,
		}
		const url = "/user?id="+data.id+"&limit="+data.limit;	
		window.location.href = url;
	});
	
	$("body").on("click", ".hteam_arrow", function() {
		//console.log("홈팀 화살표클릭");
		const team = Object.values($(this).data())[0];
		const matchId = Object.values($(this).data())[1];
		//console.log(team);
		//console.log( matchId);
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
});
