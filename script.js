$(document).ready(function() {

    // Handling Scroll Behavior
    $(document).scroll(function() {
        var scrollDistance = $(this).scrollTop();
        var headerHeight = $('header').height();
        var isHomePage = $("body").is("#home-page");

        if (scrollDistance > headerHeight) {
            $('nav').addClass('nav-solid').removeClass('nav-transparent');
            $('nav a, .dropdown-content a').css('color', 'white');
            $('.dropdown-content').css('background-color', 'black');
            $('.navbar-left').css('color', 'white');
            $('.toggler-icon, .navbar-toggler-icon::before, .navbar-toggler-icon::after').css('background-color', 'white');
        } else {
            $('nav').addClass('nav-transparent').removeClass('nav-solid');
            if (isHomePage) {
                $('nav a, .dropdown-content a').css('color', 'white');
                $('.dropdown-content').css('background-color', '#3b3b3ba9');
                $('.navbar-left').css('color', 'white');
            } else {
                $('nav a, .dropdown-content a').css('color', 'black');
                $('.dropdown-content').css('background-color', 'rgba(206, 206, 206, 0.905)');
                $('.navbar-left').css('color', 'black');
                $('.toggler-icon, .navbar-toggler-icon::before, .navbar-toggler-icon::after').css('background-color', 'black');
            }
        }
    });

    // Toggle Search Box and Highlight Search Results
    $('.search-icon').click(function(e) {
        e.preventDefault();
        $('#searchForm').toggle();
    });

    var currentIndex = -1; // Keeps track of the currently highlighted index

    function highlightText(text, query) {
      var regex = new RegExp(query, 'gi');
      return text.replace(regex, function(match) {
        return '<mark>' + match + '</mark>';
      });
    }
    
    $('#searchBox').on('input', function() {
      var query = $(this).val();
      $('.searchable-item').each(function() {
        var $this = $(this);
        var original = $this.data('original');
        if (!original) {
          original = $this.html();
          $this.data('original', original);
        }
        if (query) {
          // Separating text nodes and tags
          var textNodes = original.split(/(<[^>]*>)/g).map(function(str, i) {
            // Even indices will always be text nodes
            return i % 2 === 0 ? highlightText(str, query) : str;
          });
          $this.html(textNodes.join(''));
        } else {
          $this.html(original);
        }
      });
      currentIndex = -1; // Reset the index
    });
    
    $('#searchBox').on('keypress', function(e) {
      if (e.which == 13) { // Enter key
        e.preventDefault();
        currentIndex++;
        var marks = $('mark');
        if (currentIndex >= marks.length) {
          currentIndex = 0; // Loop back to the first match
        }
        if (marks.length) {
          var currentMark = marks[currentIndex];
          currentMark.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          $(marks).css("background-color", "yellow"); // Reset all highlights
          $(currentMark).css("background-color", "orange"); // Highlight current
        }
      }
    });
    
    
    
    // Save original hrefs
    $(document).ready(function() {
      $('a').each(function() {
        var original = $(this).attr('href');
        if (original) {
          $(this).data('original-href', original); // Save original href attributes
        }
      });
    });
    
    


    $(document).ready(function() {
        // Mobile Menu Toggle
        $('.navbar-toggler').click(function() {
            $('.navbar-right').toggleClass('show');
            toggleNav("sidemenu", "nav-item"); 
        });
    
        // Open and close secondary sidebar on hover over the container for Projects
        $('#projects-container').hover(
            function() {
                toggleNav("projects-secondary-sidemenu", "second-nav-item");
            },
            function() {
                toggleNav("projects-secondary-sidemenu", "second-nav-item");
            }
        );

        // Open and close secondary sidebar on hover over the container for CV
        $('#cv-container').hover(
            function() {
                toggleNav("cv-secondary-sidemenu", "second-nav-item");
            },
            function() {
                toggleNav("cv-secondary-sidemenu", "second-nav-item");
            }
        );

    });
});


function toggleNav(sidemenuID, itemClass) {
    var sidemenu = document.getElementById(sidemenuID);
    var navItems = document.querySelectorAll(`.${itemClass}`);
    
    if (sidemenu.classList.contains('sidemenu-open-main') || sidemenu.classList.contains('sidemenu-open-secondary')) {
        navItems.forEach((item) => {
            item.classList.remove('show-text');
            item.classList.add('hide-text');
        });
        sidemenu.classList.remove('sidemenu-open-main', 'sidemenu-open-secondary');
        sidemenu.classList.add('sidemenu-closed');
    } else {
        sidemenu.classList.remove('sidemenu-closed');
        if (sidemenuID === "sidemenu") {
            sidemenu.classList.add('sidemenu-open-main');
        } else {
            sidemenu.classList.add('sidemenu-open-secondary');
        }
        
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('hide-text');
                item.classList.add('show-text');
            }, index * 100);
        });
    }
}



// Function to close the first sidebar
function closeNav() {
    var sidemenu = document.getElementById("sidemenu");
    var navItems = document.querySelectorAll('.nav-item');
    
    // Update class names to reflect the closed state
    sidemenu.classList.remove('sidemenu-open-main');
    sidemenu.classList.add('sidemenu-closed');
    
    navItems.forEach((item) => {
        item.classList.remove('show-text');
    });
}
