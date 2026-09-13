//Making the Proxy URL relative instead of absolute path to resolve the Glacial lakes onclick info
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
//OpenLayers.ProxyHost = "http://bhuvan-noeda.nrsc.gov.in/cgi-bin/proxy.cgi?url=";
var map, measureControls, flag = 0, globle, fsearch=0,link5=0,
    help, layer, popup=null, vlayer, feature, flag1 = 0, maxOpacity = 0.9,
       minOpacity = 0.1, dro1, bounds, cartocontrol = null, hover, flagbox=0, globalbounds,
    control, query, sflag=0, select, cartolayer, popups = {};
var  awifs,  basemap, liss, l4, nodata, redifflayer, popup, ov,analysiscontrol, transportnetwork;
var xx = 81.6,
    yy = 22.5,
    zz = 2;	 
var extent = new OpenLayers.Bounds(66, 6, 102, 40);
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
OpenLayers.Util.onImageLoadErrorColor = "transparent";



var urlArray = ["https://tile1.nrsc.gov.in/tiles", "https://tile2.nrsc.gov.in/tiles", "https://tile3.nrsc.gov.in/tiles", "https://tile4.nrsc.gov.in/tiles", "https://tile5.nrsc.gov.in/tiles"];
    var urlArray1 = ["https://tile1.nrsc.gov.in/tilecache/tilecache.py?", "https://tile2.nrsc.gov.in/tilecache/tilecache.py?", "https://tile3.nrsc.gov.in/tilecache/tilecache.py?", "https://tile4.nrsc.gov.in/tilecache/tilecache.py?", "https://tile5.nrsc.gov.in/tilecache/tilecache.py?"];
  var urlArray2 = ["https://vtile1.nrsc.gov.in/bhuvan/gwc/service/wmts/", "https://vtile2.nrsc.gov.in/bhuvan/gwc/service/wmts/", "https://vtile3.nrsc.gov.in/bhuvan/gwc/service/wmts/", "https://vtile4.nrsc.gov.in/bhuvan/gwc/service/wmts/", "https://vtile5.nrsc.gov.in/bhuvan/gwc/service/wmts/"];
  
var urlArray3 = ["https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/"];
var urlArray4 = ["https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms/"];
var urlArray6 = ["https://bhuvan-vec2.nrsc.gov.in/bhuvan/gwc/service/wms"];

var vectorLayer = new OpenLayers.Layer.Vector("Simple Geometry", {
                style: layer_style,
                renderers: renderer
            });
var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
var layer_style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
layer_style.fillOpacity = 0.2;
layer_style.graphicOpacity = 1; 
var nuis_ano,IRSlayer,dummylayer,rediff_maps,moveChanged,moveChanged1;
rediff_maps=null;
transportnetwork = null;

function result()
{
    console.log("inside result..on load");	
}
function init() 
{



	
    map = new OpenLayers.Map('map', {
        restrictedExtent: extent,
        numZoomLevels: 10       
    }); 

dummylayer= new OpenLayers.Layer("base__worl2", {isBaseLayer: true} );
		//var dummylayer = new OpenLayers.Layer(null, {isBaseLayer: true});
		
	/*	dummylayer = new OpenLayers.Layer.WMS( "dummy",
                    "",
                    {layers: 'basic'} );

	*/
		basemap = new OpenLayers.Layer.WMS("basemap", "https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/", 
				   {layers: "india3"}, {isBaseLayer: false});
		/*basemap = new OpenLayers.Layer.WMS("basemap", "https://bhuvannuis.nrsc.gov.in/bhuvan/gwc/service/wms/", 
				   {'layers': 'basemap', transparent: true,format: 'image/png'}, {isBaseLayer: false});	 */  
    	world = new OpenLayers.Layer.WMS("base__world", "https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/", {
        'layers': 'world:world_final',  transparent: true,format: 'image/png'} );
		
		awifs = new OpenLayers.Layer.WMS("base__world1", "https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/", {
        'layers': 'world:world_label', transparent: true, format: 'image/png'}, {
        isBaseLayer: false
    } );
	vlayer = new OpenLayers.Layer.Vector("result");	
	map.addLayer(dummylayer);	
	map.addLayer(basemap);
    map.addLayer(world);
    map.addLayer(awifs);
    
	var layers = map.layers.slice();
	//i value changed 1 to 2;
    for (var i = 3, len = layers.length; i < len; i++) {
        layers[i].setVisibility(false);
    }
	//awifs.setVisibility(true);
	
    map.addControl(new OpenLayers.Control.StatusBar());
    map.addControl(new OpenLayers.Control.PanZoomBar());
    nav1 = new OpenLayers.Control.NavigationHistory();
    map.addControl(nav1);
    nav1.activate();
    nav1.previous.title = "Go Back To Previous Extent";
    nav1.next.title = "Go To Next Extent";
    zb = new OpenLayers.Control.ZoomBox({
        title: "Zoom box: Zoom in an area by clicking and dragging."
    });
    zb2 = new OpenLayers.Control.ZoomBoxout({
        title: "Zoom box: Zoom out an area by clicking and dragging.",
        out: true
    });
    panel = new OpenLayers.Control.Panel();
    panel.addControls([zb, zb2, new OpenLayers.Control.Navigation({
        title: 'Use this tool to navigate or deactivate any other control in tool bar'
    }), new OpenLayers.Control.ZoomToIndia({
        title: "Zoom To Initial Extent"
    }), new OpenLayers.Control.ZoomIn({
        title: "Fixed Zoom In"
    }), new OpenLayers.Control.ZoomOut({
        title: "Fixed Zoom Out"
    })]);
    panel.addControls([nav1.next, nav1.previous]);
    map.addControl(panel);
    panel.hide("Button");
    panel.hide("ZoomBoxout");
    panel.hide("ZoomBox");
    panel.hide("ZoomToIndia");
    panel.hide("ZoomIn");
    panel.hide("ZoomOut");
    panel.hide("Navigation");
    nav = new OpenLayers.Control.Navigation();
    sc = new OpenLayers.Control.ScaleBar();
    map.addControl(sc);
		var options1 = {
	'div': document.getElementById('loadingpanel')
	};
    map.addControl(new OpenLayers.Control.LoadingPanel(options1));
   
    measureControls = {
                
                polygon: new OpenLayers.Control.Measure(
                    OpenLayers.Handler.Polygon, {
                        persist: true,
                        handlerOptions: {
                            layerOptions: {
                                renderers: renderer,
                                styleMap: styleMap
                            }
                        }
                    }
                )
            };
            
   var control;
   for(var key in measureControls) {
   control = measureControls[key];
                control.events.on({
                    "measure": handleMeasurements,
                    "measurepartial": handleMeasurements
                });
   map.addControl(control);
   }


    map.addControl(nav);
    
    var style = new OpenLayers.Style();
    
    var styleMap = new OpenLayers.StyleMap({
        "default": style
    });

	map.setCenter(new OpenLayers.LonLat(xx, yy), zz);
	zoom_in(81.6, 22.5, 2)	;
	hover1();
	
	rediff_maps = new OpenLayers.Layer.WMS("rediffmap", "https://immaps.rediff.com/wms", {
        layers: "overlay_en_1.0.0",
        transparent: true
		}, {
			isBaseLayer: false, visibility:false
		}
	);	
	map.addLayer(rediff_maps);

	transportnetwork = new OpenLayers.Layer.WMS("bhuvantransportnetwork", "https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms/", 
						{layers: "mmi:mmi_india", transparent: true},{transitionEffect:null,visibility:true});
	
	map.addLayer(transportnetwork);
	
	//map.events.register("zoomend", map, zoomChanged);
	
}


var out = "";

var wkt = new OpenLayers.Format.WKT();
var geom;
function handleMeasurements(event) {
            //var geometry = event.geometry;
			geom=event.geometry;
            var units = event.units;
            var order = event.order;
            var measure = event.measure;
			out = measure.toFixed(3);
           // out1 += "measure: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
            
			//var wktFeature = new OpenLayers.Feature.Vector(OpenLayers.Geometry.fromWKT(geometry));
			//out = wkt.write(wktFeature);
        }
		
		
        
	function toggleControl(element) {
    analysiscontrol = measureControls[element.id];
    analysiscontrol.activate();
   
}


function sendsearch() {
       link5 = $("#search").dialog({
        autoOpen: false,
        resizable: false,
        width: 400,
		height:'auto',
        close: function () {},
        zIndex: 3000
    });
    link5.dialog("open");
}
function showResult(str)
{
var regexLetter = /[a-zA-Z]/;
	if (str.length<4)
    {
        return;
    }
	if(!regexLetter.test(str))
	   return;
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
	            var m=xmlhttp.responseText;
				document.getElementById("livesearch").innerHTML=m;
				document.getElementById("live").innerHTML=m;
				document.getElementById("live").style.border="1px solid #A5ACB2";
				document.getElementById("live").style.background="white";
				document.getElementById("live").style.display="block";	
				if(sflag){
						sflag=0;
						document.getElementById('live').style.display='none';
						if(m=="")
						{
							alert("Results not found");
							return false;
						}
	      		        if(document.getElementById("searchnum").innerHTML=="1")
						{
							var k=document.getElementById("0").innerHTML;
							var temp=new Array();
							temp=k.split(',');
							m=document.getElementById("Val").value;
							if(temp[0].toLowerCase()==m.toLowerCase()){
								k= document.getElementById("1").innerHTML;	                   
								temp=k.split(',');
								m=parseFloat(temp[0]);
								k=parseFloat(temp[1]);
								testing(m,k);
								return ;
							}
						}
		  				sendsearch(); 
		
				}
		  }
	}
	xmlhttp.open("GET","usertasks/search/india.php?q="+str,true);
	xmlhttp.send();
}
	function test(s)
{
	var k=document.getElementById(s).innerHTML;
	document.getElementById('Val').value=k;
	fsearch=1;
	globle=parseFloat(s)+1;
	globle=""+globle; 
	globle=document.getElementById(globle).innerHTML;
}
function test2()
{
	document.getElementById('live').style.display="none";
	if(link5)
		link5.dialog("close");
	Go();
}
function remove1(s)
{
  document.getElementById(s).value="";
	fsearch=0;
	}
function Go(){
	document.getElementById('live').style.display='none';
	var m = document.getElementById('Val');

	var n=""+m.value;  

	if (n == "") {
        alert("Cannot be empty")
		return false;
    }
	if (flag == 1) help.deactivate();
		flag = 0;

    var iChars = "!@#$%^&*()+=[]\\\';/{}|\":<>?";
    for (var i = 0; i <n.length; i++) {
         if (iChars.indexOf(n.charAt(i)) != -1) {
              alert("Pls dont give special characters");
            return false
         }
    }
    var regexLetter = /[a-zA-Z]/;
	if (regexLetter.test(n)) {       
       	   if(fsearch==1)
		   {  
				if(link5)
					link5.dialog("close");
				n=globle;
				var temp = new Array();
				temp = n.split(',');
				var l = parseFloat(temp[0])
				var k = parseFloat(temp[1]);  
				testing(l,k);	
		  
		   }  
	       else
		   {			
		 
						sflag=1;	     
					   showResult(m.value);		
		   }
    }
	else{
	
		var temp = new Array();
		temp = n.split(',');
		var l = parseFloat(temp[0])
		var k = parseFloat(temp[1]);  
		testing(l,k);	
	}
	
}
function testing(l,k)
{   
  if ((k < -180) || (k > 180) || (l < -90) || (l > 90)) {
        alert("Pls enter correct range")
    } else {
        if (feature != null) vlayer.destroyFeatures(feature);
        feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(k, l), {
            some: 'data'
        }, {
            externalGraphic: '../img/marker.png',
            graphicHeight: 17,
            graphicWidth: 16
        });
		removelayer('result');
		map.addLayer(vlayer);
        vlayer.addFeatures(feature);
		var zoomlevel=map.getZoom();
		if(zoomlevel>5)
			map.setCenter(new OpenLayers.LonLat(k,l), zoomlevel);
		else
			map.setCenter(new OpenLayers.LonLat(k,l), 6);
        
    }
}

function hid() {
    panel.hide("Button");
    panel.hide("ZoomBoxout");
    panel.hide("ZoomBox");
    panel.hide("ZoomToIndia");
    panel.hide("ZoomIn");
    panel.hide("ZoomOut");
    panel.hide("Navigation");
    panel.deactivate();
}
function se() {
    if (flag == 1) help.deactivate();
	if(query)
	query.deactivate();
    flag = 0;
	if(popup)
			{			
			popup.destroy();
			popup=null;
			}
    panel.activate();
    panel.show("Button");
    panel.show("ZoomBoxout");
    panel.show("ZoomBox");
    panel.show("ZoomToIndia");
    panel.show("ZoomIn");
    panel.show("ZoomOut");
    panel.show("Navigation");
}

function zoom_in(x1,y1,z1)
{
var zoom = map.setCenter(new OpenLayers.LonLat(x1, y1), z1);
}

	function load_video(name,video,tit,w,h) {

    $(function() {
        $(name).dialog({
	        autoOpen: false,
			resizable: false,
	        width: w,
	        height: h,
			position: [350,100],
			close: function () {  },
			zIndex: 3000,
	        title: tit
		  });
          $(name).load(video.replace(/ /g,"%20")).dialog('open');
           
    });
}

function load_video1(name,video,tit,w,h) {

    $(function() {
        $(name).dialog({
	        autoOpen: false,
			resizable: false,
	        width: w,
	        height: h,
			position: [350,100],
			close: function () { wms_remove_others(); },
			zIndex: 3000,
	        title: tit
		  });
          $(name).load(video.replace(/ /g,"%20")).dialog('open');
           
    });
}


function loadTileCache(layername,arr,name)
{
setpanzoombar(10);
   var layertc = new OpenLayers.Layer.TileCache(layername, urlArray, name, {
        format: "image/png",
        isBaseLayer: false
    });
map.addLayer(layertc);

}

function hover1()
{
/* 	url1 = 'https://bhuvan-staging1.nrsc.gov.in/bhuvan/wms';
	urlArray6 = ["https://bhuvan-staging1.nrsc.gov.in/bhuvan/gwc/service/wms"]; */
	
	url1 = 'https://bhuvan-vec2.nrsc.gov.in/bhuvan/wms';
	
	query = new OpenLayers.Control.WMSGetFeatureInfo({           
		url: url1,				
		layerUrls: urlArray6,				
		title: 'Identify features by clicking',			
		queryVisible: true,
		eventListeners: 
		{
			getfeatureinfo: function(evt) {
				var popupId = evt.xy.x + "," + evt.xy.y;
				var popup = popups[popupId];
				if (!popup || !popup.map) {
					popup = new OpenLayers.Popup.FramedCloud(popupId, map.getLonLatFromPixel(evt.xy), null, evt.text, null, true, function (evt) {
						delete popups[this.id];
						this.hide();
						OpenLayers.Event.stop(evt);
					});
					popups[popupId] = popup;
					map.addPopup(popup, true);
				}
				popup.setContentHTML(popup.contentHTML);
				popup.show();
			}
		}			
    });
	 
    map.addControl(query);        
}


// new hide/show function

function hideshowmap()
	{
	$("#LeftAreaTD").toggle(1000);
	 setTimeout(function(){map.updateSize();},1000);
	if(document.getElementById('hideshowimg').getAttribute('src')=='img/minimize.png')
		{$("#hideshowimg").attr("src", "img/maximize.png");}
	else{

		  $("#hideshowimg").attr("src", "img/minimize.png");
		}
		
		
		
	} 
	
/* old function
function hideshowmap()
{


if(document.getElementById("LeftAreaTD").style.width == "0px" || document.getElementById("LeftAreaTD").style.width == "0pt")
{
document.getElementById("hideshowimg").src="img/west-mini.png";
document.getElementById("LeftAreaTD").style.width =  parseInt(0.4*screen.width) -5;
document.getElementById("rightAreaTD").style.width =  parseInt(0.6*screen.width) -5;
document.getElementById("india2").style.display="inline";
document.getElementById("india1").style.display="inline";
}
else
{
document.getElementById("hideshowimg").src="img/east-mini.png";
document.getElementById("LeftAreaTD").style.width = 0;
document.getElementById("india2").style.display="none";
document.getElementById("india1").style.display="none";
document.getElementById("rightAreaTD").style.width = screen.width;
}

}*/
var distzoom_counter=0;
var vectors1;
function distzoom(dist_vector,dist_lab,flag)
{
distzoom_counter=1;
if (vectors1) {
        vectors1.removeAllFeatures();
		map.setLayerIndex(vectors1, 20);
		 } else {
        var styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
        {strokeColor: "#000000",
        strokeOpacity: 1,
        strokeWidth: 3,
        fillColor: "#FFFFFF",
		label : "${name}",
		fontSize: "14px",
        fontFamily: "Courier New, monospace",
        fontWeight: "bold",
		fillOpacity: 0.1},
        OpenLayers.Feature.Vector.style["vectors1"]));
        vectors1 = new OpenLayers.Layer.Vector("Vector Layer", {styleMap: styleMap});
		setpanzoombar(10);
		map.addLayer(vectors1);
	    }

 

 parser = new OpenLayers.Format.WKT();
var geometry = parser.read(dist_vector);
var features = parser.read(dist_vector);
features.attributes = {
                name: dist_lab,
                favColor: 'black',
                align: 'lb'
            };
var bounds;
 if(features) {

                    if(features.constructor != Array) {
                        features = [features];
                    }
                    for(var i=0; i<features.length; ++i) {
                        if (!bounds) {
                            bounds = features[i].geometry.getBounds();
                        } else {
                            bounds.extend(features[i].geometry.getBounds());
                        }

                    }
                 vectors1.addFeatures(features);
				 if(flag)
				 map.zoomToExtent(bounds);

                } else {
               
                }
            
}

function distzoom1(wktString, label, shouldZoom) {
    distzoom_counter = 1;

    // Initialize vector layer if not already
    if (!vectors1) {
        vectors1 = new OpenLayers.Layer.Vector("Vector Layer");
        map.addLayer(vectors1);
        setpanzoombar(10);  // Optional: only if needed
    } else {
        vectors1.removeAllFeatures();
        map.setLayerIndex(vectors1, 20);
    }

    // Parse WKT
    var parser = new OpenLayers.Format.WKT();
    var features = parser.read(wktString);
    if (!features) return;

    // Ensure it's an array
    if (!Array.isArray(features)) features = [features];

    // Apply label and blue style to each feature
    var bounds = null;
    for (var i = 0; i < features.length; i++) {
        features[i].attributes = { name: label };
        features[i].style = {
            strokeColor: "#0000FF",
            strokeOpacity: 1,
            strokeWidth: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.3
        };

        var b = features[i].geometry.getBounds();
        bounds = bounds ? bounds.extend(b) : b.clone();
    }

    vectors1.addFeatures(features);

    if (shouldZoom && bounds) {
        map.zoomToExtent(bounds);
    }
}
var tree = null;
var tree_info = null;
var kml_layer = null;

function removetree()
{

if(tree!= null)
{

	map.removeLayer(tree);
	tree=null;
	
}
	if(tree_info!= null)
{
	map.removeLayer(tree_info);
	tree_info=null;
}

if(kml_layer!= null)
{
	map.removeLayer(kml_layer);
	kml_layer=null;
}
}
	
	//making redundant for land degradation need to be merged later
	
	function loadtree_ldd(name1,name2,lat1,lon1,lat2,lon2)
	{
	wmts_load(name1,name2,lat1,lon1,lat2,lon2,'_LDD50K_0506','_L3_LULC');
	kml_layer = new OpenLayers.Layer.GML('layername','https://bhuvan-noeda.nrsc.gov.in/theme/thematic_sa/ldd.kml', {
		format: OpenLayers.Format.KML,
		formatOptions: {
			extractStyles: !0,
			extractAttributes: !0
		}
	});
	map.addLayer(kml_layer);
	var kml_layer_ctrl = new OpenLayers.Control.SelectFeature(kml_layer, {
		onSelect: onFeatureSelect,
		onUnselect: onFeatureUnselect
	});
	map.addControl(kml_layer_ctrl);
	kml_layer_ctrl.activate() 
	}

function onFeatureSelect(a) {
	selectedFeature = a;
	popup = new OpenLayers.Popup.FramedCloud("chicken", a.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(100, 100), "<div style='font-size:.8em'>" + a.attributes.description + "</div>", null, !0);
	a.popup = popup;
	map.addPopup(popup)
}

function onFeatureUnselect(a) {
	map.removePopup(a.popup);
	a.popup.destroy();
	a.popup = null
}


//loading wmts	
function wmts_load(name1,name2,lat1,lon1,lat2,lon2,name1ext,treeinfo_name,flag)
{
/* 	if(name1ext=='_WL50K_1516' || name1ext=='_LD50K_0506' || name1ext=='_LD50K_1516')
		urlArray6 = ["https://bhuvan-staging1.nrsc.gov.in/bhuvan/gwc/service/wms"]; */
	
	setpanzoombar(10);
	removetree();
	var s = name1.split(":");

	if (s[0] == "lulc" || s[0] == "wasteland" || s[0] == "geomorphology" || s[0] == "lineament" || s[0] == "erosion" || s[0] == "salinity" || s[0] == "ld")
	{		
		var matrixIds = new Array(26);
		for (var i = 0; i < 26; ++i) 
		{
			matrixIds[i] = "EPSG:4326:" + (i + 2);
		} 

/*  	tree = new OpenLayers.Layer.WMTS({
		name: name2+'__'+name1+name1ext,
		url: urlArray6,
		layer: name1+name1ext,
		matrixSet: "EPSG:4326",
		matrixIds: matrixIds,
		tileFullExtent: new OpenLayers.Bounds(lon1,lat1,lon2,lat2),
		format: "image/png",
		style: "_null",
		opacity: 1.0,
		isTransparent: true,
		transitionEffect: "resize",
		isBaseLayer: false
		});  */
		
		tree = new OpenLayers.Layer.WMS(name2+'__'+name1+name1ext, urlArray6, { layers: name1+name1ext, transparent: true }, { isBaseLayer: false });

		if(flag)
		{
/* 			tree_info = new OpenLayers.Layer.WMTS({
			name: name2+'_pr__'+name1+treeinfo_name,
			url: urlArray6,
			layer: name1+treeinfo_name,
			matrixSet: "EPSG:4326",
			matrixIds: matrixIds,
			tileFullExtent: new OpenLayers.Bounds(lon1,lat1,lon2,lat2),
			format: "image/png",
			style: "_null",
			opacity: 1.0,
			isTransparent: true,
			transitionEffect: "resize",
			isBaseLayer: false
			}); */	
			
			tree_info = new OpenLayers.Layer.WMS(name2+'_pr__'+name1+treeinfo_name, urlArray6, { layers: name1+treeinfo_name, transparent: true }, { isBaseLayer: false });
			
			// map.removeLayer(basemap);
			map.addLayer(tree_info);
		}

		map.addLayer(tree);
		zoom_to_layer(lon1,lat1,lon2,lat2);
	}
	else
	{
		alert("Data Not Available");
	}
	setindex();
}


function loadlayer(name,layername,type,xx,yy,zz)
{
	layername=layername.split('_');
	layername=layername[0]+'__'+name;
	switch(type)
	{
		case 'tilecache':
		map.setCenter(new OpenLayers.LonLat(xx, yy), zz);
		loadTileCache(layername,urlArray,name);
		break;
		
		case 'labellayers':
		loadlabellayers(layername,urlArray4,name);
		break;
		
		case 'tilecache1':
		loadtree(name,layername);
		break;
		
		case 'tilecache2':
		loadmap(layername,"https://bhuvan-ras2.nrsc.gov.in/mapcache?",name);
		break;
		
		case 'tilecache3':
		loadmap(layername,"https://bhuvan-ras2.nrsc.gov.in/cgi-bin/flood.exe?",name);
		break;
		
		case 'none':
		var q = layername.split("_");
		remove(q[0]);
		break;
		
		default:
	}
}

function addbasemap()
{
map.addLayer(basemap);
map.setLayerIndex(basemap, -1);
}


function removelayer(name)
{
	var layers=map.layers;
	for (var i=3; i<layers.length; i++) 
	{		
		if (layers[i].name == name)
			map.removeLayer(layers[i]);
		
		if(layers[i].name.split("__")[1]==name && layers[i].name.split(":")[1]=='lulc_1deg')
			map.removeLayer(layers[i]);
	}
}

var layer_lab,layer_lab1,layer_lab2,layer_lab3;
function loadlabellayers1(layername,arr,name)
{

var layer_lab3 = new OpenLayers.Layer.WMS(layername, arr, {
        layers: name,
		transparent: true
    }, {
        format: "image/png", 
        isBaseLayer: false,transitionEffect: "resize"
    });
	
	map.addLayer(layer_lab3);
}

function loadlabellayers(layername,arr,name)
{
	setpanzoombar(10);
	var c = layername.split("__");
	if(c[0]=='lulc50' || c[0]=='wl50')
		remove(c[0]);


	if(c[0]=='ad')
	{	
		remove(c[0]);		
		layer_lab = new OpenLayers.Layer.WMS(layername, arr, {
			layers: name,
			transparent: true
		}, {
			format: "image/png", 
			isBaseLayer: false,transitionEffect: "resize"
		}
		);
		
		map.addLayer(layer_lab);
	}
	else if(c[0]=='ro')
	{
	layer_lab1 = new OpenLayers.Layer.WMS(layername, arr, {
			layers: name,
			transparent: true
		}, {
			format: "image/png", 
			isBaseLayer: false,transitionEffect: "resize"
		});
		
		map.addLayer(layer_lab1);
	}
	else if(c[0]=='wb')
	{
		layer_lab2 = new OpenLayers.Layer.WMS(layername, arr, {
			layers: name,
			transparent: true
		}, {
			format: "image/png", 
			isBaseLayer: false,transitionEffect: "resize"
		});
		
		map.addLayer(layer_lab2);		
	}
	else 
	{
		layer_lab3 = new OpenLayers.Layer.WMS(layername, arr, {
			layers: name,
			transparent: true
		}, {
			format: "image/png", 
			isBaseLayer: false,transitionEffect: "resize"
		});		
		map.addLayer(layer_lab3);
	}
}


function remove(name1)
{
	var layers = map.layers.slice();
	// i value changed 2 to 3
	for (var i=3; i<layers.length; i++) 
	{
		
		var a = layers[i].name;
		if (a.split("__")[0] == name1 || a.split("_")[0] == name1 || a == name1)
		map.removeLayer(layers[i]);
	}
}

var dynlayer;
function loadmap(name1,url,name2)
{
setpanzoombar(10);
var b = name1.split("__");
remove(b[0]);

 dynlayer = new OpenLayers.Layer.WMS(name1, url, {
        layers: name2,
        transparent: true
    }, {
        isBaseLayer: false
    }
);	
dynlayer.redraw(true);	
map.addLayer(dynlayer);

}

function getBounds() {
    var a = [],
        a = new OpenLayers.Bounds,
        a = map.getExtent(),
        a = a.toArray();
		
    return "l=" + a[0] + "&b=" + a[1] + "&r=" + a[2] + "&t=" + a[3];
}


// var g = "https://bhuvan-noeda.nrsc.gov.in/tilecache/tilecache.py?";

	
function wms_load(name,url,flag) {
setpanzoombar(10);
	tree = new OpenLayers.Layer.WMS(name, url, {
		layers: name,
		transparent: true
	},
	{
		
		isBaseLayer: false
	});
	map.addLayer(tree);
	if(flag==true) {
	tree_info = new OpenLayers.Layer.WMS(name.split('_')[0]+'_river', "https://bhuvan-ras2.nrsc.gov.in/cgi-bin/flood.exe", {
		layers: name.split('_')[0]+'_river',
		transparent: true
	},
	{
		isBaseLayer: false
	});
	map.addLayer(tree_info); }
	
	setindex();
	
}




function wms_load_others(name) { //others_ layer name
setpanzoombar(10);
var g1 = "https://bhuvan-noeda.nrsc.gov.in/cgi-bin/flood.exe?map.layer["+name+"].class[Inundated Area].style[0]=COLOR+255+0+0";
	var j = new OpenLayers.Layer.WMS("others__"+name, g1, {
		layers: name,
		transparent: true
	},
	{
	    opacity: 0.5,
		isBaseLayer: false
	});
	map.addLayer(j);
	document.getElementById("opac_"+name).style.display="inline";
	
}

function wms_remove_others() {

var layers=map.layers.slice();

for (var i=layers.length-1; i>2; i--) 
{

	var a11 = layers[i].name;	
	
		
			var s11 = a11.split("__");	
			if (s11[0] == "others")
			map.removeLayer(layers[i]);
		
}

}




function otheryears(year,scode,type)
{
load_video1('#annuallayerFrame','usertasks/annuallayers.php?year='+year+'&scode='+scode+'&type='+type,'Annual Layers','190','540')
}

function changeOpacity(byOpacity,name) {
var layers=map.layers;
//i value changed 2 to 3
for (var i=3; i<layers.length; i++) 
{
var divname="opacity_"+name;
	if (layers[i].name == "others__"+name || layers[i].name == name) {
			
            var newOpacity = (parseFloat(OpenLayers.Util.getElement(divname).value) +byOpacity).toFixed(1);
			newOpacity = Math.min(maxOpacity,Math.max(minOpacity, newOpacity));
			document.getElementById(divname).value = newOpacity;
			layers[i].setOpacity(newOpacity);
			}
}
}

function print()
{
	 var a = getBounds(); 
	   var zoomlevel = map.getZoom();
	 
	 var str="";
	 for (var i = 0, len = map.layers.length; i < len; i++) {			  
           if(map.layers[i].visibility)
			str=str+map.layers[i].name+".";
		}

	 var width=document.getElementById('map').offsetWidth+"px";	 
	 var height=document.getElementById('map').offsetHeight+"px";
	 var hreflink='print.html?'+a + "&activelayers="+str+'&height='+height+'&width='+width+'&zoom='+zoomlevel;
	 document.getElementById('printing').href=hreflink;
}
	
function wms_overlay(name,name1,url,opa1) { //overlay
	var overlay = new OpenLayers.Layer.WMS(name, url, {
		layers: name1,
		transparent: true
	},
	{
	    opacity: opa1,
		isBaseLayer: false
	});
	map.addLayer(overlay);
	
	
}

function setindex()
{
if(layer_lab)
map.setLayerIndex(layer_lab, 13);
if(layer_lab1)	
map.setLayerIndex(layer_lab1, 14);
if(layer_lab2)
map.setLayerIndex(layer_lab2, 15);
if(layer_lab3)
map.setLayerIndex(layer_lab3, 17);
if(dynlayer)
map.setLayerIndex(dynlayer, 12);
}


function zoom_to_layer(lon1,lat1,lon2,lat2)
{var bounds = new OpenLayers.Bounds(lon1,lat1,lon2,lat2);

	map.zoomToExtent(bounds, true);
}


function queryenable(flag)
{
if(flag) {
document.getElementById('query_1').style.display="inline";
document.getElementById('query_2').style.display="inline";
}
else {
document.getElementById('query_1').style.display="none";
document.getElementById('query_2').style.display="none";
}
}
function printenable(flag)
{
if(flag) 
document.getElementById('printing').style.display="inline";
else 
document.getElementById('printing').style.display="none";
}



function reloadlogin() {

    console.log("a value is...");
    document.getElementById("loggedindiv").innerHTML = "<b>&nbsp;&nbsp;Welcome1 <a>" + bhuvanusername + "</a>&nbsp;&nbsp;&nbsp;&nbsp;</b>";
    document.getElementById("logindiv").innerHTML = "<b><a style=\"font-family: Arial; font-size: 11px; color: darkblue\" onclick=\"load_video('#LogoutFrame','loading.php?q=logout.php','Logout','900','700');reloadlogin_afterlogout();\" alt=\"logout\" title=\"Click here to logout\" href=\"#\">Logout</a></b>";
    $("#LoginFrame").dialog("close")

	}
	
function reloadlogin_afterlogout() {

    bhuvanusername = "empty";
    document.getElementById("loggedindiv").innerHTML = "<b>&nbsp;&nbsp;Welcome User&nbsp;&nbsp;&nbsp;&nbsp;</b>";
    document.getElementById("logindiv").innerHTML = "<b><a style=\"font-family: Arial; font-size: 11px; color: darkblue\" onclick=\"load_video('#LoginFrame','loading.php?q=login.php','Login','900','700');\" alt=\"login\" title=\"Way to portal login\" href=\"#\">Login</a></b>";
    $("#LogoutFrame").dialog("close")	

	}

//Redundant to be optimized ------------------------------

function removenuislayer()
{

var layers=map.layers.slice();

for (var i=layers.length-1; i>2; i--) 
{

           if(map.layers[i].name.indexOf('nuis')==0)
		   map.removeLayer(layers[i]);
			
		}
}


function removelayer_nuis(n,s,t)
{
var nuistemp = n+"_"+s+"_"+t;
var layers=map.layers.slice();
for (var i=layers.length-1; i>2; i--) {			  
           if(map.layers[i].name == nuistemp)
			map.removeLayer(layers[i]);
		}

}

function loadlayer_nuis(state,town,layername,displayname,coords)
{
if(layername == 'madan')
{

	loadmap(displayname+"_"+state+"_"+town,"https://bhuvan-noeda.nrsc.gov.in/tilecache/tilecache.py",'madan');
	return;

}

	coords=coords.split("_");
	setpanzoombar(14);
	//var layername1 = state.toUpperCase() + "_" + town + "_" + layername ;
	var layername1 = "nuis:" + state.toUpperCase() + "_" + town + "_" + layername ;
	//var s = layername1.split(":");
	if (layername1)
	{
		var matrixIds = new Array(26);
		for (var i = 0; i < 26; ++i) {
			matrixIds[i] = "EPSG:4326:" + (i + 2);
		}
		swipe_layer = new OpenLayers.Layer.WMTS({
			name:"nuis"+displayname+"_"+state+"_"+town,
			url:"https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wmts/",
			layer: layername1,
			matrixSet: "EPSG:4326",
			matrixIds: matrixIds,
			tileFullExtent: new OpenLayers.Bounds(coords[0],coords[1],coords[2],coords[3]),
			format: "image/png",
			style: "_null",
			opacity: 0.8,
			isTransparent: true,
			isBaseLayer: false,
			'displayInLayerSwitcher':false
		});
		map.addLayer(swipe_layer);
		zoom_to_layer(coords[0],coords[1],coords[2],coords[3]);
	}
	map.setLayerIndex(nuis_ano, 100);
	map.setLayerIndex(rediff_maps, 101);
	map.setLayerIndex(transportnetwork, 102);
	//else part is removed;

}

function nuis_onload()
{
//For NUIS annotations
setpanzoombar(5);
	nuis_ano = new OpenLayers.Layer.WMS("nuisAnnotation", urlArray4, {layers: "admin:nuis_anno", format: "image/png", transparent: "true"	},
	{
		
		isBaseLayer:false,
		'displayInLayerSwitcher': false,
		//transitionEffect: "resize",
		'buffer':0
	});
	map.addLayer(nuis_ano);
}

function setpanzoombar(zoomlevels)
{
map.removeLayer(dummylayer);
map.numZoomLevels=zoomlevels;
map.addLayer(dummylayer);
}

function wmtsload(n,lat1,lon1,lat2,lon2) 
{
	setpanzoombar(10);

	var matrixIds = new Array(26);
    for (var i = 0; i < 26; ++i) {
        matrixIds[i] = "EPSG:4326:" + (i + 2);
    }
	
/* 	tree = new OpenLayers.Layer.WMTS({
        name: n,
        url: urlArray6,
        layer: n,
        matrixSet: "EPSG:4326",
        matrixIds: matrixIds,
		tileFullExtent: new OpenLayers.Bounds(lon1,lat1,lon2,lat2),
		format: "image/png",
        style: "_null",
        opacity: 1.0,
        isTransparent: true,
		transitionEffect: "resize",
		isBaseLayer: false
    }); */
	
	tree = new OpenLayers.Layer.WMS(n, urlArray6, { layers: n, transparent: true }, { isBaseLayer: false });

	setindex();
	map.addLayer(tree);
}

var kml_layer=null;

function loadkml(displayname, layerurl) {
	
	kml_layer = new OpenLayers.Layer.Vector(displayname, {
				'displayInLayerSwitcher':false,
                projection: map.displayProjection,
                strategies: [new OpenLayers.Strategy.Fixed()],
                protocol: new OpenLayers.Protocol.HTTP({
                    url: layerurl,
                    format: new OpenLayers.Format.KML({
                        extractStyles: true,
                        extractAttributes: true
                    })
                })
      });	
	map.addLayer(kml_layer);
	select = new OpenLayers.Control.SelectFeature(kml_layer);            
    kml_layer.events.on({
                "featureselected": onFeatureSelect,
                "featureunselected": onFeatureUnselect
            });
     map.addControl(select);
     select.activate();   
	
}

function onFeatureSelect(event) {
	var feature = event.feature;
	popup = new OpenLayers.Popup.FramedCloud("chicken", feature.geometry.getBounds().getCenterLonLat(), new OpenLayers.Size(100, 100), "<div style='font-size:.8em'>" + feature.attributes.description + "</div>", null, !0);
	feature.popup = popup;
	map.addPopup(popup)
}
function onFeatureUnselect(event) {
            var feature = event.feature;
            if(feature.popup) {
                map.removePopup(feature.popup);
                feature.popup.destroy();
                delete feature.popup;
            }	
}

function loadwms(name1,url,name2)
{
var dynlayer = new OpenLayers.Layer.WMS(name1, url, {
        layers: name2,
        transparent: true
    }, {
        isBaseLayer: false
    }
);	


map.addLayer(dynlayer);
}

//For GLWB and WSA analysis function  

function analyse_glwb(id)
{
load_video('#glwb_anlys','usertasks/download1/chart_glwb.php?dcode='+id,'Analysis','800','560');
}


var theme;
function display_options(thm)
{
	if(thm=='Month')
	{
		document.getElementById("Month_display").style.display="inline";
		document.getElementById("year_display").style.display="none";
	}
	else
	{
		document.getElementById("year_display").style.display="inline";
		document.getElementById("Month_display").style.display="none";
	}
}

	
function chartgen()
{

document.getElementById("aerror").innerHTML="";
if(document.getElementById("adistricts").value == 'Select' || document.getElementById("adistricts").value == '')
{
document.getElementById("aerror").innerHTML="<br/><span class='s10' style='color:RED'>Please select district</span></br> ";
return;
}
var url="usertasks/download1/chart/loadchart.php?dcode="+dcode+"&flag=false";
parent.load_video('#chartdiv',url,'Water Spread Dynamics','800','450');

}

function drawchart()
{
	if(theme=='Month')
		var fld = document.getElementById('amonth');
	else
		var fld = document.getElementById('ayear');
	
	var dcode=document.getElementById('dcode').value;
	var lakeid=document.getElementById('lakeid').value;
	
 	var  par = [];
	for (var i = 0; i < fld.options.length; i++) 
	{
		if(fld.options[i].selected)
			par.push(fld.options[i].value);
	}
	var numyr=par.length;
	var pr="";
	for(var i=0;i<par.length-1;i++)
	pr=pr+par[i]+"_";
	pr=pr+par[par.length-1];
	
/*	if(lakeid == 'wsa') // For WSA
	var url="usertasks/analysis/wsa/genchart.php?";
	else
	var url="usertasks/download1/genchart.php?"; */
	
	if(numyr < 1)
	{
		document.getElementById("aerror").innerHTML="<br/><span class='s10' style='color:RED'>Please select either Month or Year first.</span>";
		return;
	}
	else if(theme=="Month") 
	{	
		document.getElementById("aerror").innerHTML="<br/><span class='s10' style='color:RED'><b>Processing the Data...</b></span>";
		document.getElementById("chartgen").innerHTML="<iframe id='myiframe' src='"+url+"mnth="+pr+"&dcode="+dcode+"&lakeid="+lakeid+"' onload='iframeLoaded()' width=100% height=60% />"
		document.getElementById("chartgen").style.display="inline";
	}
	else
	{
		document.getElementById("aerror").innerHTML="<br/><span class='s10' style='color:RED'><b>Processing the Data...</b></span>";
		document.getElementById("chartgen").innerHTML="<iframe id='myiframe' src='"+url+"yr="+pr+"&dcode="+dcode+"&lakeid="+lakeid+"' onload='iframeLoaded()' width=100% height=60% />"
		document.getElementById("chartgen").style.display="inline";
	}

}

function iframeLoaded()
{
document.getElementById("aerror").innerHTML="";
}
//in main page "chartdiv" to be made"


//Rediff and Bhuvan Maps
	function rediff(flag) 
	{
		rediff_maps.setVisibility(flag);
	}
	
	function transport(flag) 
	{
		transportnetwork.setVisibility(flag);
	}


