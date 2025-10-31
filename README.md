# Açaí Supreme — Guia Rápido

1) Tecnologias utilizadas
- HTML5, CSS3 (Flexbox e Grid), JavaScript (ES6, sem frameworks)
- SVG para ícones e favicon
- Google Fonts (Playfair Display, Poppins, Inter)
- Python 3 (http.server) opcional para desenvolvimento local

2) Funcionamento do site
- Arquitetura: página única (index.html) com estilos consolidados em `assets/css/index.css`; scripts em `assets/js/main.js`.
- Fluxo principal: header fixo com navegação por âncoras; menu mobile acessível com overlay; imagens com lazy-loading nativo; conteúdo organizado por seções.
- Funcionalidades: Hero com chamada e CTAs; Cardápio (tamanhos, acompanhamentos, extras) com imagem decorativa ao lado do título; Combos; Monte seu Açaí com fundo ondulado; Promoções; Depoimentos; Sobre; Contato; botão “Fazer Pedido”.

3) Estrutura de pastas
- `index.html`
- `assets/`
  - `css/`
    - `index.css` (entrypoint de estilos)
    - `global/` (tokens e base): `variables.css`, `base.css`, `layout.css`, `components.css`
    - `pages/` (estilos por seção): `sectionhome.css`, `customacai.css`, `about.css`, `testimonials.css`
  - `img/` (imagens do site)
  - `icons/` (ícones SVG, ex.: `logo.svg`, `whatsapp.svg`)
  - `js/` (`main.js`: navegação mobile, estado do header, melhorias de UX)

4) Divisão por seções
- Header/Navegação: logo SVG inline e menu; comportamento mobile/overlay.
- Home (Hero): título, subtítulo e botões de ação.
- Cardápio (Menu): grade de opções (tamanhos, acompanhamentos e extras); imagem decorativa no título.
- Combos: cards com preços e destaques.
- Monte seu Açaí: ingredientes e imagem; fundo com padrão ondulado diagonal.
- Promoções: destaques visuais.
- Depoimentos: avaliações de clientes.
- Sobre: informações da marca.
- Contato: mapa e redes sociais.
- Footer: links e logotipo.
- Relação entre módulos: estilos globais garantem consistência; estilos por página cuidam dos detalhes visuais de cada seção; scripts controlam navegação e pequenas interações.