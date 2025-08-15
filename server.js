import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const CSV_FILES = [
  { file: 'Part 1.csv', part: 'part1' },
  { file: 'Part 2a.csv', part: 'part2a' },
  { file: 'Part 2b.csv', part: 'part2b' }
];
const DB_FILE = 'questions.json';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(cell);
        cell = '';
      } else if (ch === '\r') {
        // ignore
      } else if (ch === '\n') {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += ch;
      }
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const header = rows.shift();
  return rows.map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

function loadData() {
  if (fs.existsSync(DB_FILE)) {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  }
  const data = { part1: [], part2a: [], part2b: [] };
  for (const { file, part } of CSV_FILES) {
    const csv = fs.readFileSync(file, 'utf8');
    const rows = parseCsv(csv);
    for (const r of rows) {
      data[part].push({
        id: r['Question ID'],
        maxMarks: Number(r['max_marks']),
        question: r['full_question'],
        solution: r['solution'],
        studentAnswer: r['student_answer'],
        correctMark: Number(r['Correct marks']),
        aiMark: Number(r['AI Marks']),
        aiConfidence: r['AI mark label'],
        stagedExplanation: r["AI Marker's Staged Explanation"],
        summaryExplanation: r["AI Marker's Summarised Explanation"],
        rubricJson: r['rubric_json'],
        markingGuideline: r['extracted_marking_guideline']
      });
    }
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  return data;
}

const questions = loadData();

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  if (parsed.pathname === '/questions') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(questions));
    return;
  }
  let pathname = '.' + (parsed.pathname === '/' ? '/index.html' : parsed.pathname);
  fs.readFile(pathname, (err, content) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    const ext = path.extname(pathname);
    const types = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css'
    };
    res.setHeader('Content-Type', types[ext] || 'text/plain');
    res.end(content);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));
