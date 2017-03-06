var camera, scene, renderer;
var geometry, material, mesh;


document.getElementById("requestButton").addEventListener("click", request);

init();
animate();

function init() {
	
	// Setup scene
	dimX = 300;
	dimY = 300;
    camera = new THREE.PerspectiveCamera(75, dimX / dimY, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();

	// Setup Light source
	var light = new THREE.DirectionalLight(0xffffff,1);
	light.position.set(300,300,1000).normalize();
	scene.add(light);

	
    geometry = new THREE.CubeGeometry(200, 200, 200);
	meshPhongMaterial = new THREE.MeshPhongMaterial( 
		{
			color: 0x0033ff, 
			specular: 0x555555, 
			shininess: 30
		} 
	);

	// Arbitrary geometry
    mesh = new THREE.Mesh(geometry, meshPhongMaterial);
	scene.add(mesh);
	
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(dimX, dimY);
	renderer.domElement.id = "mainCanvas";
	
    document.body.appendChild(renderer.domElement);
}

function animate() {

    requestAnimationFrame(animate);    
    renderer.render(scene, camera);
}

function ajaxCallBack() {
	
	if(this.readyState == 4 && this.status == 200) 
	{
		alert("VALUE");
	}
	else 
	{
		alert("FAILED TO CONNECT");
	}
}

function request() {
	
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = ajaxCallBack;
	
	xhttp.open("GET", "test.txt", true);
	xhttp.send();	
}

var mouseX = null;
var mouseY = null;

function touch(e) 
{
	if(mouseX == null && mouseY == null)
	{
		// Update Coordinates
		mouseX = e.pageX;
		mouseY = e.pageY;				
	}
	else
	{
		deactivateDrag();		
	}	
}

function deactivateDrag() 
{
	mouseX = null;
	mouseY = null;
}

function drag(e) 
{	
	var newX = e.pageX;
	var newY = e.pageY;
	var diffX = 0;
	var diffY = 0;	
	
	if(mouseX != null && mouseY != null)
	{
		diffX = mouseY - newY;		
		diffY = mouseX - newX;
		camera.rotation.x += (diffX * 0.01 /Math.PI);
		camera.rotation.y += (diffY * 0.01 /Math.PI);

		// Update Coordinates
		mouseX = newX;
		mouseY = newY;
	}
}

document.getElementById("mainCanvas").addEventListener("click", touch);
document.getElementById("mainCanvas").addEventListener("mousemove", drag);
document.getElementById("mainCanvas").addEventListener("mouseleave", deactivateDrag);



