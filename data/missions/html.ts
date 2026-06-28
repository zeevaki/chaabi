export interface Mission {
  id: string
  order: number
  titleEmoji: string
  title: string
  concept: string
  instruction: string
  hint: string
  xp: number
  starterCode: string
  validate: (code: string) => boolean
  successMessage: string
}

export const htmlMissions: Mission[] = [
  {
    id: 'html-1',
    order: 1,
    titleEmoji: '👋',
    title: 'Your First Tag',
    concept: 'HTML tags are like labels that tell the browser what to show. Every tag has an opening <tag> and a closing </tag>.',
    instruction: 'Make a big heading that says "Hello World"! Type this in the editor:\n\n<h1>Hello World</h1>',
    hint: 'The h1 tag makes big headings. Make sure you have both <h1> at the start and </h1> at the end!',
    xp: 50,
    starterCode: `<!-- Type your code below! -->
`,
    validate: (code) => /<h1\b[^>]*>[\s\S]*<\/h1>/i.test(code),
    successMessage: "Amazing! You just made your first heading! Every website in the world uses <h1>. You're already a real web developer! 🎉",
  },
  {
    id: 'html-2',
    order: 2,
    titleEmoji: '📄',
    title: 'Page Blueprint',
    concept: 'Every HTML page has a special structure — like a house needs walls, a roof, and a floor. The <html>, <head>, and <body> tags are the blueprint.',
    instruction: 'Build the full blueprint of an HTML page. It needs <html>, <head>, <body>, and inside body add your name in an <h1> tag!',
    hint: 'Your code should look like this structure:\n<html>\n  <head></head>\n  <body>\n    <h1>Your Name</h1>\n  </body>\n</html>',
    xp: 75,
    starterCode: `<!DOCTYPE html>
<!-- Build the page structure below! -->
`,
    validate: (code) =>
      /<html/i.test(code) &&
      /<head/i.test(code) &&
      /<body/i.test(code) &&
      /<h1\b[^>]*>[\s\S]*<\/h1>/i.test(code),
    successMessage: "You built a real webpage blueprint! Every website on the internet starts exactly like this. Professional developers are proud of you! 🏗️",
  },
  {
    id: 'html-3',
    order: 3,
    titleEmoji: '📝',
    title: 'Paragraph Power',
    concept: 'The <p> tag makes paragraphs — blocks of text, just like in a book. You can have as many paragraphs as you want!',
    instruction: 'Add two paragraphs about yourself. Use the <p> tag for each one!',
    hint: 'Each paragraph needs its own <p> and </p> tags:\n<p>I love coding!</p>\n<p>My favorite color is blue.</p>',
    xp: 50,
    starterCode: `<h1>About Me</h1>
<!-- Add your paragraphs below! -->
`,
    validate: (code) => {
      const matches = code.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi)
      return matches !== null && matches.length >= 2
    },
    successMessage: "Perfect! Paragraphs are everywhere on the web — news articles, blogs, Wikipedia — they all use the <p> tag just like you did! 📝",
  },
  {
    id: 'html-4',
    order: 4,
    titleEmoji: '📋',
    title: 'List Maker',
    concept: 'The <ul> tag makes a bullet list (unordered list). Each item in the list uses an <li> tag. Lists are everywhere on websites!',
    instruction: 'Make a list of 3 of your favorite things! Use <ul> for the list and <li> for each item.',
    hint: 'A list looks like this:\n<ul>\n  <li>Pizza</li>\n  <li>Games</li>\n  <li>Music</li>\n</ul>',
    xp: 75,
    starterCode: `<h1>My Favorite Things</h1>
<!-- Make your list below! -->
`,
    validate: (code) => {
      const hasUl = /<ul\b[^>]*>/i.test(code)
      const liMatches = code.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi)
      return hasUl && liMatches !== null && liMatches.length >= 3
    },
    successMessage: "List master! Shopping lists, to-do apps, menus — they all use <ul> and <li>. You just learned one of the most used HTML tags! 📋",
  },
  {
    id: 'html-5',
    order: 5,
    titleEmoji: '🔗',
    title: 'Magic Links',
    concept: 'The <a> tag creates links — those blue underlined words you click to go to other pages! The href attribute tells it where to go.',
    instruction: 'Create a link to your favorite website! Use: <a href="https://www.google.com">Visit Google</a>',
    hint: 'The a tag needs an href attribute:\n<a href="https://website.com">Click here!</a>',
    xp: 75,
    starterCode: `<h1>My Favorite Sites</h1>
<!-- Add your link below! -->
`,
    validate: (code) => /<a\b[^>]*href\s*=\s*["'][^"']*["'][^>]*>[\s\S]*?<\/a>/i.test(code),
    successMessage: "You just created a hyperlink — the thing that makes the World Wide Web work! Every link on every website uses the <a> tag you just learned! 🔗",
  },
  {
    id: 'html-6',
    order: 6,
    titleEmoji: '🖼️',
    title: 'Picture This',
    concept: 'The <img> tag shows images on your page! It needs a src (the image address) and an alt (a description for people who can\'t see it).',
    instruction: 'Add an image of a cat! Use:\n<img src="https://placekitten.com/300/200" alt="A cute cat">',
    hint: 'The img tag is special — it has no closing tag!\n<img src="image-url" alt="description">',
    xp: 100,
    starterCode: `<h1>My Photo Gallery</h1>
<!-- Add your image below! -->
`,
    validate: (code) => /<img\b[^>]*src\s*=\s*["'][^"']*["'][^>]*alt\s*=\s*["'][^"']*["']/i.test(code) ||
      /<img\b[^>]*alt\s*=\s*["'][^"']*["'][^>]*src\s*=\s*["'][^"']*["']/i.test(code),
    successMessage: "You added an image! The alt text you wrote helps blind users understand what's in the picture — you just made your website more accessible! Amazing! 🖼️",
  },
  {
    id: 'html-7',
    order: 7,
    titleEmoji: '✨',
    title: 'Bold & Beautiful',
    concept: '<strong> makes text bold and important. <em> makes text italic and emphasized. Use them to make your writing pop!',
    instruction: 'Write a sentence using both <strong> for a bold word AND <em> for an italic word.',
    hint: 'Example:\n<p>I <strong>love</strong> coding and it is <em>amazing</em>!</p>',
    xp: 50,
    starterCode: `<h1>My Story</h1>
<p><!-- Add your sentence with strong and em below! --></p>
`,
    validate: (code) =>
      /<strong\b[^>]*>[\s\S]*?<\/strong>/i.test(code) &&
      /<em\b[^>]*>[\s\S]*?<\/em>/i.test(code),
    successMessage: "Text formatting! Publishers and writers have been using bold and italic for centuries — now you're using the web version. Style master! ✨",
  },
  {
    id: 'html-8',
    order: 8,
    titleEmoji: '🏆',
    title: 'Boss Battle: My Profile Page',
    concept: 'Use EVERYTHING you learned! A heading, a paragraph, a list, a link, and an image — all on one page!',
    instruction: 'Build your own profile page! It must have:\n• An <h1> with your name\n• A <p> about yourself\n• A <ul> list of your hobbies\n• An <a> link to a site you like\n• An <img> of something cool',
    hint: 'Put it all together — h1, p, ul with li items, a with href, and img with src and alt.',
    xp: 200,
    starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My Profile</title>
</head>
<body>
  <!-- Build your profile page here! Use h1, p, ul, a, and img -->

</body>
</html>`,
    validate: (code) => {
      const hasH1 = /<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(code)
      const hasP = /<p\b[^>]*>[\s\S]*?<\/p>/i.test(code)
      const hasUl = /<ul\b[^>]*>/i.test(code)
      const hasLi = /<li\b[^>]*>[\s\S]*?<\/li>/i.test(code)
      const hasA = /<a\b[^>]*href/i.test(code)
      const hasImg = /<img\b[^>]*src/i.test(code)
      return hasH1 && hasP && hasUl && hasLi && hasA && hasImg
    },
    successMessage: "🏆 BOSS DEFEATED! You built a REAL WEBPAGE from scratch! Share this link — you're officially a web developer now! The HTML World is YOURS! 🗝️",
  },
]
