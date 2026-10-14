/* Edite aqui os dados confirmados pela pousada. Valores nulos não são inventados. */
window.POUSADA = {
  name: 'Praia Canto do Forte Guest House',
  shortName: 'Praia Canto do Forte',
  city: 'Praia Grande · São Paulo',
  address: 'Av. Mal. Maurício José Cardoso, 358 · Canto do Forte · Praia Grande/SP · CEP 11700-140',
  phone: '5511994067444', phoneLabel: '(11) 99406-7444',
  whatsapp: '5511994067444', email: null, instagram: null, bookingUrl: null,
  maps: 'https://maps.app.goo.gl/DwAdwHoE36s8UPow5?g_st=ic',
  google: { rating: 4.7, count: 277, checked: '13/10/2026', source: 'https://www.google.com.py/travel/hotels/entity/ChkI6766pa-ZlK4BGg0vZy8xMWR6ZGg0dmp5EAE' },
  /* Somente avaliações literais, com nome, nota e fonte verificáveis. */
  reviews: [
  {
    "name": "Anelise J",
    "rating": null,
    "text": "Me senti totalmente segura e bem recebida. Recomendo muito!",
    "source": "https://wanderlog.com/drive/between/131073/131562/sao-paulo-to-guaratuba-drive",
    "sourceLabel": "Google · relato reproduzido no Wanderlog"
  },
  {
    "name": "Anavitoria G",
    "rating": 5,
    "text": "Top",
    "source": "https://wanderlog.com/geoInMonth/131506/6/praia-grande-in-june",
    "sourceLabel": "Google · relato reproduzido no Wanderlog"
  },
  {
    "name": "Eduardo C",
    "rating": 5,
    "text": "Show",
    "source": "https://wanderlog.com/geoInMonth/131506/6/praia-grande-in-june",
    "sourceLabel": "Google · relato reproduzido no Wanderlog"
  }
],
  rooms: [
    { name:'Suíte com Varanda', guests:2, size:20, detail:'Varanda · ar-condicionado · banheiro privativo', photo:'assets/varanda.webp', alt:'Varanda da pousada com rede, banco de madeira e vegetação', price:null },
    { name:'Quarto Quádruplo', guests:4, size:27, detail:'Banheiro privativo · ar-condicionado · terraço', photo:'assets/quarto.webp', alt:'Quarto da pousada com camas, janela e cortinas verdes', price:null },
    { name:'Suíte Família', guests:3, size:20, detail:'Ar-condicionado · banheiro privativo · terraço', photo:'assets/suite.webp', alt:'Quarto da pousada com cama de casal e cortinas vermelhas', price:null }
  ],
  gallery:[
    {src:'assets/piscina.webp',alt:'Piscina azul em frente à casa de dois andares com varandas',label:'Piscina & casa',category:'casa'},
    {src:'assets/patio.webp',alt:'Pátio da piscina com espreguiçadeiras e guarda-sóis brancos',label:'O pátio',category:'casa'},
    {src:'assets/varanda.webp',alt:'Varanda com rede e banco de madeira',label:'Uma pausa na varanda',category:'casa'},
    {src:'assets/suite.webp',alt:'Quarto com cama de casal, frigobar e cortinas vermelhas',label:'Dentro de casa',category:'quartos'},
    {src:'assets/quarto.webp',alt:'Quarto da pousada com camas e cortinas verdes',label:'Acomodações',category:'quartos'},
    {src:'assets/banco.webp',alt:'Banco verde na varanda da pousada',label:'Cantinhos da casa',category:'casa'}
  ],
  policies: {checkin:null,checkout:null,pets:null,breakfast:null,cancellation:null,children:null}
};
