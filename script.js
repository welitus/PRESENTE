// Lista de metas / pensamentos ❤️
const metas = [
  "Certeza que já pensei em você hoje 💭❤️",
  "Meu futuro é seu 🌟",
  "Quero te amar eternamente ♾️💘",
  "Nossos filhos serão inteligentes e bonitos 👶✨",
  "Quero que seja pra sempre meu duo 🎮💕",
  "Você é o meu presente mais lindo 🎁💖",
  "Te ter comigo renova minhas energias ⚡❤️",
  "Logo teremos nossa casinha 🏡✨",
  "Já sinto saudade dos nossos futuros filhos 👶💞",
  "Nossa casa será linda 🏡💝",
  "Ansioso pra te chamar de noiva 💍🥰",
  "Saudades de você 💌🥺",
  "Te amo, te amo, te amo ❤️❤️❤️",
  "Você é a música que o Djavan não conseguiu compor 🎶💕",
  "Você é o amor da minha vida 💖",
  "Seremos velhinhos ativos e felizes 👵👴✨",
  "Cada vez que te vejo te amo mais e mais 💓💓"
];

// Lista de imagens de fundo
const fundos = [
  "assets/bg1.jpg",
  "assets/bg2.jpg",
  "assets/bg3.jpg",
  "assets/bg4.jpg",
  "assets/bg5.jpg",
  "assets/bg6.jpg",
  "assets/bg7.jpg",
  "assets/bg8.jpg",
  "assets/bg9.jpg"
];

// Limite de frases por dia
const limitePorDia = 5;

// Armazena as frases já mostradas no dia
let frasesHoje = [];
let indiceRevisao = 0;

// Máquina de escrever
function typeWriterEffect(text, elementId, speed = 60) {
  const element = document.getElementById(elementId);
  element.innerHTML = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Mostrar a próxima frase do dia
function mostrarMetaDoDia() {
  const hoje = new Date().toLocaleDateString();
  let dataSalva = localStorage.getItem("data");
  let contador = parseInt(localStorage.getItem("contador")) || 0;
  let index = parseInt(localStorage.getItem("metaIndex")) || 0;

  if (dataSalva !== hoje) {
    contador = 0;
    frasesHoje = [];
    localStorage.setItem("data", hoje);
    localStorage.setItem("contador", contador);
    localStorage.setItem("metaIndex", index);
  } else {
    frasesHoje = JSON.parse(localStorage.getItem("frasesHoje")) || [];
  }

  if (contador >= limitePorDia) {
    document.getElementById("meta-text").innerText = "A surpresa de hoje já acabou, mas você pode rever as frases do dia ❤️";
    document.getElementById("botoes-revisao").style.display = "block";
  } else {
    const metaText = metas[index];
    typeWriterEffect(metaText, "meta-text", 50);

    contador++;
    frasesHoje.push(metaText);
    index = (index + 1) % metas.length;

    localStorage.setItem("contador", contador);
    localStorage.setItem("metaIndex", index);
    localStorage.setItem("frasesHoje", JSON.stringify(frasesHoje));
  }
}

// Função para definir fundo aleatório
function definirFundo() {
  const img = fundos[Math.floor(Math.random() * fundos.length)];
  document.body.style.backgroundImage = `url('${img}')`;
}

// Mostrar próxima frase da revisão (circular e ilimitada)
function proximaFrase() {
  if (frasesHoje.length === 0) return;
  typeWriterEffect(frasesHoje[indiceRevisao], "meta-text", 50);
  indiceRevisao = (indiceRevisao + 1) % frasesHoje.length;
}

// Senha
const senha = "2810";
function pedirSenha() {
  let tentativa = prompt("Digite a senha para ver a surpresa ❤️");
  if(tentativa === senha) {
    definirFundo();
    mostrarMetaDoDia();
  } else {
    alert("Senha incorreta 😢");
    pedirSenha();
  }
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  pedirSenha();

  document.getElementById("rever-btn").addEventListener("click", () => {
    indiceRevisao = 0;
    proximaFrase();
  });

  document.getElementById("proxima-btn").addEventListener("click", proximaFrase);
});
