// Core data for questions
let questions = questionDB.part1.map(q => ({ ...q, part: "1", explanationType: 'staged' }));

let current = 0;
let results = [];
let timerInterval;
let timeLeft = 0;
let part1SummaryShown = false;
let questionStartTime;
let currentRecord;
let userName = "";
let selectedVariant = null;

const intro = document.getElementById("intro");
const timerDiv = document.getElementById("timer");
const qContainer = document.getElementById("question-container");
const explanationDiv = document.getElementById("explanation-container");
const summaryDiv = document.getElementById("summary");
const variantPicker = document.getElementById("variant-picker");

function startStudy() {
  userName = document.getElementById("user-name").value.trim() || "Anonymous";
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
  if (current >= questions.length) {
    endStudy();
    return;
  }

  if (current === 8 && !part1SummaryShown) {
    part1SummaryShown = true;
    showPartSummary(1);
    return;
  }
  const q = questions[current];
  if (q.part !== "1" && timeLeft === 0) startTimer(30 * 60);

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

  qContainer.innerHTML = `
    <h2>Question ${q.id} (Part ${q.part})</h2>
    <p><strong>Question:</strong> ${q.question}</p>
    <p><strong>Solution:</strong> ${q.solution}</p>
    <p><strong>Student Answer:</strong> ${q.studentAnswer}</p>
    <p><strong>Max Marks:</strong> ${q.maxMarks}</p>
    <button id="self-mark">Mark Myself</button>
    <button id="ai-mark">Use AI</button>
  `;
  qContainer.classList.remove("hidden");
  explanationDiv.classList.add("hidden");

  document.getElementById("self-mark").onclick = () => {
    currentRecord.actions.push({ action: "mark_myself", time: Date.now() - questionStartTime });
    handleSelfMark(q);
  };
  document.getElementById("ai-mark").onclick = () => {
    currentRecord.actions.push({ action: "ai_mark", time: Date.now() - questionStartTime });
    handleAIMark(q);
  };
}

function handleSelfMark(q) {
  const markInput = document.createElement("input");
  markInput.type = "number";
  markInput.min = 0;
  markInput.max = q.maxMarks;
  markInput.id = "mark-input";

  qContainer.innerHTML = `
    <h2>Question ${q.id} (Part ${q.part})</h2>
    <p><strong>Question:</strong> ${q.question}</p>
    <p><strong>Solution:</strong> ${q.solution}</p>
    <p><strong>Student Answer:</strong> ${q.studentAnswer}</p>
    <p><strong>Max Marks:</strong> ${q.maxMarks}</p>
    <p>Enter your mark:</p>
  `;
  qContainer.appendChild(markInput);
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  qContainer.appendChild(submitBtn);

    submitBtn.onclick = () => {
      currentRecord.actions.push({ action: "submit", time: Date.now() - questionStartTime });
      const mark = Number(markInput.value);
      if (isNaN(mark)) return alert("Enter a mark");
      currentRecord.choice = "self";
      currentRecord.finalMark = mark;

      if (q.part === "1") {
        const ai = simulateAiMark(q);
        currentRecord.aiMark = ai.aiMark;
        currentRecord.aiConfidence = ai.confidence;
        qContainer.classList.add("hidden");
        explanationDiv.innerHTML = `
          <p><strong>AI Mark:</strong> ${ai.aiMark} / ${q.maxMarks}</p>
          <p><strong>Confidence:</strong> ${ai.confidence}</p>
          <button id="view-exp">View Explanation</button>
          <button id="next-q">Next</button>
        `;
        explanationDiv.classList.remove("hidden");
        let viewed = false;
        document.getElementById("view-exp").onclick = () => {
          currentRecord.actions.push({ action: "view_explanation", time: Date.now() - questionStartTime });
          const exp = document.createElement("div");
          exp.innerHTML = getExplanation(q);
          explanationDiv.appendChild(exp);
          viewed = true;
        };
        document.getElementById("next-q").onclick = () => {
          currentRecord.viewedExplanation = viewed;
          currentRecord.timeTaken = (Date.now() - questionStartTime) / 1000;
          results.push(currentRecord);
          current++;
          renderQuestion();
        };
      } else {
        const ai = getAi(q);
        currentRecord.aiMark = ai.aiMark;
        currentRecord.aiConfidence = ai.confidence;
        currentRecord.timeTaken = (Date.now() - questionStartTime) / 1000;
        results.push(currentRecord);
        current++;
        renderQuestion();
      }
    };
}

function handleAIMark(q) {
  const ai = getAi(q);
  currentRecord.choice = "ai";
  currentRecord.aiMark = ai.aiMark;
  currentRecord.aiConfidence = ai.confidence;

  qContainer.innerHTML = `
    <h2>Question ${q.id} (Part ${q.part})</h2>
    <p><strong>AI Mark:</strong> ${ai.aiMark} / ${q.maxMarks}</p>
    <p><strong>Confidence:</strong> ${ai.confidence}</p>
    <label>Final mark: <input type="number" id="final-mark" min="0" max="${q.maxMarks}" value="${ai.aiMark}" /></label>
    <button id="view-exp">View Explanation</button>
    <button id="submit-mark">Submit</button>
  `;
  explanationDiv.classList.add("hidden");
  qContainer.classList.remove("hidden");

  let viewedExplanation = false;
  document.getElementById("view-exp").onclick = () => {
    currentRecord.actions.push({ action: "view_explanation", time: Date.now() - questionStartTime });
    explanationDiv.innerHTML = getExplanation(q);
    explanationDiv.classList.remove("hidden");
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
    current++;
    renderQuestion();
  };
}

function simulateAiMark(q) {
  const aiMark = Math.floor(Math.random() * (q.maxMarks + 1));
  const levels = ["low", "medium", "high"];
  const confidence = levels[Math.floor(Math.random() * levels.length)];
  return { aiMark, confidence };
}

function getAi(q) {
  return { aiMark: q.aiMark, confidence: q.aiConfidence };
}

function getExplanation(q) {
  if (q.explanationType === "staged") {
    const rubric = q.rubricJson ? `<pre>${q.rubricJson}</pre>` : "";
    const guideline = q.markingGuideline ? `<pre>${q.markingGuideline}</pre>` : "";
    return `<p>${q.stagedExplanation}</p>${rubric}${guideline}`;
  }
  return `<p>${q.summaryExplanation}</p>`;
}

function showPartSummary(part, final = false) {
  qContainer.classList.add("hidden");
  explanationDiv.classList.add("hidden");

  const partResults = results.filter(r => r.part == part);
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
    html += `<pre>${JSON.stringify(results, null, 2)}</pre>`;
  }
  summaryDiv.innerHTML = html;
  summaryDiv.classList.remove("hidden");
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

function setupPart2(label) {
  const config = {
    L1: { order: ["part2a", "part2b"], types: { part2a: "staged", part2b: "summary" } },
    L2: { order: ["part2a", "part2b"], types: { part2a: "summary", part2b: "staged" } },
    L3: { order: ["part2b", "part2a"], types: { part2a: "staged", part2b: "summary" } },
    L4: { order: ["part2b", "part2a"], types: { part2a: "summary", part2b: "staged" } },
  }[label];
  const build = name => questionDB[name].map(q => ({ ...q, part: 2, explanationType: config.types[name] }));
  const newQs = config.order.flatMap(build);
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
  showPartSummary(2, true);
}
