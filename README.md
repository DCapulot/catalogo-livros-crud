# catalogo-livros-crud

CRUD completo de um catálogo de livros, com visual de ficha de biblioteca (papel, carimbo de status, catálogo com busca). Projeto feito para portfólio, 100% front-end.

## Funcionalidades

- **Create** — formulário "Arquivar" para adicionar um novo livro (título, autor, ISBN).
- **Read** — lista de livros com busca em tempo real por título ou autor.
- **Update** — "Alternar status" (Disponível ↔ Emprestado) e "Editar" (título/autor).
- **Delete** — remover um livro do catálogo, com confirmação.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro (sem frameworks)

## Estrutura do projeto

```
├── index.html
├── style.css
└── script.js
```

## Como usar

Basta abrir o `index.html` no navegador — não precisa de servidor nem de instalação.

Os dados ficam salvos no `localStorage` do navegador, então eles persistem entre visitas (nesse mesmo navegador/dispositivo).

## Próximos passos (opcional)

Para ligar a um backend de verdade, basta trocar as funções `salvar()` e `carregar()` do `script.js` por chamadas `fetch()` para uma API própria.

## Autor

David Capulot Corrêa — [GitHub](https://github.com/David-Capulot-Correa)
