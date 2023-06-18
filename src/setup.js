AFRAME.registerComponent('movement-logging', {
    schema: {type: 'string'},
    init: function () {
        this.camera = document.querySelectorAll('a-entity[camera]');
    },

    tock: function (time, timeDelta, camera) {
      let eventName = this.data;
      console.log(eventName, camera, this.camera);
    }
  });

function cameraSetup(cameraID) {
    let camera = document.querySelector('a-entity[camera]');
    // camera.addEventListener('componentchanged', function (evt) {
    //     if (evt.name === 'position') {
    //       console.log('Entity has moved from', evt.oldData, 'to', evt.newData, '!');
    //     }
    //     console.log(evt)
    // });
    console.log(document.querySelector('a-entity[camera]'));
}



cameraSetup("aa")
// registerCameraListeners()