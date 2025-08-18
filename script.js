// Core data for questions
let questionDB = null;
let questions = [];

const startBtn = document.getElementById("start-btn");
const nameInput = document.getElementById("user-name");
let dataLoaded = false;

function checkReady() {
  startBtn.disabled = !(dataLoaded && nameInput.value.trim());
}

checkReady();

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const header = rows.shift();
  return rows.map(r => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

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

async function loadQuestions() {
  try {
    let csvRes;
    try {
      csvRes = await fetch('Part 1.csv');
      if (!csvRes.ok) throw new Error('Status ' + csvRes.status);
    } catch {
      const base = window.location.origin === 'null' ? 'http://localhost:3000' : '';
      csvRes = await fetch(base + '/Part%201.csv');
    }
    let csvText = await csvRes.text();
    csvText = csvText.replace(/\r?\nAI Marker's Summarised Explanation/, "AI Marker's Summarised Explanation");
    const rows = parseCsv(csvText);
    const part1 = rows.map(r => ({
      id: r['Question ID'],
      maxMarks: Number(r['max_marks']),
      question: r['full_question'],
      solution: r['solution'],
      studentAnswer: r['student_answer'],
      correctMark: Number(r['Correct marks']),
      aiMark: Number(r['AI Marks']),
      aiConfidence: r['AI mark label'] || r['AI Confidence'],
      stagedExplanation: r["AI Marker's Staged Explanation"],
      summaryExplanation: r["AI Marker's Summarised Explanation"],
      rubricJson: r['rubric_json'],
      markingGuideline: r['extracted_marking_guideline']
    }));

    let res;
    try {
      res = await fetch('questions.json');
      if (!res.ok) throw new Error('Status ' + res.status);
    } catch {
      const base = window.location.origin === 'null' ? 'http://localhost:3000' : '';
      res = await fetch(base + '/questions');
    }
    const db = await res.json();
    questionDB = { ...db, part1 };
    questions = part1.map(q => ({ ...q, part: "1", explanationType: 'both' }));
    dataLoaded = true;
  } catch (e) {
    console.error('Failed to load questions', e);
  } finally {
    checkReady();
  }
}

nameInput.addEventListener('input', checkReady);
loadQuestions();

let current = 0;
let results = [];
let timerInterval;
let timeLeft = 0;
let part1SummaryShown = false;
let questionStartTime;
let currentRecord;
let userName = "";
let selectedVariant = null;
let part2Boundary = null;
let partOrder = [];

const intro = document.getElementById("intro");
const timerDiv = document.getElementById("timer");
const mainDiv = document.getElementById("main");
const qContainer = document.getElementById("question-container");
const ctaContainer = document.getElementById("cta-container");
const explanationDiv = document.getElementById("explanation-container");
const summaryDiv = document.getElementById("summary");
const variantPicker = document.getElementById("variant-picker");

function setActionCard(innerHtml) {
  ctaContainer.innerHTML = `<div class="action-card">${innerHtml}</div>`;
  typeset(ctaContainer);
}

function typeset(element) {
  if (window.MathJax?.typesetPromise) {
    MathJax.typesetPromise(element ? [element] : undefined);
  }
}

function startStudy() {
  userName = nameInput.value.trim() || "Anonymous";
  intro.classList.add("hidden");
  variantPicker.classList.remove("hidden");
}

document.getElementById("start-btn").addEventListener("click", startStudy);

variantPicker.querySelectorAll('button').forEach(btn => {
  btn.onclick = () => {
    selectedVariant = btn.getAttribute('data-variant');
    variantPicker.classList.add('hidden');
    renderQuestion();
  };
});

function renderQuestion() {
  if (current === 8 && !part1SummaryShown) {
    part1SummaryShown = true;
    showPartSummary(1);
    return;
  }
  if (current >= questions.length) {
    endStudy();
    return;
  }
  const q = questions[current];
  // Start separate 15-minute timers for Parts 2a and 2b
  if (q.part !== "1" && timeLeft === 0) startTimer(15 * 60);

  questionStartTime = Date.now();
  currentRecord = {
    user: userName,
    questionId: q.id,
    part: q.part,
    maxMarks: q.maxMarks,
    explanationType: q.explanationType,
    question: q.question,
    solution: q.solution,
    studentAnswer: q.studentAnswer,
    goldMark: q.correctMark ?? q.goldMark,
    actions: [],
  };
  qContainer.classList.remove("hidden");
  qContainer.innerHTML = `
    <h2>Question ${q.id} (Part ${q.part})</h2>
    <p><strong>Question:</strong> ${formatText(q.question)}</p>
    <p><strong>Solution:</strong> ${formatText(q.solution)}</p>
    <p><strong>Student Answer:</strong> ${formatText(q.studentAnswer)}</p>
    <p><strong>Max Marks:</strong> ${q.maxMarks}</p>
  `;
  typeset(qContainer);

  setActionCard(`
      <p>Choose how you want to mark this question</p>
      <button id="self-mark">Mark Myself</button>
      <button id="ai-mark">Use AI</button>
    `);
  explanationDiv.innerHTML = "";
  explanationDiv.classList.add("hidden");
  mainDiv.classList.remove("hidden");

  document.getElementById("self-mark").onclick = () => {
    currentRecord.actions.push({ action: "mark_myself", time: Date.now() - questionStartTime });
    handleSelfMark(q);
  };
  document.getElementById("ai-mark").onclick = () => {
    currentRecord.actions.push({ action: "ai_mark", time: Date.now() - questionStartTime });
    handleAIMark(q);
  };
}

function goToNextQuestion() {
  current++;
  if (part2Boundary !== null && current === part2Boundary) {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft = 0;
    timerDiv.classList.add("hidden");
    showNextPartPrompt();
  } else {
    renderQuestion();
  }
}

function handleSelfMark(q) {
  setActionCard(`
    <p>Enter your mark:</p>
    <input type="number" id="mark-input" min="0" max="${q.maxMarks}" />
    <button id="submit-mark">Submit</button>
  `);
  const markInput = document.getElementById("mark-input");

  document.getElementById("submit-mark").onclick = () => {
    currentRecord.actions.push({ action: "submit", time: Date.now() - questionStartTime });
    const mark = Number(markInput.value);
    if (isNaN(mark)) return alert("Enter a mark");
    currentRecord.choice = "self";
    currentRecord.finalMark = mark;

    if (q.part === "1") {
      const ai = getAi(q);
      currentRecord.aiMark = ai.aiMark;
      currentRecord.aiConfidence = ai.confidence;
      setActionCard(`
          <p><strong>AI Mark:</strong> ${ai.aiMark} / ${q.maxMarks}</p>
          <p><strong>Confidence:</strong> ${ai.confidence}</p>
          <button id="view-staged">View Staged Explanation</button>
          <button id="view-summary">View Summary Explanation</button>
          <button id="next-q">Next</button>
          `);
      explanationDiv.innerHTML = `<div id="staged-exp" class="hidden"></div><div id="summary-exp" class="hidden"></div>`;
      explanationDiv.classList.add("hidden");
      const stagedBtn = document.getElementById("view-staged");
      const summaryBtn = document.getElementById("view-summary");
      const stagedExp = document.getElementById("staged-exp");
      const summaryExp = document.getElementById("summary-exp");
      let viewedStaged = false;
      let viewedSummary = false;
      let stagedVisible = false;
      let summaryVisible = false;

      stagedBtn.onclick = () => {
        const t = Date.now() - questionStartTime;
        if (stagedVisible) {
          currentRecord.actions.push({ action: "hide_staged_explanation", time: t });
          stagedExp.classList.add("hidden");
          stagedBtn.textContent = "View Staged Explanation";
          stagedVisible = false;
        } else {
          currentRecord.actions.push({ action: "view_staged_explanation", time: t });
          stagedExp.innerHTML = getExplanation(q, "staged");
          stagedExp.classList.remove("hidden");
          stagedBtn.textContent = "Hide Staged Explanation";
          stagedVisible = true;
          summaryExp.classList.add("hidden");
          summaryBtn.textContent = "View Summary Explanation";
          summaryVisible = false;
          explanationDiv.classList.remove("hidden");
          typeset(stagedExp);
          viewedStaged = true;
        }
        if (!stagedVisible && !summaryVisible) {
          explanationDiv.classList.add("hidden");
        }
      };

      summaryBtn.onclick = () => {
        const t = Date.now() - questionStartTime;
        if (summaryVisible) {
          currentRecord.actions.push({ action: "hide_summary_explanation", time: t });
          summaryExp.classList.add("hidden");
          summaryBtn.textContent = "View Summary Explanation";
          summaryVisible = false;
        } else {
          currentRecord.actions.push({ action: "view_summary_explanation", time: t });
          summaryExp.innerHTML = getExplanation(q, "summary");
          summaryExp.classList.remove("hidden");
          summaryBtn.textContent = "Hide Summary Explanation";
          summaryVisible = true;
          stagedExp.classList.add("hidden");
          stagedBtn.textContent = "View Staged Explanation";
          stagedVisible = false;
          explanationDiv.classList.remove("hidden");
          typeset(summaryExp);
          viewedSummary = true;
        }
        if (!stagedVisible && !summaryVisible) {
          explanationDiv.classList.add("hidden");
        }
      };
      document.getElementById("next-q").onclick = () => {
        currentRecord.viewedStagedExplanation = viewedStaged;
        currentRecord.viewedSummaryExplanation = viewedSummary;
        currentRecord.viewedExplanation = viewedStaged || viewedSummary;
        currentRecord.timeTaken = (Date.now() - questionStartTime) / 1000;
        results.push(currentRecord);
        goToNextQuestion();
      };
    } else {
      const ai = getAi(q);
      currentRecord.aiMark = ai.aiMark;
      currentRecord.aiConfidence = ai.confidence;
      currentRecord.timeTaken = (Date.now() - questionStartTime) / 1000;
      results.push(currentRecord);
      goToNextQuestion();
    }
  };
}

function handleAIMark(q) {
  const ai = getAi(q);
  currentRecord.choice = "ai";
  currentRecord.aiMark = ai.aiMark;
  currentRecord.aiConfidence = ai.confidence;

  setActionCard(`
    <p><strong>AI Mark:</strong> ${ai.aiMark} / ${q.maxMarks}</p>
    <p><strong>Confidence:</strong> ${ai.confidence}</p>
    <label>Final mark: <input type="number" id="final-mark" min="0" max="${q.maxMarks}" value="${ai.aiMark}" /></label>
    ${
      q.part === "1"
        ? `<button id="view-staged">View Staged Explanation</button>
           <button id="view-summary">View Summary Explanation</button>`
        : `<button id="view-exp">View Explanation</button>`
    }
    <button id="submit-mark">Submit</button>
    `);

  if (q.part === "1") {
    explanationDiv.innerHTML = `<div id="staged-exp" class="hidden"></div><div id="summary-exp" class="hidden"></div>`;
    explanationDiv.classList.add("hidden");
    const stagedBtn = document.getElementById("view-staged");
    const summaryBtn = document.getElementById("view-summary");
    const stagedExp = document.getElementById("staged-exp");
    const summaryExp = document.getElementById("summary-exp");
    let viewedStaged = false;
    let viewedSummary = false;
    let stagedVisible = false;
    let summaryVisible = false;

    stagedBtn.onclick = () => {
      const t = Date.now() - questionStartTime;
      if (stagedVisible) {
        currentRecord.actions.push({ action: "hide_staged_explanation", time: t });
        stagedExp.classList.add("hidden");
        stagedBtn.textContent = "View Staged Explanation";
        stagedVisible = false;
      } else {
        currentRecord.actions.push({ action: "view_staged_explanation", time: t });
        stagedExp.innerHTML = getExplanation(q, "staged");
        stagedExp.classList.remove("hidden");
        stagedBtn.textContent = "Hide Staged Explanation";
        stagedVisible = true;
        summaryExp.classList.add("hidden");
        summaryBtn.textContent = "View Summary Explanation";
        summaryVisible = false;
        explanationDiv.classList.remove("hidden");
        typeset(stagedExp);
        viewedStaged = true;
      }
      if (!stagedVisible && !summaryVisible) {
        explanationDiv.classList.add("hidden");
      }
    };

    summaryBtn.onclick = () => {
      const t = Date.now() - questionStartTime;
      if (summaryVisible) {
        currentRecord.actions.push({ action: "hide_summary_explanation", time: t });
        summaryExp.classList.add("hidden");
        summaryBtn.textContent = "View Summary Explanation";
        summaryVisible = false;
      } else {
        currentRecord.actions.push({ action: "view_summary_explanation", time: t });
        summaryExp.innerHTML = getExplanation(q, "summary");
        summaryExp.classList.remove("hidden");
        summaryBtn.textContent = "Hide Summary Explanation";
        summaryVisible = true;
        stagedExp.classList.add("hidden");
        stagedBtn.textContent = "View Staged Explanation";
        stagedVisible = false;
        explanationDiv.classList.remove("hidden");
        typeset(summaryExp);
        viewedSummary = true;
      }
      if (!stagedVisible && !summaryVisible) {
        explanationDiv.classList.add("hidden");
      }
    };
    document.getElementById("submit-mark").onclick = () => {
      currentRecord.actions.push({ action: "submit", time: Date.now() - questionStartTime });
      const finalMark = Number(document.getElementById("final-mark").value);
      if (isNaN(finalMark)) return alert("Enter a mark");
      currentRecord.viewedStagedExplanation = viewedStaged;
      currentRecord.viewedSummaryExplanation = viewedSummary;
      currentRecord.viewedExplanation = viewedStaged || viewedSummary;
      currentRecord.finalMark = finalMark;
      currentRecord.delegated = finalMark === ai.aiMark;
      currentRecord.timeTaken = (Date.now() - questionStartTime) / 1000;
      results.push(currentRecord);
      goToNextQuestion();
    };
  } else {
    explanationDiv.classList.add("hidden");
    let viewedExplanation = false;
    document.getElementById("view-exp").onclick = () => {
      currentRecord.actions.push({ action: "view_explanation", time: Date.now() - questionStartTime });
      explanationDiv.innerHTML = getExplanation(q);
      explanationDiv.classList.remove("hidden");
      typeset(explanationDiv);
      viewedExplanation = true;
    };
    document.getElementById("submit-mark").onclick = () => {
      currentRecord.actions.push({ action: "submit", time: Date.now() - questionStartTime });
      const finalMark = Number(document.getElementById("final-mark").value);
      if (isNaN(finalMark)) return alert("Enter a mark");
      currentRecord.viewedExplanation = viewedExplanation;
      currentRecord.finalMark = finalMark;
      currentRecord.delegated = finalMark === ai.aiMark;
      currentRecord.timeTaken = (Date.now() - questionStartTime) / 1000;
      results.push(currentRecord);
      goToNextQuestion();
    };
  }
}

function getAi(q) {
  return { aiMark: q.aiMark, confidence: q.aiConfidence };
}

function getExplanation(q, type = q.explanationType) {
  if (type === "summary") {
    return `<p>${formatText(q.summaryExplanation)}</p>`;
  }
  const rubric = q.rubricJson ? `<pre>${escapeHTML(q.rubricJson)}</pre>` : "";
  const guideline = q.markingGuideline ? `<pre>${escapeHTML(q.markingGuideline)}</pre>` : "";
  return `<p>${formatText(q.stagedExplanation)}</p>${rubric}${guideline}`;
}

function showPartSummary(part, final = false) {
  mainDiv.classList.add("hidden");
  explanationDiv.classList.add("hidden");

  const partResults = results.filter(r => {
    if (part === 2) return String(r.part).startsWith("2");
    return String(r.part) === String(part);
  });
  const rows = partResults
    .map(r => {
      const aiMark = r.aiMark !== undefined ? r.aiMark : "-";
      const correct = r.finalMark === r.goldMark ? "✅" : "❌";
      return `<tr><td>${r.questionId}</td><td>${r.finalMark}</td><td>${aiMark}</td><td>${r.goldMark}</td><td>${correct}</td></tr>`;
    })
    .join("");
  const correctCount = partResults.filter(r => r.finalMark === r.goldMark).length;
  let html = `
    <h2>Part ${part} Complete</h2>
    <table>
      <tr><th>QID</th><th>Your Mark</th><th>AI Mark</th><th>Gold Mark</th><th>Correct</th></tr>
      ${rows}
    </table>
    <p>Accuracy: ${correctCount} / ${partResults.length}</p>
  `;
  if (final) {
    const totalCorrect = results.filter(r => r.finalMark === r.goldMark).length;
    html += `<p>Total accuracy: ${totalCorrect} / ${results.length}</p>`;
    html += `<pre>${escapeHTML(JSON.stringify(results, null, 2))}</pre>`;
  }
  summaryDiv.innerHTML = html;
  summaryDiv.classList.remove("hidden");
  typeset(summaryDiv);
  if (!final && part === 1) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Start Part 2";
    nextBtn.onclick = () => {
      summaryDiv.classList.add("hidden");
      setupPart2(selectedVariant);
    };
    summaryDiv.appendChild(nextBtn);
  }
}

function showNextPartPrompt() {
  const currentPart = partOrder[0];
  const nextPart = partOrder[1];
  mainDiv.classList.add("hidden");
  qContainer.classList.add("hidden");
  explanationDiv.classList.add("hidden");
  summaryDiv.innerHTML = `<h2>Part ${currentPart} Complete</h2>`;
  const nextBtn = document.createElement("button");
  nextBtn.textContent = `Start Part ${nextPart}`;
  nextBtn.onclick = () => {
    summaryDiv.classList.add("hidden");
    renderQuestion();
  };
  summaryDiv.appendChild(nextBtn);
  summaryDiv.classList.remove("hidden");
  typeset(summaryDiv);
}

function setupPart2(label) {
  const config = {
    L1: { order: ["part2a", "part2b"], types: { part2a: "staged", part2b: "summary" } },
    L2: { order: ["part2a", "part2b"], types: { part2a: "summary", part2b: "staged" } },
    L3: { order: ["part2b", "part2a"], types: { part2a: "staged", part2b: "summary" } },
    L4: { order: ["part2b", "part2a"], types: { part2a: "summary", part2b: "staged" } },
  }[label];
  partOrder = config.order.map(name => (name === "part2a" ? "2a" : "2b"));
  const firstPartName = config.order[0];
  const firstPartLength = questionDB[firstPartName].length;
  part2Boundary = questions.length + firstPartLength;
  const newQs = config.order.flatMap(name =>
    questionDB[name].map(q => ({
      ...q,
      part: name === "part2a" ? "2a" : "2b",
      explanationType: config.types[name],
    }))
  );
  questions.push(...newQs);
  summaryDiv.classList.add("hidden");
  renderQuestion();
}

function startTimer(seconds) {
  timeLeft = seconds;
  timerDiv.classList.remove("hidden");
  updateTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endStudy();
    }
  }, 1000);
}

function updateTimer() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  timerDiv.textContent = `Time left: ${mins}:${secs.toString().padStart(2, "0")}`;
}

function endStudy() {
  if (timerInterval) clearInterval(timerInterval);
  timerDiv.classList.add("hidden");
  showPartSummary(2, true);
}

