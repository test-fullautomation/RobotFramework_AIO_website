$(document).ready(function() {
   // Load navigation and footer
   $("nav").load("./html/navigation.html", function(){})

   $("footer").load("./html/footer.html", function() {
      generateMailtoLink("em_footer","Contact");
   });
   // Load *.html templates for each section 
   var HTML_CONTENTS = ["background", "features", "downloads", "usage", 
                         "documentation", "about"];
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

   //do syntax highlighting für new loaded documents
   Prism.highlightAll();

   // Download button events
   // document.getElementById('download-windows').addEventListener('click', function(){
   //    downloadInstaller("windows")
   // });
   // document.getElementById('download-linux').addEventListener('click', function(){
   //    downloadInstaller("linux")
   // });

};

document.querySelectorAll('.sidebar-links a').forEach(link => {
   link.addEventListener('click', function (e) {
       e.preventDefault(); // Verhindert das Standardverhalten des Links

       const contentUrl = this.getAttribute('data-content'); // Ziel-Datei
       const contentContainer = document.getElementById('main-content'); // Content-Bereich

       // Inhalt laden
       fetch(contentUrl)
           .then(response => {
               if (!response.ok) throw new Error('Network response was not ok');
               return response.text();
           })
           .then(html => {
               contentContainer.innerHTML = html; // Content aktualisieren
           })
           .catch(error => {
               contentContainer.innerHTML = `<p>Error loading content: ${error.message}</p>`;
           });
   });
});

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

// Hide email-address
function decode(encodedString) {
      var charArray = encodedString.split('');
  
      for (let i = 0; i < charArray.length - 1; i += 2) {
          let temp = charArray[i];
          charArray[i] = charArray[i + 1];
          charArray[i + 1] = temp;
      }
  
      var swappedString = charArray.join('');
      var decodedString = atob(swappedString);
  
      return decodedString;
  }

function generateMailtoLink(id,newContent) {
   var encoded = "GdvhWbzFnLvBGblxncwN2bjV0aiB3bjNCaj52b=0"; 
   var email = decode(encoded);
   var mailtoLink = "mailto:" + email;
   if (id === undefined){return}

   document.getElementById(id).setAttribute("href", mailtoLink);

   var content="Contact";
   if (newContent !== undefined) {
      content=newContent;
   }
   document.getElementById(id).textContent = content;
} 

function encodeEmailAndSwap(email) {
   let base64Encoded = btoa(email);
   let charArray = base64Encoded.split('');
   for (let i = 0; i < charArray.length - 1; i += 2) {
       let temp = charArray[i];
       charArray[i] = charArray[i + 1];
       charArray[i + 1] = temp;
   }

   let result = charArray.join('');
   return result;
}
