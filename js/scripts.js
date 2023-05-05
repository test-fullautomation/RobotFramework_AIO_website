$(document).ready(function() {
   // Load navigation and footer
   $("nav").load("./html/navigation.html");
   $("footer").load("./html/footer.html");

   // Load *.html templates for each section 
   var HTML_CONTENTS = ["background", "features", "downloads", "usage", 
                         "document", "about"];
   var i = 0;
   for (section of HTML_CONTENTS){
      $(`#${section}`).load(`./html/contents/${section}.html`, function(){
         if (i==(HTML_CONTENTS.length-1)){
            // Wait for all templates are loaded completely
            addListeners();
         }
         i++;
      });
   }

});

function addListeners(){
   // Highlight the active section in the navigation bar
   $('body').scrollspy({ target: '#navbarNav' });

   // Search button event
   // document.getElementById('search-btn').addEventListener('click', searchHandler);

   // Image clicking events
   images = document.getElementsByTagName('img');
   for (var i=0; i < images.length; i++){
      images[i].addEventListener('click', zoomImage);
   }

   // Download button events
   // document.getElementById('download-windows').addEventListener('click', function(){
   //    downloadInstaller("windows")
   // });
   // document.getElementById('download-linux').addEventListener('click', function(){
   //    downloadInstaller("linux")
   // });

};

// Handlers for searching 
function searchHandler(event){
   var searchText = document.getElementById("search").value;
   event.preventDefault();
   console.log(`Under implementing - searching: ${searchText}`)
};

function searchInput(){
   var inputText = document.getElementById("search").value;
   console.log(`Under implementing - input: ${inputText}`);
};

// Handler for images
function zoomImage(e){
   console.log("Zooming image")
};

// Handler for download
function downloadInstaller(os){
   var installerURL = "https://github.com/test-fullautomation/RobotFramework_AIO/suites/10576083020/artifacts/";
   if (os === "windows"){
      installerURL += "526613609";
   } else if (os === "linux"){
      installerURL += "526613608";
   }
   window.open(installerURL, "Download");
}
