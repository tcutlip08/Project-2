var config = {
  apiKey: "AIzaSyCk_hXhSVW7jWdJrQpTi1I1Nis9J-xv2Tc",
  authDomain: "slr-tj.firebaseapp.com",
  databaseURL: "https://slr-tj.firebaseio.com",
  projectId: "slr-tj",
  storageBucket: "slr-tj.appspot.com",
  messagingSenderId: "389373118412",
  appId: "1:389373118412:web:b50a4c6947157a35d6ff69"
};

var user;

firebase.initializeApp(config);

var currentURL = window.location.origin;

firebase.auth().onAuthStateChanged(function(fbUser) {
  if (fbUser) {
    $.ajax({
      url: currentURL + "/api/homeUser",
      method: "GET",
      data: {
        email: fbUser.email
      }
    }).then(function(res) {
      console.log("User Logged In");
      console.log(res);
      user = res;
      getUserHistoryOfPosts(res);
      // $("#userImage").html("<img src='Logo.png' alt='User Image'/>");
      $("#username").text(res.name);
    });
  } else {
    window.location.href = "/";
  }
  getAllNotAccPosts();
});

$(".filter").on("click", function() {
  var subject = $(this).attr("id");
  filterBy(subject);
});

function filterBy(sub) {
  $.ajax({
    url: currentURL + "/api/allPosts/" + sub,
    method: "GET"
  }).then(function(res) {
    console.log("Filters Posts by: " + sub);
    console.log(res);
  });
}

$("#signOut").on("click", function() {
  firebase.auth().signOut();
});

$("#createPost").on("click", function() {
  event.preventDefault();
  // console.log($(".subject").val());
  var newPost = {
    subject: $(".subject").val(),
    task: $("#message")
      .val()
      .trim(),
    id: user.id
  };
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/post/new",
    data: JSON.stringify(newPost)
  }).then(function(postId) {
    console.log(postId);
    createNewPost(newPost, postId.id);
  });
});

$(document).on("click", ".accept", function() {
  var userId = $(this).attr("data-userid");
  var postId = $(this).attr("data-postid");
  $.ajax({
    url: currentURL + "/api/accept/" + postId + "/" + userId,
    method: "GET"
  }).then(function(res) {
    console.log(res);
  });
});

// All Posts on one big Column
function createNewPost(post) {
  var newPostTask = document.createElement("DIV");
  var postTask = document.createTextNode(post.task);
  newPostTask.appendChild(postTask);
  var postTasks = document.getElementById("postCol");
  postTasks.insertBefore(newPostTask, postTasks.childNodes[0]);
  var newPostSubject = document.createElement("DIV");
  var postSubject = document.createTextNode(post.subject);
  newPostSubject.appendChild(postSubject);
  var postSubjects = document.getElementById("postCol");
  postSubjects.insertBefore(newPostSubject, postSubjects.childNodes[0]);
}

function getAllNotAccPosts() {
  $.ajax({
    url: currentURL + "/api/notAcc",
    method: "GET"
  }).then(function(res) {
    console.log("Posts not accepted");
    console.log(res);
  });
}

function getUserHistoryOfPosts(data) {
  $.ajax({
    url: currentURL + "/api/history/" + data.id,
    method: "GET"
  }).then(function(res) {
    console.log("Users History of Posts");
    console.log(res);
  });
}

// Template Code Below

(function() {
  "use strict";
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    }
  };
  var fullHeight = function() {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function() {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };
  var counter = function() {
    $(".js-counter").countTo({
      formatter: function(value, options) {
        return value.toFixed(options.decimals);
      }
    });
  };
  var counterWayPoint = function() {
    if ($("#colorlib-counter").length > 0) {
      $("#colorlib-counter").waypoint(
        function(direction) {
          if (direction === "down" && !$(this.element).hasClass("animated")) {
            setTimeout(counter, 400);
            $(this.element).addClass("animated");
          }
        },
        { offset: "90%" }
      );
    }
  };
  // Animations
  var contentWayPoint = function() {
    var i = 0;
    console.log(i);
    $(".animate-box").waypoint(
      function(direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function() {
            $("body .animate-box.item-animate").each(function(k) {
              var el = $(this);
              setTimeout(
                function() {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      { offset: "85%" }
    );
  };
  var burgerMenu = function() {
    $(".js-colorlib-nav-toggle").on("click", function(event) {
      event.preventDefault();
      var $this = $(this);
      if ($("body").hasClass("offcanvas")) {
        $this.removeClass("active");
        $("body").removeClass("offcanvas");
      } else {
        $this.addClass("active");
        $("body").addClass("offcanvas");
      }
    });
  };
  // Click outside of offcanvass
  var mobileMenuOutsideClick = function() {
    $(document).click(function(e) {
      var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-colorlib-nav-toggle").removeClass("active");
        }
      }
    });
    $(window).scroll(function() {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
    });
  };
  var clickMenu = function() {
    $("#navbar a:not([class='external'])").click(function(event) {
      var section = $(this).data("nav-section"),
        navbar = $("#navbar");
      if ($("[data-section='" + section + "']").length) {
        $("html, body").animate(
          {
            scrollTop: $("[data-section='" + section + "']").offset().top - 55
          },
          500
        );
      }
      if (navbar.is(":visible")) {
        navbar.removeClass("in");
        navbar.attr("aria-expanded", "false");
        $(".js-colorlib-nav-toggle").removeClass("active");
      }
      event.preventDefault();
      return false;
    });
  };
  // Reflect scrolling in navigation
  var navActive = function(section) {
    var $el = $("#navbar > ul");
    $el.find("li").removeClass("active");
    $el.each(function() {
      $(this)
        .find("a[data-nav-section='" + section + "']")
        .closest("li")
        .addClass("active");
    });
  };
  var navigationSection = function() {
    var $section = $("section[data-section]");
    $section.waypoint(
      function(direction) {
        if (direction === "down") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: "150px"
      }
    );
    $section.waypoint(
      function(direction) {
        if (direction === "up") {
          navActive($(this.element).data("section"));
        }
      },
      {
        offset: function() {
          return -$(this.element).height() + 155;
        }
      }
    );
  };
  var stickyFunction = function() {
    var h = $(".image-content").outerHeight();
    if ($(window).width() <= 992) {
      $("#sticky_item").trigger("sticky_kit:detach");
    } else {
      $(".sticky-parent").removeClass("stick-detach");
      $("#sticky_item").trigger("sticky_kit:detach");
      $("#sticky_item").trigger("sticky_kit:unstick");
    }
    $(window).resize(function() {
      var h = $(".image-content").outerHeight();
      $(".sticky-parent").css("height", h);
      if ($(window).width() <= 992) {
        $("#sticky_item").trigger("sticky_kit:detach");
      } else {
        $(".sticky-parent").removeClass("stick-detach");
        $("#sticky_item").trigger("sticky_kit:detach");
        $("#sticky_item").trigger("sticky_kit:unstick");
      }
    });
    $(".sticky-parent").css("height", h);
  };
  $(function() {
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();
    clickMenu();
    // navActive();
    navigationSection();
    // windowScroll();
    mobileMenuOutsideClick();
    // sliderMain();
    stickyFunction();
    // owlCrouselFeatureSlide();
  });
})();
