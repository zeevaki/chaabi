import type { Mission } from './html'

export const cssMissions: Mission[] = [
  {
    id: 'css-1',
    order: 1,
    titleEmoji: '🎨',
    title: 'Color Me Happy',
    concept: 'CSS is the language that makes websites beautiful! The color property changes the text color. You write CSS inside <style> tags.',
    instruction: 'Change the heading color to your favorite color! Add this to your page:\n\n<style>\n  h1 { color: purple; }\n</style>',
    hint: 'Put your <style> tag in the <head> section. You can use color names like red, blue, green, or codes like #FF5733.',
    xp: 50,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <!-- Add your style tag here! -->
</head>
<body>
  <h1>Hello, World!</h1>
  <p>I am learning CSS!</p>
</body>
</html>`,
    validate: (code) => /<style[\s\S]*?color\s*:/i.test(code),
    successMessage: "You added color! Every colorful website in the world uses the 'color' property you just learned. You're painting the web! 🎨",
  },
  {
    id: 'css-2',
    order: 2,
    titleEmoji: '🌈',
    title: 'Background Blast',
    concept: 'The background-color property fills the background with color. You can make your whole page or just one element have a colored background!',
    instruction: 'Give your page a background color! Add background-color to the body in your CSS.',
    hint: 'In your <style> tag:\nbody { background-color: lightblue; }\n\nOr try: navy, gold, hotpink, or any color!',
    xp: 50,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add background-color to body here! */
    h1 {
      color: white;
    }
  </style>
</head>
<body>
  <h1>My Colorful Page</h1>
</body>
</html>`,
    validate: (code) => /background-color\s*:/i.test(code),
    successMessage: "Background power! That background-color you set? Every website with a colored background uses exactly that. Instagram, TikTok, YouTube — all CSS! 🌈",
  },
  {
    id: 'css-3',
    order: 3,
    titleEmoji: '🔤',
    title: 'Font Fantastic',
    concept: 'font-size makes text bigger or smaller. font-family changes the style of the letters (like Arial, Georgia, or Comic Sans).',
    instruction: 'Make your heading BIG (font-size: 48px) and change its font (font-family: Arial)!',
    hint: 'In your style:\nh1 {\n  font-size: 48px;\n  font-family: Arial;\n}',
    xp: 75,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Make h1 big with font-size and change font-family! */
  </style>
</head>
<body>
  <h1>I Am Getting Bigger!</h1>
  <p>Normal text stays normal.</p>
</body>
</html>`,
    validate: (code) => /font-size\s*:/i.test(code) && /font-family\s*:/i.test(code),
    successMessage: "Typography master! Choosing fonts and sizes is one of the most important design skills. Now you can make text look exactly how you want! 🔤",
  },
  {
    id: 'css-4',
    order: 4,
    titleEmoji: '📦',
    title: 'The Magic Box',
    concept: 'padding adds space INSIDE an element (between content and border). margin adds space OUTSIDE (between elements). Together they control spacing!',
    instruction: 'Give a paragraph 20px of padding and 30px of margin to see the difference!',
    hint: 'p {\n  padding: 20px;\n  margin: 30px;\n  background-color: lightyellow;\n}',
    xp: 75,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add padding and margin to p */
  </style>
</head>
<body>
  <p>I have padding inside me!</p>
  <p>I have margin outside me!</p>
</body>
</html>`,
    validate: (code) => /padding\s*:/i.test(code) && /margin\s*:/i.test(code),
    successMessage: "Box model unlocked! Padding and margin are how every website controls spacing. Now you understand what makes layouts look clean and professional! 📦",
  },
  {
    id: 'css-5',
    order: 5,
    titleEmoji: '🖼️',
    title: 'Border Magic',
    concept: 'The border property adds a frame around elements. You can control border-width, border-style (solid, dashed, dotted), and border-color!',
    instruction: 'Add a solid border around a paragraph: border: 3px solid gold;',
    hint: 'p {\n  border: 3px solid gold;\n  padding: 10px;\n}\n\nTry changing solid to dashed or dotted!',
    xp: 50,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add a border to p */
  </style>
</head>
<body>
  <p>Put a border around me!</p>
</body>
</html>`,
    validate: (code) => /border\s*:/i.test(code),
    successMessage: "Borders everywhere! Cards, buttons, images — they all use borders. Now you can frame anything on a webpage! 🖼️",
  },
  {
    id: 'css-6',
    order: 6,
    titleEmoji: '🧲',
    title: 'Flex Your Skills',
    concept: 'Flexbox is CSS magic for arranging things in a row or column. display: flex turns on flexbox. It is how most modern layouts are built!',
    instruction: 'Put 3 colored boxes side by side using flexbox! Add display: flex to the container.',
    hint: '.container {\n  display: flex;\n  gap: 10px;\n}\n.box {\n  width: 100px;\n  height: 100px;\n  background: coral;\n}',
    xp: 100,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add display: flex to .container */
    .box {
      width: 100px;
      height: 100px;
      background-color: coral;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
  </div>
</body>
</html>`,
    validate: (code) => /display\s*:\s*flex/i.test(code),
    successMessage: "Flexbox wizard! This is the single most used CSS feature in modern web development. Every app you use on your phone — their layouts are flexbox! 🧲",
  },
  {
    id: 'css-7',
    order: 7,
    titleEmoji: '🎯',
    title: 'Center of Attention',
    concept: 'Centering things used to be hard in CSS — but not anymore! With flexbox, justify-content: center centers horizontally, align-items: center centers vertically.',
    instruction: 'Center a box perfectly in the middle of the screen using flexbox!',
    hint: 'body {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}',
    xp: 100,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      /* Center the box here! */
    }
    .box {
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, gold, orange);
      border-radius: 20px;
    }
  </style>
</head>
<body>
  <div class="box">I am centered! ✨</div>
</body>
</html>`,
    validate: (code) =>
      /justify-content\s*:\s*center/i.test(code) &&
      /align-items\s*:\s*center/i.test(code),
    successMessage: "Perfect centering! This exact trick is used by every professional web developer in the world. You just learned one of the most Googled CSS tricks! 🎯",
  },
  {
    id: 'css-8',
    order: 8,
    titleEmoji: '🏆',
    title: 'Boss Battle: Style My Profile',
    concept: 'Use ALL your CSS skills to make a beautiful profile card! Colors, fonts, padding, borders, and flexbox.',
    instruction: 'Create a styled profile card with:\n• A background color\n• A border or border-radius (rounded corners)\n• Different font sizes\n• Padding and margin\n• At least one color',
    hint: 'Try: border-radius: 20px for rounded corners!\nbackground-color + padding + color + font-size + border',
    xp: 200,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background-color: #1a0533;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: Arial, sans-serif;
    }
    /* Style the .card below! */
    .card {
      /* Your styles here! */
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>My Name</h1>
    <p>Future Web Developer 🚀</p>
    <p>I love coding!</p>
  </div>
</body>
</html>`,
    validate: (code) => {
      const hasColor = /color\s*:/i.test(code)
      const hasBg = /background/i.test(code)
      const hasPadding = /padding\s*:/i.test(code)
      const hasFontSize = /font-size\s*:/i.test(code)
      return hasColor && hasBg && hasPadding && hasFontSize
    },
    successMessage: "🏆 CSS BOSS DEFEATED! You styled a real card component — the same kind used by Instagram profiles, Twitter cards, and LinkedIn! The CSS World is YOURS! 🗝️",
  },
]
