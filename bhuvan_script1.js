var dflag = null;
var state = null;
var district = null;
var stateCode = null;
var yearexist =false; // this is flag for level2 existence
var theme = null;

function result()
{
    
	theme1 = getURLParameter('theme1');
	tab1 = getURLParameter('tab1');
	
	//console.log("url parameters...",theme1,"...",tab1);
	if(theme1 == "sisdpPh2" && tab1 =="GetData" && parent.bhuvanusername != 'empty')
	{
		console.log("inside if ", parent.bhuvanusername);
		
		
		//document.getElementById("theme").value;
		var inputElement = document.getElementById("theme");
		inputElement.value = "lulc101619_WebServices,Overlay,GetData_1_State_0_0_0";
		
		var searchDiv = document.getElementById('selectSearchTab');
		searchDiv.className = 'tabbertab tabbertabhide';
		
		var getDataDiv = document.getElementById('selectGetDataTab');
		getDataDiv.className = 'tabbertab';
		
		
		return;
		//var myTabberObj = new tabberObj(); // Create an instance if you haven't already
		//myTabberObj.title = "GetData";
		// You can also pass the event to your navClick function
		
	} else{
		console.log("bhuvan username empty");
		//ajax("loading.php?q=login.php"); 
		//window.location = "../../loading.php?q=login.php";
	}
}
function getURLParameter(name)
{
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

var season = null;
	//----------Tab change---------------------------

	function stats(x)
	{	
	
	
	//parent.measureControls['polygon'].deactivate(); 
	if (parent.measureControls && parent.measureControls.polygon) {
    parent.measureControls.polygon.deactivate();
}
	var themeval = document.getElementById("theme").value;
	
		theme=(themeval.split('_'))[0];
		
		// alert(theme);
	
		if(document.getElementById('states'))
		{
			state = document.getElementById('states').value.split('_')[0];
			stateCode = document.getElementById('states').value.split('_')[5];
		}
		else
		state="";
		switch(x)
		{
		case '6':
			if(document.getElementById('theme').value.split('_')[0] == 'lulc250') 
				ajax("get/getState_stats.php?year="+state,"state_stats");
			else //for lulc50k and fldhz
				ajax("get/getDistricts_stats.php?region=State&theme="+document.getElementById('theme').value+"&stateCode="+stateCode,"dist_stats");
		
		break;
		
		case '5':
		
			if(document.getElementById('theme').value.split('_')[0] == 'lulc') 
				ajax("theme_stats/lulc_"+document.getElementById('theme').value.split('_')[0]+".php?name="+state,"st");
			else if(document.getElementById('theme').value.split('_')[0] == 'lulc250') 
				ajax("theme_stats/lulc_"+document.getElementById('theme').value.split('_')[0]+".php?name="+state+"&state=IN&season=Annual","st"); 
			else
				ajax("theme_stats/lulc_"+document.getElementById('theme').value.split('_')[0]+".php?name="+state+"&state=IN","st");
		break;
		
		
		//------------ CASE for overlay
		
		case 'Overlay':
		
			if(document.getElementById('theme').value.split('_')[0] == 'gm' || document.getElementById('theme').value.split('_')[0] == 'ln')
			ajax("overlay_geom.php?t="+document.getElementById('theme').value.split('_')[0]+"&s="+document.getElementById('states').value.split('_')[0],"ov");	
			else
			ajax("overlay.php","ov");
		
		break;	
		
		
		//----------- CASE for Statistics-------				
		case 'Statistics':		
			document.getElementById('st2').style.display="none";
			document.getElementById('st1').style.display="none";
			var season="Selectfirst";		
			
			if(theme=='er' || theme == 'alk')
				ajax("theme_stats/lulc_"+theme+".php?name="+state,"st");				
			else if(theme == 'lulc' || theme.substring(0,6) == 'lulc50' || theme.substring(0,2) == 'wl' || theme == 'fldhz' || theme.substring(0,2) == 'ld') 
			{		
				state=="Select" || state=="" ?document.getElementById('st1').style.display="none":document.getElementById('st1').style.display="inline"; //30jan2015
				
				if(document.getElementById('districts') && document.getElementById('districts').value != "Select") //30jan2015
				{
					ajax("theme_stats/lulc_"+theme+"_dist.php?name="+document.getElementById('districts').value.split('_')[0],"st");
					document.getElementById("dist_r").checked=true;
					ajax2("get/getDistricts_stats.php?region=State&theme="+document.getElementById('theme').value+"&stateCode="+stateCode+"&district_selected="+document.getElementById('districts').value.split('_')[2],"dist_stats");
				}
				else 
				{
					document.getElementById('dist_stats').innerHTML="";
					ajax("theme_stats/lulc_"+theme+".php?name="+state,"st");
					document.getElementById("state_r").checked=true;
				}		
			} 
					
			//case for lulc 250k
			else if(theme == 'lulc250') 
			{							
				season=document.getElementById('season').value.split('_')[0];
				state=="Select" ||state==""?document.getElementById('st2').style.display="none":document.getElementById('st2').style.display="inline";

				if(document.getElementById('districts') && document.getElementById('districts').value != "Select")
				{		
					
					if (season=='Rabi'|| season=='Kharif')
					{
						//Integration of Rabi_Kharif:for non display of district level statistics in rabi and kharif,calling of lulc_lulc250.php(passing of season parameter too) instead of lulc_lulc250.php..Two times mentioned as code consist of district selection and absence
						document.getElementById("state_r1").style.display="none";
						document.getElementById("state_stats").style.display="none";
						document.getElementById("state_display").style.display="none";
						document.getElementById("country_r").style.display="none";
					}
					else
					{
						document.getElementById("state_r1").style.display="inline";
						document.getElementById("state_stats").style.display="inline";
						document.getElementById("state_display").style.display="inline";
						document.getElementById("country_r").style.display="inline";
					}				

					//Updated on 09-04-2019 -- Addedloading of Ajax after statedropdown population
					document.getElementById("state_r1").checked=true;
					url="get/getState_stats.php?state_selected="+document.getElementById('districts').value.split('_')[2];	

					$.ajax({url: url, success: function(result){
					$("#state_stats").html(result);
					ajax("theme_stats/lulc_"+document.getElementById('theme').value.split('_')[0]+".php?name="+state+"&state="+document.getElementById('districts').value.split('_')[0]+"&season="+document.getElementById('season').value.split('_')[0],"st");

					}});
				}		
				else 
				{				
					//Integration of Rabi_Kharif:for non display of district level statistics in rabi and kharif 

					if (season=='Rabi'|| season=='Kharif')
					{
						document.getElementById("state_r1").style.display="none";
						document.getElementById("state_stats").style.display="none";
						document.getElementById("state_display").style.display="none";
						document.getElementById("country_r").style.display="none";
					}
					else
					{
						document.getElementById("state_r1").style.display="inline";
						document.getElementById("state_stats").style.display="inline";
						document.getElementById("state_display").style.display="inline";
						document.getElementById("country_r").style.display="inline";
					}

					document.getElementById('dist_stats').innerHTML="";
					//	ajax("theme_stats/lulc_"+document.getElementById('theme').value.split('_')[0]+".php?name="+state+"&state=IN"+"&season="+document.getElementById('season').value.split('_')[0],"st");
					ajax("theme_stats/lulc_"+document.getElementById('theme').value.split('_')[0]+".php?name="+state+"&state=IN"+"&season="+document.getElementById('season').value.split('_')[0],"st");

					document.getElementById("country_r").checked=true;
				}
				
			}
			else
			document.getElementById("st").innerHTML="<span class='s10' style='color:RED'>Click on Search tab to select Geography/State/Year first</span>";
		break;
		
		
		//----------- CASE for web services -------
		
		case 'WebServices':
			if(theme == 'wsa' || theme == 'sca') // For WSA and SCA
			{
				var wtemp= document.getElementById("base_ndvi_vf").value;
				if(wtemp=="")
					document.getElementById("ws").innerHTML="<br/><span class='s10' style='color:RED'>First Select Date"; 
				else
				{
					wtemp=wtemp.toString().toLowerCase();
					if(theme=='wsa')
						var lname = theme.toUpperCase()+"_"+wtemp.split(",")[0]+(wtemp.split(",")[1]).substring(2,4);
					else
						var lname = "AWIFS_SCA_"+wtemp.substring(3,9)+wtemp.substring(0,3)+wtemp.substring(12,14);
					ajax2("wmsurl/wmsurl_wsa.php?lname="+lname,"ws");
				}
			}
			else
			{
				if(themeval.split("_")[6]==1)
					ajax("wmsurl/wmsurl.php?state="+state+"&theme="+theme,"ws"); 
				else if(yearexist)
					ajax("wmsurl/wmsurl_"+theme+".php?state="+state+"&year="+document.getElementById('level2').value,"ws");
				else
				{
					if(theme=='lulc250')
						ajax("wmsurl/wmsurl_"+theme+".php?state="+state+"&season="+document.getElementById('season').value.split('_')[0],"ws"); 
					else
						ajax("wmsurl/wmsurl_"+theme+".php?state="+state,"ws"); 
				}
			}
		break;
		
		
		// --------- CASE for metadata -----------		
		case 'Metadata':
			if(theme=='wsa')
			{
				var wtemp= document.getElementById("base_ndvi_vf").value;
				if(wtemp=="")
					document.getElementById("md").innerHTML="<br/><span class='s10' style='color:RED'>First Select Date"; 
				else
				{
					wtemp=wtemp.toString();
					ajax2("metadata/metatile_"+theme+".php?theme=WSA&yr="+wtemp.split(",")[0]+"&mn="+(wtemp.split(",")[1]).substring(2,4),"md");
				}
			}
			else if(yearexist)
				ajax("metadata/metatile_"+theme+".php?tile="+state+"&year="+document.getElementById('level2').value,"md");
			else
				ajax("metadata/metatile_"+theme+".php?tile="+state,"md");
		break;
		
				
		//--------------- CASE for analysis -----------		
		case 'Analysis':		
			if(document.getElementById("mapbutton").src.match('view.png')=='view.png')
			{
				document.getElementById("an").innerHTML="<span class='s10' style='color:RED'>First view the Thematic map of any Geography/State/Year using Search tab</span>";
				document.getElementById("an_buttons").innerHTML="";
			}
			else
			{
				var temp_an = "<div id='an_buttons_aoi'><input type=\"button\" value=\"Draw AOI\" Title=\"Click to draw AOI\"  name=\"type\" id=\"polygon\" onclick=\"parent.toggleControl(this);\" /> <input id=\"anlys_aoi\" type=\"button\" value=\"Analyze\" Title=\"Click to analyse the drawn AOI \" onclick=\"analysis(state);\" /> </div> ";
				
				if(theme.substring(0,2) == 'wl')
					temp_an="<input type=\"radio\" checked=\"\" name=\"drw_aoi\" onclick=\"document.getElementById('an_buttons_aoi').style.display='inline',document.getElementById('an').innerHTML=''\" > Draw AOI <input type=\"radio\" name=\"drw_aoi\" onclick=\"queryshell_start(),SubmitReq('queryshell/query_"+theme+".php?state="+state+"','an') \" > Query Shell <br/><br/>" + temp_an;
				
				document.getElementById("an_buttons").innerHTML= temp_an; 
				document.getElementById("an").innerHTML="";
			}		
		break;
		
		
		// ---- CASE for layer loading on map -------
		case '4':		
			document.getElementById("lg").style.display="none";
			if(theme == 'wsa' || theme == 'sca') //for WSA and SCA
			{
				var wtemp= document.getElementById("base_ndvi_vf").value;				
				if(wtemp=="")
					document.getElementById("lg").innerHTML="<br/><span class='s10' style='color:RED'>First Select Date"; 
				else
				{
					wtemp=wtemp.toString().toLowerCase();
					if(theme=='wsa')
						var lname = theme.toUpperCase()+"_"+wtemp.split(",")[0]+(wtemp.split(",")[1]).substring(2,4);
					else
						var lname = "AWIFS_SCA_"+wtemp.substring(3,9)+wtemp.substring(0,3)+wtemp.substring(12,14);
					
					parent.wms_load(lname,"https://bhuvan-noeda.nrsc.gov.in/tilecache/tilecache.py",false);		
					ajax2("../analysis/wsa/"+theme+".php","lg");
					document.getElementById("mapbutton").src="img/remove.png";
					parent.basemap.setVisibility(false);
					document.getElementById('docSpan').innerHTML="1. Technical document&nbsp;<a href=\"/2dresources/thematic/WSA/wba.pdf\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download PDF, size : 2.01MB\" src=\"img/download.gif\"></a> ";
					document.getElementById('docSpan').style.display="inline";
				}
			}
			//For WSA ends above
			else if(state=="Select" || state == "") 
				document.getElementById("lg").innerHTML="<br/><span class='s10' style='color:RED'>First select Geography/State/Year</span>"; 					
			else
			{
				var app="<br/><img src='https://bhuvan-ras2.nrsc.gov.in/cgi-bin/flood.exe?version=1.1.1&service=WMS&request=GetLegendGraphic&layer="+state.toLowerCase()+"_river&format=image/png' align='center'/>";	
				var arr=document.getElementById('states').value.split('_');
				
				//console.log(yearexist,"year");
				if(yearexist==true)
				{   
			        //console.log("inside year");
					var year = document.getElementById('level2').value;
					
					if(theme == 'gm' || theme == 'ln') //for geomorphology and lineament
					{	
						parent.basemap.setVisibility(false);
						
						if(theme == 'gm')
							parent.wmts_load('geomorphology:'+state,theme.toUpperCase(),arr[1],arr[2],arr[3],arr[4],'_'+theme.toUpperCase()+'50K_0506',true);
						if(theme == 'ln')
							parent.wmts_load('lineament:'+state,theme.toUpperCase(),arr[1],arr[2],arr[3],arr[4],'_'+theme.toUpperCase()+'50K_0506',true);	
					
						parent.map.events.register( "moveend", parent.map, moveChanged );
						moveChanged();
						document.getElementById('drawSpan').style.display="inline";
						parent.loadwms("stateov",parent.urlArray4,"admin:INDIA_STATE");
						
						document.getElementById("mapbutton").src="img/remove.png";
						if(!(year=="All" || year == "")) 
						loadingdistzoom(year.split("_")[0],year.split("_")[1]);		
					}
					else
					{
						if(year=="Select" || year == "") 
						{
							if(document.getElementById('theme').value.split('_')[0] == 'nuis')
							document.getElementById("lg").innerHTML="<br/><span class='s10' style='color:RED'>First select town</span>"; 
							else if(document.getElementById('theme').value.split('_')[0] == 'lulc10') //for lulc10
							document.getElementById("lg").innerHTML="<br/><span class='s10' style='color:RED'>First select District</span>";  
							else
							document.getElementById("lg").innerHTML="<br/><span class='s10' style='color:RED'>First select Year/Month</span>"; 
						}
						else
						{  
							parent.basemap.setVisibility(false);
							var coords=year.split("_");				
							if(theme == 'nuis')
							{ 
								var c=coords[4]+"_"+coords[3]+"_"+coords[6]+"_"+coords[5];
								parent.loadlayer_nuis(coords[0],coords[2],"UL10K","nuis7",c);						
								document.getElementById('lg').innerHTML="<img width='75%' height='75%'  src='https://bhuvan-app1.nrsc.gov.in/thematic/thematic/img/nuislegend.jpg'></img>";
							}
							else if (theme =='amrut')
							{
								//console.log("inside amrut",coords,state,year);
								document.getElementById('lg').innerHTML='';
								document.getElementById('docSpan').style.display="none";
								
								
								
								
								var temp12 = "amrut_ph1:"+state+"_"+coords[0]+"_amrutph1_4k";
								parent.wms_load(temp12,"https://bhuvan-vec3.nrsc.gov.in//bhuvan/gwc/service/wms",false);
								
								parent.setpanzoombar(14);
								var bounds = new parent.OpenLayers.Bounds(coords[3],coords[2],coords[5],coords[4]);
								
								
								
								parent.map.zoomToExtent(bounds, true);
								
							}
							else if(theme == 'lulc10')
							{ 
								parent.map.events.register("moveend", parent.map, moveChangedlulc10);
								moveChangedlulc10();
								
								var coords=year.split("__");
								//console.log("...state..",state);

								
								parent.wms_load("sisdpv2:"+coords[0],"https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms",false);		
								parent.setpanzoombar(14);
								
								//parent.wms_load("sisdpv2:"+coords[0],"https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms",false);		
								//parent.wms_load("sisdpv2:"+coords[0],"https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms",false);		
								//parent.setpanzoombar(14);
								var bounds = new parent.OpenLayers.Bounds(coords[1],coords[2],coords[3],coords[4]);
								parent.map.zoomToExtent(bounds, true);
								//parent.distzoom1(coords[3],"",true); // zoom but don't show boundary
								document.getElementById('lg').innerHTML="<img src='img/sisdpv2_lulc.png'></img>";
								//parent.setpanzoombar(14);
							} /*else if (theme== 'lulc101619'){
								//console.log("at 324");
								parent.map.events.register("moveend", parent.map, moveChangedlulc101619);
								moveChangedlulc10();
								
								if(state=="AR"||state=="AS"||state=="CG"||state=="DD"||state=="DL"||state=="GA"||state=="KL"||state=="MN"||state=="ML"||state=="MZ"){
									parent.wms_load("sisdp_phase2:SISDP_P2_LULC_10K_2016_2019_"+state,"https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms",false);		
						            //console.log("inside");
								    parent.setpanzoombar(14);
									//document.getElementById("mapbutton").src="img/remove.png";
									var bounds = new parent.OpenLayers.Bounds(coords[1],coords[2],coords[3],coords[4]);
								    parent.map.zoomToExtent(bounds, true);
								}
								//console.log("is it..");
								
								//var bounds = new parent.OpenLayers.Bounds(coords[1],coords[2],coords[3],coords[4]);
								//parent.map.zoomToExtent(bounds, true);
						
							}*/
							else
							{
								//console.log("inside else, should not come");
								parent.wms_load(year,"https://bhuvan-ras2.nrsc.gov.in/cgi-bin/flood.exe",true);		
								document.getElementById('lg').innerHTML="<img src='https://bhuvan-ras2.nrsc.gov.in/cgi-bin/flood.exe?version=1.1.1&service=WMS&request=GetLegendGraphic&layer="+year+"&format=image/png' align='center'/>"+app;	
								parent.zoom_to_layer(arr[2],arr[1],arr[4],arr[3]);
							}
							document.getElementById("mapbutton").src="img/remove.png";	
						}						
					}				
				}
				else 
				{
					//console.log("eyar is false...has come",theme);
					parent.basemap.setVisibility(false);
					if(theme == 'fldhz')
					{			
						parent.wms_load(state.toLowerCase()+"_hz","https://bhuvan-ras2.nrsc.gov.in/cgi-bin/hazard.exe?", true);
						document.getElementById("mapbutton").src="img/remove.png";
						document.getElementById('lg').innerHTML="<img src='https://bhuvan-ras2.nrsc.gov.in/cgi-bin/hazard.exe?version=1.1.1&service=WMS&request=GetLegendGraphic&layer="+state+"_hz&format=image/png' align='center'/>"+app;	
						getDistricts('State',stateCode,theme);
						parent.zoom_to_layer(arr[2],arr[1],arr[4],arr[3]);
					}
					else if(theme == 'lulc250')
					{					
						state = document.getElementById('states').value.split('_')[0];
						season=document.getElementById('season').value.split('_')[0];
						season=season.toLowerCase();
						if (season=='select')
						{
							document.getElementById("lg").innerHTML="<br/><span class='s10' style='color:RED'>First select Season</span>"; 
						}
						//Integration of Rabi_Kharif:based on season,ras2 service has to be defined.
						else
						{				
							if (season=='annual')
							{
								parent.wms_load('LULC250K_'+state,"https://bhuvan-ras2.nrsc.gov.in/mapcache?",false);
								document.getElementById("mapbutton").src="img/remove.png";
								document.getElementById('lg').innerHTML="<img src='https://bhuvan-ras2.nrsc.gov.in/cgi-bin/LULC250K.exe?version=1.1.1&service=WMS&request=GetLegendGraphic&layer=LULC250K_"+state+"&format=image/png' align='center'/>";	
							}
							else if (season=='kharif' ||  season=='rabi')
							{
								parent.wms_load(season+'_lulc250k_'+state+'_gcs',"https://bhuvan-ras2.nrsc.gov.in/mapcache?",false);
								document.getElementById("mapbutton").src="img/remove.png";
								document.getElementById('lg').innerHTML="<img src='https://bhuvan-ras2.nrsc.gov.in/cgi-bin/lulc250k_seasonal.exe?version=1.1.1&service=WMS&request=GetLegendGraphic&layer="+season+"_lulc250k_"+state+"_gcs&format=image/png' align='center'/>";
							}
							getStates_lulc250();	
						}					
					}else if (theme =='lulc101619')
						{
							
							if(state!=""){
									parent.wms_load("sisdp_phase2:SISDP_P2_LULC_10K_2016_2019_"+state,"https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms",false);		
						            //console.log("inside state");
								    parent.setpanzoombar(14);
								}
								var arr=document.getElementById('states').value.split('_');
								
								//console.log("is it..",arr, "...",stateCode,"...",theme,"...");
								document.getElementById("mapbutton").src="img/remove.png";
								document.getElementById('docSpan2').style.display="none";
						getDistricts('State',stateCode,theme);
						parent.zoom_to_layer(arr[2],arr[1],arr[4],arr[3]);		
						document.getElementById('lg').innerHTML="<img src='https://bhuvan-app1.nrsc.gov.in/thematic/thematic/usertasks/download1/img/sisdp_ph2_legend.PNG'></img>";  
					}
					else if(theme == 'glwb') // for glacial lakes waterbodies
					{				
						var dynlayer = new parent.OpenLayers.Layer.WMS('glwbextra', 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms', {
						layers: 'projects:glacier_river',
						transparent: true
						}, {
						isBaseLayer: false
						}
						);	
						parent.map.addLayer(dynlayer);

						parent.wmtsload('Indianhimalayas:'+state+'_GLWB',arr[3],arr[2],arr[5],arr[4]);
						
						parent.zoom_to_layer(arr[2],arr[3],arr[4],arr[5]);
						document.getElementById("mapbutton").src="img/remove.png";
						document.getElementById('drawhelp').style.display="inline";
						document.getElementById('lg').innerHTML="<span class='s10'><img src='https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Indianhimalayas:"+state+"_GLWB&LEGEND_OPTIONS=bgColor:0xFBFBEF' align='center'/><br/><img src='https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=glacier_river&LEGEND_OPTIONS=bgColor:0xFBFBEF' align='center'/><br/></span>";	
						ajax('get/getStates_glwb.php','districtsdiv');
						document.getElementById("districtsdiv").style.display="inline";
					}
					else if(theme == 'ldd')
					{			
						parent.loadtree_ldd('land_degradation:'+state,'ldd',arr[2],arr[2],arr[3],arr[4]);
						document.getElementById('lg').innerHTML=" <img src='https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=land_degradation:"+state+"_LDD50K_0506&LEGEND_OPTIONS=bgColor:0xFBFBEF' align='center'/>";		
						document.getElementById("mapbutton").src="img/remove.png";
					}
					else if(theme=='urbn')
					{
						parent.zoom_to_layer(arr[2],arr[1],arr[4],arr[3]);
						parent.loadlabellayers("urbn1",parent.urlArray4,"lulc:"+state+"_LULC50K_1112U");
						ajax2("get/urbn.php?st="+state,"lg");
						document.getElementById("mapbutton").src="img/remove.png";
						parent.basemap.setVisibility(false);
					}
					else if(theme.substring(0,2) == 'wl')
					{			

						parent.wmts_load('wasteland:'+state,'WL',arr[1],arr[2],arr[3],arr[4],'_WL50K_1516','_WL50K_DOP',false);
						document.getElementById('drawSpan').style.display="inline";
						document.getElementById('lg').innerHTML="<img src='legend/WL.png' align='center'/>";
						
						document.getElementById("mapbutton").src="img/remove.png";
						getDistricts('State',stateCode,theme);
					}
					else if(theme.substring(0,2) == 'ld')
					{			
						if(theme == 'ld1516')
							parent.wmts_load('ld:'+state,'LD',arr[1],arr[2],arr[3],arr[4],'_LD50K_1516','_LD50K_1516',false);
						else
							parent.wmts_load('ld:'+state,'LD',arr[1],arr[2],arr[3],arr[4],'_LD50K_0506','_LD50K_0506',false);
						
						parent.map.events.register( "moveend", parent.map, ld_legend_change );

						document.getElementById('drawSpan').style.display="inline";
						document.getElementById('lg').innerHTML="<img src='legend/LD_50K_L1.png' align='center'/>";
						document.getElementById("mapbutton").src="img/remove.png";
						getDistricts('State',stateCode,theme);
					}
					else if(theme == 'er')
					{			
						parent.wmts_load('erosion:'+state,'ERO',arr[1],arr[2],arr[3],arr[4],'_ERO50K_0506',true);
						document.getElementById('drawSpan').style.display="inline";
						document.getElementById('lg').innerHTML="<img src='https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=erosion:"+state+"_ERO50K_0506&LEGEND_OPTIONS=bgColor:0xFBFBEF' align='center'/>";	
						document.getElementById("mapbutton").src="img/remove.png";
						parent.loadwms("stateov",parent.urlArray4,"admin:INDIA_STATE");
					}
					else if(theme == 'alk')
					{			
						parent.wmts_load('salinity:'+state,'SAL',arr[1],arr[2],arr[3],arr[4],'_SAL50K_0506',true);
						document.getElementById('drawSpan').style.display="inline";
						document.getElementById('lg').innerHTML="<img src='https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=salinity:"+state+"_SAL50K_0506&LEGEND_OPTIONS=bgColor:0xFBFBEF' align='center'/>";	
						document.getElementById("mapbutton").src="img/remove.png";
						parent.loadwms("stateov",parent.urlArray4,"admin:INDIA_STATE");
					}
						
					else
					{	
				        
				        var append = "_"+themeval.split("_")[7]+"_"+themeval.split("_")[8];				
						parent.wmts_load('lulc:'+state,theme,arr[1],arr[2],arr[3],arr[4],append,'_L3_LULC',false);				
						document.getElementById('drawSpan').style.display="inline";
						document.getElementById('lg').innerHTML="<img src='https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=lulc:"+state+append+"&LEGEND_OPTIONS=bgColor:0xFBFBEF' align='center'/>";		
						document.getElementById("mapbutton").src="img/remove.png";
						getDistricts('State',stateCode,theme);
						parent.loadwms("stateov",parent.urlArray4,"admin:INDIA_STATE");
					
						
					}
				}
			}
			document.getElementById("lg").style.display="inline";
			parent.map.setLayerIndex(parent.rediff_maps, 101);
			parent.map.setLayerIndex(parent.transportnetwork, 102);
		break;
		
		
		case 'GetData':		
			if(theme=="Select" || theme == "") 			
				document.getElementById("getData1").innerHTML="<div align='center'><span class='s10' style='color:RED'>Click on Search tab to select Geography first </span></div>"; 
			else if (theme=="lulc10")
			{
				
				document.getElementById("getData1").innerHTML="<table> <tr><td > <input name='request' checked type=\"radio\" onclick=\"SubmitReq('getdata/request_10k.php','getData2')\" ><span class='s10'>Submit Request  </span></td><td><input name='request' type=\"radio\"  onclick=\"SubmitReq('getdata/status_10k.php?','getData2')\"  > <span class='s10'> Check status </span> </td></tr></table>  ";
				SubmitReq('getdata/request_10k.php','getData2');
			}	
			else if (theme=="lulc503"||theme=="lulc501"||theme=="lulc502")
			{
				
				document.getElementById("getData1").innerHTML="<table> <tr><td > <input name='request' checked type=\"radio\" onclick=\"SubmitReq('getdata/request_50k.php','getData2')\" ><span class='s10'>Submit Request  </span></td><td><input name='request' type=\"radio\"  onclick=\"SubmitReq('getdata/status_50k.php?','getData2')\"  > <span class='s10'> Check status </span> </td></tr></table>  ";
				SubmitReq('getdata/request_50k.php','getData2');
			}	
			else if (theme=="lulc101619")
			{
				//console.log("theme selected lulc101619");
				document.getElementById("getData1").innerHTML="<table> <tr><td > <input name='request' checked type=\"radio\" onclick=\"SubmitReq('getdata/request_10kphase2.php','getData2')\" ><span class='s10'>Submit Request  </span></td><td><input name='request' type=\"radio\"  onclick=\"SubmitReq('getdata/status_10kphase2.php?','getData2')\"  > <span class='s10'> Check status </span> </td></tr></table>  ";
				SubmitReq('getdata/request_10kphase2.php','getData2');
			}	
			else if (theme=="lulc250")
			{
				
				document.getElementById("getData1").innerHTML="<table> <tr><td > <input name='request' checked type=\"radio\" onclick=\"SubmitReq('getdata/request_250k.php','getData2')\" ><span class='s10'>Submit Request  </span></td><td><input name='request' type=\"radio\"  onclick=\"SubmitReq('getdata/status.php?','getData2')\"  > <span class='s10'> Check status </span> </td></tr></table>  ";
				SubmitReq('getdata/request_250k.php','getData2');
			}	
			
		break;
		
		default:;
		}
		
	}
	
	
	function ld_legend_change()
	{		
	 	if(parent.map.getZoom()>8 && document.getElementById('theme').value.substring(0,2) == 'ld')
			document.getElementById('lg').innerHTML="<img src='legend/LD_50K_L2.png' align='center'/>";
		else
			document.getElementById('lg').innerHTML="<img src='legend/LD_50K_L1.png' align='center'/>";
	}	

	
	function loadstats(district)
	{
	if(district!="Select") {
	ajax("theme_stats/lulc_"+document.getElementById('theme').value.split('_')[0]+"_dist.php?name="+district.split('_')[0],"st");
		document.getElementById("dist_r").checked=true;
		}
	}
	
	function loadstats1(s)
	{
			//Integration of Rabi_Kharif:on change of state dropdown,stat display is called here

	
	if(s!="Select")
	 if (document.getElementById('theme').value.split('_')[0]!='lulc250')
 {
	// console.log("abcd");
ajax("theme_stats/lulc_lulc250.php?name="+state+"&state="+s,"st")
 }
	
	else
{
		// console.log("abcd");

	season=document.getElementById('season').value.split('_')[0];
	ajax("theme_stats/lulc_lulc250.php?name="+state+"&state="+s+"&season="+season,"st")
}

	}
	//-------------------Document-----------------
	
	function doc()
	{
	
	
	if(document.getElementById('states'))
		{
			state = document.getElementById('states').value.split('_')[0];
			documentpath = document.getElementById('states').value.split('_')[6];
			mappath = document.getElementById('states').value.split('_')[7];
			
			
		}
		else
			state="";
			
		
		if(state=="Select" || state == "") {
		document.getElementById('docSpan').style.display="none";
		document.getElementById('docSpan2').style.display="none";
		}
		else {
		
		if(documentpath!="") 
		{
		document.getElementById('docSpan').innerHTML="1. Technical document&nbsp;<a href=\"/2dresources/thematic/"+documentpath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download PDF, size : 2.3MB\" src=\"img/download.gif\"></a> ";
		document.getElementById('docSpan').style.display="inline";
		}
		
			//var s = ["gm", "ln", "glwb",  "urbn","lulc","lulc101619"];// This is for annual layers flood,nuis,lulc502,glwb where mapth path is not there. others it is there  //30jan2015
			var s = ["gm", "ln", "glwb",  "urbn","lulc101619"];// This is for annual layers flood,nuis,lulc502,glwb where mapth path is not there. others it is there  //30jan2015
			if(!(yearexist) && (s.indexOf(document.getElementById('theme').value.split('_')[0]) == -1))
			{
			if(document.getElementById('theme').value.split('_')[0].substring(0,6)=='lulc50') {
				document.getElementById('docSpan2').innerHTML="2. Map &nbsp;<a href=\"/2dresources/thematic/"+mappath.replace('.jpg','.jpg')+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map\" src=\"img/download.gif\"></a> &nbsp;&nbsp;&nbsp;&nbsp;Statistics &nbsp;<a href=\"/2dresources/thematic/"+mappath.replace('.jpg','.pdf')+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Statistics\" src=\"img/download.gif\"></a> ";
				
			} else if (document.getElementById('theme').value.split('_')[0].substring(0,6)=='wl1516') {
				document.getElementById('docSpan2').innerHTML="2. Map &nbsp;<a href=\"/2dresources/thematic/"+mappath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a>        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        3. Wasteland Atlas &nbsp;<a href=\"/2dresources/thematic/wl1516/Wasteland_Atlas_2019_Full_opt.pdf\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
			}else if (document.getElementById('theme').value.split('_')[0].substring(0,6)=='lulc'){
				var newpath = documentpath.replace('.pdf','_2005-06.pdf');
				newpath = newpath.replace('LULC','LULC/MAP');
				var statpath = documentpath.replace('LULC','LULC/MAP/Stat');
				console.log("stat path",statpath); 
			    	document.getElementById('docSpan2').innerHTML="2. Map &nbsp;<a href=\"/2dresources/thematic/"+newpath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map\" src=\"img/download.gif\"></a> &nbsp;&nbsp;&nbsp;&nbsp;Statistics &nbsp;<a href=\"/2dresources/thematic/"+statpath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Statistics\" src=\"img/download.gif\"></a> ";
			}
			else {
				document.getElementById('docSpan2').innerHTML="2. Map &nbsp;<a href=\"/2dresources/thematic/"+mappath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a>";
			}
				
			document.getElementById('docSpan2').style.display="inline"; 
			}
						
		}		
		
	}

	function doc_lulc250()
	{
	//Integration of Rabi_Kharif:based upon season,path is defined and hiding div element like description was also defined
	//	console.log("hi");
	
	
	if(document.getElementById('states'))
		{
			state = document.getElementById('states').value.split('_')[0];
			season=document.getElementById('season').value.split('_')[0];
			documentpath = document.getElementById('season').value.split('_')[1];
			mappath = document.getElementById('season').value.split('_')[2];
			//console.log("a"+state.season);
					//	console.log("a"+state);

			//console.log("b"+season);

			//console.log("c"+documentpath);

			//console.log("d"+mappath);

		}
		else
			state="";
			
		
		if(season=="Select" || state == "") {
		document.getElementById('docSpan').style.display="none";
		document.getElementById('docSpan2').style.display="none";
		}
		else {
			
			//console.log("hjdhfiud");
		
		if(documentpath!="" && season=='Annual') 
		{
		document.getElementById('docSpan').innerHTML="1. Technical document&nbsp;<a href=\"/2dresources/thematic/"+documentpath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download PDF, size : 2.3MB\" src=\"img/download.gif\"></a> ";
		document.getElementById('docSpan').style.display="inline";
		}
		
			if(season=='Annual')
			{		
					//console.log("hhgdhfgdhgfdshj");

		
				document.getElementById('docSpan2').innerHTML="2. Map &nbsp;<a href=\"/2dresources/thematic/"+mappath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
			document.getElementById('docSpan2').style.display="inline"; 
			}
			else 
				if(season=='Rabi')
			{			
				document.getElementById('docSpan').style.display="none";

			
				document.getElementById('docSpan2').innerHTML="2. Map &nbsp;<a href=\"/2dresources/thematic/"+mappath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
			document.getElementById('docSpan2').style.display="inline"; 
			}
			else 
			
			if(season=='Kharif')
			{			
					document.getElementById('docSpan').style.display="none";

				document.getElementById('docSpan2').innerHTML="2. Map &nbsp;<a href=\"/2dresources/thematic/"+mappath+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
			document.getElementById('docSpan2').style.display="inline"; 
			}
			
			
			
			
			
						
		}
	}
	
	
	
	//-------------------Option change------------------
	
	
	function getStates(theme) {	
		// console.log("theme"+theme.split("_")[0]);	
	//console.log("get stated...");
		//define the tabs length here
		document.getElementById("mapbutton").style.display="inline";
				//integration of rabi-kharif



		if(theme.split("_")[2] != '1'&& theme.split("_")[0]!='lulc250')
		yearexist=true;
		else
		yearexist=false;
		// console.log("yearexist"+yearexist);
	
		//console.log("t...",theme, "...");
		var tabs = ["Statistics", "Metadata", "Analysis", "WebServices","Overlay","GetData" ];	
		for ( var i =0 ; i < tabs.length ; i++)
		theme.indexOf(tabs[i]) > 0 ? document.getElementById(tabs[i]).style.display="inline" :document.getElementById(tabs[i]).style.display="none";
		
		
		//WSA or SCA are different so we dont call get states.php for the same.
		var thm=theme.split("_")[0];
		// console.log("thm"+thm);
		
		if(thm=='wsa' || thm=='sca')
		{
		if(thm=='wsa') //waterbody link out 19012017
		{
		//getMons('wsa');
		document.getElementById("statesdiv").innerHTML='<font style="font-size:12px" color="darkblue" face="Arial"><b></b><a href="http://bhuvan-wbis.nrsc.gov.in/" style="font-family: Arial; font-size: 12px; color: darkblue" target="_blank" title="Visit WBIS">Click here to visit <b>Water Body Information System</b></a></font>';
		window.open("https://bhuvan-wbis.nrsc.gov.in/","_blank");
		document.getElementById("mapbutton").style.display="none";
		}
		else
		{
		getMons('scf');
		document.getElementById("statesdiv").innerHTML='<table><tr><td width="100px"><span class="s10b">Select Date </span></td><td><input readonly="readonly" type="text" value="" id="base_ndvi_vf" style="width:80px;" /> <img style="cursor:pointer" alt="Select Month/Year" onclick="showCalendarControl(this.id);" id="basepicker" src="img/datepicker.gif" /></td></tr></table>';
		}
		}
		else
		{
		var strURL="get/getStates.php?theme="+theme.split("_")[0]+"&levels="+theme.split("_")[2]+"&levelname="+theme.split("_")[3];
		ajax(strURL,'statesdiv');	
		}

	theme.split("_")[4]=="1"?parent.queryenable(true):parent.queryenable(false);
	theme.split("_")[5]=="0"?parent.printenable(false):parent.printenable(true);
	//theme.split("_")[0]=="nuis"?parent.rediff_maps.setVisibility(false):parent.rediff_maps.setVisibility(true);
	parent.transportnetwork.setVisibility(true);
	
	parent.setpanzoombar(10);
	// console.log("hiiii");
	
	} 
			
	
	//Integration of rabi-kharif

	function getlevel2(state,theme) {

	if (state == 'Select' || state =="") 
	yearexist = false;
	else {
	yearexist = true;
	if(theme=='lulc250')
	{
		// console.log("hiii");
		yearexist = false;
		state=state.split("_")[0];
		var div_val = "seasondiv";		
	}
	else
	{

		var div_val = "level2div";
	}

	var strURL="get/getLevel2.php?theme="+theme+"&state="+state;
	ajax(strURL,div_val);	
	document.getElementById(div_val).style.display="inline";
	}
}	
//Integration of rabi-kharif
function getlevel2_season(state,theme) 
	{
	
	//console.log("state"+state);
	//Integration of Rabi_Kharif:for showing new dropdown with annual,rabi and kharif options
	a=state.split("_")[0] 
	//console.log("a"+a);
	//yearexist = true;
	var strURL="get/getLevel2_season.php?theme="+theme+"&year="+a;
	//console.log("strURL"+strURL);
	ajax(strURL,'seasondiv');	
	document.getElementById("seasondiv").style.display="inline";
	}



					
	function getDistricts(regionId, stateCode, them) {	

	var strURL="get/getDistricts.php?them="+them+"&region="+regionId+"&stateCode="+stateCode;

	ajax(strURL,'districtsdiv');
	document.getElementById("districtsdiv").style.display="inline";
	} 
	
	function getStates_lulc250() {		
	ajax('get/getStates_lulc250.php','districtsdiv');
	document.getElementById("districtsdiv").style.display="inline";
	}
	
	function themechange()
	{
	try{
	document.getElementById("docSpan").style.display="none";
	document.getElementById("docSpan2").style.display="none"; 
	
	//Integration of rabi-kharif 
			document.getElementById("seasondiv").style.display="none";

	}
	catch(e) {}
	statechange();
	}
	
	function typechange()
	{
	document.getElementById("level2div").style.display="none";
	document.getElementById('view').style.display='inline'
	document.getElementById("lg").style.display="none";
	view_remove();
	}
	
	function statechange()
	{
	    typechange();
		document.getElementById("level2div").style.display="none";
		//document.getElementById("nuis_main_layers").style.display="none";
	}
	
	function view_remove()
	{
		parent.basemap.setVisibility(true);
		if(document.getElementById('theme').value.split('_')[0] != 'gm' || document.getElementById('theme').value.split('_')[0] != 'ln' )
		try
		{
			parent.map.events.unregister( "moveend", parent.map, moveChanged );
			parent.map.events.unregister("moveend", parent.map, moveChangedlulc10);
		}
		catch(e) {}
		try{
			parent.removetree();
			parent.vectors1.removeAllFeatures();
		}
		catch(e) {}
		try{
			parent.removelayer("queryshell");
		}
		catch(e) {}
		try{
			parent.removelayer("glwbextra");
		}
		catch(e) {}
		try{
			parent.removenuislayer();
		}
		catch(e) {}
		
		
		
 //added for specific overlay requirements of geomorph
		try{
			if(gm_ov_status == 1)
			parent.removelayer("gm50ov");
		 }
		catch(e) {}
		try{
			if(parent.ln_ov_status == 1)
			parent.removelayer("ln50ov");
		 }
		catch(e) {}
		gm_ov_status = 0;
		ln_ov_status =0;
		parent.removelayer("stateov");
 //code ends here
 
	//doc();
		document.getElementById("drawSpan").style.display="none";
		document.getElementById("drawhelp").style.display="none";
		document.getElementById('lg').style.display='none';
		document.getElementById("mapbutton").src="img/view.png";
		document.getElementById("districtsdiv").style.display="none";
		document.getElementById("districtsdiv").innerHTML="";
		parent.measureControls['polygon'].deactivate();		
		
		//added specific to WSA names overlay
		parent.removelayer('wsanameov');
		parent.removelayer('urbn2');
		parent.removelayer('urbn1');
	}

	
function districtchange()
{	
	var district;	
	if(document.getElementById('districts') )
	{		
		if(document.getElementById('districts').value != "Select"  )
		{
			var arr=document.getElementById('districts').value.split('_');
			
			if(theme=='ld0506' || theme=='ld1516' )				
				parent.distzoom1(arr[1],arr[2],true);
			else
				parent.distzoom(arr[1],arr[2],true);
			
			if(document.getElementById('theme').value.split('_')[0] != 'lulc250') 
				district = "/mapdistrict/"+document.getElementById('districts').value.split('_')[0];			
			else if(document.getElementById('theme').value.split('_')[0] == 'lulc250') 
			{
				// console.log(document.getElementById('states').value);
				season=document.getElementById('season').value.split('_')[0];
				if (season=='Annual')
				{
					district = "/mapstate/"+arr[3]+"_"+document.getElementById('states').value.split('_')[0];
					district1 = "/mapstate/"+arr[2]+"_LULC_20"+document.getElementById('states').value.split('_')[0].slice(0, 2)+"_20"+document.getElementById('states').value.split('_')[0].slice(2, 4)+"_map_250dpi";
				}
				else if  (season=='Rabi')
				{	district = "/rabi/mapstate/"+arr[3]+"_"+document.getElementById('states').value.split('_')[0];
					district1 = "/rabi/mapstate/"+arr[2]+"_rabi20"+document.getElementById('states').value.split('_')[0].slice(0, 2)+"_20"+document.getElementById('states').value.split('_')[0].slice(2, 4)+"_map_250dpi";
				}
				else if  (season=='Kharif')
				{	district = "/kharif/mapstate/"+arr[3]+"_"+document.getElementById('states').value.split('_')[0];
					district1 = "/kharif/mapstate/"+arr[2]+"_kharif20"+document.getElementById('states').value.split('_')[0].slice(0, 2)+"_20"+document.getElementById('states').value.split('_')[0].slice(2, 4)+"_map_250dpi";
				}
				// console.log(district1);
			}				
			else //case for 250k 
				district="/mapstate/"+arr[3]+"_"+document.getElementById('states').value.split('_')[0];
			
			if(theme!='er' && theme!='alk' && theme!='lulc502' && theme!='lulc503')//For ER and ALK district list is there but map not available //30jan2015
			{
				
				if(theme=='wl1516' || theme=='ld0506' || theme=='ld1516')
					document.getElementById('docSpan2').innerHTML="2. Map&nbsp;<a href=\"/2dresources/thematic/"+document.getElementById('states').value.split('_')[7]+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
				else
					document.getElementById('docSpan2').innerHTML="2. Map&nbsp;<a href=\"/2dresources/thematic/"+document.getElementById('theme').value.split('_')[0]+district+".jpg\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
				if(theme=='lulc250' && district1)
					document.getElementById('docSpan2').innerHTML="2. Map&nbsp;<a href=\"/2dresources/thematic/"+document.getElementById('theme').value.split('_')[0].toUpperCase()+district1+".pdf\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
			}
			document.getElementById('docSpan2').style.display="inline"; 
		}
		else
		{
			
			if(document.getElementById('theme').value.split('_')[0] != 'lulc250') 
				stateCode=document.getElementById('theme').value.split('_')[0]+"/map/"+stateCode+".jpg";
			else
				stateCode=document.getElementById('states').value.split('_')[7];

			document.getElementById('docSpan2').innerHTML="2. Map&nbsp;<a href=\"/2dresources/thematic/"+stateCode+"\" target=\"_blank\" style=\"cursor: pointer\" ><img border=\"0\" alt=\"Download Map, size : 5MB\" src=\"img/download.gif\"></a> ";
			document.getElementById('docSpan2').style.display="inline";
		
		}
	}
	else
		district="";
	
	var s = ["gm", "ln", "glwb", "urbn","lulc","lulc101619"];// This is for gm,ln,lulc502,glwb where mapth path is not there. //30jan2015
	
	if(!(s.indexOf(document.getElementById('theme').value.split('_')[0]) == -1))
	document.getElementById('docSpan2').style.display="none";	
}

	//----------------Analysis----------------------------------	
			
	function analysis(state)
	{
	
	if(parent.analysiscontrol) {
    parent.analysiscontrol.deactivate();
	
	}		
	
	if(parent.out==0)
	document.getElementById("an").innerHTML="<br/><span style='color:RED'>You have not selected any area of interest</span>";
	else if (parent.out <=1000)
	{
	document.getElementById("polygon").disabled=true;
	document.getElementById("anlys_aoi").disabled=true;
	parent.distzoom(parent.geom,"AOI",true);
	var strURL1="../analysis/analysis_"+document.getElementById("theme").value.split("_")[0]+".php?service="+state+"&geom="+parent.geom+"&aoi1="+parent.out;
	ajax(strURL1,"an");
	
	}
	else
	{
	alert("Please reduce the Area of Selection. the current selection is "+parent.out+"sq km. Maximum allowed is 1000sq km.");
	}	
	}
	
	// -----------AJAX --------------------------
	var req;
	function ajax(url,div_name)
	{
	
	//if((state=="Select" || state == "") && div_name != "statesdiv" && div_name != "ov" && div_name != "level2div" && div_name != "getData" )
	//Integration of rabi-kharif
	if((state=="Select" || state == "") && div_name != "statesdiv" && div_name != "ov" && div_name != "level2div" && div_name != "getData" && div_name != "seasondiv")

document.getElementById(div_name).innerHTML="<span class='s10' style='color:RED'>Click on Search tab to select Geography/State/Year first</span>";
	else {
	document.getElementById(div_name).innerHTML="<br/><span class='s10' style='color:RED'>Loading please wait...</span>";
	req = getXMLHTTP();
		
		if (req) {
			
			req.onreadystatechange = function() {
				if (req.readyState == 4) {
					// only if "OK"
					if (req.status == 200) {						
						document.getElementById(div_name).innerHTML=req.responseText;	
if(div_name=="ov")
{
handleClick("pluslevel2","minuslevel2");
var layers = parent.map.layers;
for (var i=2; i<layers.length; i++) 
{ 
	if(parent.transportnetwork.getVisibility()) 
		document.getElementById('transportmap').checked=true; 
	if(parent.rediff_maps.getVisibility()) 
		document.getElementById('rediffmap').checked=true;
	else if(parent.map.layers[i].name == 'lulc:lulc_1deg')
		document.getElementById('grid').checked=true;
	else if(document.getElementById(parent.map.layers[i].name.split('__')[1])) 
		document.getElementById(parent.map.layers[i].name.split('__')[1]).checked = true;
} 
//specific to geomorph
if(!(document.getElementById('theme').value.split('_')[0] == 'gm' || document.getElementById('theme').value.split('_')[0] == 'ln'))
handleClick("pluslevel116","minuslevel116");
else
overviewinit(); 
}
if(div_name=="an")
{
document.getElementById("polygon").disabled=false;
document.getElementById("anlys_aoi").disabled=false;
}
					} else {

					}
				}				
			}			
			req.open("GET", url, true);
			req.send(null);
		} 
				
		}	
	}
	
	function ajax2(url,div_name)
	{
	
	var req = getXMLHTTP();
		
		if (req) {
			
			req.onreadystatechange = function() {
				if (req.readyState == 4) {
					// only if "OK"
					if (req.status == 200) 						
						document.getElementById(div_name).innerHTML=req.responseText;	
						//specific to WSA and SCA
						if((url=="../analysis/wsa/wsa.php" || url=="../analysis/wsa/sca.php" ) && div_name != 'ws')
						slider_vf();
				}				
			}			
			req.open("GET", url, true);
			req.send(null);
		} 
				
			
	}
	
	function getXMLHTTP() { //fuction to return the xml http object
		
		var xmlhttp=false;	
		try{
			xmlhttp=new XMLHttpRequest();
		}
		catch(e)	{		
			try{			
				xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e){
				try{
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch(e1){
					xmlhttp=false;
				}
			}
		}
		 	
		return xmlhttp;
    }

	//--------print function------------

	function printdiv(elementId,title)
	{ try{
	var oIframe = document.getElementById('ifrmPrint');
	var oContent = document.getElementById(elementId).innerHTML;
	var oDoc = (oIframe.contentWindow || oIframe.contentDocument);
	if (oDoc.document) oDoc = oDoc.document;
	oDoc.write("<head><title>"+title+"</title>");
	oDoc.write("</head><body onload='this.focus(); this.print();'>");
	oDoc.write(oContent + "</body>");
	oDoc.close();
	}
	catch(e){
	self.print();
	}
	}
	
	
	function handleClick(obj1,obj2)
      {
   	  document.getElementById(obj1).style.display="none";
      document.getElementById(obj2).style.display="";

      }

//this is for overlay function transparency. for others it goes to parent.	  
function changeOpacity(byOpacity,name) {
	var layers=parent.map.layers;
	for (var i=2; i<layers.length; i++) 
	{
		var divname="opacity_"+name;
		if (layers[i].name == "others__"+name || layers[i].name == name) 
		{
			// var newOpacity = (parseFloat(parent.OpenLayers.Util.getElement(divname).value) + byOpacity).toFixed(1);
			var newOpacity = (parseFloat(document.getElementById(divname).value) + byOpacity).toFixed(1);
			newOpacity = Math.min(parent.maxOpacity,Math.max(parent.minOpacity, newOpacity));
			document.getElementById(divname).value = newOpacity;
			layers[i].setOpacity(newOpacity);
		}
	}
}


function trans(val)
{

var arr=[];
if(val.split("__")[0]=="fldbr")
arr =["fldbr_98","fldbr_99","fldbr_00","fldbr_01","fldbr_02","fldbr_03","fldbr_04","fldbr_05","fldbr_06","fldbr_07","fldbr_08","fldbr_09","fldbr_10"];
if(val.split("__")[0]=="fldas")
arr =["fldas_98","fldas_99","fldas_00","fldas_01","fldas_02","fldas_03","fldas_04","fldas_05","fldas_06","fldas_07","fldas_08","fldas_09","fldas_10"];
if(val.split("__")[0]=="hz")
arr =["hz_as"];
if(val.split("__")[0]=="lulc250")
arr =["lulc250_0405","lulc250_0506","lulc250_0607","lulc250_0708","lulc250_0809","lulc250_0910","lulc250_1011"];
if(val.split("__")[0]=="lulc50")
arr=["lulc50_ap","lulc50_Ar","lulc50_as","lulc50_br","lulc50_ch","lulc50_ga","lulc50_gj","lulc50_hr","lulc50_hp","lulc50_jk","lulc50_jh","lulc50_ka","lulc50_kl","lulc50_mp","lulc50_mh","lulc50_mn","lulc50_mg","lulc50_mz","lulc50_nl","lulc50_or","lulc50_pb","lulc50_rj","lulc50_sk","lulc50_tn","lulc50_tp","lulc50_uk","lulc50_up","lulc50_wb","lulc50_an","lulc50_cg","lulc50_dn","lulc50_dl","lulc50_dd","lulc50_ld","lulc50_py"];
if(val.split("__")[0]=="wl50")
arr=["wl50_ap","wl50_Ar","wl50_as","wl50_br","wl50_ch","wl50_gj","wl50_hr","wl50_hp","wl50_jk","wl50_jh","wl50_ka","wl50_kl","wl50_mp","wl50_mh","wl50_mn","wl50_mg","wl50_mz","wl50_nl","wl50_or","wl50_pb","wl50_rj","wl50_sk","wl50_tn","wl50_tp","wl50_uk","wl50_up","wl50_wb"];
if(val.split("__")[0]=="gm50")
arr=["gm50_dl","gm50_hr","gm50_kl","gm50_or","gm50_pb","gm50_jh","gm50_sk","gm50_ga","gm50_ka","gm50_tn"];
if(val.split("__")[0]=="ln50")
arr=["ln50_dl","ln50_hr","ln50_kl","ln50_or","ln50_pb","ln50_jh","ln50_sk","ln50_ga","ln50_ka","ln50_tn"];
for(var i=0;i<arr.length;i++)
if(document.getElementById("opac_"+arr[i]))
document.getElementById("opac_"+arr[i]).style.display="none";


}

function SubmitReq(url,id)
{
	//console.log("inside submit requrest...",url,id);
document.getElementById(id).innerHTML="<br/><iframe style=\"border:0\"  id='req_form'  src="+url+" width='100%' height='100%' />";
document.getElementById(id).style.height = parseInt(0.48*screen.height) ;
}

function queryshell_start()
{
document.getElementById('an_buttons_aoi').style.display='none';
document.getElementById('an').innerHTML='';
//SubmitReq("queryshell/query_"+theme+".php?state="+state,'an');
if(parent.vectors1)
parent.vectors1.removeAllFeatures();
if(req)
{
req.abort();
document.getElementById("polygon").disabled=false;
document.getElementById("anlys_aoi").disabled=false;
}
parent.measureControls['polygon'].deactivate();
}

var activetab;

//Specific for nuis

function flytonuistown(val)
{parent.basemap.setVisibility(true);
parent.nuis_onload();
document.getElementById("mapbutton").src="img/view.png";
document.getElementById('docSpan').innerHTML="<br/>1. Technical document&nbsp;<a style=\"cursor: pointer\" target=\"_blank\" href=\"/2dresources/thematic/NUIS_Manual.pdf\"><img border=\"0\" src=\"img/download.gif\" alt=\"Download PDF, size : 14.1MB\"></a><br/> <input type=\"checkbox\" checked=\"true\" onclick='if(this.checked) parent.nuis_ano.setVisibility(true); else parent.nuis_ano .setVisibility(false);' >&nbsp;&nbsp;Point of Interest<br/>";
document.getElementById("docSpan").style.display='inline';
//document.getElementById("view").style.display='none';
if (val != 'Select' && val !="") 
{
document.getElementById("lg").innerHTML="";
var coords=val.split("_");
parent.zoom_to_layer(coords[4],coords[3],coords[6],coords[5]);

}
}



var movechange=0;
function moveChanged () {
movechange=1;
theme = document.getElementById("theme").value.split("_")[0];
var zoomlevel = parent.map.getZoom();

var b11 = new Array();		
		var bounds = new parent.OpenLayers.Bounds();
		bounds = parent.map.getExtent();
		
		b11 = bounds.toArray(); 
	var	bstr =	b11[0]+" "+b11[1]+","+b11[0]+" "+b11[3]+","+b11[2]+" "+b11[3]+","+b11[2]+" "+b11[1]+","+b11[0]+" "+b11[1];
	var sql = ""+bstr+"";
	
	var json_url = "../analysis/analysis_gm.php?theme="+theme.toUpperCase()+"&service="+state+"&zoom="+zoomlevel+"&sql=";
	json_url += escape(sql);
	ajax2(json_url,'lg');
	movechange=0;
} 	

//for geomorphology specific requirement

var gm_ov_status=0;
var ln_ov_status=0;

function overviewinit()
 {

 try {
  if(gm_ov_status == 1)
 document.getElementById("gm50").checked=true;
  if(ln_ov_status == 1)
 document.getElementById("ln50").checked=true;
 }
 catch(e) 
 {
 }
  }

function loadingdistzoom(code,text)
{
//for loading distzoom
theme = document.getElementById("theme").value.split("_")[0];
var req = getXMLHTTP();		
if (req) {
req.onreadystatechange = function() {
if (req.readyState == 4) {
// only if "OK"
if (req.status == 200) 
	{
	//distzoom1 only zooms with no boundary, while distzoom gives boundary too
	if(theme =='gm' || theme == 'ln' || theme == 'wsa')
	parent.distzoom(req.responseText,text,true);	
	else
	parent.distzoom1(req.responseText,text,true);	
	}
}	
}	
if(theme=='wsa')//for wsa loading the basin boundaries	
req.open("GET", '../analysis/wsa/get/getDistrictsgeom.php?dcode='+code, true);
else
req.open("GET", 'get/getDistrictsgeom.php?dcode='+code, true);
req.send(null);
} 
}

function wsaanalysis()
{
var dcode=document.getElementById("wsadistricts").value;
if(dcode == 'Select' || dcode == '')
{
document.getElementById("wsaerror").innerHTML="<br/><span class='s10' style='color:RED'>Please select river basin first</span></br> ";
return;
}
parent.load_video('#glwb_anlys','usertasks/analysis/wsa/loadchart.php?dcode='+dcode,'Analysis','800','560');
}

//For Water spread area WSA ####
//For table
var initialtabletags,calender_flag=1,pickerflag=-1,vf_slider_yr = "",yr,mn;
var data = new Array();
function getMons(p)
	{
		var xmlhttp;
		if (window.XMLHttpRequest)
		{
			xmlhttp=new XMLHttpRequest();
		}
		else
		{
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{  

				var response=xmlhttp.responseText;		
				vf_slider_yr = response;	
				data=response.split(":");
				createtable();	
				displaycalender(data[0]);
			}
		}
		var url ="../analysis/wsa/getMonsNew.php?pid="+p;
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}
function createtable()
	{
		initialtabletags="<table id='first' cellspacing='0' cellpadding='0' border='0'><tbody>";
		initialtabletags= initialtabletags+"<tr class='cal_header'><td id='lt'class='previous' colspan='1'><a href='javascript:changeCalendarControlYear(-1);'>&lt;</a></td>";
		initialtabletags=initialtabletags+"<td id='year' class='title' colspan='1'></td><td id='gt' class='next' colspan='1'><a href='javascript:changeCalendarControlYear(1);'>&gt;</a></td></tr>"
	}
	
	function showCalendarControl(id)
	{
		if(calender_flag)
		{
			id=='basepicker'?pickerflag=1:pickerflag=0;
			document.getElementById('CalendarControl').style.top=getOffset(document.getElementById(id)).top+20; 
			
			if(pickerflag)
				document.getElementById('CalendarControl').style.left=getOffset(document.getElementById(id)).left;
			else
				document.getElementById('CalendarControl').style.left=getOffset(document.getElementById(id)).left-65;
			
			document.getElementById('CalendarControl').style.display='block';
			document.getElementById('CalendarControl').style.overflow='auto';
			document.getElementById('CalendarControl').style.width='175px';
			document.getElementById('CalendarControl').style.height='120px';
			calender_flag=0;
		}
		else
		{
			document.getElementById('CalendarControl').style.display='none';
			calender_flag=1;
		}
	}
	function displaycalender(year)
	{
		
		var help;j=-1;
		var months= new Array();
		
		for(i=2;i<data.length;++i)
		{
			help=data[i].split(",");
			if (help[0]==year)
				months[++j]=help[1];
		}
		 
        var table="";
		for(j=0;j<months.length;++j)
		{    
			if(months[j].length == 3)
				table=table+"<td> <a class='weekday'  onclick='javascript:setCalendarControlDate(this.innerHTML)' href='javascript:;'>"+toTitlecase(months[j])+"</td>";
			else
				table=table+"<td> <a class='weekday'  onclick='javascript:setCalendarControlDate(\""+months[j]+"\")' href='javascript:;'>"+months[j].substring(0,3)+"<br/>"+months[j].substring(3)+"</td>";
			
			if((j+1)%3==0)
			{   
				table=table+"</tr><tr>";
			}
		}
			
		var endtags="<tr class='cl_header'><th style='cursor:pointer;padding: 3px;'colspan='3'><a onclick='document.getElementById(\"CalendarControl\").style.display=\"none\";' href='#'>Close</a></th></tr></tbody></table>";
		table=initialtabletags+table;
		table=table+endtags;	
					
		document.getElementById('CalendarControl').innerHTML=table;
		document.getElementById('year').innerHTML=year;	
		if(year==data[0])
		   document.getElementById('gt').style.visibility='hidden';	 
		if(year==data[1])
		   document.getElementById('lt').style.visibility='hidden';	 
	}	
	function changeCalendarControlYear(year)
	{
	  
	    if(pickerflag==1)
		   document.getElementById('base_ndvi_vf').value="";
		else   
		   document.getElementById('Monthyear').value="";
	    year=parseInt(document.getElementById('year').innerHTML)+year;	 
        document.getElementById('year').innerHTML=year;
	 
	    if(year<=data[0]&&year>=data[1])
	        displaycalender(year);
	}
	
	function setCalendarControlDate(monthname)
	{ 
		if(pickerflag==1) {
			document.getElementById('base_ndvi_vf').value=toTitlecase(monthname)+","+document.getElementById('year').innerHTML;
			view_remove();
		}
		else{
			document.getElementById('Monthyear').value=toTitlecase(monthname)+","+document.getElementById('year').innerHTML;	 
			Swipeing_deactivate();
		}
		document.getElementById('CalendarControl').style.display='none';
		calender_flag=1;
	}
	
	
var monlist = new Array();
//For slider
function toTitlecase(str)
{
 return str.charAt(0).toUpperCase()+str.slice(1);
}
		
function slider_vf()
{
var tmp =document.getElementById('base_ndvi_vf').value;
yr = tmp.split(',')[1];
mn = tmp.split(',')[0];
document.getElementById("sliderdiv").style.display = "inline";
document.getElementById("montext").style.position = "absolute";
document.getElementById("montext"). innerHTML = toTitlecase(mn) + "," + yr; //This is Water Spread Area
setSlider();
var position = getOffset(document.getElementById('poImgsliderDiv1')).left; 			
document.getElementById("montext").style.left=position-5;

}


function setSlider()
	{

	monlist=new Array();
	var temp = vf_slider_yr.split(":");
	for (i=2,j=2;i<temp.length;i++)
	monlist[i-2] = temp[i].split(",")[1] + "," + temp[i].split(",")[0];
	var mlist = document.getElementById("base_ndvi_vf").value;
	var mn_index =0;			
	for(i=0; i<monlist.length; i++)
	{
	if(monlist[i].toLowerCase() == mlist.toLowerCase())
	mn_index = i;
	}
	sliderCheck(mn_index);

	}

function sliderCheck(mn_index)
	{
			mySlider = new Bs_Slider();
			mySlider.attachOnChange(bsSliderChange);
			mySlider.width         = 125;
			mySlider.height        = 18;
			mySlider.minVal        = 0;
			mySlider.maxVal        = monlist.length-2;
			mySlider.valueInterval = 1;
			mySlider.arrowAmount   = 1;
			mySlider.arrowKeepFiringTimeout = 300;
			mySlider.valueDefault  = mn_index;
			mySlider.setBackgroundImage('bar.jpg', 'repeat-x');
			mySlider.setSliderIcon('control_but1.jpg', 11, 17);
			mySlider.setArrowIconLeft('minus.jpg', 14, 15);
			mySlider.setArrowIconRight('plus.jpg', 14, 15);
			//mySlider.useInputField = 2;
			//mySlider.styleValueFieldClass = 'sliderInput';
			mySlider.draw('sliderDiv1');
			
		
	}

	function bsSliderChange(sliderObj, val, newPos){ 
	
	 var position = getOffset(document.getElementById('poImgsliderDiv1')).left; // position = { left: 42, top: 567 }
	document.getElementById("montext").style.position = "absolute";
	document.getElementById("montext").style.left=position-5;
	document.getElementById("montext"). innerHTML = monlist[val]; 
	document.getElementById("base_ndvi_vf"). value = monlist[val]; 
		document.getElementById("montext"). innerHTML = toTitlecase(monlist[val].split(",")[0])+","+monlist[val].split(",")[1]; 
			document.getElementById("base_ndvi_vf"). value =toTitlecase(monlist[val].split(",")[0])+","+monlist[val].split(",")[1]; 
			var wtemp=monlist[val];
			parent.removetree();
			parent.wms_load(theme.toUpperCase()+"_"+wtemp.split(",")[0]+(wtemp.split(",")[1]).substring(2,4),"https://bhuvan-noeda.nrsc.gov.in/tilecache/tilecache.py",false);	
			
		
	
	}
	
	function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop ;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


function changeOpacity2(byOpacity,name,divname) {
var layers=parent.map.layers;
//i value changed 2 to 3
for (var i=3; i<layers.length; i++) 
{
if(layers[i].name == name)
{
     var newOpacity = (parseFloat(document.getElementById(divname).value) +byOpacity).toFixed(1);
			newOpacity = Math.min(parent.maxOpacity,Math.max(parent.minOpacity, newOpacity));
			document.getElementById(divname).value = newOpacity;
			layers[i].setOpacity(newOpacity);
			}
		
}
}

//Legend for SISDP Layers 11072016

	function moveChangedlulc10()
	{
		var zm = parent.map.getZoom();
		var sc = parent.map.getScale();
		theme = document.getElementById("theme").value.split("_")[0];
		
		if(theme == "lulc10" && sc > 50000)
		{
			document.getElementById('lg').innerHTML="<img src='img/sisdpv2_g50k.png'></img>";
		}
		else if(theme == "lulc10" && sc <= 50000)
		{
			document.getElementById('lg').innerHTML="<img src='img/sisdpv2_l50k.png'></img>";
		}
	}
	//Legend for SISDP Layers phase2 2016-2019	
		function moveChangedlulc101619()
	{
		var zm = parent.map.getZoom();
		var sc = parent.map.getScale();
		theme = document.getElementById("theme").value.split("_")[0];
		
		if(theme == "lulc101619" && sc > 50000)
		{
			document.getElementById('lg').innerHTML="<img src='img/sisdpv2_g50k.png'></img>";
		}
		else if(theme == "lulc101619" && sc <= 50000)
		{
			document.getElementById('lg').innerHTML="<img src='img/sisdpv2_l50k.png'></img>";
		}
		
		
		
	} 	

	
