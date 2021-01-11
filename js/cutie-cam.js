
function init() {

    const cutiecam = document.getElementById('cutiecam');

    const elf = new Image();
    elf.src = 'img/elf.svg';

    const frame = document.getElementById('frame');
    const frameContext = frame.getContext('2d');

    const selfie = document.getElementById('selfie');
    const selfieContext = selfie.getContext('2d');

    const takeASelfie = document.getElementById('take-a-selfie');
    const yourSelfie = document.getElementById('your-selfie');

    document.getElementById('capture').addEventListener('click', function() {

        cutiecam.pause();

        selfieContext.save();
        selfieContext.drawImage(cutiecam, 0, 0, 640, 480);
        selfieContext.drawImage(elf, frame.width/6, 0, frame.width/2, frame.width/Math.PI);
        selfieContext.restore();

        takeASelfie.classList.add('hide');
        yourSelfie.classList.remove('hide');
    });

    document.getElementById('reset').addEventListener('click', function() {

        cutiecam.play();

        yourSelfie.classList.add('hide');
        takeASelfie.classList.remove('hide');

    });

    // start video feed
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
        }).then(function(stream) {
            cutiecam.srcObject = stream;
            cutiecam.play();


            frameContext.save();
            frameContext.beginPath();
            frameContext.lineWidth = 8;
            frameContext.ellipse(frame.width/2, frame.height/2, frame.width/6, frame.height/3, 0, 0, Math.PI * 2);
            frameContext.stroke();
            frameContext.restore();

        });
    }
}

window.onload = init;
