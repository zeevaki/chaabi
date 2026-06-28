import type { Mission } from './html'

export const jsMissions: Mission[] = [
  {
    id: 'js-1',
    order: 1,
    titleEmoji: '📢',
    title: 'Say Hello!',
    concept: 'JavaScript makes webpages interactive and alive! The alert() function pops up a message box. It\'s your first JavaScript superpower!',
    instruction: 'Make a popup message appear! Add this inside a <script> tag:\n\nalert("Hello World!");',
    hint: 'Put your JavaScript in <script> tags:\n<script>\n  alert("Hello World!");\n</script>',
    xp: 50,
    starterCode: `<!DOCTYPE html>
<html>
<head><title>My JS Page</title></head>
<body>
  <h1>JavaScript World!</h1>
  <!-- Add your script tag below! -->

</body>
</html>`,
    validate: (code) => /alert\s*\(/i.test(code) && /<script/i.test(code),
    successMessage: "You ran your first JavaScript! That alert() you wrote? It's what developers use to test their code every day. You're programming now! ⚡",
  },
  {
    id: 'js-2',
    order: 2,
    titleEmoji: '🖱️',
    title: 'Click the Button',
    concept: 'onclick is an event — it runs JavaScript when something happens (like a click). Events are how websites respond to what you do!',
    instruction: 'Create a button that shows an alert when clicked!\n\n<button onclick="alert(\'You clicked me!\')">Click Me!</button>',
    hint: 'onclick goes inside the button tag:\n<button onclick="alert(\'Hi!\')">Click!</button>',
    xp: 75,
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Click the Magic Button!</h1>
  <!-- Create a button with onclick here! -->

</body>
</html>`,
    validate: (code) => /<button\b[^>]*onclick\s*=/i.test(code),
    successMessage: "Event handler mastered! Every button, every tap, every swipe on every app uses events just like onclick. You just learned how interactivity works! 🖱️",
  },
  {
    id: 'js-3',
    order: 3,
    titleEmoji: '📦',
    title: 'Variable Power',
    concept: 'A variable stores information you can use later — like a box with a label. Use let to create a variable: let name = "Alex";',
    instruction: 'Create a variable with your name and use it in an alert!\n\nlet myName = "Your Name";\nalert("Hello, " + myName + "!");',
    hint: 'Inside a <script> tag:\nlet myName = "Alex";\nalert("Hello, " + myName);',
    xp: 75,
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Variables!</h1>
  <script>
    // Create your variable here!
    // Then use it in an alert!

  </script>
</body>
</html>`,
    validate: (code) => /\blet\b\s+\w+\s*=/i.test(code) || /\bconst\b\s+\w+\s*=/i.test(code),
    successMessage: "Variable wizard! Variables are the #1 most important concept in ALL programming languages — Python, Java, Swift, they all have variables. You just learned programming! 📦",
  },
  {
    id: 'js-4',
    order: 4,
    titleEmoji: '🤔',
    title: 'If the Shoe Fits',
    concept: 'if/else lets your code make decisions! If something is true, do one thing. Otherwise (else), do another thing. It\'s like the brain of your program.',
    instruction: 'Create a variable with a number. If it\'s bigger than 10, alert "Big number!". Else, alert "Small number!"',
    hint: 'let number = 15;\nif (number > 10) {\n  alert("Big number!");\n} else {\n  alert("Small number!");\n}',
    xp: 100,
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    let number = 15;
    // Write your if/else below!

  </script>
</body>
</html>`,
    validate: (code) => /\bif\s*\(/.test(code) && /\belse\b/.test(code),
    successMessage: "Decision maker! if/else is in EVERY program ever written. Netflix deciding which shows to recommend, games deciding if you won — all if/else. You think like a programmer now! 🤔",
  },
  {
    id: 'js-5',
    order: 5,
    titleEmoji: '🔄',
    title: 'Loop the Loop',
    concept: 'A for loop repeats code multiple times without you writing it again and again! It has a counter that goes up each time.',
    instruction: 'Write a loop that counts from 1 to 5 and adds each number to the page!',
    hint: 'for (let i = 1; i <= 5; i++) {\n  document.body.innerHTML += "<p>" + i + "</p>";\n}',
    xp: 100,
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Counting Loop</h1>
  <script>
    // Write your for loop here!
    // Count from 1 to 5

  </script>
</body>
</html>`,
    validate: (code) => /\bfor\s*\(/.test(code),
    successMessage: "Loop legend! For loops are how computers process millions of things fast. Instagram's feed, Spotify's playlist, TikTok's scroll — all loops. You just learned computer thinking! 🔄",
  },
  {
    id: 'js-6',
    order: 6,
    titleEmoji: '🎭',
    title: 'Change the Page',
    concept: 'document.getElementById() finds an HTML element by its id. Then you can change what\'s inside it using .innerHTML. This is how JavaScript talks to HTML!',
    instruction: 'Click a button to change the text on the page!\n\nfunction changeText() {\n  document.getElementById("message").innerHTML = "Changed!";\n}',
    hint: 'Give your element an id:\n<p id="message">Original text</p>\n<button onclick="changeText()">Change!</button>\n\nThen in script:\nfunction changeText() {\n  document.getElementById("message").innerHTML = "I changed!";\n}',
    xp: 125,
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>Magic Text Changer</h1>
  <p id="message">Click the button to change me!</p>
  <button onclick="changeText()">Change Text!</button>

  <script>
    function changeText() {
      // Change the text of the p with id="message"!

    }
  </script>
</body>
</html>`,
    validate: (code) =>
      /document\.getElementById/i.test(code) &&
      /\.innerHTML\s*=/i.test(code),
    successMessage: "DOM master! You just changed a webpage using JavaScript — this is EXACTLY how every interactive website works. Twitter updating likes, YouTube updating views — all getElementById! 🎭",
  },
  {
    id: 'js-7',
    order: 7,
    titleEmoji: '⚙️',
    title: 'Function Power',
    concept: 'A function is a reusable block of code with a name. You define it once, then call it as many times as you want! Functions are the building blocks of all programs.',
    instruction: 'Write a function called greet that takes a name and alerts "Hello, [name]!". Then call it with your own name!',
    hint: 'function greet(name) {\n  alert("Hello, " + name + "!");\n}\n\ngreet("Alex");',
    xp: 125,
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <script>
    // Write your greet function here!

    // Call it with your name!

  </script>
</body>
</html>`,
    validate: (code) => /function\s+\w+\s*\(/.test(code),
    successMessage: "Function hero! Functions are in every programming language and every app ever built. You now think like a real software engineer — breaking problems into reusable pieces! ⚙️",
  },
  {
    id: 'js-8',
    order: 8,
    titleEmoji: '🏆',
    title: 'Boss Battle: Quiz Game',
    concept: 'Put it all together! Variables, if/else, functions — build a real quiz game that checks if the user answers correctly.',
    instruction: 'Build a quiz with at least ONE question:\n• Use prompt() to ask a question\n• Check the answer with if/else\n• Alert "Correct! 🎉" or "Wrong! Try again!"',
    hint: 'let answer = prompt("What is 2 + 2?");\nif (answer === "4") {\n  alert("Correct! 🎉");\n} else {\n  alert("Wrong! The answer is 4.");\n}',
    xp: 200,
    starterCode: `<!DOCTYPE html>
<html>
<body>
  <h1>My Quiz Game 🎮</h1>
  <button onclick="startQuiz()">Start Quiz!</button>

  <script>
    function startQuiz() {
      // Write your quiz here!
      // Use prompt() to ask a question
      // Use if/else to check the answer

    }
  </script>
</body>
</html>`,
    validate: (code) => {
      const hasPrompt = /\bprompt\s*\(/i.test(code)
      const hasIf = /\bif\s*\(/i.test(code)
      const hasAlert = /\balert\s*\(/i.test(code)
      return hasPrompt && hasIf && hasAlert
    },
    successMessage: "🏆 JAVASCRIPT BOSS DEFEATED! You built a REAL interactive program — a quiz game! Kahoot, Duolingo, Google Forms — they all started just like this. THE JAVASCRIPT WORLD IS YOURS! 🗝️⚡",
  },
]
