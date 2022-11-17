const testItem = document.getElementById("textDisplay");
const textData = document.getElementById("textData");
const inputItem = document.getElementById("textInput");
const timeName = document.getElementById("timeName");
const time = document.getElementById("time");
const cwName = document.getElementById("cwName");
const cw = document.getElementById("cw");
const restartBtn = document.getElementById("restartBtn");
const fifteen = document.getElementById("fifteen");
const thirty = document.getElementById("thirty");
const sixty = document.getElementById("sixty");
const oneTwenty = document.getElementById("oneTwenty");
const twoForty = document.getElementById("twoForty");
const beg = document.getElementById("beg");
const pro = document.getElementById("pro");
const sound = document.getElementById("sound");
const inputSelection = document.querySelector(
  "body > div > div.input-area.center"
);

var letterNo = 1;
var wordsSubmitted = 0;
var wordsCorrect = 0;
var lettersCorrect = 0;
var timer = 15;
var timeTaken = 15;
var flag = 0;
var seconds;
var difficulty = 0;
var totalLetters = 1;
var multiplier = 0;
var scrollFlag = 0;
var wrongLetters = Array(240).fill(0);
var isSound = 0;
var audio = new Audio("public/sounds/typing_5.wav");

displayTest(difficulty);

inputSelection.addEventListener("click", () => {
  // console.log("press");
  inputItem.focus();
});

//on Input
inputItem.addEventListener("keydown", (e) => {
  if (e.key == "Backspace") {
    backSpace();
    makeSound();
  }
});

inputItem.addEventListener("input", function (event) {
  if (flag === 0) {
    flag = 1;
    timeStart();
  }
  checkWord();
  makeSound();
});

function makeSound() {
  if (isSound) {
    audio.currentTime = 0;
    audio.muted = false;
    audio.play();
  }
}

//display the score
function displayScore() {
  let percentageAcc = 0;
  showStat();
  if (letterNo !== 0) {
    percentageAcc = Math.floor((lettersCorrect / (letterNo - 1)) * 100);
  }

  time.classList.add("current");
  cw.classList.add("current");

  time.innerText = percentageAcc + "%";
  timeName.innerText = "PA";

  cw.innerText = Math.floor(wordsCorrect / (timeTaken / 60));
  cwName.innerText = "WPM";
}

//check letter removed
function backSpace() {
  // console.log(letterNo);
  if (letterNo > 1) {
    const prevID = "letter " + (letterNo - 1);
    const prevSpan = document.getElementById(prevID);

    if (window.scrollY + prevSpan.getBoundingClientRect().top > 335) {
      var currentID = "letter " + letterNo;
      colorSpan(currentID, 4);

      letterNo--;

      currentID = "letter " + letterNo;
      const currentSpan = document.getElementById(currentID);
      const curSpanWord = currentSpan.innerHTML;
      if (currentSpan.classList.contains("wrong")) {
        wrongLetters[wordsSubmitted]--;
      } else if (currentSpan.classList.contains("correct")) {
        lettersCorrect--;
        if (curSpanWord === " ") {
          wordsSubmitted--;
          if (wrongLetters[wordsSubmitted] == 0) {
            wordsCorrect--;
            cw.innerText = wordsCorrect;
          }
        }
      }
      colorSpan(currentID, 2);
      console.log(window.scrollY + currentSpan.getBoundingClientRect().top);
    }

    // 313.59375
    // 346.59375
  }
}

//checks letter entered
function checkWord() {
  const letterEntered = inputItem.value;
  inputItem.value = "";

  const letterID = "letter " + letterNo;
  const checkSpan = document.getElementById(letterID);

  letterNo++;

  if (checkSpan.innerText === letterEntered) {
    colorSpan(letterID, 1);
    lettersCorrect++;
  } else {
    wrongLetters[wordsSubmitted]++;
    colorSpan(letterID, 3);
  }

  if (checkSpan.innerText === " ") {
    if (wrongLetters[wordsSubmitted] == 0) {
      wordsCorrect++;
      cw.innerText = wordsCorrect;
    }
    wordsSubmitted++;
  }

  const nextID = "letter " + letterNo;
  const nextSpan = document.getElementById(nextID);
  colorSpan(nextID, 2);
  if (window.scrollY + nextSpan.getBoundingClientRect().top > 370) {
    // console.log(window.scrollY + nextSpan.getBoundingClientRect().top);
    multiplier++;
    textData.style.transform = `translateY(-${33 * multiplier}px)`;
  }
}
//sound selection
sound.addEventListener("click", function () {
  isSound = isSound == 1 ? 0 : 1;
  if (sound.classList.contains("yellow")) {
    sound.classList.remove("yellow");
    document.cookie = "sound=mute";
  } else {
    sound.classList.add("yellow");
    document.cookie = "sound=unmute";
  }
  inputItem.focus();
});

//time selection
fifteen.addEventListener("click", function () {
  timer = 15;
  timeTaken = 15;
  limitColor(fifteen, 0);
  time.innerText = timer;
  inputItem.focus();
  document.cookie = "time=fifteen";
});
thirty.addEventListener("click", function () {
  timer = 30;
  timeTaken = 30;
  limitColor(thirty, 0);
  time.innerText = timer;
  inputItem.focus();
  document.cookie = "time=thirty";
});
sixty.addEventListener("click", function () {
  timer = 60;
  timeTaken = 60;
  limitColor(sixty, 0);
  time.innerText = timer;
  inputItem.focus();
  document.cookie = "time=sixty";
});
oneTwenty.addEventListener("click", function () {
  timer = 120;
  timeTaken = 120;
  limitColor(oneTwenty, 0);
  time.innerText = timer;
  inputItem.focus();
  document.cookie = "time=oneTwenty";
});
twoForty.addEventListener("click", function () {
  timer = 240;
  timeTaken = 240;
  limitColor(twoForty, 0);
  time.innerText = timer;
  inputItem.focus();
  document.cookie = "time=twoForty";
});

//difficulty Selection
beg.addEventListener("click", function () {
  difficulty = 0;
  displayTest(difficulty);
  limitColor(beg, 1);
  inputItem.focus();
  document.cookie = "diff=0";
});
pro.addEventListener("click", function () {
  difficulty = 1;
  displayTest(difficulty);
  limitColor(pro, 1);
  inputItem.focus();
  document.cookie = "diff=1";
});

//set the color of time and difficulty
function limitColor(itema, id) {
  // console.log(itema,id);
  if (id === 0) {
    fifteen.classList.remove("yellow");
    thirty.classList.remove("yellow");
    sixty.classList.remove("yellow");
    oneTwenty.classList.remove("yellow");
    twoForty.classList.remove("yellow");
  } else if (id === 1) {
    beg.classList.remove("yellow");
    pro.classList.remove("yellow");
  }
  itema.classList.add("yellow");
}

//restart the Test
restartBtn.addEventListener("click", function () {
  textData.style.transform = `translateY(${0}px)`;
  multiplier = 0;
  wordsSubmitted = 0;
  wordsCorrect = 0;
  letterNo = 1;
  totalLetters = 1;
  flag = 0;
  lettersCorrect = 0;
  wrongLetters = Array(240).fill(0);

  time.classList.remove("current");
  cw.classList.remove("current");
  time.innerText = timer;
  timeName.innerText = "Time";
  cw.innerText = wordsCorrect;
  cwName.innerText = "CW";
  inputItem.disabled = false;
  inputItem.value = "";
  inputItem.focus();

  displayTest(difficulty);
  clearInterval(seconds);
  limitVisible();
});

//start the timer countdown
function timeStart() {
  limitInvisible();
  seconds = setInterval(function () {
    time.innerText--;

    if (time.innerText == "-1" || totalLetters === letterNo) {
      if (totalLetters === letterNo) {
        timeTaken = timer - time.innerText;
      }
      clearInterval(seconds);
      timeOver();
    }
  }, 1000);
}

//diable textarea and wait for restart
function timeOver() {
  inputItem.disabled = true;
  restartBtn.focus();

  displayScore();
}

//set Limit visibility
function limitVisible() {
  fifteen.style.visibility = "visible";
  thirty.style.visibility = "visible";
  sixty.style.visibility = "visible";
  oneTwenty.style.visibility = "visible";
  twoForty.style.visibility = "visible";
  beg.style.visibility = "visible";
  pro.style.visibility = "visible";
  sound.style.visibility = "visible";
}
function limitInvisible() {
  time.style.visibility = "visible";

  fifteen.style.visibility = "hidden";
  thirty.style.visibility = "hidden";
  sixty.style.visibility = "hidden";
  oneTwenty.style.visibility = "hidden";
  twoForty.style.visibility = "hidden";

  beg.style.visibility = "hidden";
  pro.style.visibility = "hidden";

  sound.style.visibility = "hidden";
}

function hideStat() {
  time.style.visibility = "hidden";
  timeName.style.visibility = "hidden";
  cw.style.visibility = "hidden";
  cwName.style.visibility = "hidden";
  time.style.fontSize = "1.5rem"; // font size 6
  time.style.position = "absolute";
  time.style.left = "3rem";
  time.style.top = "15rem";
}
function showStat() {
  time.style.fontSize = "6rem"; // font size 6
  time.style.left = "15rem";
  time.style.top = "10.5rem";
  timeName.style.visibility = "visible";
  cw.style.visibility = "visible";
  cwName.style.visibility = "visible";
}

//color the words
function colorSpan(id, color) {
  const span = document.getElementById(id);
  if (color === 1) {
    span.classList.remove("wrong");
    span.classList.remove("current");
    span.classList.add("correct");
  } else if (color === 2) {
    span.classList.remove("correct");
    span.classList.remove("wrong");
    span.classList.add("current");
  } else if (color == 3) {
    span.classList.remove("correct");
    span.classList.remove("current");
    span.classList.add("wrong");
  } else {
    span.classList.remove("correct");
    span.classList.remove("current");
    span.classList.remove("wrong");
  }
}

//display the random words on screen
function displayTest(diff) {
  if (document.cookie) {
    let data = document.cookie.split("; ").map((row) => row.split("="));
    let obj = Object.fromEntries(data.map(([v, k]) => [v, k]));

    let { time: t, diff: d, sound: s } = obj;
    console.log(t, d, s);
    s === "muted"
      ? sound.classList.remove("yellow")
      : sound.classList.add("yellow");

    isSound = s === "muted" ? 0 : 1;

    d === '0' ? limitColor(beg, 1) : limitColor(pro, 1);
    difficulty = d === "0" ? 0 : 1;
    diff = difficulty

    if (t === "fifteen") {
      limitColor(fifteen, 0);
      timer = 15;
      timeTaken=15;
    } else if (t === "thirty") {
      limitColor(thirty, 0);
      timer = 30;
      timeTaken=30;
    } else if (t === "sixty") {
      limitColor(sixty, 0);
      timer = 60;
      timeTaken= 60;
    } else if (t === "oneTwenty") {
      limitColor(oneTwenty, 0);
      timer = 120;
      timeTaken= 120;
    } else if (t === "twoForty") {
      limitColor(twoForty, 0);
      timer = 240;
      timeTaken= 240;
    }
  time.innerText = timer;

  } else {
    document.cookie = "time=fifteen";
    document.cookie = "diff=0";
    document.cookie = "sound=mute";
    fifteen.classList.add("yellow");
    beg.classList.add("yellow");
    sound.classList.remove("yellow");
  }

  var ltrNo = 0;
  textData.innerHTML = "";

  hideStat();

  let newTest = randomWords(diff);
  // console.log(newTest);
  newTest.forEach(function (word, i) {
    letters = word.match(/.{1,1}/g);
    letters.forEach((letter, i) => {
      let letterSpan = document.createElement("span");
      letterSpan.innerText = letter;
      letterSpan.setAttribute("id", "letter " + (ltrNo + i + 1));
      textData.appendChild(letterSpan);
    });
    ltrNo = ltrNo + letters.length;
  });
  totalLetters = ltrNo;
  const nextID = "letter " + letterNo;
  colorSpan(nextID, 2);
}

//Generate an array of random 50 words
function randomWords(diff) {
  var topWords = [
    "ability",
    "able",
    "about",
    "above",
    "accept",
    "according",
    "account",
    "across",
    "action",
    "activity",
    "actually",
    "address",
    "administration",
    "admit",
    "adult",
    "affect",
    "after",
    "again",
    "against",
    "agency",
    "agent",
    "ago",
    "agree",
    "agreement",
    "ahead",
    "allow",
    "almost",
    "alone",
    "along",
    "already",
    "also",
    "although",
    "always",
    "American",
    "among",
    "amount",
    "analysis",
    "and",
    "animal",
    "another",
    "answer",
    "anyone",
    "anything",
    "appear",
    "apply",
    "approach",
    "area",
    "argue",
    "around",
    "arrive",
    "article",
    "artist",
    "assume",
    "attack",
    "attention",
    "attorney",
    "audience",
    "author",
    "authority",
    "available",
    "avoid",
    "away",
    "baby",
    "back",
    "ball",
    "bank",
    "beat",
    "beautiful",
    "because",
    "become",
    "before",
    "begin",
    "behavior",
    "behind",
    "believe",
    "benefit",
    "best",
    "better",
    "between",
    "beyond",
    "bill",
    "billion",
    "black",
    "blood",
    "blue",
    "board",
    "body",
    "book",
    "born",
    "both",
    "break",
    "bring",
    "brother",
    "budget",
    "build",
    "building",
    "business",
    "call",
    "camera",
    "campaign",
    "cancer",
    "candidate",
    "capital",
    "card",
    "care",
    "career",
    "carry",
    "case",
    "catch",
    "cause",
    "cell",
    "center",
    "central",
    "century",
    "certain",
    "certainly",
    "chair",
    "challenge",
    "chance",
    "change",
    "character",
    "charge",
    "check",
    "child",
    "choice",
    "choose",
    "church",
    "citizen",
    "city",
    "civil",
    "claim",
    "class",
    "clear",
    "clearly",
    "close",
    "coach",
    "cold",
    "collection",
    "college",
    "color",
    "come",
    "commercial",
    "common",
    "community",
    "company",
    "compare",
    "computer",
    "concern",
    "condition",
    "conference",
    "congress",
    "consider",
    "consumer",
    "contain",
    "continue",
    "control",
    "cost",
    "could",
    "country",
    "couple",
    "course",
    "court",
    "cover",
    "create",
    "crime",
    "cultural",
    "culture",
    "cup",
    "current",
    "customer",
    "dark",
    "data",
    "daughter",
    "dead",
    "deal",
    "death",
    "debate",
    "decade",
    "decide",
    "decision",
    "deep",
    "defense",
    "degree",
    "Democrat",
    "democratic",
    "describe",
    "design",
    "despite",
    "detail",
    "determine",
    "develop",
    "development",
    "difference",
    "different",
    "difficult",
    "dinner",
    "direction",
    "director",
    "discover",
    "discuss",
    "discussion",
    "disease",
    "doctor",
    "door",
    "down",
    "draw",
    "dream",
    "drive",
    "drop",
    "drug",
    "during",
    "each",
    "early",
    "east",
    "easy",
    "economic",
    "economy",
    "edge",
    "education",
    "effect",
    "effort",
    "eight",
    "either",
    "election",
    "else",
    "employee",
    "energy",
    "enjoy",
    "enough",
    "enter",
    "entire",
    "environment",
    "environmental",
    "especially",
    "establish",
    "even",
    "evening",
    "event",
    "ever",
    "every",
    "everybody",
    "everyone",
    "everything",
    "evidence",
    "exactly",
    "example",
    "executive",
    "exist",
    "expect",
    "experience",
    "expert",
    "explain",
    "eye",
    "face",
    "fact",
    "factor",
    "fail",
    "fall",
    "family",
    "far",
    "fast",
    "father",
    "fear",
    "federal",
    "feel",
    "feeling",
    "field",
    "fight",
    "figure",
    "fill",
    "film",
    "final",
    "finally",
    "financial",
    "find",
    "fine",
    "finger",
    "finish",
    "fire",
    "firm",
    "first",
    "fish",
    "five",
    "floor",
    "fly",
    "focus",
    "follow",
    "food",
    "foot",
    "force",
    "foreign",
    "forget",
    "form",
    "former",
    "forward",
    "four",
    "free",
    "friend",
    "from",
    "front",
    "full",
    "fund",
    "future",
    "game",
    "garden",
    "general",
    "generation",
    "girl",
    "give",
    "glass",
    "goal",
    "good",
    "government",
    "great",
    "green",
    "ground",
    "group",
    "grow",
    "growth",
    "guess",
    "guy",
    "hair",
    "half",
    "hand",
    "hang",
    "happen",
    "happy",
    "hard",
    "have",
    "head",
    "health",
    "hear",
    "heart",
    "heat",
    "heavy",
    "help",
    "here",
    "herself",
    "high",
    "him",
    "himself",
    "his",
    "history",
    "hold",
    "home",
    "hope",
    "hospital",
    "hot",
    "hotel",
    "hour",
    "house",
    "how",
    "however",
    "huge",
    "human",
    "hundred",
    "husband",
    "I",
    "idea",
    "identify",
    "if",
    "image",
    "imagine",
    "impact",
    "important",
    "improve",
    "include",
    "including",
    "increase",
    "indeed",
    "indicate",
    "individual",
    "industry",
    "information",
    "inside",
    "instead",
    "institution",
    "interest",
    "interesting",
    "international",
    "interview",
    "into",
    "investment",
    "involve",
    "issue",
    "item",
    "it's",
    "itself",
    "join",
    "just",
    "keep",
    "kill",
    "kind",
    "kitchen",
    "know",
    "knowledge",
    "land",
    "language",
    "large",
    "last",
    "late",
    "later",
    "laugh",
    "law",
    "lawyer",
    "lead",
    "leader",
    "learn",
    "least",
    "leave",
    "left",
    "legal",
    "less",
    "letter",
    "level",
    "life",
    "light",
    "like",
    "likely",
    "line",
    "list",
    "listen",
    "little",
    "live",
    "local",
    "long",
    "look",
    "lose",
    "loss",
    "love",
    "machine",
    "magazine",
    "main",
    "maintain",
    "major",
    "majority",
    "make",
    "man",
    "manage",
    "management",
    "manager",
    "many",
    "market",
    "marriage",
    "material",
    "matter",
    "maybe",
    "mean",
    "measure",
    "media",
    "medical",
    "meet",
    "meeting",
    "member",
    "memory",
    "mention",
    "message",
    "method",
    "middle",
    "might",
    "military",
    "million",
    "mind",
    "minute",
    "miss",
    "mission",
    "model",
    "modern",
    "moment",
    "money",
    "month",
    "more",
    "morning",
    "most",
    "mother",
    "mouth",
    "move",
    "movement",
    "movie",
    "Mr",
    "Mrs",
    "much",
    "music",
    "must",
    "my",
    "myself",
    "name",
    "nation",
    "national",
    "natural",
    "nature",
    "near",
    "nearly",
    "necessary",
    "need",
    "network",
    "never",
    "news",
    "newspaper",
    "next",
    "nice",
    "night",
    "none",
    "north",
    "note",
    "nothing",
    "notice",
    "number",
    "occur",
    "off",
    "offer",
    "office",
    "officer",
    "official",
    "often",
    "once",
    "only",
    "onto",
    "open",
    "operation",
    "opportunity",
    "option",
    "order",
    "organization",
    "other",
    "others",
    "outside",
    "over",
    "own",
    "owner",
    "page",
    "pain",
    "painting",
    "paper",
    "parent",
    "part",
    "participant",
    "particular",
    "particularly",
    "partner",
    "party",
    "pass",
    "past",
    "patient",
    "pattern",
    "peace",
    "people",
    "perform",
    "performance",
    "perhaps",
    "period",
    "person",
    "personal",
    "phone",
    "physical",
    "pick",
    "picture",
    "piece",
    "place",
    "plan",
    "plant",
    "play",
    "player",
    "PM",
    "point",
    "police",
    "policy",
    "political",
    "politics",
    "poor",
    "popular",
    "population",
    "position",
    "positive",
    "possible",
    "power",
    "practice",
    "prepare",
    "present",
    "president",
    "pressure",
    "pretty",
    "prevent",
    "price",
    "private",
    "probably",
    "problem",
    "process",
    "produce",
    "product",
    "production",
    "professional",
    "professor",
    "program",
    "project",
    "property",
    "protect",
    "prove",
    "provide",
    "public",
    "pull",
    "purpose",
    "push",
    "quality",
    "question",
    "quickly",
    "quite",
    "race",
    "radio",
    "raise",
    "range",
    "rate",
    "rather",
    "reach",
    "read",
    "ready",
    "real",
    "reality",
    "realize",
    "really",
    "reason",
    "receive",
    "recent",
    "recently",
    "recognize",
    "record",
    "red",
    "reduce",
    "reflect",
    "region",
    "relate",
    "relationship",
    "religious",
    "remain",
    "remember",
    "remove",
    "report",
    "represent",
    "republican",
    "require",
    "research",
    "resource",
    "respond",
    "response",
    "responsibility",
    "rest",
    "result",
    "return",
    "reveal",
    "rich",
    "right",
    "rise",
    "risk",
    "road",
    "rock",
    "role",
    "room",
    "rule",
    "safe",
    "same",
    "save",
    "scene",
    "school",
    "science",
    "scientist",
    "score",
    "sea",
    "season",
    "seat",
    "second",
    "section",
    "security",
    "see",
    "seek",
    "seem",
    "sell",
    "send",
    "senior",
    "sense",
    "series",
    "serious",
    "serve",
    "service",
    "set",
    "seven",
    "several",
    "sex",
    "sexual",
    "shake",
    "share",
    "she",
    "shoot",
    "short",
    "shot",
    "should",
    "shoulder",
    "show",
    "side",
    "sign",
    "significant",
    "similar",
    "simple",
    "simply",
    "since",
    "sing",
    "single",
    "sister",
    "situation",
    "size",
    "skill",
    "skin",
    "small",
    "smile",
    "social",
    "society",
    "soldier",
    "some",
    "somebody",
    "someone",
    "something",
    "sometimes",
    "song",
    "soon",
    "sort",
    "sound",
    "source",
    "south",
    "southern",
    "space",
    "speak",
    "special",
    "specific",
    "speech",
    "spend",
    "sport",
    "spring",
    "staff",
    "stage",
    "stand",
    "standard",
    "star",
    "start",
    "state",
    "statement",
    "station",
    "stay",
    "step",
    "still",
    "stock",
    "stop",
    "store",
    "story",
    "strategy",
    "street",
    "strong",
    "structure",
    "student",
    "study",
    "stuff",
    "style",
    "subject",
    "success",
    "successful",
    "such",
    "suddenly",
    "suffer",
    "suggest",
    "summer",
    "support",
    "sure",
    "surface",
    "system",
    "table",
    "take",
    "talk",
    "task",
    "tax",
    "teach",
    "teacher",
    "team",
    "technology",
    "television",
    "tell",
    "tend",
    "term",
    "test",
    "than",
    "thank",
    "that",
    "their",
    "them",
    "themselves",
    "then",
    "theory",
    "there",
    "these",
    "they",
    "thing",
    "think",
    "third",
    "this",
    "those",
    "though",
    "thought",
    "thousand",
    "threat",
    "three",
    "through",
    "throughout",
    "throw",
    "thus",
    "time",
    "today",
    "together",
    "tonight",
    "total",
    "tough",
    "toward",
    "town",
    "trade",
    "traditional",
    "training",
    "travel",
    "treat",
    "treatment",
    "tree",
    "trial",
    "trip",
    "trouble",
    "true",
    "truth",
    "try",
    "turn",
    "TV",
    "type",
    "under",
    "understand",
    "unit",
    "until",
    "usually",
    "value",
    "various",
    "very",
    "victim",
    "view",
    "violence",
    "visit",
    "voice",
    "vote",
    "wait",
    "walk",
    "wall",
    "want",
    "watch",
    "water",
    "weapon",
    "wear",
    "week",
    "weight",
    "well",
    "west",
    "western",
    "what",
    "whatever",
    "when",
    "where",
    "whether",
    "which",
    "while",
    "white",
    "whole",
    "whom",
    "whose",
    "wide",
    "wife",
    "will",
    "wind",
    "window",
    "wish",
    "with",
    "within",
    "without",
    "woman",
    "wonder",
    "word",
    "work",
    "worker",
    "world",
    "worry",
    "would",
    "write",
    "writer",
    "wrong",
    "yard",
    "yeah",
    "year",
    "young",
    "your",
    "yourself",
  ];

  var basicWords = [
    "a",
    "about",
    "above",
    "across",
    "act",
    "add",
    "afraid",
    "after",
    "again",
    "age",
    "ago",
    "agree",
    "air",
    "all",
    "alone",
    "along",
    "always",
    "am",
    "amount",
    "an",
    "and",
    "angry",
    "another",
    "answer",
    "any",
    "anyone",
    "appear",
    "apple",
    "are",
    "area",
    "arm",
    "army",
    "around",
    "arrive",
    "art",
    "as",
    "ask",
    "at",
    "aunt",
    "away",
    "baby",
    "back",
    "bad",
    "bag",
    "ball",
    "bank",
    "base",
    "bath",
    "be",
    "bean",
    "bear",
    "bed",
    "beer",
    "before",
    "begin",
    "bell",
    "below",
    "best",
    "big",
    "bird",
    "birth",
    "bit",
    "bite",
    "black",
    "bleed",
    "block",
    "blood",
    "blow",
    "blue",
    "board",
    "boat",
    "body",
    "boil",
    "bone",
    "book",
    "border",
    "born",
    "both",
    "bowl",
    "box",
    "boy",
    "branch",
    "brave",
    "bread",
    "break",
    "breathe",
    "bridge",
    "bright",
    "bring",
    "brother",
    "brown",
    "brush",
    "build",
    "burn",
    "bus",
    "busy",
    "but",
    "buy",
    "by",
    "cake",
    "call",
    "can",
    "cap",
    "car",
    "card",
    "care",
    "carry",
    "case",
    "cat",
    "catch",
    "chair",
    "chase",
    "cheap",
    "cheese",
    "child",
    "choice",
    "circle",
    "city",
    "class",
    "clever",
    "clean",
    "clear",
    "climb",
    "clock",
    "cloth",
    "cloud",
    "close",
    "coffee",
    "coat",
    "coin",
    "cold",
    "colour",
    "comb",
    "common",
    "compare",
    "come",
    "control",
    "cook",
    "cool",
    "copper",
    "corn",
    "corner",
    "correct",
    "cost",
    "count",
    "cover",
    "crash",
    "cross",
    "cry",
    "cup",
    "cut",
    "dance",
    "dark",
    "day",
    "dead",
    "decide",
    "deep",
    "deer",
    "desk",
    "die",
    "dirty",
    "dish",
    "do",
    "dog",
    "door",
    "down",
    "draw",
    "dream",
    "dress",
    "drink",
    "drive",
    "drop",
    "dry",
    "duck",
    "dust",
    "duty",
    "each",
    "ear",
    "early",
    "earn",
    "earth",
    "east",
    "easy",
    "eat",
    "effect",
    "egg",
    "eight",
    "else",
    "empty",
    "end",
    "enemy",
    "enjoy",
    "enter",
    "equal",
    "even",
    "event",
    "ever",
    "every",
    "exact",
    "except",
    "expect",
    "explain",
    "eye",
    "face",
    "fact",
    "fail",
    "fall",
    "false",
    "family",
    "famous",
    "far",
    "farm",
    "fast",
    "fat",
    "fault",
    "fear",
    "feed",
    "feel",
    "fever",
    "few",
    "fight",
    "fill",
    "film",
    "find",
    "fine",
    "fire",
    "first",
    "fish",
    "fit",
    "five",
    "fix",
    "flag",
    "flat",
    "float",
    "floor",
    "flour",
    "fly",
    "fold",
    "food",
    "fool",
    "foot",
    "for",
    "force",
    "forest",
    "forget",
    "fork",
    "form",
    "fox",
    "four",
    "free",
    "freeze",
    "fresh",
    "friend",
    "from",
    "front",
    "fruit",
    "full",
    "fun",
    "funny",
    "future",
    "game",
    "gate",
    "get",
    "gift",
    "give",
    "glad",
    "glass",
    "go",
    "goat",
    "god",
    "gold",
    "good",
    "grass",
    "grave",
    "great",
    "green",
    "gray",
    "group",
    "grow",
    "gun",
    "hair",
    "half",
    "hall",
    "hand",
    "happy",
    "hard",
    "hat",
    "hate",
    "have",
    "he",
    "head",
    "hear",
    "heavy",
    "heart",
    "hello",
    "help",
    "hen",
    "her",
    "here",
    "hers",
    "hide",
    "high",
    "hill",
    "him",
    "his",
    "hit",
    "hobby",
    "hold",
    "hole",
    "home",
    "hope",
    "horse",
    "hot",
    "hotel",
    "house",
    "how",
    "hour",
    "hurry",
    "hurt",
    "I",
    "ice",
    "idea",
    "if",
    "in",
    "into",
    "invent",
    "iron",
    "is",
    "island",
    "it",
    "its",
    "jelly",
    "job",
    "join",
    "juice",
    "jump",
    "just",
    "keep",
    "key",
    "kill",
    "kind",
    "king",
    "knee",
    "knife",
    "knock",
    "know",
    "lady",
    "lamp",
    "land",
    "large",
    "last",
    "late",
    "laugh",
    "lazy",
    "lead",
    "leaf",
    "learn",
    "leave",
    "leg",
    "left",
    "lend",
    "length",
    "less",
    "lesson",
    "let",
    "letter",
    "lie",
    "life",
    "light",
    "like",
    "lion",
    "lip",
    "list",
    "live",
    "lock",
    "lonely",
    "long",
    "look",
    "lose",
    "lot",
    "love",
    "low",
    "lower",
    "luck",
    "main",
    "make",
    "male",
    "man",
    "many",
    "map",
    "mark",
    "may",
    "me",
    "meal",
    "mean",
    "meat",
    "meet",
    "milk",
    "mind",
    "miss",
    "mix",
    "model",
    "money",
    "month",
    "moon",
    "more",
    "most",
    "mouth",
    "move",
    "much",
    "music",
    "must",
    "my",
    "name",
    "near",
    "neck",
    "need",
    "needle",
    "net",
    "never",
    "new",
    "news",
    "next",
    "nice",
    "night",
    "nine",
    "no",
    "noble",
    "noise",
    "none",
    "nor",
    "north",
    "nose",
    "not",
    "notice",
    "now",
    "obey",
    "ocean",
    "of",
    "off",
    "offer",
    "office",
    "often",
    "oil",
    "old",
    "on",
    "one",
    "only",
    "open",
    "or",
    "orange",
    "order",
    "other",
    "our",
    "out",
    "over",
    "own",
    "page",
    "pain",
    "paint",
    "pair",
    "pan",
    "paper",
    "park",
    "part",
    "party",
    "pass",
    "past",
    "path",
    "pay",
    "peace",
    "pen",
    "per",
    "piano",
    "pick",
    "piece",
    "pig",
    "pin",
    "pink",
    "place",
    "plane",
    "plant",
    "plate",
    "play",
    "please",
    "plenty",
    "point",
    "polite",
    "pool",
    "poor",
    "pour",
    "power",
    "press",
    "pretty",
    "price",
    "prince",
    "prison",
    "prize",
    "pull",
    "punish",
    "pupil",
    "push",
    "put",
    "queen",
    "quick",
    "quiet",
    "radio",
    "rain",
    "rainy",
    "raise",
    "reach",
    "read",
    "ready",
    "real",
    "red",
    "rent",
    "reply",
    "rest",
    "rice",
    "rich",
    "ride",
    "right",
    "ring",
    "rise",
    "road",
    "rob",
    "rock",
    "room",
    "round",
    "rude",
    "rule",
    "ruler",
    "run",
    "rush",
    "sad",
    "safe",
    "sail",
    "salt",
    "same",
    "sand",
    "save",
    "say",
    "school",
    "search",
    "seat",
    "second",
    "see",
    "seem",
    "sell",
    "send",
    "serve",
    "seven",
    "sex",
    "shade",
    "shake",
    "shape",
    "share",
    "sharp",
    "she",
    "sheep",
    "sheet",
    "shine",
    "ship",
    "shirt",
    "shoe",
    "shoot",
    "shop",
    "short",
    "shout",
    "show",
    "sick",
    "side",
    "silly",
    "silver",
    "simple",
    "single",
    "since",
    "sing",
    "sink",
    "sister",
    "sit",
    "six",
    "size",
    "skill",
    "skin",
    "skirt",
    "sky",
    "sleep",
    "slip",
    "slow",
    "small",
    "smell",
    "smile",
    "smoke",
    "snow",
    "so",
    "soap",
    "sock",
    "soft",
    "some",
    "son",
    "soon",
    "sorry",
    "sound",
    "soup",
    "south",
    "space",
    "speak",
    "speed",
    "spell",
    "spend",
    "spoon",
    "sport",
    "spread",
    "spring",
    "square",
    "stamp",
    "stand",
    "star",
    "start",
    "stay",
    "steal",
    "steam",
    "step",
    "still",
    "stone",
    "stop",
    "store",
    "storm",
    "story",
    "street",
    "study",
    "stupid",
    "such",
    "sugar",
    "sun",
    "sunny",
    "sure",
    "sweet",
    "swim",
    "sword",
    "table",
    "take",
    "talk",
    "tall",
    "taste",
    "taxi",
    "tea",
    "teach",
    "team",
    "tear",
    "tell",
    "ten",
    "tennis",
    "test",
    "than",
    "that",
    "the",
    "their",
    "then",
    "there",
    "these",
    "thick",
    "thin",
    "thing",
    "think",
    "third",
    "this",
    "threat",
    "three",
    "tidy",
    "tie",
    "title",
    "to",
    "today",
    "toe",
    "too",
    "tool",
    "tooth",
    "top",
    "total",
    "touch",
    "town",
    "train",
    "tram",
    "tree",
    "true",
    "trust",
    "twice",
    "try",
    "turn",
    "type",
    "ugly",
    "uncle",
    "under",
    "unit",
    "until",
    "up",
    "use",
    "useful",
    "usual",
    "usually",
    "very",
    "voice",
    "visit",
    "wait",
    "wake",
    "walk",
    "want",
    "warm",
    "was",
    "wash",
    "waste",
    "watch",
    "water",
    "way",
    "we",
    "weak",
    "wear",
    "week",
    "weight",
    "were",
    "well",
    "west",
    "wet",
    "what",
    "wheel",
    "when",
    "where",
    "which",
    "while",
    "white",
    "who",
    "why",
    "wide",
    "wife",
    "wild",
    "will",
    "win",
    "wind",
    "wine",
    "wire",
    "wise",
    "wish",
    "with",
    "woman",
    "word",
    "work",
    "world",
    "worry",
    "yard",
    "yell",
    "yet",
    "you",
    "young",
    "your",
    "zero",
    "zoo",
  ];

  if (diff == 0) {
    wordArray = basicWords;
  } else {
    wordArray = topWords;
  }

  var selectedWords = [];
  for (var i = 0; i < 240; i++) {
    var randomNumber = Math.floor(Math.random() * wordArray.length);
    selectedWords.push(wordArray[randomNumber] + " ");
  }
  return selectedWords;
}
