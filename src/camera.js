function camRotation(cam, f) {
	cam.setAttribute('look-controls-n', {enabled: false});
	cam.setAttribute('wasd-controls', {enabled: false});
	f(cam);

	setTimeout( ()=> {
		cam.setAttribute('look-controls-n', {enabled: true});
		cam.setAttribute('wasd-controls', {enabled: true});	
	}, 1000)
}

function resetCamera(node) {
	let cam = typeof(node) == "string" ? document.querySelector(`#${node}`) : node;
	cam.object3D.position.set(...[0, 1.6, 0]);
	camRotation(cam, c => c.object3D.rotation.set(...[0, 0, 0]));
}

function getMean(list, vec=false) {
	let obj = {
		x: d3.mean(list, d => d.object3D.position.x),
		y: d3.mean(list, d => d.object3D.position.y),
		z: d3.mean(list, d => d.object3D.position.z)
	}
	return vec ? Object.values(obj) : obj;
}

function registerCameraListeners() {
    const element = document.querySelector("body");
    
    element.addEventListener("wheel", (event) => {    
        if (event.deltaY != 0) {
            let camera = document.querySelector("#main-camera");
            
            if (event.deltaY > 0) { // mousewheel down
                camera.object3D.position.y -= .05;
                camera.getAttribute("wasd-controls").acceleration -=
                    camera.getAttribute("wasd-controls").acceleration - .2 > 0 ? .2 : 0;
            } else { // mousewheel up
                camera.object3D.position.y += .05;
                camera.getAttribute("wasd-controls").acceleration +=
                    camera.getAttribute("wasd-controls").acceleration + 1 < 100 ? 1 : 0;
            }
        }
    });
    // document.querySelector("#scale-range").addEventListener('sl-input', event => {
    //     updateUI();
    // });
}
