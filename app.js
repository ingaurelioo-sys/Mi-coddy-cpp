// Banco de Lecciones C++ (Puedes agregar más usando esta misma estructura)
const lessons = [
  {
    id: 1,
    title: "1. Tu primer Hola Mundo",
    theory: "En C++, para imprimir texto en la pantalla usamos 'std::cout <<' seguido del texto entre comillas y terminamos con un punto y coma (;).",
    initialCode: '#include <iostream>\n\nint main() {\n    // Escribe la línea para imprimir "Hola Mundo"\n    \n    return 0;\n}',
    expectedOutput: "Hola Mundo",
    type: "compiler"
  },
  {
    id: 2,
    title: "2. Declarar una variable entera",
    theory: "Para guardar números enteros en C++ usamos el tipo de dato 'int'. Ejemplo: int edad = 18;",
    initialCode: '#include <iostream>\n\nint main() {\n    // Declara una variable int llamada "puntos" con el valor 100 e imprímela\n    int puntos = 100;\n    std::cout << puntos;\n    return 0;\n}',
    expectedOutput: "100",
    type: "compiler"
  },
  {
    id: 3,
    title: "3. Salto de línea con endl",
    theory: "Para hacer un salto de línea después de imprimir un texto se usa 'std::endl' o '\\n'.",
    initialCode: '#include <iostream>\n\nint main() {\n    std::cout << "Linea 1" << std::endl;\n    std::cout << "Linea 2";\n    return 0;\n}',
    expectedOutput: "Linea 1\nLinea 2",
    type: "compiler"
  }
];

let currentLessonIndex = 0;

// Cargar estado inicial
document.addEventListener("DOMContentLoaded", () => {
  const savedIndex = localStorage.getItem("coddy_cpp_lesson");
  if (savedIndex) currentLessonIndex = parseInt(savedIndex);
  loadLesson(currentLessonIndex);
});

function loadLesson(index) {
  const lesson = lessons[index];
  document.getElementById("lesson-category").innerText = `Lección ${index + 1} de ${lessons.length}`;
  document.getElementById("lesson-title").innerText = lesson.title;
  document.getElementById("lesson-theory").innerText = lesson.theory;
  document.getElementById("code-input").value = lesson.initialCode;
  
  // Ocultar resultados anteriores
  document.getElementById("output-box").classList.add("hidden");
  
  // Actualizar navegación
  document.getElementById("prev-btn").disabled = index === 0;
  document.getElementById("next-btn").disabled = true; // Se activa al resolver bien
  
  updateProgress();
}

async function checkAnswer() {
  const lesson = lessons[currentLessonIndex];
  const userCode = document.getElementById("code-input").value;
  const checkBtn = document.getElementById("check-btn");
  const outputBox = document.getElementById("output-box");
  const outputText = document.getElementById("output-text");

  checkBtn.innerText = "Compilando en la nube...";
  checkBtn.disabled = true;

  try {
    // Enviamos el código a la API gratuita de Piston
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: "cpp",
        version: "10.2.0",
        files: [{ content: userCode }]
      })
    });

    const data = await response.json();
    const result = data.run.output ? data.run.output.trim() : "";

    outputBox.classList.remove("hidden");
    outputText.innerText = result || "Sin salida.";

    if (result === lesson.expectedOutput) {
      outputText.innerText += "\n\n¡Excelente! Respuesta correcta. 🎉";
      outputText.style.color = "#22c55e";
      document.getElementById("next-btn").disabled = false;
      
      // Guardar progreso
      localStorage.setItem("coddy_cpp_lesson", currentLessonIndex + 1);
    } else {
      outputText.innerText += `\n\nEsperado: "${lesson.expectedOutput}"`;
      outputText.style.color = "#f43f5e";
    }
  } catch (error) {
    outputBox.classList.remove("hidden");
    outputText.innerText = "Error de conexión al compilar.";
    outputText.style.color = "#f43f5e";
  }

  checkBtn.innerText = "Comprobar Código";
  checkBtn.disabled = false;
}

function changeLesson(step) {
  currentLessonIndex += step;
  if (currentLessonIndex >= 0 && currentLessonIndex < lessons.length) {
    loadLesson(currentLessonIndex);
  }
}

function updateProgress() {
  const percent = Math.round(((currentLessonIndex) / lessons.length) * 100);
  document.getElementById("progress-bar").style.width = `${percent}%`;
  document.getElementById("progress-text").innerText = `${percent}% completado`;
}