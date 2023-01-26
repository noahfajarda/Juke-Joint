<<<<<<< HEAD
// var images = [
//   "image1",
//   "image2",
//   "image3",
//   "image4",
//   "image5",
//   "image6",
//   "image7",
// ];
// var current = 0;

// function fadeInNext() {
//   document.getElementById(images[current]).classList.add("fade-in");
//   setTimeout(function () {
//     document.getElementById(images[current]).classList.remove("fade-in");
//     current = (current + 1) % images.length;
//     fadeOutNext();
//   }, 4000);
// }

// function fadeOutNext() {
//   document.getElementById(images[current]).classList.add("fade-out");
//   setTimeout(function () {
//     document.getElementById(images[current]).classList.remove("fade-out");
//     fadeInNext();
//   }, 1000);
// }

// fadeInNext();
=======
$(function () {
  $(".heart").on("click", function () {
    $(this).toggleClass("is-active");
  });
});
>>>>>>> 2b527e2b515c55601c8ae7cb0072bba02982534b
