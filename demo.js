var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	/*
	someGeometry = new THREE.Geometry();
	geometry.vertices.push(
		new THREE.Vector3(-200, 200, 0),
		new THREE.Vector3(-200,-200, 0),
		new THREE.Vector3( 200,-200, 0),		
		new THREE.Vector3( 200, 200, 0)		
	);
	geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faces.push(new THREE.Face3(2, 3, 0));
	geometry.computeFaceNormals();
	
	basic = new THREE.MeshNormalMaterial();	
	var tmpMesh = new THREE.Mesh(someGeometry, basic);
	tmpP.rotation.x = Math.PI/4;
	scene.add(tmpMesh);
	*/

	/*
	
	// Needed with shaders
	var attributes = {
		displacement: {
			type: 'f', // a float
			value: []  // an empty array			
		}		
	};
	
	// Vertex Shader
	var vShader = `
		varying vec3 vNormal;
		
		void main() {
			
			vNormal = normal;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}	
	`;

	// Fragment Shader
	var fShader = `
		varying vec3 vNormal;
		
		void main() {
			
			vec3 light = vec3(0.5, 0.2, 1.0);
			light = normalize(light);
			
			float dProd = max(0.0, dot(vNormal, light));
			
			gl_FragColor = vec4(dProd, dProd, dProd, 1.0);			
		}
	`;

	var shaderMaterial = new THREE.MeshShaderMaterial(
		{
			attributes: attributes,
			vertexShader: vShader,
			fragmentShader: fShader		
		}
	);
	*/

	
	dimX = 300;
	dimY = 300;

    camera = new THREE.PerspectiveCamera(75, dimX / dimY, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();

	

    geometry = new THREE.CubeGeometry(200, 200, 200);
	meshPhongMaterial = new THREE.MeshPhongMaterial( 
		{
			color: 0x0033ff, 
			specular: 0x555555, 
			shininess: 30
		} 
	);

    mesh = new THREE.Mesh(geometry, meshPhongMaterial);
	scene.add(mesh);

	
	// Light source
	var light = new THREE.DirectionalLight(0xffffff,1);
	light.position.set(300,300,1000).normalize();
	scene.add(light);

	
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
}

function request() {
	
	alert("!!");
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = ajaxCallBack;
	
	xhttp.open("GET", "test.txt", true);
	xhttp.send();	
}


function keydown(e) {

	var keyCode = e.keyCode;
	
	switch(keyCode) {
		case 87:
			mesh.rotation.x -= 0.03;
			break;
		case 65:
			mesh.rotation.y -= 0.03;		
			break;		
		case 83:		
			mesh.rotation.x += 0.03;
			break;
		case 68:		
			mesh.rotation.y += 0.03;		
			break;
	}
	
	// For Camera rotation when appropriate
	//camera.rotation.y += diffX * (0.01/Math.PI);
	//camera.rotation.x += diffY * (0.01/Math.PI);
}

window.addEventListener("keydown", keydown);





