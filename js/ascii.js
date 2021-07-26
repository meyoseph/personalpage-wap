(function () {
    "use strict";
    let playingAnim;
    let isPlaying = false;
    let currentFrameID = 0;
    let frameSpeed = 250;
    let selectedAnim;
    let selectedSize;
    window.onload = onload;

    function onload() {
        document.getElementById('btnPCSt').onclick = play;
        document.getElementById('btnPCSp').onclick = stop;
        document.getElementById('selAnim').onchange = selectAnim;
        document.getElementById('selSize').onchange = selectSize;
        document.getElementById('chBox').onchange = turboMode;
        selectedAnim = document.getElementById('selAnim').options[document.getElementById('selAnim').selectedIndex].text;
        selectedSize = document.getElementById('selSize').options[document.getElementById('selSize').selectedIndex].text;
    }

    function play() {
        document.getElementById('btnPCSt').disabled = true;
        document.getElementById('btnPCSp').disabled = false;
        document.getElementById('selAnim').disabled = true;
        isPlaying = true;
        playAnim();
    };
    function stop() {
        document.getElementById('btnPCSt').disabled = false;
        document.getElementById('btnPCSp').disabled = true;
        document.getElementById('selAnim').disabled = false;
        isPlaying = false;
        stopAnim();
    };
    function selectAnim() {
        selectedAnim = document.getElementById('selAnim').options[document.getElementById('selAnim').selectedIndex].text;
        currentFrameID = 0;
    };
    function selectSize() {
        let sizes = {
            "Tiny": "7pt",
            "Small": "10pt",
            "Medium": "12pt",
            "Large": "16pt",
            "Extra Large": "24pt",
            "XXL": "32pt"
        };
        selectedSize = document.getElementById('selSize').options[document.getElementById('selSize').selectedIndex].text;
        document.getElementById('textArea').style.fontSize = sizes[selectedSize];
    };
    function turboMode() {
        if (document.getElementById('chBox').checked == true)
            frameSpeed = 50;
        else
            frameSpeed = 250;
        if (isPlaying == true) {
            stopAnim();
            playAnim();
        }
    };

    function setFrame() {
        let frames = ANIMATIONS[selectedAnim].split("=====\n");
        document.getElementById('textArea').value = frames[currentFrameID];
        if (currentFrameID == frames.length - 1)
            currentFrameID = 0;
        else
            currentFrameID++;
    }

    function playAnim() {
        playingAnim = setInterval(setFrame, frameSpeed);
    }

    function stopAnim() {
        clearInterval(playingAnim);
    }
})();