# Açaí Supreme — Site Institucional

Açaí Supreme é um site institucional responsivo que apresenta combos, promoções e informações de contato de uma loja de açaí. O foco está na performance, acessibilidade e uma experiência visual moderna.

## Sumário
- [Propósito](#propósito)
- [Funcionalidades](#funcionalidades)
- [Requisitos do sistema](#requisitos-do-sistema)
- [Instalação e execução](#instalação-e-execução)
- [Configuração](#configuração)
- [Exemplos de uso](#exemplos-de-uso)
- [Dependências](#dependências)
- [Arquitetura e organização](#arquitetura-e-organização)
- [Contribuição](#contribuição)

## Propósito
Divulgar a marca Açaí Supreme e permitir que clientes conheçam os combos, promoções vigentes e formas de contato, com carregamento rápido e design atualizado.

## Funcionalidades
- Hero com imagem de fundo e chamada principal
- Lista de combos com lazy-loading de imagens (otimiza performance)
- Seção “Monte seu Açaí” com gradiente e destaque visual
- Seção de Promoções com imagem de fundo
- Depoimentos e área “Sobre nós”
- Contato com formulário e informações de localização
- Cabeçalho fixo com menu mobile acessível (overlay, focus, ESC)
- Rodapé com links e logotipo

## Requisitos do sistema
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Opcional: Python 3 para servir o site localmente com `http.server`

## Instalação e execução
1. Clone ou copie este repositório para sua máquina:
   - Copie a pasta `Site-acai` para o seu ambiente
2. Execute localmente (opções):
   - Abrir diretamente o `index.html` no navegador
   - Servir via Python (recomendado para testar imports relativos):
     ```bash
     cd Site-acai
     python -m http.server 8000
     # Acesse http://localhost:8000/
     ```

## Configuração
- Cores e tokens de design: editar `assets/css/style.css` (bloco `:root`)
- Estilos de componentes e seções: editar `assets/css/app.css`
- Imagens, ícones e scripts: pasta `assets/`

## Exemplos de uso
- Alterar a cor primária do tema:
  ```css
  /* assets/css/style.css */
  :root {
    --primary: #6B0B8F; /* novo valor aqui */
  }
  ```
- Trocar a imagem de fundo da seção Hero:
  ```css
  /* assets/css/app.css */
  .hero {
    background-image: url('caminho/para/sua/imagem.jpg');
  }
  ```

## Dependências
- Google Fonts (Poppins, Inter, Lobster Two, etc.)
- Imagens de demonstração via links externos (pode substituir por arquivos locais em `assets/img/`)

## Arquitetura e organização
- `assets/css/style.css`: tokens de design (variáveis CSS), reset e estilos base
- `assets/css/app.css`: estilos dos componentes e das seções
- `assets/css/main-styles.css`: estilos complementares (mantido por compatibilidade; pode ser incorporado a `app.css` futuramente)
- `assets/js/main.js`: lógica de UI (menu mobile acessível, lazy-loading, estado do header)
- `assets/img/`: imagens do site
- `assets/icons/`: ícones em SVG
- `index.html`: estrutura da página

### Princípios adotados
- Separação de responsabilidades: tokens/base em `style.css`, UI em `app.css`
- Acessibilidade: foco gerenciado, atributos ARIA, overlay
- Performance: lazy-loading de imagens, assets otimizados
- Manutenibilidade: comentários claros e organização por seções

## Contribuição
1. Crie um fork do projeto
2. Crie um branch com sua feature/fix: `git checkout -b feat/minha-feature`
3. Faça commits claros
4. Abra um Pull Request descrevendo as mudanças

### Diretrizes
- Mantenha a organização dos arquivos
- Documente funções JS que adicionem lógica
- Teste visualmente em desktop e mobile