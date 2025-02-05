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
   // $('body').scrollspy({ target: '#navbarNav' });
   // scrollspy does not highlight properly when section's content is to short
   // issue when clicking Documentation but About Us is highlighted
   const sections = document.querySelectorAll("main section");
   const navLinks = document.querySelectorAll(".navbar-nav a");
   let isManualScroll = false;

   function removeActiveClasses() {
      navLinks.forEach(link => link.classList.remove("active"));
   }

   function highlightCurrentSection() {
      if (isManualScroll) return;
      let scrollPosition = window.scrollY + 150;

      sections.forEach((section) => {
         let sectionTop = section.offsetTop;
         let sectionHeight = section.offsetHeight;

         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            let sectionId = section.getAttribute("id");
            removeActiveClasses();
            document.querySelector(`.navbar-nav a[href="index.html#${sectionId}"]`).classList.add("active");
         }
      });
   }

   window.addEventListener("scroll", highlightCurrentSection);

   navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
      //   event.preventDefault();
      isManualScroll = true;
         let targetId = this.getAttribute("href").substring(1);
         let targetSection = document.getElementById(targetId);

         if (targetSection) {
            window.scrollTo({
               top: targetSection.offsetTop,
               behavior: "smooth",
            });
         }

         removeActiveClasses();
         this.classList.add("active");
         setTimeout(() => {
            isManualScroll = false; //reset this value for scrolling event
         }, 700)
      });
   });

   // Navigate to target section (if given) in the url
   if (window.location.hash) {
      var targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
         isManualScroll = true;
         targetElement.scrollIntoView({ behavior: "auto", block: "start" });
         // removeActiveClasses();
         document.querySelector(`.navbar-nav a[href="index.html${window.location.hash}"]`).classList.add("active");
         setTimeout(() => {
            isManualScroll = false; //reset this value for scrolling event
         }, 700)
      }
   }

   // Search button event
   // document.getElementById('search-btn').addEventListener('click', searchHandler);

   // Image clicking events
   images = document.getElementsByTagName('img');
   for (var i=0; i < images.length; i++){
      images[i].addEventListener('click', zoomImage);
   }

   //do syntax highlighting für new loaded documents
   Prism.highlightAll();

   highlightCurrentSection();

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
