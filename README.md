# Marketeria - Sistema de Marketing B2B

Sistema completo de marketing em HTML/CSS/JS vanilla para geração de leads B2B, nutrição automatizada e retenção de clientes.

## 📋 Estrutura do Site

- **index.html** - Home institucional com posicionamento e navegação para todos os funis
- **grader.html** - Growth Grader com diagnóstico multipasso e sistema de pontuação
- **leads.html** - Funil 1: Gerar Tráfego e Leads
- **engage.html** - Funil 2: Engajar e Nutrir Leads  
- **retain.html** - Funil 3: Encantar e Reter Clientes
- **integrate.html** - Funil 4: Visão Centralizada/Integração
- **thanks.html** - Página de agradecimento pós-formulário
- **privacy.html** - Política de Privacidade (LGPD compliant)
- **terms.html** - Termos de Uso
- **styles.css** - CSS responsivo e otimizado
- **main.js** - JavaScript com Growth Grader e analytics
- **robots.txt** - SEO e indexação
- **sitemap.xml** - Mapa do site

## 🚀 Deploy no Netlify

1. **Conectar Repositório:**
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte sua conta GitHub
   - Selecione este repositório

2. **Configurações de Build:**
   - Build command: (deixar vazio)
   - Publish directory: `/` (raiz)
   - Deploy automaticamente a cada push

3. **Configurações Importantes:**
   - Ativar "Form detection" para Netlify Forms
   - Configurar redirects se necessário
   - SSL será ativado automaticamente

## 📧 Sequência de 7 Emails (Resumo)

### Email 1: Boas-vindas + Indoctrinação
- **Assunto:** "Seu material chegou! + Um segredo sobre máquinas de vendas B2B"
- **Conteúdo:** Entrega do material + história pessoal do fundador + CTA WhatsApp
- **Timing:** Imediatamente após opt-in

### Email 2: Valor Educacional + Convite Tripwire
- **Assunto:** "Por que 90% das empresas B2B falham em vendas (e como não ser uma delas)"
- **Conteúdo:** Conteúdo denso + case de sucesso + convite para tripwire correspondente
- **Timing:** 24h após email 1

### Email 3: Case de Sucesso + Prova Social
- **Assunto:** "Como a [EmpresaX] aumentou vendas em 340% em 90 dias"
- **Conteúdo:** Case detalhado + depoimento + prova social
- **Timing:** 48h após email 1

### Email 4: Oferta Principal + Stack de Valor
- **Assunto:** "Última chance: Sistema completo por apenas R$X (67% OFF)"
- **Conteúdo:** Apresentação da oferta + stack completo + garantia
- **Timing:** 72h após email 1

### Email 5: Objeções + FAQ
- **Assunto:** "As 5 desculpas que te impedem de ter uma máquina de vendas"
- **Conteúdo:** Superação de objeções + FAQ + stories de transformação
- **Timing:** 96h após email 1

### Email 6: Urgência + Escassez
- **Assunto:** "⏰ Últimas 12 horas - A oferta expira à meia-noite"
- **Conteúdo:** Escassez ética + urgência + último call to action
- **Timing:** 120h após email 1

### Email 7: Pós-Oferta + Downsells
- **Assunto:** "Perdeu a oferta? Aqui estão suas opções..."
- **Conteúdo:** Downsells + convite para comunidade + mentoria individual
- **Timing:** 24h após expirar oferta

## 🔧 Integrações Recomendadas

### Google Analytics 4
```javascript
// Adicionar no <head> de todas as páginas
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'SEU_GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel (opcional)
```javascript
// Código já preparado nos arquivos HTML (comentado)
// Descomentar e adicionar PIXEL_ID
```

### Netlify Forms
- ✅ Já configurado em todos os formulários
- Atributo `data-netlify="true"` em todos os forms
- Campos hidden com `name="form-name"`

### WhatsApp Business API
- Todos os CTAs direcionam para: `https://wa.me/5551981349757`
- Mensagens pré-formatadas com context específico
- Growth Grader gera mensagem personalizada

## 📊 Analytics e Tracking

O arquivo `main.js` inclui tracking para:
- Submissões de formulário
- Cliques em CTAs
- Scroll de 50% da página
- Visualizações de seções importantes
- Tempo de carregamento
- Exit intent (desktop)
- Foco em campos de formulário

## 🎯 Conversões Configuradas

1. **Lead Magnets:** Formulários Netlify → Thanks page
2. **Growth Grader:** Cálculo de pontuação → WhatsApp automático
3. **Tripwires:** CTAs direcionam para WhatsApp com contexto
4. **Upsells:** Ofertas integradas com WhatsApp

## 🔒 Conformidade LGPD

- Política de Privacidade completa
- Termos de Uso detalhados
- Consentimentos explícitos nos formulários
- Opção de descadastro em todos os emails
- Proteção de dados implementada

## 📱 Responsividade

- Mobile-first design
- Breakpoints: 768px e 480px
- Navegação mobile com hamburger menu
- Formulários otimizados para touch
- Imagens responsivas

## ⚡ Performance

- CSS e JS otimizados
- Lazy loading para imagens
- Fontes do sistema
- Minificação recomendada para produção
- Cache headers configuráveis

## 🛠️ Manutenção

### Atualizações Regulares:
- Revisar CTAs e preços trimestralmente
- Atualizar cases e testimonials
- Testar formulários mensalmente
- Monitorar analytics e conversões

### Backup:
- Código versionado no Git
- Formulários salvos no Netlify
- Analytics preservados no GA4

## 📞 Suporte

- **WhatsApp:** (51) 98134-9757
- **Email:** contato@marketeria.com.br
- **Site:** marketeria.com.br

---

*Sistema desenvolvido para maximizar conversões B2B através de funis especializados e automação inteligente.*