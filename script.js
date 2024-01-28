const BASE_URL = "https://kommunicate-excel-scanner.vercel.app/"; 

document.addEventListener('DOMContentLoaded', function() {
    var fileForm = document.getElementById('fileForm');

    if (fileForm) {
        fileForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            var selectedFile = document.getElementById('fileSelect').value;
            
            console.log("Selected file: " + selectedFile);
            
            var xhr = new XMLHttpRequest();
            xhr.open("POST", BASE_URL + "/set_file", true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            // Add event listener for successful file upload
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // File uploaded successfully, load Kommunicate widget
                    loadKommunicateWidget();
                }
            };

            xhr.send(JSON.stringify({ file: selectedFile }));
        });
    }
});

function loadKommunicateWidget() {
    var kommunicateSettings = {
        "appId": "235a50e532fbb955ed479287ca9842961",
        "popupWidget": true,
        "automaticChatOpenOnNavigation": true
    };

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
    var h = document.getElementsByTagName("head")[0];
    h.appendChild(s);
    window.kommunicate = window.kommunicate || {};
    window.kommunicate._globals = kommunicateSettings;
}
