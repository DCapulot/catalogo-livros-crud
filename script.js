const CHAVE = "catalogo-livros";

function carregar() {
  const dados = localStorage.getItem(CHAVE);
  if (dados) return JSON.parse(dados);
  return [
    { id: 1, titulo: "Shoe Dog", autor: "Phil Knight", isbn: "9788543107356", status: "Disponível" },
    { id: 2, titulo: "Lean In", autor: "Sheryl Sandberg", isbn: "9780385349949", status: "Emprestado" },
  ];
}

function salvar(livros) {
  localStorage.setItem(CHAVE, JSON.stringify(livros));
}

let livros = carregar();

function renderizar() {
  const termo = document.getElementById("busca").value.trim().toLowerCase();
  const container = document.getElementById("lista");
  const filtrados = livros.filter(l =>
    l.titulo.toLowerCase().includes(termo) || l.autor.toLowerCase().includes(termo)
  );

  if (filtrados.length === 0) {
    container.innerHTML = '<p class="vazio">Nenhuma ficha encontrada.</p>';
    return;
  }

  container.innerHTML = filtrados.map(l => `
    <div class="ficha">
      <div class="ficha-topo">
        <h3>${escapeHtml(l.titulo)}</h3>
        <span class="isbn">${escapeHtml(l.isbn || "s/ ISBN")}</span>
      </div>
      <div class="autor">${escapeHtml(l.autor)}</div>
      <span class="selo">${l.status}</span>
      <div class="acoes">
        <button onclick="alternarStatus(${l.id})">Alternar status</button>
        <button onclick="editar(${l.id})">Editar</button>
        <button class="excluir" onclick="remover(${l.id})">Excluir</button>
      </div>
    </div>
  `).join("");
}

function escapeHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

document.getElementById("formNovo").addEventListener("submit", (e) => {
  e.preventDefault();
  const titulo = document.getElementById("novoTitulo").value.trim();
  const autor = document.getElementById("novoAutor").value.trim();
  const isbn = document.getElementById("novoIsbn").value.trim();
  if (!titulo || !autor) return;

  livros.push({ id: Date.now(), titulo, autor, isbn, status: "Disponível" });
  salvar(livros);
  e.target.reset();
  renderizar();
});

function alternarStatus(id) {
  const livro = livros.find(l => l.id === id);
  livro.status = livro.status === "Disponível" ? "Emprestado" : "Disponível";
  salvar(livros);
  renderizar();
}

function editar(id) {
  const livro = livros.find(l => l.id === id);
  const novoTitulo = prompt("Título:", livro.titulo);
  if (novoTitulo === null) return;
  const novoAutor = prompt("Autor:", livro.autor);
  if (novoAutor === null) return;
  livro.titulo = novoTitulo.trim() || livro.titulo;
  livro.autor = novoAutor.trim() || livro.autor;
  salvar(livros);
  renderizar();
}

function remover(id) {
  if (!confirm("Excluir esta ficha do catálogo?")) return;
  livros = livros.filter(l => l.id !== id);
  salvar(livros);
  renderizar();
}

document.getElementById("busca").addEventListener("input", renderizar);

renderizar();
