const speechRecognition = window.webkitSpeechRecognition;

const recognition = new speechRecognition();

var textbox = $("#textbox");

var instructions = $("#instructions");

var content = "";
var isListening = false;

recognition.continuous = true;

recognition.onstart = () => {
    instructions.text("Voice Recognition is on");
};

recognition.onspeechend = () => {
    instructions.text("No Activity");
};

recognition.onerror = () => {
    instructions.text("Try Again");
};

function stopVoice() {
    recognition.stop();
    isListening = false;
    $("#start-btn").text("Start");
    instructions.text("Press the Start button");
}

recognition.onresult = (event) => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content += `\n${transcript}`;

    textbox.val(content);

    // remove this for initial functionality
    // stopVoice();
};

$("#start-btn").click(() => {
    if (content.length) {
        content += "";
    }

    if (!isListening) {
        recognition.start();
        isListening = true;
        $("#start-btn").text("Stop");
    } else {
        stopVoice();
    }
});

textbox.on("input", () => {
    content = $(this).val();
});
