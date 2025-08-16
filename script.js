// --- helpers to render HTML + MathJax safely and naturally ---

// Escape for <pre> blocks (no HTML, no <br> insertion)
function escapeHTML(s = "") {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Split text into math vs non-math segments so we only add <br> outside math.
// Supports $$...$$, $...$, \[...\], \(...\)
function splitByMathSegments(text) {
  const mathRE = /(\$\$[\s\S]*?\$\$|\$[^$\n]*?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
  return text.split(mathRE);
}

// Convert markdown-style images, then insert <br> for newlines,
// BUT never inside MathJax segments
function formatText(t) {
  const raw = (t || "").replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img src="$2" alt="$1" loading="lazy">'
  );

  const withBreaksOutsideMath = splitByMathSegments(raw)
    .map(seg => {
      if (!seg) return "";
      // If this segment starts with a math delimiter, keep it verbatim.
      if (
        seg.startsWith("$$") ||
        seg.startsWith("$") ||
        seg.startsWith("\\[") ||
        seg.startsWith("\\(")
      ) {
        return seg;
      }
      // Windows + Unix newlines -> <br>
      return seg.replace(/\r?\n/g, "<br>");
    })
    .join("");

  // Sanitize resulting HTML (allows normal inline tags, strips unsafe)
  return DOMPurify.sanitize(withBreaksOutsideMath);
}