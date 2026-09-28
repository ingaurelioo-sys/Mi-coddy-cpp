// BANCO DE CURSOS Y LECCIONES ESTILO CODDY
const courses = {
  cpp: [
    {
      type: "code",
      category: "C++ • INTRODUCCIÓN",
      title: "Tu primer Hola Mundo",
      explanation: "Escribe el comando necesario para imprimir 'Hola Mundo' en la consola C++.",
      initialCode: "#include <iostream>\n\nint main() {\n    // Escribe abajo:\n    \n    return 0;\n}",
      expected: ["std::cout", "Hola Mundo"],
      hint: "Usa std::cout << \"Hola Mundo\";"
    },
    {
      type: "quiz",
      category: "C++ • VARIABLES",
      title: "¿Cuál es el tipo para números enteros?",
      explanation: "Selecciona el tipo de dato correcto para guardar números enteros sin decimales.",
      options: ["float", "int", "string", "bool"],
      correct: 1,
      hint: "En C++, int representa 'integer' (entero)."
    },
    {
      type: "code",
      category: "C++ • ENTRADAS",
      title: "Lectura con std::cin",
      explanation: "Lee un valor entero dentro de la variable 'puntos'.",
      initialCode: "#include <iostream>\n\nint main() {\n    int puntos;\n    // Lee puntos aqui:\n    \n    return 0;\n}",
      expected: ["std::cin", "puntos"],
      hint: "Utiliza std::cin >> puntos;"
    }
  ],
  html: [
    {
      type: "quiz",
      category: "HTML • ESTRUCTURA",
      title: "¿Qué etiqueta define el título principal?",
      explanation: "Selecciona la etiqueta encargada del encabezado más importante de una página.",
      options: ["<p>", "<h1>", "<title>", "<head>"],
      correct: 1,
      hint: "<h1> define el Heading 1."
    },
    {
      type: "code",
      category: "HTML • BOTONES",
      title: "Crear un Botón",
      explanation: "Escribe el código HTML para un botón que diga 'Enviar'.",
      initialCode: "<!-- Escribe tu boton abajo -->\n",
      expected: ["<button>", "Enviar", "</button>"],
      hint: "Escribe <button>Enviar</button>"
    }
  ],
  python: [
    {
      type: "code",
      category: "PYTHON • BASICO",
      title: "Imprimir en pantalla",
      explanation: "Usa la función print() para mostrar 'Hola Python'.",
      initialCode: "# Escribe tu codigo aqui\n",
      expected: ["print", "Hola Python"],
      hint: "Escribe print('Hola Python')"
    }
  ]
};

let currentLang = "cpp";
let currentIndex = 0;
let selectedOption = null;

// ELEMENTOS DOM
const lessonCategory = document.getElementById("lessonCategory");
const lessonTitle = document.getElementById("lessonTitle");
const lessonExplanation = document.getElementById("lessonExplanation");
const exerciseContainer = document.getElementById("exerciseContainer");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");

// CAMBIO DE CURSO
document.querySelectorAll(".course-tab").forEach(tab => {
  tab.addEventListener("click", (e) => {
    document.querySelectorAll(".course-tab").forEach(t => t.classList.remove("active"));
    e.target.classList.add("active");
    currentLang = e.target.dataset.lang;
    currentIndex = 0;
    renderLesson();
  });
});

function renderLesson() {
  const lessonList = courses[currentLang] || [];
  if (currentIndex >= lessonList.length) {
    exerciseContainer.innerHTML = "<h3>🎉 ¡Has completado este módulo de " + currentLang.toUpperCase() + "!</h3>";
    checkBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    return;
  }

  const lesson = lessonList[currentIndex];
  lessonCategory.textContent = lesson.category;
  lessonTitle.textContent = lesson.title;
  lessonExplanation.textContent = lesson.explanation;
  
  feedback.className = "feedback-banner hidden";
  checkBtn.classList.remove("hidden");
  nextBtn.classList.add("hidden");
  selectedOption = null;

  // Actualizar Progreso
  const progress = Math.round(((currentIndex + 1) / lessonList.length) * 100);
  progressBar.style.width = `${progress}%`;
  progressPercent.textContent = `${progress}%`;

  // Renderizar tipo de ejercicio
  if (lesson.type === "code") {
    exerciseContainer.innerHTML = `<textarea id="codeEditor" class="code-area" spellcheck="false">${lesson.initialCode}</textarea>`;
  } else if (lesson.type === "quiz") {
    let html = `<div class="quiz-options">`;
    lesson.options.forEach((opt, i) => {
      html += `<button class="quiz-btn" onclick="selectQuizOption(${i}, this)">${opt}</button>`;
    });
    html += `</div>`;
    exerciseContainer.innerHTML = html;
  }
}

window.selectQuizOption = function(index, btn) {
  document.querySelectorAll(".quiz-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedOption = index;
};

// COMPROBACIÓN
checkBtn.addEventListener("click", () => {
  const lesson = courses[currentLang][currentIndex];
  let isCorrect = false;

  if (lesson.type === "code") {
    const code = document.getElementById("codeEditor").value;
    isCorrect = lesson.expected.every(term => code.includes(term));
  } else if (lesson.type === "quiz") {
    isCorrect = (selectedOption === lesson.correct);
  }

  feedback.classList.remove("hidden", "success", "error");
  if (isCorrect) {
    feedback.classList.add("success");
    feedback.textContent = "¡Excelente! Respuesta correcta.";
    checkBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
  } else {
    feedback.classList.add("error");
    feedback.textContent = lesson.hint || "Inténtalo de nuevo.";
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex++;
  renderLesson();
});

// Inicio
renderLesson();