// ==========================================
// DADOS DOS TRATORES (Simulando 1.000+ modelos)
// ==========================================
const CATEGORIAS = {
  compacto: { nome: 'Compacto', icone: '🚜', faixa: '25-50 cv' },
  medio: { nome: 'Médio', icone: '🚜', faixa: '55-100 cv' },
  grande: { nome: 'Grande', icone: '🚜', faixa: '105-200 cv' },
  extragrande: { nome: 'Extra Grande', icone: '🚜', faixa: '210+ cv' },
  especial: { nome: 'Especial', icone: '🚜', faixa: 'Café/Cana' },
};

// Gerar 1.000+ modelos dinamicamente
function gerarTratores() {
  const tratores = [];
  const series = ['E', 'M', 'R', 'D', 'S', 'X'];
  const categorias = Object.keys(CATEGORIAS);
  
  const modelosBase = [
    { nome: 'John Deere 5078E', categoria: 'medio', potencia: 78, preco: 189000, destaque: false },
    { nome: 'John Deere 6120M', categoria: 'medio', potencia: 120, preco: 285000, destaque: true },
    { nome: 'John Deere 7230R', categoria: 'grande', potencia: 230, preco: 620000, destaque: true },
    { nome: 'John Deere 8400R', categoria: 'extragrande', potencia: 400, preco: 1250000, destaque: true },
    { nome: 'John Deere 3032E', categoria: 'compacto', potencia: 32, preco: 89000, destaque: false },
    { nome: 'John Deere 4044M', categoria: 'compacto', potencia: 44, preco: 135000, destaque: false },
    { nome: 'John Deere 5090E', categoria: 'medio', potencia: 90, preco: 210000, destaque: false },
    { nome: 'John Deere 6150M', categoria: 'medio', potencia: 150, preco: 340000, destaque: false },
    { nome: 'John Deere 7215R', categoria: 'grande', potencia: 215, preco: 580000, destaque: false },
    { nome: 'John Deere 8320R', categoria: 'extragrande', potencia: 320, preco: 980000, destaque: false },
    { nome: 'John Deere 5100ML', categoria: 'especial', potencia: 100, preco: 275000, destaque: true },
    { nome: 'John Deere 5075GL', categoria: 'especial', potencia: 75, preco: 195000, destaque: false },
  ];
  
  // Adicionar modelos base
  modelosBase.forEach((modelo, index) => {
    tratores.push({
      id: index + 1,
      codigo: modelo.nome.split(' ')[2],
      ...modelo,
      descricao: `Trator ${modelo.nome.split(' ').slice(1).join(' ')} com ${modelo.potencia}cv de potência. Ideal para ${modelo.categoria === 'especial' ? 'culturas especiais como café e cana-de-açúcar' : 'operações agrícolas de ' + modelo.categoria + ' porte'}.`,
      especificacoes: {
        potencia: `${modelo.potencia} cv`,
        motor: `${Math.floor(modelo.potencia * 1.5)} cc`,
        transmissao: modelo.potencia > 200 ? 'PowerShift 24x24' : 'SyncroPlus 12x12',
        tracao: modelo.potencia > 150 ? '4x4 Integral' : '4x2 ou 4x4',
        capacidade: `${Math.floor(modelo.potencia * 1.2)} L`,
        peso: `${(modelo.potencia * 25).toLocaleString()} kg`,
      },
      parcelas: Math.min(120, Math.floor(modelo.preco / 3000)),
    });
  });
  
  // Gerar variações para atingir 1.000+ modelos
  let idCounter = modelosBase.length + 1;
  
  for (let i = 0; i < 200; i++) {
    categorias.forEach((categoria) => {
      if (idCounter > 1050) return;
      
      const serie = series[Math.floor(Math.random() * series.length)];
      const potenciaBase = 
        categoria === 'compacto' ? Math.floor(Math.random() * 25) + 25 :
        categoria === 'medio' ? Math.floor(Math.random() * 50) + 55 :
        categoria === 'grande' ? Math.floor(Math.random() * 95) + 105 :
        categoria === 'extragrande' ? Math.floor(Math.random() * 200) + 210 :
        Math.floor(Math.random() * 80) + 50;
      
      const precoBase = 
        categoria === 'compacto' ? 75000 + Math.random() * 100000 :
        categoria === 'medio' ? 150000 + Math.random() * 250000 :
        categoria === 'grande' ? 350000 + Math.random() * 500000 :
        categoria === 'extragrande' ? 800000 + Math.random() * 1500000 :
        150000 + Math.random() * 300000;
      
      const numeroModelo = Math.floor(Math.random() * 9999) + 1000;
      
      tratores.push({
        id: idCounter,
        codigo: `${numeroModelo}${serie}`,
        nome: `John Deere ${numeroModelo}${serie}`,
        categoria: categoria,
        potencia: potenciaBase,
        preco: Math.round(precoBase),
        destaque: Math.random() < 0.05, // 5% de chance de ser destaque
        descricao: `Trator John Deere ${numeroModelo}${serie} com ${potenciaBase}cv de potência. Perfeito para ${categoria === 'especial' ? 'culturas especiais' : 'operações de ' + categoria + ' porte'}, oferecendo tecnologia e confiabilidade.`,
        especificacoes: {
          potencia: `${potenciaBase} cv`,
          motor: `${Math.floor(potenciaBase * 1.8)} cc`,
          transmissao: potenciaBase > 200 ? 'PowerShift Auto' : 'SyncroPlus',
          tracao: potenciaBase > 150 ? '4x4' : '4x2/4x4',
          capacidade: `${Math.floor(potenciaBase * 1.3)} L`,
          peso: `${(potenciaBase * 28).toLocaleString()} kg`,
        },
        parcelas: Math.min(120, Math.floor(precoBase / 3000)),
      });
      
      idCounter++;
    });
  }
  
  return tratores;
}

const tratores = gerarTratores();
let tratoresFiltrados = [...tratores];
let paginaAtual = 1;
const ITENS_POR_PAGINA = 12;

// ==========================================
// ELEMENTOS DO DOM
// ==========================================
const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-toggle');
const menuMobile = document.getElementById('menu-mobile');
const btnVoltarTopo = document.getElementById('btn-voltar-topo');
const buscaInput = document.getElementById('busca-input');
const btnLimparBusca = document.getElementById('btn-limpar-busca');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroPreco = document.getElementById('filtro-preco');
const filtroOrdenacao = document.getElementById('filtro-ordenacao');
const btnBuscar = document.getElementById('btn-buscar');
const btnLimparFiltros = document.getElementById('btn-limpar-filtros');
const gridProdutos = document.getElementById('grid-produtos');
const loader = document.getElementById('loader');
const estadoVazio = document.getElementById('estado-vazio');
const paginacao = document.getElementById('paginacao');
const resultadoContagem = document.getElementById('contagem-resultados');
const filtrosAtivos = document.getElementById('filtros-ativos');
const contadorTotal = document.getElementById('contador-total');
const modalOverlay = document.getElementById('modal-overlay');
const modalConteudo = document.getElementById('modal-conteudo');
const modalFechar = document.getElementById('modal-fechar');
const formCotacao = document.getElementById('form-cotacao');
const menuLinks = document.querySelectorAll('.menu-mobile-link');

// ==========================================
// FUNÇÕES UTILITÁRIAS
// ==========================================
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==========================================
// HEADER SCROLL
// ==========================================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  if (scrollY > 500) {
    btnVoltarTopo.classList.add('visible');
  } else {
    btnVoltarTopo.classList.remove('visible');
  }
});

// ==========================================
// MENU MOBILE
// ==========================================
menuToggle.addEventListener('click', () => {
  const isActive = menuToggle.classList.toggle('active');
  menuMobile.classList.toggle('active');
  menuToggle.setAttribute('aria-expanded', isActive);
  menuMobile.setAttribute('aria-hidden', !isActive);
  document.body.style.overflow = isActive ? 'hidden' : '';
});

// Fechar menu ao clicar em link
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    menuMobile.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuMobile.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================
btnVoltarTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// CONTADOR ANIMADO
// ==========================================
function animarContador() {
  const total = tratores.length;
  let atual = 0;
  const duracao = 2000;
  const incremento = Math.ceil(total / (duracao / 16));
  
  const timer = setInterval(() => {
    atual += incremento;
    if (atual >= total) {
      atual = total;
      clearInterval(timer);
    }
    contadorTotal.textContent = atual.toLocaleString();
  }, 16);
}

// ==========================================
// FILTRAGEM DE TRATORES
// ==========================================
function filtrarTratores() {
  const termoBusca = buscaInput.value.toLowerCase().trim();
  const categoria = filtroCategoria.value;
  const faixaPreco = filtroPreco.value;
  
  tratoresFiltrados = tratores.filter(trator => {
    // Busca por texto
    if (termoBusca) {
      const matchModelo = trator.nome.toLowerCase().includes(termoBusca);
      const matchCodigo = trator.codigo.toLowerCase().includes(termoBusca);
      const matchPotencia = `${trator.potencia}cv`.includes(termoBusca) || `${trator.potencia} cv`.includes(termoBusca);
      if (!matchModelo && !matchCodigo && !matchPotencia) return false;
    }
    
    // Filtro de categoria
    if (categoria !== 'todos' && trator.categoria !== categoria) return false;
    
    // Filtro de preço
    if (faixaPreco !== 'todos') {
      const [min, max] = faixaPreco.split('-').map(Number);
      if (trator.preco < min) return false;
      if (max && trator.preco > max) return false;
    }
    
    return true;
  });
  
  // Ordenação
  const ordenacao = filtroOrdenacao.value;
  switch (ordenacao) {
    case 'preco-asc':
      tratoresFiltrados.sort((a, b) => a.preco - b.preco);
      break;
    case 'preco-desc':
      tratoresFiltrados.sort((a, b) => b.preco - a.preco);
      break;
    case 'potencia-asc':
      tratoresFiltrados.sort((a, b) => a.potencia - b.potencia);
      break;
    case 'potencia-desc':
      tratoresFiltrados.sort((a, b) => b.potencia - a.potencia);
      break;
    default: // relevancia - destaques primeiro
      tratoresFiltrados.sort((a, b) => {
        if (a.destaque && !b.destaque) return -1;
        if (!a.destaque && b.destaque) return 1;
        return b.potencia - a.potencia;
      });
  }
  
  paginaAtual = 1;
  atualizarInterface();
}

function atualizarInterface() {
  atualizarTagsFiltros();
  renderizarProdutos();
  atualizarPaginacao();
  atualizarContagem();
  
  // Mostrar/ocultar botões
  btnLimparBusca.style.display = buscaInput.value ? 'flex' : 'none';
  btnLimparFiltros.style.display = 
    (filtroCategoria.value !== 'todos' || filtroPreco.value !== 'todos' || buscaInput.value) 
    ? 'inline-block' 
    : 'none';
}

function atualizarTagsFiltros() {
  filtrosAtivos.innerHTML = '';
  
  if (buscaInput.value) {
    adicionarTag(`Busca: "${buscaInput.value}"`, () => {
      buscaInput.value = '';
      filtrarTratores();
    });
  }
  
  if (filtroCategoria.value !== 'todos') {
    const catNome = CATEGORIAS[filtroCategoria.value]?.nome || filtroCategoria.value;
    adicionarTag(`Categoria: ${catNome}`, () => {
      filtroCategoria.value = 'todos';
      filtrarTratores();
    });
  }
  
  if (filtroPreco.value !== 'todos') {
    const [min, max] = filtroPreco.value.split('-').map(Number);
    const texto = max ? `${formatarPreco(min)} - ${formatarPreco(max)}` : `Acima de ${formatarPreco(min)}`;
    adicionarTag(`Preço: ${texto}`, () => {
      filtroPreco.value = 'todos';
      filtrarTratores();
    });
  }
}

function adicionarTag(texto, callback) {
  const tag = document.createElement('span');
  tag.className = 'filtro-tag';
  tag.innerHTML = `${texto} <button aria-label="Remover filtro">✕</button>`;
  tag.querySelector('button').addEventListener('click', callback);
  filtrosAtivos.appendChild(tag);
}

function atualizarContagem() {
  resultadoContagem.textContent = tratoresFiltrados.length.toLocaleString();
}

// ==========================================
// RENDERIZAÇÃO DE PRODUTOS
// ==========================================
function renderizarProdutos() {
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const paginaTratores = tratoresFiltrados.slice(inicio, fim);
  
  if (tratoresFiltrados.length === 0) {
    gridProdutos.innerHTML = '';
    estadoVazio.style.display = 'block';
    paginacao.innerHTML = '';
    return;
  }
  
  estadoVazio.style.display = 'none';
  
  const iconesPorCategoria = {
    compacto: '🚜',
    medio: '🚜',
    grande: '🚜',
    extragrande: '🚜',
    especial: '🚜',
  };
  
  gridProdutos.innerHTML = paginaTratores.map(trator => `
    <div class="card-produto" role="listitem" data-id="${trator.id}">
      ${trator.destaque ? '<span class="card-badge destaque">⭐ Destaque</span>' : ''}
      <div class="card-imagem-wrapper">
        <span class="card-imagem-icone" aria-hidden="true">${iconesPorCategoria[trator.categoria] || '🚜'}</span>
      </div>
      <div class="card-conteudo">
        <span class="card-categoria">${CATEGORIAS[trator.categoria]?.nome || trator.categoria} • ${trator.potencia}cv</span>
        <h3 class="card-modelo">${trator.codigo}</h3>
        <p class="card-descricao">${trator.descricao.substring(0, 100)}...</p>
        
        <div class="card-especificacoes">
          <div class="card-spec-item">
            <span class="card-spec-icone">⚡</span>
            <span>${trator.especificacoes.potencia}</span>
          </div>
          <div class="card-spec-item">
            <span class="card-spec-icone">🔄</span>
            <span>${trator.especificacoes.transmissao}</span>
          </div>
          <div class="card-spec-item">
            <span class="card-spec-icone">🔧</span>
            <span>${trator.especificacoes.tracao}</span>
          </div>
          <div class="card-spec-item">
            <span class="card-spec-icone">⚖️</span>
            <span>${trator.especificacoes.peso}</span>
          </div>
        </div>
        
        <div class="card-preco-wrapper">
          <div>
            <div class="card-preco-label">A partir de</div>
            <div class="card-preco">${formatarPreco(trator.preco)}</div>
          </div>
          <div class="card-preco-parcelas">até ${trator.parcelas}x</div>
        </div>
        
        <div class="card-acoes">
          <button class="btn-card btn-card-detalhes" onclick="abrirModal(${trator.id})" aria-label="Ver detalhes de ${trator.nome}">
            Detalhes
          </button>
          <button class="btn-card btn-card-cotar" onclick="solicitarCotacao('${trator.codigo}')" aria-label="Solicitar cotação de ${trator.nome}">
            Quero Este
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================
// PAGINAÇÃO
// ==========================================
function atualizarPaginacao() {
  const totalPaginas = Math.ceil(tratoresFiltrados.length / ITENS_POR_PAGINA);
  
  if (totalPaginas <= 1) {
    paginacao.innerHTML = '';
    return;
  }
  
  let html = '';
  
  // Botão anterior
  html += `<button class="btn-pagina" ${paginaAtual === 1 ? 'disabled' : ''} onclick="mudarPagina(${paginaAtual - 1})" aria-label="Página anterior">◀</button>`;
  
  // Páginas
  for (let i = 1; i <= totalPaginas; i++) {
    if (
      i === 1 || 
      i === totalPaginas || 
      (i >= paginaAtual - 2 && i <= paginaAtual + 2)
    ) {
      html += `<button class="btn-pagina ${i === paginaAtual ? 'ativo' : ''}" onclick="mudarPagina(${i})" aria-label="Página ${i}" ${i === paginaAtual ? 'aria-current="page"' : ''}>${i}</button>`;
    } else if (i === paginaAtual - 3 || i === paginaAtual + 3) {
      html += '<span style="padding: 0 0.5rem; color: #999;">...</span>';
    }
  }
  
  // Botão próximo
  html += `<button class="btn-pagina" ${paginaAtual === totalPaginas ? 'disabled' : ''} onclick="mudarPagina(${paginaAtual + 1})" aria-label="Próxima página">▶</button>`;
  
  paginacao.innerHTML = html;
  
  // Scroll suave para o topo dos produtos
  document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mudarPagina(pagina) {
  const totalPaginas = Math.ceil(tratoresFiltrados.length / ITENS_POR_PAGINA);
  if (pagina < 1 || pagina > totalPaginas) return;
  paginaAtual = pagina;
  renderizarProdutos();
  atualizarPaginacao();
  document.querySelector('.grid-produtos').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==========================================
// MODAL DE DETALHES
// ==========================================
function abrirModal(id) {
  const trator = tratores.find(t => t.id === id);
  if (!trator) return;
  
  const iconesCategoria = {
    compacto: '🚜',
    medio: '🚜',
    grande: '🚜',
    extragrande: '🚜',
    especial: '🚜',
  };
  
  modalConteudo.innerHTML = `
    <div class="modal-imagem" aria-hidden="true">
      <span style="font-size: 6rem;">${iconesCategoria[trator.categoria] || '🚜'}</span>
    </div>
    <span class="modal-categoria">${CATEGORIAS[trator.categoria]?.nome || trator.categoria} • ${trator.potencia}cv</span>
    <h2 class="modal-modelo" id="modal-titulo">${trator.nome}</h2>
    <p class="modal-descricao">${trator.descricao}</p>
    
    <div class="modal-grid-specs">
      <div class="modal-spec">
        <div class="modal-spec-valor">${trator.especificacoes.potencia}</div>
        <div class="modal-spec-label">Potência</div>
      </div>
      <div class="modal-spec">
        <div class="modal-spec-valor">${trator.especificacoes.motor}</div>
        <div class="modal-spec-label">Motor</div>
      </div>
      <div class="modal-spec">
        <div class="modal-spec-valor">${trator.especificacoes.transmissao}</div>
        <div class="modal-spec-label">Transmissão</div>
      </div>
      <div class="modal-spec">
        <div class="modal-spec-valor">${trator.especificacoes.tracao}</div>
        <div class="modal-spec-label">Tração</div>
      </div>
      <div class="modal-spec">
        <div class="modal-spec-valor">${trator.especificacoes.capacidade}</div>
        <div class="modal-spec-label">Capacidade</div>
      </div>
      <div class="modal-spec">
        <div class="modal-spec-valor">${trator.especificacoes.peso}</div>
        <div class="modal-spec-label">Peso</div>
      </div>
    </div>
    
    <div class="modal-preco">${formatarPreco(trator.preco)}</div>
    <div class="modal-preco-info">Financiamento em até ${trator.parcelas}x • Entrada facilitada</div>
    
    <button class="btn-modal-cotar" onclick="solicitarCotacao('${trator.codigo}')">
      🚜 Quero Este Trator - Solicitar Proposta
    </button>
  `;
  
  modalOverlay.classList.add('active');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Focar no modal
  setTimeout(() => {
    modalFechar.focus();
  }, 100);
}

function fecharModal() {
  modalOverlay.classList.remove('active');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalFechar.addEventListener('click', fecharModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    fecharModal();
  }
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    fecharModal();
  }
});

// ==========================================
// SOLICITAR COTAÇÃO
// ==========================================
function solicitarCotacao(codigo) {
  fecharModal();
  
  // Preencher o select do formulário com a categoria mais próxima
  const trator = tratores.find(t => t.codigo === codigo);
  if (trator) {
    const selectModelo = document.getElementById('cotacao-modelo');
    // Tentar selecionar a categoria correspondente
    for (let option of selectModelo.options) {
      if (option.value === trator.categoria) {
        selectModelo.value = trator.categoria;
        break;
      }
    }
  }
  
  // Rolar até o formulário
  document.getElementById('cotacao').scrollIntoView({ behavior: 'smooth' });
  
  // Focar no primeiro campo
  setTimeout(() => {
    document.getElementById('cotacao-nome').focus();
    
    // Adicionar mensagem sobre o modelo
    const textarea = document.getElementById('cotacao-mensagem');
    if (textarea && codigo) {
      textarea.value = `Tenho interesse no modelo ${codigo}. Gostaria de receber uma proposta.`;
    }
  }, 500);
}

// ==========================================
// EVENT LISTENERS
// ==========================================
btnBuscar.addEventListener('click', filtrarTratores);

buscaInput.addEventListener('keyup', debounce(() => {
  filtrarTratores();
}, 300));

buscaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    filtrarTratores();
  }
});

btnLimparBusca.addEventListener('click', () => {
  buscaInput.value = '';
  filtrarTratores();
  buscaInput.focus();
});

filtroCategoria.addEventListener('change', filtrarTratores);
filtroPreco.addEventListener('change', filtrarTratores);
filtroOrdenacao.addEventListener('change', filtrarTratores);

btnLimparFiltros.addEventListener('click', () => {
  buscaInput.value = '';
  filtroCategoria.value = 'todos';
  filtroPreco.value = 'todos';
  filtroOrdenacao.value = 'relevancia';
  filtrarTratores();
  buscaInput.focus();
});

// Formulário de cotação
formCotacao.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Simular envio
  const btnSubmit = formCotacao.querySelector('.btn-enviar-cotacao');
  const textoOriginal = btnSubmit.textContent;
  
  btnSubmit.textContent = '⏳ Enviando...';
  btnSubmit.disabled = true;
  
  setTimeout(() => {
    btnSubmit.textContent = '✅ Cotação Enviada com Sucesso!';
    btnSubmit.style.background = '#4CAF50';
    btnSubmit.style.color = 'white';
    
    // Resetar formulário
    setTimeout(() => {
      formCotacao.reset();
      btnSubmit.textContent = textoOriginal;
      btnSubmit.style.background = '';
      btnSubmit.style.color = '';
      btnSubmit.disabled = false;
      
      alert('Obrigado! Sua solicitação de cotação foi enviada com sucesso. Nossa equipe entrará em contato em até 24 horas.');
    }, 2000);
  }, 1500);
});

// Fechar menu mobile ao redimensionar
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    menuToggle.classList.remove('active');
    menuMobile.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuMobile.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================
function inicializar() {
  animarContador();
  filtrarTratores();
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', inicializar);

// Suporte para links do footer
document.querySelectorAll('.footer-links a[href="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const categoria = link.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    if (categoria && CATEGORIAS[categoria]) {
      filtroCategoria.value = categoria;
      filtrarTratores();
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });
});