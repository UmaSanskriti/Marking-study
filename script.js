// Core data for questions
const questions = [];
// 8 questions for part 1 and 24 for part 2
for (let i = 1; i <= 32; i++) {
  const part = i <= 8 ? 1 : 2;
  const explanationType = i % 2 === 0 ? "summary" : "staged";
  const maxMarks = ((i - 1) % 4) + 1; // cycles 1-4
  const questionText = `Question ${i}: Placeholder text`;
  const solutionText = `Solution for question ${i}`;
  const studentAnswer = `Student answer for question ${i}`;
  const goldMark = Math.floor(Math.random() * (maxMarks + 1));
  questions.push({
    id: i,
    part,
    explanationType,
    maxMarks,
    question: questionText,
    solution: solutionText,
    studentAnswer,
    goldMark,
  });
}

let current = 0;
let results = [];
let timerInterval;
let timeLeft = 0;
let userName = "";
let questionStartTime = 0;
let currentRecord = null;
let part1SummaryShown = false;

const intro = document.getElementById("intro");
const timerDiv = document.getElementById("timer");
const qContainer = document.getElementById("question-container");
const explanationDiv = document.getElementById("explanation-container");
const summaryDiv = document.getElementById("summary");

function startStudy() {
  userName = document.getElementById("user-name").value.trim();
  if (!userName) return alert("Please enter your name");
  intro.classList.add("hidden");
  renderQuestion();
}

document.getElementById("start-btn").addEventListener("click", startStudy);

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
  if (q.part === 2 && timeLeft === 0) startTimer(30 * 60);

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
    goldMark: q.goldMark,
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
    currentRecord.timeTaken = (Date.now() - questionStartTime) / 1000;
    currentRecord.delegated = false;

    if (q.part === 1) {
      const ai = simulateAiMark(q);
      currentRecord.aiMark = ai.aiMark;
      currentRecord.aiConfidence = ai.confidence;

      qContainer.innerHTML = `
        <h2>Question ${q.id} (Part ${q.part})</h2>
        <p><strong>Your Mark:</strong> ${mark} / ${q.maxMarks}</p>
        <p><strong>AI Mark:</strong> ${ai.aiMark} / ${q.maxMarks}</p>
        <p><strong>Confidence:</strong> ${ai.confidence}</p>
        <button id="view-exp">View Explanation</button>
        <button id="next-q">Next</button>
      `;
      explanationDiv.classList.add("hidden");
      let viewed = false;
      document.getElementById("view-exp").onclick = () => {
        currentRecord.actions.push({ action: "view_explanation", time: Date.now() - questionStartTime });
        explanationDiv.innerHTML = getExplanation(q);
        explanationDiv.classList.remove("hidden");
        viewed = true;
      };
      document.getElementById("next-q").onclick = () => {
        currentRecord.viewedExplanation = viewed;
        results.push(currentRecord);
        current++;
        renderQuestion();
      };
    } else {
      const ai = simulateAiMark(q);
      currentRecord.aiMark = ai.aiMark;
      currentRecord.aiConfidence = ai.confidence;
      results.push(currentRecord);
      current++;
      renderQuestion();
    }
  };
}

function handleAIMark(q) {
  const ai = simulateAiMark(q);
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
  const accuracy = { 1: 0.982, 2: 0.92, 3: 0.86, 4: 0.82 };
  const lowConf = { 1: 0.05, 2: 0.07, 3: 0.08, 4: 0.1 };
  const acc = accuracy[q.maxMarks];
  let aiMark;
  if (Math.random() < acc) {
    aiMark = q.goldMark;
  } else {
    do {
      aiMark = Math.floor(Math.random() * (q.maxMarks + 1));
    } while (aiMark === q.goldMark);
  }
  const confidence = Math.random() < lowConf[q.maxMarks] ? "low" : "high";
  return { aiMark, confidence };
}

function getExplanation(q) {
  if (q.explanationType === "staged") {
    return `
      <h3>Staged Explanation</h3>
      <ol>
        <li>Marking guideline extracted for Q${q.id}.</li>
        <li>Rubric used with max ${q.maxMarks} marks.</li>
        <li>AI rationale relating answer to rubric.</li>
      </ol>
    `;
  } else {
    return `
      <h3>Summary Explanation</h3>
      <p>AI considered key points and compared to rubric to assign marks.</p>
    `;
  }
}

function showPartSummary(part, final = false) {
  qContainer.classList.add("hidden");
  explanationDiv.classList.add("hidden");

  const partResults = results.filter(r => r.part === part);
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
      renderQuestion();
    };
    summaryDiv.appendChild(nextBtn);
  }
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
