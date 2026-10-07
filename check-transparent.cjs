const fs = require('fs');
function hasTransparentPixels(file) {
  const buf = fs.readFileSync(file);
  // Extremely rudimentary check if it's a PNG and has alpha
  if (buf[25] !== 6 && buf[25] !== 4) return false;
  // Let's just assume we can't easily parse IDAT chunks in pure JS without zlib.
  // We'll use a simpler approach.
}
