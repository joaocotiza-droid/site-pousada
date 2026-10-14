# Praia Canto do Forte Guest House

Site estático da pousada em Praia Grande/SP.

Versão publicada: https://praia-canto-do-forte-guest-house.bertonejoaov.chatgpt.site

## Estrutura

- `dist/index.html`: página e SEO.
- `dist/styles.css`: identidade visual, vidro e mar na rolagem.
- `dist/app.js`: reservas por WhatsApp, galeria e avaliações.
- `dist/content.js`: dados e conteúdo editáveis.
- `dist/walks.js` e `dist/walks.css`: passeios interativos até a praia e o centro.
- `dist/assets/`: fotos WebP e ícones.

## Publicar

Use `dist/` como pasta pública. Não há instalação nem build. Configure o domínio nos metadados, robots e sitemap ao mudar de hospedagem.


Site estático em português, sem instalação ou compilação. Publique o conteúdo de `dist/` em um serviço de hospedagem estática com HTTPS.

## Editar

- **Contatos, quartos e políticas:** `dist/content.js`. Preencha apenas dados confirmados.
- **WhatsApp:** em `whatsapp`, use DDI e DDD, somente números, por exemplo `55DDNUMERO`. Quando há um número válido, os botões de contato passam a abrir o WhatsApp com datas, hóspedes e quarto. O número (11) 99406-7444 foi confirmado pelo solicitante como WhatsApp. O site abre a conversa com datas, hóspedes e categoria do quarto preenchidos. O visitante confirma o envio no WhatsApp.
- **Motor de reservas:** configure `bookingUrl` com o URL oficial completo. O diálogo oferece link para ele; o site não consulta inventário nem processa pagamento. Não promete passagem automática de datas a um motor sem integração documentada.
- **E-mail / Instagram:** configure `email` e `instagram`; os links surgem na seção final.
- **Textos:** edite `dist/index.html`; cards, FAQs e galeria usam `content.js`.
- **Fotos:** substitua os WebP em `dist/assets/`, atualize as descrições `alt` e mantenha versões de 640px e até 1280px. Fotos atuais são reais do anúncio da propriedade; datas das fotos não foram informadas. Na entrega final, confira a correspondência entre fotos e categorias dos quartos. As fotos dos cards representam a propriedade.
- **Avaliações:** cadastre de 6 a 8 relatos literais em `reviews`, cada um como `{name: 'nome real', rating: 5, text: 'texto original', source: 'https://...'}`. O carrossel já mostra três relatos reais: Anelise J (texto original, nota individual não confirmada), Anavitoria G (5/5) e Eduardo C (5/5). Há duas avaliações visíveis no desktop e uma com prévia da próxima no celular. Os textos foram reproduzidos literalmente de avaliações Google listadas em páginas públicas do Wanderlog. Uma nota desconhecida deve permanecer null; o site não gera estrelas nem reviewRating nesse caso. Substitua ou amplie somente com originais confirmados.
- **Preços:** `price` é o valor inicial numérico em reais; com `null`, aparece “Valores sob consulta”. Só preencha um valor que a pousada realmente pratique e especifique as condições.
- **SEO:** se trocar de domínio, atualize canonical, Open Graph, schema estático de `index.html`, `robots.txt` e `sitemap.xml`. O schema é atualizado com `content.js` no navegador. Atualize também a nota visível e o schema estático quando receber uma nova nota confirmada.

## Dados usados e pendências

Identidade e endereço foram obtidos do link Google Maps enviado. Telefone público: (11) 99406-7444, repetido no Google e em diretórios. A ficha Google indexada apresenta 4,7/5 e 277 avaliações; um agregador apresenta 278. O site identifica a data da consulta e leva à ficha atual, não alega atualização em tempo real.

Categorias, áreas e capacidades: anúncio da propriedade no Planet of Hotels. Wi-Fi, piscina, ar-condicionado e estacionamento constam no anúncio; vaga sob consulta. Café, horários, crianças, pets, cancelamento, e-mail e Instagram não foram confirmados. O WhatsApp cadastrado foi confirmado pelo solicitante. As distâncias agora aparecem como referências aproximadas, com links para conferir o percurso a pé. Sem história institucional inventada.

Fontes consultadas em 13/10/2026 (horário de São Paulo):
- https://maps.app.goo.gl/DwAdwHoE36s8UPow5?g_st=ic
- https://www.google.com.py/travel/hotels/entity/ChkI6766pa-ZlK4BGg0vZy8xMWR6ZGg0dmp5EAE
- https://pt-br.planetofhotels.com/brasil/praia-grande-46654/praia-canto-do-forte-guest-house
- https://www.locaisdobrasil.com.br/encontre/hotel/praia-grande-sp/praia-canto-do-forte-guest-house/63d28432147bc321064c5c5b

## Funcionalidade e verificação

Datas obrigatórias: chegada a partir da data atual da pousada e saída depois da chegada. O formulário prepara a consulta; ele não confirma nem envia uma reserva na ausência de um canal configurado. Links de telefone, endereço e mapa funcionam diretamente. Diálogos nativos com Escape, retorno de foco, setas na galeria e gestos de deslizar; navegação móvel, filtros e movimento reduzido.

Breakpoints para 360px, 480px, 800px, 1100px e telas grandes. Validação de sintaxe JavaScript, integridade de arquivos/links internos, semântica, alt e contraste realizada. Não houve execução em Chrome, Safari, Firefox ou Edge: o controle de navegador compatível não estava disponível. Core Web Vitals e conformidade WCAG AA integral exigem medição em navegador e dispositivo reais; não foram certificados.

O site hospedado inicialmente tem acesso privado, para revisão. Código completo está neste pacote e pode ser publicado em outro domínio. Nenhum backend, coleta de dados, pagamento ou analytics foi acrescentado.

## Revisão visual

Ícones em SVG fine line substituem símbolos tipográficos e emojis. O mar no fundo usa cinco caminhos SVG que mudam conforme a rolagem, com eventos passivos e requestAnimationFrame. Sem vídeo, canvas ou biblioteca pesada. O modo de movimento reduzido mantém as ondas estáticas. Nova chamada: “Um mergulho. Uma rede. Uns dias só seus.”

Fontes dos relatos: https://wanderlog.com/drive/between/131073/131562/sao-paulo-to-guaratuba-drive e https://wanderlog.com/geoInMonth/131506/6/praia-grande-in-june . Algumas páginas do agregador apresentam instantâneos diferentes; nenhuma nota desconhecida foi presumida.

## WhatsApp e passeios

WhatsApp confirmado: +55 11 99406-7444. Contato direto e formulário usam wa.me. O formulário valida chegada/saída e abre a conversa com uma mensagem codificada contendo datas, número de hóspedes e categoria escolhida quando aplicável. Abertura por navegação direta para evitar bloqueio de popup em dispositivos móveis.

Nova seção “Da nossa porta para os seus planos”, com seleção Praia/Centro, pegadas fine line, repetição do passeio e links de Google Maps em modo walking. As distâncias são referências aproximadas publicadas, sem tempos de caminhada nem contagem de passos presumidos: cerca de 400m para a Praia do Canto do Forte e 900m para o centro de Praia Grande. O desenho é ilustrativo, não traçado geográfico. O destino do centro é a região comercial da Avenida Costa e Silva, Boqueirão.

Fontes de distância: https://www.airpaz.com/da/hotel/praia-canto-do-forte-guest-house.1480372 e https://www.kayak.com.br/Hoteis-Praia-Canto-do-Forte-Guest-House-Praia-Grande.2975301.ksp . Referência para o centro comercial: https://www2.praiagrande.sp.gov.br/noticia/id/59067 .
