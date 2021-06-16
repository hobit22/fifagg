
$(function() {
	$(".more").click(function () {
		console.log("더보기 클릭");
		const match = $(this).closest(".match_wrap").find(".match_summary").last();
		
		const limit = match.data('limit');
		const offset = match.data('offset');		
		const accessId = $(this).closest(".data_wrap").find(".accessId").data('accessid');		
		const id = $(this).closest(".data_wrap").find(".nickname").data('nickname');
		//console.log(id);
		
		const data ={
			limit,
			offset,
			accessId,
			id,
		}
		//console.log(data);
		$.ajax({
			url : '/user',
			type : "post",
			data : data,
			dataType : "json",
			success : function(res) {
				
				console.log(res);
			},
			error : function(err) {
				console.error(err);
			}
		});
		
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
