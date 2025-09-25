<h1>Anime Explorer</h1>

<img src="public/images/readme.jpg" alt="Anime Explorer" style="width:100%; max-width:800px; margin-bottom:20px;" />

<p>Anime Explorer é um projeto de aplicação web para explorar animes, exibindo informações detalhadas e episódios de cada anime usando a API pública <a href="https://jikan.moe/" target="_blank">Jikan</a>. A aplicação foi construída com Vue 3, Nuxt 3, PrimeVue e TypeScript, incluindo boas práticas de performance, testes unitários e tipagem strict.</p>

<h2>Funcionalidades</h2>
<ul>
  <li>Listagem de animes com título, episódios e sinopse.</li>
  <li>Cards interativos com efeito hover e resumo com <code>text-overflow: ellipsis</code>.</li>
  <li>Paginação usando <strong>PrimeVue Paginator</strong>.</li>
  <li>Página de detalhes do anime com:
    <ul>
      <li>Background com gradiente escuro.</li>
      <li>Título, número de episódios e sinopse.</li>
      <li>Lista de episódios em tabela com Score (estrelas), data formatada e link para assistir.</li>
    </ul>
  </li>
  <li>Imagens otimizadas com <code>&lt;picture&gt;</code> e <code>loading="lazy"</code>.</li>
  <li>Fetch de dados via serviços centralizados (<code>services/animes.ts</code>) usando <strong>Axios</strong>.</li>
  <li>Testes unitários com <strong>Vitest</strong>:
    <ul>
      <li>Componente de card de anime.</li>
      <li>Página de detalhes.</li>
      <li>Serviços da API com mocks.</li>
    </ul>
  </li>
  <li>Tipagem TypeScript strict para respostas da API.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>Vue 3</strong> com Composition API</li>
  <li><strong>Nuxt 3</strong></li>
  <li><strong>TypeScript</strong> (strict mode)</li>
  <li><strong>PrimeVue</strong> (Card, DataTable, Paginator, Rating)</li>
  <li><strong>Axios</strong> para requisições HTTP</li>
  <li><strong>SCSS / SASS</strong> para estilização</li>
  <li><strong>Vitest</strong> para testes unitários</li>
</ul>

<h2>Instalação</h2>
<pre><code>git clone &lt;seu-repo-url&gt;
cd &lt;nome-do-projeto&gt;
npm install
npm run dev</code></pre>

<p>O servidor iniciará em <code>http://localhost:3000</code>.</p>

<h2>Testes</h2>
<pre><code>npm run test</code></pre>
<p>Os testes incluem:
<ul>
  <li>Renderização de cards de animes.</li>
  <li>Consumo de API com mocks.</li>
  <li>Renderização da página de detalhes com tabela de episódios.</li>
</ul>
</p>

<h2>Observações de Performance</h2>
<ul>
  <li>Imagens carregadas com <code>loading="lazy"</code>.</li>
  <li><code>&lt;picture&gt;</code> usado para diferentes resoluções.</li>
  <li>Fetch de dados via serviços centralizados.</li>
  <li>Possibilidade de cache em respostas da API.</li>
  <li>Paginação para reduzir carga inicial.</li>
</ul>

<h2>License</h2>
<p>MIT © [Seu Nome]</p>
