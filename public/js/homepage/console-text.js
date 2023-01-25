consoleText(
    [
      "Find your music",
      "Ice Cube",
      "Kendrick Lamar",
      "Ed Sheeran",
      "Pink Floyd",
      "Queen",
      "Snoop Dogg",
      "Metallica",
      "The Beatles",
      "Stevie Wonder",
      "Michael Jackson",
      "Bob Marley",
      "The Rolling Stones",
      "Frank Sinatra",
      "Elvis Presley",
      "Anderson .Paak",
      "The Beach Boys",
      "Red Hot Chili Peppers",
      "Jimi Hendrix",
      "Miley Cyrus",
    ],
    "text",
    [
      "dodgerblue",
      "lightsalmon",
      "lightblue",
      "goldenrod",
      "tomato",
      "darkseagreen",
    ], "console", 80
  );
  
      consoleText(
    [
      "Find your music",
      "Childish Gambino",
      "Taylor Swift",
      "Ed Sheeran",
      "Pink Floyd",
      "Queen",
      "Snoop Dogg",
      "Metallica",
      "The Beatles",
      "Stevie Wonder",
      "Michael Jackson",
      "Bob Marley",
      "The Rolling Stones",
      "Frank Sinatra",
      "Elvis Presley",
      "Ice Cube",
      "The Beach Boys",
      "Red Hot Chili Peppers",
      "Jimi Hendrix",
      "Miley Cyrus",
    ],
    "text2",
    [
      "dodgerblue",
      "lightsalmon",
      "lightblue",
      "goldenrod",
      "tomato",
      "darkseagreen",
    ], "console2", 80
  );
  
  function consoleText(words, id, colors, element, interval) {
    if (colors === undefined) colors = ["#fff"];
    var visible = true;
    var con = document.getElementById(element);
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    target.setAttribute("style", "color:" + colors[0]);
    window.setInterval(function () {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount);
        window.setTimeout(function () {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          target.setAttribute("style", "color:" + colors[0]);
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function () {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, interval);
    window.setInterval(function () {
      if (visible === true) {
        con.className = "console-underscore hidden";
        visible = false;
      } else {
        con.className = "console-underscore";
  
        visible = true;
      }
    }, 400);
  }