var config = {
  apiKey: "AIzaSyB_m_T5HTRv8nJag2AiCxVKk-9ft_k0BzY",
  authDomain: "project-2-a5345.firebaseapp.com",
  databaseURL: "https://project-2-a5345.firebaseio.com",
  projectId: "project-2-a5345",
  storageBucket: "project-2-a5345.appspot.com",
  messagingSenderId: "649772621947",
  appId: "1:649772621947:web:36fce6153aa474885ec2de"
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
    getAllNotAccPosts();
  } else {
    window.location.href = "/";
  }
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
  console.log($(this).attr("data-postid"));
  var userId = $(this).attr("data-userid");
  var postId = $(this).attr("data-postid");
  $.ajax({
    url: currentURL + "/api/accept/" + postId + "/" + userId,
    method: "GET"
  }).then(function(res) {
    console.log(res);
  });
});

function createNewPost(post, postId) {
  $("#postcontainer").append(
    "<div style= 'word-wrap: break-word; border:1px solid #ccc'>" +
      post.subject +
      "</div>"
  );
  // $("#postcontainer").append("════════════════════");
  $("#postcontainer").append(
    "<div style= 'word-wrap: break-word; border:3px solid #ccc'>" +
      post.task +
      "</div>"
  );
  $("#postcontainer").append(
    "<button class='accept' data-postId=" +
      postId +
      " data-userId=" +
      user.id +
      ">Accept</button>"
  );
  $("#postcontainer").append("<br>");
  $("#postcontainer").append("<br>");
  // $("#postcontainer").append(
  //   "═════════════════════════════════════════════════════════════════════════"
  // );
  // post.task.css({
  //   float: "center",
  //   color: "red"
  // });
  // $("#post-container").append(newPost);
  // var newPost = $("<div>");
  // newPost.addClass("jumbotron");
  // var postHeader = $("<h2>");
  // postHeader.addClass("display-4");
  // postHeader.append(newPost);
  // postHeader.text(post.subject);
  // var paragraph = $("<p>");
  // paragraph.addClass("lead");
  // paragraph.append(postHeader);
  // paragraph.text(post.task);
function createNewPost(post) {
  $("#testing").append("<h1>" + post.subject + "</h1>");
  // var newPostCard = $("<div>");
  // newPostCard.addClass("card text-center");
  // var newPostCardHeader = $("<div>");
  // newPostCardHeader.addClass("card-header");
  // var newPostCardBody = $("<div>");
  // newPostCardBody.addClass("card-body");
  // newPostCardBody.append(acceptButton);
  // var newPostCardTitle = $("<h3>");
  // newPostCardTitle.addClass("card-title");
  // newPostCardTitle.text("Subject: " + post.subject);
  // var newPostCardText = $("<p>");
  // newPostCardText.addClass("card-text");
  // newPostCardText.text(post.task);
  // newPostCardText.append(post.task);
  // var acceptButton = $("<button>");
  // acceptButton.addClass("btn btn-primary btn-lg");
  // acceptButton.text("ACCEPT");
  // acceptButton.append(paragraph);
  // newPost.data("post", post);
  // return newPost;
  // $("#post-container").append(newPost);
  // $("#post-container").append("<div class='card text-center'>");
  // $("#post-container").append("<div class='card-header'>");
  // $("#post-container").append("</div>");
  // $("#post-container").append("<div class='card-body'>");
  // $("#post-container").append(
  //   "<h5 class='card-title'>" + post.subject + "</h5>"
  // );
  // $("#post-container").append("<p class='card-text'>" + post.task + "</p>");
  // $("#post-container").append("<button>" + "ACCEPT" + "</button>");
  // $("#post-container").append("</div>");
  // $("#post-container").append("</div>");
  // $("#post-container").append("</div>");
  // $("#post-container").append("</div>");
}

// var newPostCard = $("<div>");
// newPostCard.addClass("card text-center");
// var newPostCardHeader = $("<div>");
// newPostCardHeader.addClass("card-header");
// var newPostCardBody = $("<div>");
// newPostCardBody.addClass("card-body");
// newPostCardBody.append(acceptButton);
// var newPostCardTitle = $("<h3>");
// newPostCardTitle.addClass("card-title");
// newPostCardTitle.text("Subject: " + post.subject);
// var newPostCardText = $("<p>");
// newPostCardText.addClass("card-text");
// newPostCardText.text(post.task);
// newPostCardText.append(post.task);
// var acceptButton = $("<button>");
// acceptButton.text("ACCEPT");
// acceptButton.addClass("btn btn-primary");
// var newPostCardFooter = $("<div>");
// newPostCardFooter.addClass("card-footer");
// return newPostCard;
// }
// $(document).ready(function() {
//   $("#createPost").click(function() {
//     var createForm = $("#createPost");
//     var subject = $("dropdown").val();
//     var message = $("message").val();
//     $("#testing").append("<p>" + message + "</p>");
//     $("#testing").append("<p>" + subject + "</p>");
//   });
// });

function getAllNotAccPosts() {
  $.ajax({
    url: currentURL + "/api/allPosts/notAcc",
    method: "GET"
  }).then(function(res) {
    console.log("Posts not accepted");
    console.log(res);

    // appendPostCards(res);
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

  // var sliderMain = function() {
  //   $("#colorlib-hero .flexslider").flexslider({
  //     animation: "fade",
  //     slideshowSpeed: 5000,
  //     directionNav: true,
  //     start: function() {
  //       setTimeout(function() {
  //         $(".slider-text").removeClass("animated fadeInUp");
  //         $(".flex-active-slide")
  //           .find(".slider-text")
  //           .addClass("animated fadeInUp");
  //       }, 500);
  //     },
  //     before: function() {
  //       setTimeout(function() {
  //         $(".slider-text").removeClass("animated fadeInUp");
  //         $(".flex-active-slide")
  //           .find(".slider-text")
  //           .addClass("animated fadeInUp");
  //       }, 500);
  //     }
  //   });
  // };

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

        // $("#sticky_item").stick_in_parent();
      }
    });

    $(".sticky-parent").css("height", h);

    // $("#sticky_item").stick_in_parent();
  };

  // var owlCrouselFeatureSlide = function() {
  //   $(".owl-carousel").owlCarousel({
  //     animateOut: "fadeOut",
  //     animateIn: "fadeIn",
  //     autoplay: true,
  //     loop: true,
  //     margin: 0,
  //     nav: true,
  //     dots: false,
  //     autoHeight: true,
  //     items: 1,
  //     navText: [
  //       "<i class='icon-arrow-left3 owl-direction'></i>",
  //       "<i class='icon-arrow-right3 owl-direction'></i>"
  //     ]
  //   });
  // };

  // Document on load.
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
