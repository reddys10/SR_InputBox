var app;
var change;
var empty;

define( ["jquery","qlik","text!./styles.css"], function ( $,qlik,cssContent ) {
	'use strict';
  app = qlik.currApp();
  $("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties: {
			version: 1.0,
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 2,
					qHeight: 50
				}]
			}
		},
		//property panel
		definition: {
			type: "items",
			component: "accordion",
			items: {
                addons : {
                    uses : "addons",
                  items:{
                    variablex : {
                            ref : "variablex",
                            label : "Update Variable Name",
                            type : "string",
                            defaultValue : ""
                        },
                     emptyVal : {
                            ref : "emptyVal",
                            label : "default(when empty)",
                            type : "string",
                            defaultValue : "0"
                        }
                  }
                },
				settings: {
					uses: "settings"
				} 
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},

		paint: function ( $element, layout ) {
			var self = this, html = "<div>";
             debugger;
            change =  layout.variablex;
            empty  =  layout.emptyVal; 
          var uId = layout.qInfo.qId;
          
          var iChange = layout.variablex;
          
         var xxx = app.variable.getContent('' + change + '');
          
          html += "<input id='SR_IB_"+ uId +"'"+ "class='SRinput' oninput='update(this.id)' placeholder='Enter your Value' alt='"+change+"'>";
                    html += "</div>";
			        $element.html( html );
		}
	};

} );

function update(inID){
  var inChange=document.getElementById(inID).alt;
debugger;
  if (document.getElementById(inID).value!=""){
  app.variable.setContent( '' + inChange + '', '' + document.getElementById(inID).value + '' );
  }else{
    if(! empty){
      app.variable.setContent( '' + inChange + '', '' + '0' + '' );
    }else{
      app.variable.setContent( '' + inChange + '', '' + empty + '' );
    }
  
  }
  
}
