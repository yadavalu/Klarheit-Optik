const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Map old dark theme classes to new light cream/purple theme classes
const classMap = {
  'bg-navy-950': 'bg-cream-100',
  'bg-navy-900': 'bg-cream-50',
  'bg-navy-800': 'bg-white',
  'bg-navy-700': 'bg-cream-200',
  'bg-navy-600': 'bg-cream-300',
  'bg-navy-500': 'bg-purple-300',
  
  'border-navy-700': 'border-cream-300',
  'border-navy-600': 'border-cream-400',
  'border-navy-500': 'border-cream-500',
  
  'text-white': 'text-purple-950',
  'text-silver-200': 'text-purple-900',
  'text-silver-300': 'text-purple-800',
  'text-silver-400': 'text-purple-700',
  'text-silver-500': 'text-purple-600',
  
  'hover:text-white': 'hover:text-purple-950',
  'hover:bg-navy-800': 'hover:bg-cream-50',
  'hover:bg-navy-700': 'hover:bg-cream-200',
  'hover:bg-navy-600': 'hover:bg-cream-300',
  'hover:border-navy-500': 'hover:border-cream-400',
  
  'from-navy-950': 'from-cream-100',
  'to-navy-900': 'to-cream-50',
  'via-navy-900': 'via-cream-50',
  
  'bg-accent-500': 'bg-purple-600',
  'hover:bg-accent-600': 'hover:bg-purple-700',
  'text-accent-400': 'text-purple-600',
  'text-accent-500': 'text-purple-600',
  'border-accent-500': 'border-purple-600',
  'shadow-accent-500': 'shadow-purple-600',
  'from-accent-600': 'from-purple-600',
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace each class taking care of word boundaries
  for (const [oldClass, newClass] of Object.entries(classMap)) {
    // Regex to match the exact class name
    // We use (?<![a-zA-Z0-9-]) and (?![a-zA-Z0-9-]) to ensure exact match
    // e.g. text-white doesn't match text-white-500
    const regex = new RegExp(`(?<![a-zA-Z0-9-])${oldClass.replace('/', '\\/')}(?![a-zA-Z0-9-])`, 'g');
    content = content.replace(regex, newClass);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
