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

	/*window.confirm = function(sMessage, title){
		 var e = window.event || window.confirm.caller.arguments[0];
		var markup =  '<div class="custom-confirm alert-bar animated pulse" >';
			markup += '	<div class="alert-wrapper">';
			markup += '		<div class="alert alert-info" role="alert">';
			markup += '			<span class="ng-binding"><b class="ng-binding">NOTICE:</b> '+sMessage+'</span>';
			markup += '			<div class="pull-right">';
			markup += '				<button class="btn btn-sm btn-default">NO</button>';
			markup += '				<button class="btn btn-sm btn-primary">YES</button>';
			markup += '			</div>';
			markup += '		</div>';
			markup += ' </div>';
			markup += '</div>';

			angular.element($body).append(markup);
			console.log(e);
		return false;

	}*/

})(angular);
