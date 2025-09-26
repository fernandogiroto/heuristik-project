<h1>Heuristik - Anime Explorer</h1>

<img src="public/images/readme.jpg" alt="Anime Explorer" style="width:100%; max-width:800px; margin-bottom:20px;" />

<p>Anime Explorer is a web application to explore anime, displaying detailed information and episodes for each anime using the public <a href="https://jikan.moe/" target="_blank">Jikan API</a>. The app is built with Vue 3, Nuxt 3 and TypeScript, following performance best practices, unit testing, and strict type safety. You can check it live on <a href="https://heuristik-project.vercel.app/" target="_blank">Vercel</a>.</p>

<h2>Features</h2>
<ul>
  <li>Anime listing with title, number of episodes, and synopsis.</li>
  <li>Interactive cards with hover effect and text truncated with <code>text-overflow: ellipsis</code>.</li>
  <li>Anime details page including:
    <ul>
      <li>Background with dark gradient overlay.</li>
      <li>Title, episode count, and synopsis.</li>
      <li>Episode table with Score (stars), formatted air date, and watch link.</li>
    </ul>
  </li>
  <li>Optimized images using <code>&lt;picture&gt;</code> and <code>loading="lazy"</code>.</li>
  <li>Data fetching via centralized services (<code>services/animes.ts</code>) using <strong>Axios</strong>.</li>
  <li>Unit tests with <strong>Vitest</strong>:
    <ul>
      <li>Anime card component.</li>
      <li>Details page.</li>
      <li>API services with mocks.</li>
    </ul>
  </li>
  <li>Strict TypeScript typing for API responses.</li>
</ul>

<h2>Technologies Used</h2>
<ul>
  <li><strong>Vue 3</strong> with Composition API</li>
  <li><strong>Nuxt 3</strong></li>
  <li><strong>TypeScript</strong> (strict mode)</li>
  <li><strong>Axios</strong> for HTTP requests</li>
  <li><strong>SCSS / SASS</strong> for styling</li>
  <li><strong>Vitest</strong> for unit testing</li>
</ul>

<h2>Project Structure</h2>
<pre>
.
├── pages/
│   ├── index.vue            # Anime listing page
│   └── anime/
│       └── [id].vue         # Anime details page
├── layouts/
│   ├── default.vue          # Default layout
│   └── header.vue           # Header component
├── services/
│   ├── api.ts               # Axios instance
│   └── animes.ts            # API calls for anime & episodes
├── types/
│   └── anime.ts             # TypeScript types
├── components/
│   └── animeList.vue        # Anime card list component
├── scss/
│   ├── variables.scss
│   └── mixings.scss
├── helpers/
│   └── dateFormat.ts
├── tests/
│   ├── animeList.spec.ts
│   ├── animeDetails.spec.ts
│   └── animesService.spec.ts
├── nuxt.config.ts
└── package.json
</pre>

<h2>Installation</h2>
<pre><code>git clone &lt;your-repo-url&gt;
cd &lt;project-name&gt;
npm install
npm run dev</code></pre>

<p>The server will start at <code>http://localhost:3000</code>.</p>

<h2>Tests</h2>
<pre><code>npm run test</code></pre>
<p>The tests include:
<ul>
  <li>Rendering anime cards.</li>
  <li>API consumption with mocks.</li>
  <li>Rendering details page with episode table.</li>
</ul>
</p>

<h2>Performance Notes</h2>
<ul>
  <li>Images loaded with <code>loading="lazy"</code>.</li>
  <li><code>&lt;picture&gt;</code> used for different screen sizes.</li>
  <li>Data fetched via centralized services.</li>
  <li>API responses can be cached.</li>
  <li>Pagination reduces initial load.</li>
</ul>

<h2>License</h2>
<p>MIT © [FernandoGiroto]</p>
