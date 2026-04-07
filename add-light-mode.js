const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
  // Backgrounds
  '(?<!dark:)bg-neutral-950': 'bg-neutral-50 dark:bg-neutral-950',
  '(?<!dark:)bg-neutral-900': 'bg-white dark:bg-neutral-900',
  '(?<!dark:)bg-neutral-800': 'bg-neutral-100 dark:bg-neutral-800',
  // Text
  '(?<!dark:)text-neutral-100': 'text-neutral-900 dark:text-neutral-100',
  '(?<!dark:)text-neutral-200': 'text-neutral-800 dark:text-neutral-200',
  '(?<!dark:)text-neutral-300': 'text-neutral-700 dark:text-neutral-300',
  '(?<!dark:)text-neutral-400': 'text-neutral-600 dark:text-neutral-400',
  '(?<!dark:)text-neutral-500': 'text-neutral-500 dark:text-neutral-500', // Sometimes used as secondary
  // Borders
  '(?<!dark:)border-neutral-800': 'border-neutral-200 dark:border-neutral-800',
  '(?<!dark:)border-neutral-700': 'border-neutral-200 dark:border-neutral-700',
  '(?<!dark:)border-neutral-600': 'border-neutral-300 dark:border-neutral-600',
  // Hover Backgrounds
  '(?<!dark:)hover:bg-neutral-800': 'hover:bg-neutral-200 dark:hover:bg-neutral-800',
  '(?<!dark:)hover:bg-neutral-700': 'hover:bg-neutral-200 dark:hover:bg-neutral-700',
  // Hover Texts
  '(?<!dark:)hover:text-neutral-100': 'hover:text-neutral-900 dark:hover:text-neutral-100',
  '(?<!dark:)hover:text-neutral-200': 'hover:text-neutral-800 dark:hover:text-neutral-200',
  '(?<!dark:)hover:text-neutral-300': 'hover:text-neutral-700 dark:hover:text-neutral-300',
  // Hover Borders
  '(?<!dark:)hover:border-neutral-700': 'hover:border-neutral-300 dark:hover:border-neutral-700',
  '(?<!dark:)hover:border-neutral-600': 'hover:border-neutral-400 dark:hover:border-neutral-600',
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walkDir(srcDir);

files.forEach(file => {
  // Skip App.js and Navbar.js as they might be manually tweaked well
  if (file.endsWith('App.js') || file.endsWith('Navbar.js') || file.endsWith('ThemeContext.js') || file.endsWith('index.css')) {
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  Object.entries(replacements).forEach(([regexStr, replacement]) => {
    const regex = new RegExp(regexStr, 'g');
    content = content.replace(regex, replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
