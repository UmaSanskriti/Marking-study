// Core data for questions
const questions = [];
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

const intro = document.getElementById("intro");
const timerDiv = document.getElementById("timer");
const qContainer = document.getElementById("question-container");
const explanationDiv = document.getElementById("explanation-container");
const summaryDiv = document.getElementById("summary");

function startStudy() {
  intro.classList.add("hidden");
  renderQuestion();
}

document.getElementById("start-btn").addEventListener("click", startStudy);

function renderQuestion() {
  if (current >= questions.length) {
    endStudy();
    return;
  }
  const q = questions[current];
  if (q.part === 2 && timeLeft === 0) startTimer(30 * 60);

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

  document.getElementById("self-mark").onclick = () => handleSelfMark(q);
  document.getElementById("ai-mark").onclick = () => handleAIMark(q);
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
    const mark = Number(markInput.value);
    if (isNaN(mark)) return alert("Enter a mark");
    const record = { questionId: q.id, part: q.part, choice: "self", finalMark: mark };

    if (q.part === 1) {
      const ai = simulateAiMark(q);
      record.aiMark = ai.aiMark;
      record.aiConfidence = ai.confidence;
      explanationDiv.innerHTML = `
        <p><strong>AI Mark:</strong> ${ai.aiMark} / ${q.maxMarks}</p>
        <p><strong>Confidence:</strong> ${ai.confidence}</p>
        ${getExplanation(q)}
      `;
      explanationDiv.classList.remove("hidden");
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "Next";
      nextBtn.onclick = () => {
        results.push(record);
        current++;
        renderQuestion();
      };
      explanationDiv.appendChild(nextBtn);
    } else {
      results.push(record);
      current++;
      renderQuestion();
    }
  };
}

function handleAIMark(q) {
  const ai = simulateAiMark(q);

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
    explanationDiv.innerHTML = getExplanation(q);
    explanationDiv.classList.remove("hidden");
    viewedExplanation = true;
  };

  document.getElementById("submit-mark").onclick = () => {
    const finalMark = Number(document.getElementById("final-mark").value);
    if (isNaN(finalMark)) return alert("Enter a mark");
    const record = {
      questionId: q.id,
      part: q.part,
      choice: "ai",
      aiMark: ai.aiMark,
      aiConfidence: ai.confidence,
      viewedExplanation,
      finalMark,
      delegated: finalMark === ai.aiMark,
    };
    results.push(record);
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
  qContainer.classList.add("hidden");
  explanationDiv.classList.add("hidden");

  let correct = 0;
  results.forEach(r => {
    const q = questions.find(q => q.id === r.questionId);
    if (r.finalMark === q.goldMark) correct++;
  });
  const bonus = (correct * 0.1).toFixed(2);

  summaryDiv.innerHTML = `
    <h2>Study Complete</h2>
    <p>You marked ${correct} out of ${results.length} items correctly.</p>
    <p>Bonus earned: $${bonus}</p>
    <pre>${JSON.stringify(results, null, 2)}</pre>
  `;
  summaryDiv.classList.remove("hidden");
}
