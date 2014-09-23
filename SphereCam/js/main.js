// standard Three.js global variables
var container, scene, camera, renderer, controls, stats;

// custom global variables
var video, videoImage, videoImageContext, videoTexture;
var updateFcts	= [];
var photo;

/*facePlusPlus api object
var api = new FacePP('741c414b3c00d7caedf5496ed8711590',
                     'IXo11YT1lZYLpY3AQ6fdnBZViMplG9tw',
                     { apiURL: 'http://apius.faceplusplus.com' });*/




//load up webcam
function loadWebcam (){

	//browser-specific definitions for getUserMedia and window.URL
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	window.URL = window.URL || window.webkitURL;

	//camvideo is the webcam input
	var camvideo = document.getElementById('monitor');

	//if getUserMedia supported, load webcam
	if (!navigator.getUserMedia) 
	{
		document.getElementById('errorMessage').innerHTML = 
			'Sorry. <code>navigator.getUserMedia()</code> is not available.';
	} else {
		navigator.getUserMedia({video: true}, gotStream, noStream);
	}

	//load webcam
	function gotStream(stream) 
	{
		if (window.URL) 
		{   camvideo.src = window.URL.createObjectURL(stream);   } 
		else // Opera
		{   camvideo.src = stream;   }

		camvideo.onerror = function(e) 
		{   stream.stop();   };

		stream.onended = noStream;
	}


	//in case of error with webcam loading
	function noStream(e) 
	{
		var msg = 'No camera available.';
		if (e.code == 1) 
		{   msg = 'User denied access to use camera.';   }
		document.getElementById('errorMessage').textContent = msg;
	}
}



/*
	Three.js code derived mostly from:
	"tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/
	
//////////////////////////////	
//////Main Three.js Code//////
//////////////////////////////

		
function load3JS() {

	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.lookAt(scene.position);	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );

	// ORBIT CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	//Mouse movement controls
	/*var mouse	= {x : 0, y : 0};
	document.addEventListener('mousemove', function(event){
		mouse.x	= (event.clientX / window.innerWidth ) - 0.5
		mouse.y	= (event.clientY / window.innerHeight) - 0.5
	}, false);
	onRenderFcts.push(function(delta, now){
		camera.position.x += (mouse.x*5 - camera.position.x) * (delta*3);
		camera.position.y += (mouse.y*5 - camera.position.y) * (delta*3);
		camera.lookAt( scene.position );
	});*/

	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

	// OLD LIGHT
	/*var light = new THREE.PointLight(0xffffff);
	light.position.set(200,250,0);
	scene.add(light);*/

	//ALT LIGHT
	var light	= new THREE.DirectionalLight( 0xcccccc, 1 );
	light.position.set(700,500,300);
	scene.add( light );
	scene.add(new THREE.AmbientLight(0x333333));

	
	/////////////////////////////////////
	// LOAD WEBCAM VIDEO INTO THREE.JS //
	/////////////////////////////////////

	//get video element in html
	video = document.getElementById( 'monitor' );
	
	//get video canvas element
	videoImage = document.getElementById( 'videoImage' );
	videoImageContext = videoImage.getContext( '2d' );

	//load a background color into canvas if no video present
	videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	// mirrors canvas horizontally:
	// translate context to center of canvas
  	videoImageContext.translate(videoImage.width / 2, videoImage.height / 2);
  	// flip context horizontally
  	videoImageContext.scale(-1, 1);
  	//retranslates context
  	videoImageContext.translate(videoImage.width / -2, videoImage.height / -2);



	//loads the video from the canvas into a Three.js texture
	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	
	//movieMaterial is the webcam as a mesh texture
	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
	

	//sphere
	var sGeometry = new THREE.SphereGeometry( 100, 32, 32 );
	var sMaterial =
		new THREE.MeshPhongMaterial({ 
			map: videoTexture,
	    	opacity     : 1,
	    	transparent: true
		});
	var sphere = new THREE.Mesh( sGeometry, sMaterial);
	scene.add( sphere );


	camera.position.set(425,-60,200);


	//mirror sphere
	/*var sphereGeom =  new THREE.SphereGeometry( 200, 64, 32 ); // radius, segmentsWidth, segmentsHeight
	mirrorSphereCamera = new THREE.CubeCamera( 0.1, 5000, 256 );
	mirrorSphereCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
	scene.add( mirrorSphereCamera );
	var mirrorSphereMaterial = new THREE.MeshPhongMaterial( { emissive: 0x8888aa, envMap: mirrorSphereCamera.renderTarget } );
	mirrorSphere = new THREE.Mesh( sphereGeom, mirrorSphereMaterial );
	mirrorSphere.position.set(0, 50, 0);
	mirrorSphereCamera.position = mirrorSphere.position;
	scene.add(mirrorSphere);*/

	//test box
	/*var cGeometry = new THREE.BoxGeometry(600,600,600);
	var cMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( cGeometry, cMaterial );
	scene.add( cube );*/

	//test plane
	/*var planeWidth = 800;
    var planeHeight = 800;
	var pGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var pMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
	var plane = new THREE.Mesh( pGeometry, pMaterial );
	plane.position.z -= 100;
	plane.rotation.x -= 0.5;
	scene.add( plane );*/


	/*create a new scene to hold CSS
	cssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src	= 'http://www.google.com/';
	// width of iframe in pixels
	var elementWidth = 1024;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.position = plane.position;
	cssObject.rotation = plane.rotation;
	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssScene.add(cssObject);
	
	// create a renderer for CSS
	rendererCSS	= new THREE.CSS3DRenderer();
	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position = 'absolute';
	rendererCSS.domElement.style.top	  = 0;
	rendererCSS.domElement.style.margin	  = 0;
	rendererCSS.domElement.style.padding  = 0;
	document.body.appendChild( rendererCSS.domElement );
	// when window resizes, also resize this renderer
	THREEx.WindowResize(rendererCSS, camera);

	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top      = 0;
	// make sure original renderer appears on top of CSS renderer
	renderer.domElement.style.zIndex   = 1;
	rendererCSS.domElement.appendChild( renderer.domElement );*/



}

//animation loop
//requestAnimationFrame only runs when tab is active
function animate() 
{
    requestAnimationFrame( animate );
	render();		
}

function render() 
{	
	if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
	{
		//draws webcam video to canvas
		videoImageContext.drawImage( video, 0, 0, videoImage.width, videoImage.height );

		if ( videoTexture ) 
			videoTexture.needsUpdate = true;
	}

	//renders three.js scene
	renderer.render( scene, camera );
	controls.update();
	
	//console.log('cam x: ' + camera.position.x + " y: " + camera.position.y + " z: " + camera.position.z);
};





/////////////////////////////////
//////photo API stuff below//////
/////////////////////////////////



//parse nytimes API data
//render result as iFrame within Three.JS scene
function parseNYTAPI (result) {

	var articleHref = result.response.docs[0].web_url;
	console.log(articleHref);

	/*var iframe;

	iframe = document.createElement('iframe');
	iframe.src = articleHref;
	iframe.style.position = 'absolute';
	iframe.style.zIndex = 1;
	iframe.style.width = '50%';
	iframe.style.height = '50%';
	iframe.style.top = 0;
	iframe.style.left = 0;
	document.body.appendChild(iframe);*/

	/*
	var planeMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide });
	var planeWidth = 800;
    var planeHeight = 800;
	var planeGeometry = new THREE.PlaneGeometry( planeWidth, planeHeight );
	var planeMesh= new THREE.Mesh( planeGeometry, planeMaterial );
	planeMesh.position.y = 0;
	planeMesh.position.x = 0;
	// add it to the standard (WebGL) scene
	scene.add(planeMesh);
	
	// create a new scene to hold CSS
	cssScene = new THREE.Scene();
	// create the iframe to contain webpage
	var element	= document.createElement('iframe')
	// webpage to be loaded into iframe
	element.src	= articleHref;
	console.log(articleHref);
	// width of iframe in pixels
	var elementWidth = 1024;
	// force iframe to have same relative dimensions as planeGeometry
	var aspectRatio = planeHeight / planeWidth;
	var elementHeight = elementWidth * aspectRatio;
	element.style.width  = elementWidth + "px";
	element.style.height = elementHeight + "px";
	
	// create a CSS3DObject to display element
	var cssObject = new THREE.CSS3DObject( element );
	// synchronize cssObject position/rotation with planeMesh position/rotation 
	cssObject.position = planeMesh.position;
	cssObject.rotation = planeMesh.rotation;
	// resize cssObject to same size as planeMesh (plus a border)
	var percentBorder = 0.05;
	cssObject.scale.x /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssObject.scale.y /= (1 + percentBorder) * (elementWidth / planeWidth);
	cssScene.add(cssObject);
	
	// create a renderer for CSS
	rendererCSS	= new THREE.CSS3DRenderer();
	rendererCSS.setSize( window.innerWidth, window.innerHeight );
	rendererCSS.domElement.style.position = 'absolute';
	rendererCSS.domElement.style.top	  = 0;
	rendererCSS.domElement.style.margin	  = 0;
	rendererCSS.domElement.style.padding  = 0;
	document.body.appendChild( rendererCSS.domElement );
	// when window resizes, also resize this renderer
	THREEx.WindowResize(rendererCSS, camera);

	renderer.domElement.style.position = 'absolute';
	renderer.domElement.style.top      = 0;
	// make sure original renderer appears on top of CSS renderer
	renderer.domElement.style.zIndex   = 1;
	rendererCSS.domElement.appendChild( renderer.domElement );
	*/
}


//call nytimes API to get articles based on gender, race, and age
var nytimesAPI = function (response){

	var apiKey = '97a2b0a98b87b72336971e4b6f965701:17:69847940';

	//var user = JSON.parse(response);
	console.log(response);

	//console.log(response.face[0].attribute.gender.value);

	var userAtt = response.face[0].attribute;

	var urAge = userAtt.age.value;
	console.log(urAge);

	var urGender = userAtt.gender.value;
	console.log(urGender);

	var urRace = userAtt.race.value;
	console.log(urRace);

	var urSmile = userAtt.smiling.value;
	console.log(urSmile);

	var searchTerms;

	if (urGender == 'Female' && urRace == 'Black') {
		searchTerms = '%22black+woman%22+OR+%22african+american+woman%22';
	}
	if (urGender == 'Male' && urRace == 'Black') {
		searchTerms = '%22black+man%22+OR+%22african+american+man%22';
	}
	if (urGender == 'Female' && urRace == 'White') {
		searchTerms = '%22white+woman%22+OR+%22caucasian+woman%22';
	}
	if (urGender == 'Male' && urRace == 'White') {
		searchTerms = '%22white+man%22+OR+%22caucasian+man%22';
	}
	if (urGender == 'Female' && urRace == 'Asian') {
		searchTerms = '%22asian+woman%22';
	}
	if (urGender == 'Male' && urRace == 'Asian') {
		searchTerms = '%22asian+man%22';
	}

	console.log(searchTerms);

	var apiURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=' + searchTerms + '&sort=newest&api-key=' + apiKey;

	$.ajax({
		url : apiURL,
		dataType : 'json',
		success : function(result){
			//parseNYTAPI(result);
			console.log(result);
		}
	});

}


//loadWeather
/*var loadWeather = function (response){

	if(response.response.error){
		alert(response.response.error.description);
		return;
	};

	var thisCity = response.location.city;
	var thisState = response.location.state;

	var temp = response.current_observation.temp_f + '°';

	var weather = response.current_observation.weather;

	var icon = response.current_observation.icon_url;

	console.log('The current weather in ' + thisCity + ', ' + thisState + ' is ' + weather + ' with a temperature of ' + temp);

	$('.temperature').text(temp);
	$('.weather').text(weather);
	$('.currentCity').val(thisCity);
	$('.weatherIcon').html('<img src="' + icon + '">');

}*/


//Face Plus Plus API call
function ffpApiRequest(imgURL) {

	var api = new FacePP('741c414b3c00d7caedf5496ed8711590',
                     'IXo11YT1lZYLpY3AQ6fdnBZViMplG9tw',
                     { apiURL: 'http://apius.faceplusplus.com' });

	//console.log(api);

	console.log(imgURL);


	api.request('detection/detect', {
	  	url: imgURL, mode: 'oneface'}, function(err, result) {
	  	//in case of error...
		if (err) {
			console.log('FacePP API call failed.');
			console.log(err);
			return;
		}
		//if success...
	  	//console.log(JSON.stringify(result));

	  	//
		nytimesAPI(result);
	});
}


//take a picture of the webcam on canvas and save it to a file on server
//then call Face Plus Plus API on it
//PHP form trick derived from:
//http://www.kubilayerdogan.net/html2canvas-take-screenshot-of-web-page-and-save-it-to-server-javascript-and-php/
function takePhoto () {

	photo = videoImage.toDataURL("image/png");
	//window.location.href = photo;

	//load the canvas dataURL in the img_val form input container
	$('#img_val').val(photo);

	//submit the form using ajax
    $("#myForm").submit(function(e) {
		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		$.ajax(
		{
			url : formURL,
			type: "POST",
			data : postData,
			success:function(data, textStatus, jqXHR) 
			{
			},
			error: function(jqXHR, textStatus, errorThrown) 
			{
			}
		});
	    e.preventDefault();	//STOP default action
	});	
	$("#myForm").submit(); //SUBMIT FORM

	//form is saved to 'img.png' using save.php script

	//this takes a second or two

	//delay 3 seconds before submitting API to FacePP
	var delay=3000;
    setTimeout(function(){
	    //your code to be executed after 1 seconds
	    ffpApiRequest('http://www.tylerhenry.com/spherecam/img.png');
    },delay); 
}




function init() {

	$( "#ThreeJS" ).click(function() {
  		takePhoto();
	});

	loadWebcam();
	load3JS();
	animate();
}


window.onload = init();



