(function(angular){
	
	var $body =  document.querySelector("body");
	const __DISMISS_ALERT = (function(){
		var str ='__'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
		return str;
	})();
	window[__DISMISS_ALERT] = function(){
		try{
			document.querySelector(".custom-alert").remove();
		}catch(e){

		}
	};

	window.alert = function(sMessage, title){
		window[__DISMISS_ALERT]();
		var markup =  '<div class="custom-alert alert-bar animated shake" >';
			markup += '	<div class="alert-wrapper">';
			markup += '		<div class="alert alert-danger" role="alert">';
			markup += '			<span class="ng-binding"><b class="ng-binding">ALERT:</b> '+sMessage+'</span>';
			markup += '			<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="'+__DISMISS_ALERT+'()">';
			markup += '				  <span aria-hidden="true">&times</span>';
			markup += '		  	</button>';
			markup += '		</div>';
			markup += ' </div>';
			markup += '</div>';

			angular.element($body).append(markup);
			

	}

})(angular);
