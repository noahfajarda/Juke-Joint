consoleText(
  [
    "Find your music",
    "NIKI",
    "Bruno Mars",
    "Childish Gambino",
    "Kendrick Lamar",
    "Dark Fantasy",
    "POWER",
    "Anderson .Paak",
    "The Beach Boys",
    "Red Hot Chili Peppers",
    "Baby",
    "Jimi Hendrix",
    "Shakira",
    "Alicia Keys",
    "Rubber Soul",
    "Drake",
    "7 rings",
    "Alright",
    "Adele",
    "25",
    "Hello",
    "Harry Styles",
    "George Benson",
    "New Balance",
    "OLLA (Only Lovers Left Alive)",
    "Mirrors",
    "Truly",
    "Souled Out",
    "To Love & Die",
    "Stay Ready (What A Life)",
    "BTS",
    "Snoop Dogg",
    "Lizzo",
    "Cuz I Love You",
    "Juices",
    "Call Me If You Get Lost",
    "Poetic Justice",
    "Beyoncé",
    "Lemonade",
    "Formation",
    "The Weeknd",
    "The Beatles",
    "Dua Lipa",
    "Future Nostalgia",
    "While We're Young",
    "Don't Start Now",
    "Ed Sheeran",
    "Megan Thee Stallion",
    "Good News",
    "Savage", "Mask Off",
    "My Boo",
    "Frank Sinatra",
    "Destiny's Child",
    "Triggered (Freestyle)",
    "Stevie Wonder",
    "Stir Fry",
    "Billie Eilish",
    "To Pimp a Butterfly",
    "Jhene Aiko",
    "Billy Joel",
    "Bad Bunny",
    "YHLQMDLG",
    "Soy Peor",
    "Crazy",
    "Starboy",
    "The Hills",
    "Father Stretch My Hands Pt. 1",
    "Kiss Me More",
    "50 Cent",
    "Post Malone",
    "Beerbongs & Bentleys",
    "Rockstar",
    "Khalid",
    "JAY-Z", "When We Love",
    "It's Cool",
    "Sing To Me",
    "Thundercat",
    "Young Thug",
    "Doja Cat",
    "Bad Guy",
    "CeeLo Green",
    "No Role Modelz",
    "Aaliyah",
    "Michael Jackson",
    "Bruce Springsteen",
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
    "Ice Cube",
    "BLACKPINK",
    "10k Hours",
    "Kodak Black", "Beyoncé",
    "Jhené Aiko",
    "Chilombo",
    "None of Your Concern",
    "Money Trees",
    "An Evening With Silk Sonic",
    "3005",
    "To Pimp A Butterfly",
    "Life Style",
    "Maroon 5",
    "Frank Ocean",
    "All Falls Down",
    "Mac Miller",
    "Missy Elliott",
    "Ne-Yo", "Burn",
    "After Hours",
    "Lil Nas X",
    "Flower Boy",
    "G.O.M.D",
    "Nicole",
    "Bob Dylan",
    "Out Of Time",
    "Chris Brown",
    "B.S.",
    "Wasted Love Freestyle", "Views",
    "One Dance",
    "Graduation",
    "Taylor Swift",
    "Ariana Grande",
    "thank u, next",
    "Comfort Inn Ending (Freestyle)",
    "The Pressure",
    "Lyin King",
    "The Vapors",
    "Wading",
    "The Way You Make Me Feel",
    "Elvis Presley",
    "Van Morrison",
    "NSYNC",
    "Usher",
    "Daytona",
    "It Is What It Is",
    "Thriller",
    "Happiness Over Everything (H.O.E.)",
    "Triggered",
    "My Afternoon Dream",
    "Bed Peace",
    "The Worst",
    "Kid Cudi",
    "Bob Marley",
    "ELEMENT",
    "Britney Spears",
    "Jumpman",
    "Miley Cyrus",
    "Chance The Rapper",
    "This Is America",
    "Yeezus",
    "J. Cole",
    "Pink Floyd",
    "Queen",
    "Lil Wayne",
    "21",
    "Bad Guy",
    "American Teen",
    "Cardy B",
    "Nostalgia Ultra",
    "Eternal Sunshine",
    "W.A.Y.S.",
    "When We All Fall Asleep, Where Do We Go?",
    "Promises",
    "Newer Balance",
    "3:16am",
    "Metallica",
    "Pusha T",
    "Nas",
    "Tevin Campbell",
    "Lana Del Rey",
    "New Edition",
    "Folklore",
  ],
  "text2",
  [
    "dodgerblue",
    "tomato",
    "goldenrod",
    "lightblue",
    "lightsalmon",
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