const lessons = [
  {
    id: 1,
    title: "1. Tu primer Hola Mundo",
    theory: "En C++, para imprimir texto en pantalla utilizamos <code>std::cout &lt;&lt; \"texto\";</code>. Asegúrate de finalizar la línea con un punto y coma (;).",
    initialCode: "#include <iostream>\n\nint main() {\n    // Escribe tu codigo aqui\n    \n    return 0;\n}",
    expected: ["std::cout", "Hola Mundo"],
    hint: "Debes incluir std::cout << \"Hola Mundo\"; dentro de main()."
  },
  {
    id: 2,
    title: "2. Variables Enteras (int)",
    theory: "Una variable guarda datos. Para crear un número entero usas <code>int nombre = valor;</code>. Crea una variable llamada <code>edad</code> con valor <code>18</code> e imprímela.",
    initialCode: "#include <iostream>\n\nint main() {\n    // Crea la variable edad aqui\n    \n    return 0;\n}",
    expected: ["int", "edad", "18"],
    hint: "Escribe: int edad = 18; y luego std::cout << edad;"
  },
  {
    id: 3,
    title: "3. Entrada de Datos (std::cin)",
    theory: "Para pedir un dato al usuario usamos <code>std::cin &gt;&gt; variable;</code>. Declara una variable llamada <code>numero</code> y léela usando cin.",
    initialCode: "#include <iostream>\n\nint main() {\n    int numero;\n    // Lee la variable numero usando std::cin\n    \n    return 0;\n}",
    expected: ["std::cin", "numero"],
    hint: "Usa la instrucción: std::cin >> numero;"
  }
];

let currentLessonIndex = 0;

const lessonBadge = document.getElementById("lessonBadge");
const lessonTitle = document.getElementById("lessonTitle");
const lessonTheory = document.getElementById("lessonTheory");
const codeEditor = document.getElementById("codeEditor");
const runBtn = document.getElementById("runBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const feedbackBox = document.getElementById("feedbackBox");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function loadLesson(index) {
  const lesson = lessons[index];
  lessonBadge.textContent = `Lección ${lesson.id} de ${lessons.length}`;
  lessonTitle.textContent = lesson.title;
  lessonTheory.innerHTML = lesson.theory;
  codeEditor.value = lesson.initialCode;
  
  feedbackBox.className = "feedback-box hidden";
  feedbackBox.textContent = "";

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === lessons.length - 1;

  updateProgress();
}

function updateProgress() {
  const percentage = Math.round(((currentLessonIndex + 1) / lessons.length) * 100);
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}%`;
}

runBtn.addEventListener("click", () => {
  const userCode = codeEditor.value;
  const currentLesson = lessons[currentLessonIndex];

  const isValid = currentLesson.expected.every(term => userCode.includes(term));

  feedbackBox.classList.remove("hidden", "success", "error");

  if (isValid) {
    feedbackBox.classList.add("success");
    feedbackBox.textContent = "¡Correcto! Excelente trabajo. Puedes pasar a la siguiente lección.";
    nextBtn.disabled = currentLessonIndex === lessons.length - 1;
  } else {
    feedbackBox.classList.add("error");
    feedbackBox.textContent = `Pista: ${currentLesson.hint}`;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentLessonIndex > 0) {
    currentLessonIndex--;
    loadLesson(currentLessonIndex);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentLessonIndex < lessons.length - 1) {
    currentLessonIndex++;
    loadLesson(currentLessonIndex);
  }
});

// Cargar primera lección al inicio
loadLesson(0);