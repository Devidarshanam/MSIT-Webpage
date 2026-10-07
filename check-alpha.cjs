const fs = require('fs');
const buffer = fs.readFileSync('public/assets/msit-logo.png');
// PNG signature: 89 50 4E 47 0D 0A 1A 0A
// IHDR chunk: Length (4 bytes), Type 'IHDR' (4 bytes), Width (4), Height (4), Bit depth (1), Color type (1)
// Color type 6 is Truecolor with alpha.
if (buffer[25] === 6 || buffer[25] === 4) {
  console.log('Has alpha channel (transparent)');
} else {
  console.log('No alpha channel (color type: ' + buffer[25] + ')');
}
