import { images } from "@/data/site";

const dictionary = {
  metadata: {
    title: "Pão Quente Duarte Silva | Padaria e Café em Pataias",
    titleTemplate: "%s | Pão Quente Duarte Silva",
    description:
      "Padaria e café em Pataias com pão fresco, pastelaria, pequenos-almoços e refeições simples do dia a dia.",
  },
  business: {
    name: "Pão Quente Duarte Silva",
    shortName: "Duarte Silva",
    location: "Av. Rainha Santa Isabel 113, Pataias",
    email: "geral@paoquenteduartesilva.pt",
    phone: "+351 244 580 434",
    tagline: "Pão fresco, café quente e conversas de bairro.",
  },
  navigation: [
    { label: "Início", href: "/" },
    { label: "Sobre Nós", href: "/sobre-nos" },
    { label: "Menu", href: "/menu" },
    { label: "Galeria", href: "/galeria" },
    { label: "Equipa", href: "/equipa" },
    { label: "Contactos", href: "/contactos" },
  ],
  shell: {
    brandKicker: "Pão Quente",
    footerBrandKicker: "Padaria e Café",
    pagesHeading: "Páginas",
    contactsHeading: "Contactos",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageLabel: "Selecionar idioma",
  },
  openingHours: [
    { day: "Segunda-feira", hours: "06:00-19:30" },
    { day: "Terça-feira", hours: "06:00-19:30" },
    { day: "Quarta-feira", hours: "06:00-19:30" },
    { day: "Quinta-feira", hours: "06:00-19:30" },
    { day: "Sexta-feira", hours: "06:00-19:30" },
    { day: "Sábado", hours: "06:00-19:30" },
    { day: "Domingo", hours: "07:00-19:30" },
  ],
  pages: {
    home: {
      metadata: {
        title: "Início",
        description:
          "Pão fresco, pastelaria, café e refeições simples no Pão Quente Duarte Silva em Pataias.",
      },
      hero: {
        imageAlt: "Pão fresco em tábuas de madeira",
        eyebrow: "Padaria e café em Pataias",
        title: "Pão fresco para os dias simples que sabem melhor.",
        text: "Na Avenida Rainha Santa Isabel, o Pão Quente Duarte Silva junta fornadas do dia, pastelaria, café e refeições simples num ambiente acolhedor e familiar.",
        specialtiesCta: "Ver Especialidades",
        contactCta: "Contactar",
      },
      highlights: [
        {
          title: "Pão fresco diário",
          description: "Fornadas preparadas para acompanhar a rotina de Pataias.",
          iconKey: "wheat",
        },
        {
          title: "Pastelaria cuidada",
          description:
            "Doces, croissants e bolos com aquele brilho de vitrine acabada de compor.",
          iconKey: "croissant",
        },
        {
          title: "Ambiente familiar",
          description: "Um balcão de caras conhecidas, café quente e atendimento atento.",
          iconKey: "heart",
        },
        {
          title: "Paragem prática",
          description:
            "Pequenos-almoços, sopas e escolhas simples para comer bem sem demora.",
          iconKey: "coffee",
        },
      ],
      specialties: {
        eyebrow: "Especialidades",
        title: "Da fornada para a mesa, sem pressa.",
        text: "Algumas escolhas que fazem parte da rotina: pão, croissants, bolos e café bem tirado.",
        cta: "Ver Menu",
      },
      featuredProducts: [
        {
          name: "Pão de mistura",
          category: "Pão",
          description: "Casca crocante, miolo macio e sabor de fornada da manhã.",
          price: "1,20 EUR",
          image: images.bread,
          iconKey: "wheat",
        },
        {
          name: "Croissant brioche",
          category: "Croissants",
          description: "Leve, dourado e perfeito com café acabado de tirar.",
          price: "1,60 EUR",
          image: images.pastry,
          iconKey: "croissant",
        },
        {
          name: "Bolo da casa",
          category: "Bolos",
          description: "Fatia generosa, textura húmida e sabor caseiro.",
          price: "2,40 EUR",
          image: images.cake,
          iconKey: "cake",
        },
      ],
      meeting: {
        imageAlt: "Montra de pastelaria e ambiente de café",
        eyebrow: "Ponto de encontro",
        title: "Um balcão com cheiro a café e caras conhecidas.",
        text: "Para quem vive em Pataias, é uma paragem diária. Para quem visita, é uma forma simples de provar uma padaria portuguesa de bairro.",
        visitDetails: [
          {
            title: "Localização",
            text: "Av. Rainha Santa Isabel 113, Pataias",
            iconKey: "map",
          },
          {
            title: "Frescura",
            text: "Produtos preparados para o dia",
            iconKey: "wheat",
          },
          {
            title: "Cafetaria",
            text: "Café, galão e pequenos-almoços",
            iconKey: "coffee",
          },
          {
            title: "Cuidado",
            text: "Atendimento próximo e simpático",
            iconKey: "sparkles",
          },
        ],
      },
      visit: {
        eyebrow: "Visite-nos",
        title: "Passe pela Avenida Rainha Santa Isabel.",
        cta: "Ver Contactos",
      },
    },
    about: {
      metadata: {
        title: "Sobre Nós",
        description:
          "Conheça a identidade, a equipa e o cuidado diário do Pão Quente Duarte Silva em Pataias.",
      },
      hero: {
        eyebrow: "Sobre Nós",
        title: "Uma padaria local feita de rotina, cuidado e simpatia.",
        text: "O Pão Quente Duarte Silva nasceu para servir Pataias com produtos frescos e um atendimento próximo.",
      },
      identity: {
        eyebrow: "Identidade",
        title: "O sabor de uma casa onde se entra todos os dias.",
        text: "Aqui faz-se pão, serve-se café e prepara-se pastelaria com a mesma ideia simples: qualidade, frescura e um sorriso ao balcão.",
        body: "A ligação à comunidade está nos pequenos gestos: conhecer o pedido habitual, guardar uma palavra amiga e manter a montra pronta para quem passa antes do trabalho, ao lanche ou ao fim do dia.",
        imageAlt: "Pão artesanal numa padaria",
      },
      values: [
        {
          title: "Missão",
          text: "Fazer pão e pastelaria com qualidade, servir bem e receber com simpatia.",
          iconKey: "wheat",
        },
        {
          title: "Comunidade",
          text: "Ser um ponto de encontro simples para quem vive e trabalha em Pataias.",
          iconKey: "heart",
        },
        {
          title: "Ambiente",
          text: "Um espaço quente, prático e familiar, pensado para entrar sem cerimónia.",
          iconKey: "sparkles",
        },
      ],
      space: {
        eyebrow: "O espaço",
        title: "Cheiro a forno, café no ar e uma montra que muda com o dia.",
        text: "Um ambiente acolhedor, refinado sem perder a naturalidade de um negócio local.",
        cta: "Ver Galeria",
      },
    },
    menu: {
      metadata: {
        title: "Menu",
        description:
          "Veja uma seleção de pão, pastelaria, croissants, cafetaria e especialidades da casa.",
      },
      hero: {
        eyebrow: "Menu e Especialidades",
        title: "Pão, pastelaria e escolhas simples para todos os dias.",
        text: "Uma seleção pensada para pequeno-almoço, lanche, café e refeições práticas.",
      },
      section: {
        eyebrow: "Carta exemplo",
        title: "Especialidades da casa",
        text: "Os valores apresentados são exemplos e podem ser ajustados conforme disponibilidade, época e encomendas.",
      },
      categories: [
        {
          title: "Pão",
          iconKey: "wheat",
          items: [
            ["Pão de mistura", "Fornada diária, casca firme e miolo leve.", "1,20 EUR"],
            ["Carcaça", "Pão pequeno para pequeno-almoço ou lanche.", "0,35 EUR"],
            ["Pão de sementes", "Com sementes tostadas e sabor mais rústico.", "1,80 EUR"],
          ],
        },
        {
          title: "Pastelaria",
          iconKey: "sparkles",
          items: [
            ["Pastel de nata", "Creme suave e massa folhada estaladiça.", "1,30 EUR"],
            ["Bola de Berlim", "Massa fofa com creme clássico.", "1,50 EUR"],
            ["Queque", "Simples, macio e bom para acompanhar café.", "1,10 EUR"],
          ],
        },
        {
          title: "Bolos",
          iconKey: "cake",
          items: [
            ["Fatia de bolo caseiro", "Receita do dia, servida em fatia generosa.", "2,40 EUR"],
            ["Bolo de aniversário", "Por encomenda, com decoração simples.", "18,00 EUR/kg"],
            ["Tarte de amêndoa", "Doce, dourada e com textura crocante.", "2,70 EUR"],
          ],
        },
        {
          title: "Croissants",
          iconKey: "croissant",
          items: [
            ["Croissant brioche", "Dourado, leve e ligeiramente doce.", "1,60 EUR"],
            ["Croissant misto", "Com queijo e fiambre, aquecido no momento.", "2,60 EUR"],
            ["Palmier", "Folhado crocante com acabamento caramelizado.", "1,40 EUR"],
          ],
        },
        {
          title: "Salgados",
          iconKey: "sandwich",
          items: [
            ["Empada de galinha", "Recheio cremoso e massa quebrada.", "1,80 EUR"],
            ["Merenda mista", "Folhado com queijo e fiambre.", "1,90 EUR"],
            ["Sandes simples", "Pão fresco com recheio à escolha.", "2,50 EUR"],
          ],
        },
        {
          title: "Pequenos-almoços",
          iconKey: "home",
          items: [
            ["Café e torrada", "Torrada em pão de forma com manteiga.", "2,60 EUR"],
            ["Meia de leite e croissant", "Um clássico para começar devagar.", "3,10 EUR"],
            ["Tosta mista", "Quente, simples e bem recheada.", "3,40 EUR"],
          ],
        },
        {
          title: "Cafetaria",
          iconKey: "coffee",
          items: [
            ["Café", "Expresso curto, intenso e aromático.", "0,85 EUR"],
            ["Meia de leite", "Cremosa e servida quente.", "1,30 EUR"],
            ["Galão", "Suave, em copo alto.", "1,50 EUR"],
          ],
        },
        {
          title: "Bebidas",
          iconKey: "cup",
          items: [
            ["Água", "Garrafa individual.", "1,00 EUR"],
            ["Sumo natural", "Preparado no momento quando disponível.", "2,80 EUR"],
            ["Iced tea", "Opção fresca para acompanhar salgados.", "1,60 EUR"],
          ],
        },
        {
          title: "Especialidades da casa",
          iconKey: "soup",
          items: [
            ["Sopa do dia", "Receita simples, quente e reconfortante.", "2,20 EUR"],
            ["Menu rápido", "Sopa, pão e bebida.", "4,80 EUR"],
            ["Produto sazonal", "Sugestão conforme época e fornada.", "Sob consulta"],
          ],
        },
      ],
    },
    gallery: {
      metadata: {
        title: "Galeria",
        description:
          "Veja imagens do pão, pastelaria, cafetaria, montra e ambiente do Pão Quente Duarte Silva.",
      },
      hero: {
        eyebrow: "Galeria",
        title: "Texturas, vitrines e momentos de padaria.",
        text: "Imagens placeholder de alta qualidade para representar o espaço, os produtos e o ambiente.",
      },
      section: {
        eyebrow: "Ambiente",
        title: "Uma amostra visual do que se encontra ao entrar.",
        text: "Pão fresco, pastelaria, café, montra e aquele conforto de bairro.",
      },
      items: [
        { title: "Pão acabado de sair", image: images.hero },
        { title: "Croissants dourados", image: images.pastry },
        { title: "Café ao balcão", image: images.coffee },
        { title: "Montra doce", image: images.counter },
        { title: "Bolos para partilhar", image: images.cake },
        { title: "Fornadas de bairro", image: images.bakery },
        { title: "Pequenos-almoços", image: images.breakfast },
        { title: "Ambiente acolhedor", image: images.cafe },
      ],
    },
    team: {
      metadata: {
        title: "Equipa",
        description:
          "Conheça as pessoas que recebem, preparam e cuidam do Pão Quente Duarte Silva.",
      },
      hero: {
        eyebrow: "Equipa",
        title: "Pessoas que recebem, preparam e cuidam.",
        text: "Uma equipa próxima, experiente e atenta aos detalhes que fazem uma padaria sentir-se familiar.",
      },
      section: {
        eyebrow: "Rosto da casa",
        title: "Experiência artesanal com trato humano.",
        text: "Funções fictícias para apresentação inicial do website, prontas a adaptar aos nomes reais.",
      },
      members: [
        {
          name: "Duarte Silva",
          role: "Gerente",
          experience: "18 anos de experiência",
          image: images.duarte,
        },
        {
          name: "Helena Martins",
          role: "Pasteleira",
          experience: "14 anos de experiência",
          image: images.helena,
        },
        {
          name: "Miguel Costa",
          role: "Padeiro",
          experience: "11 anos de experiência",
          image: images.miguel,
        },
        {
          name: "Sofia Almeida",
          role: "Barista",
          experience: "7 anos de experiência",
          image: images.sofia,
        },
        {
          name: "Rita Neves",
          role: "Atendimento ao balcão",
          experience: "6 anos de experiência",
          image: images.rita,
        },
      ],
    },
    contacts: {
      metadata: {
        title: "Contactos",
        description:
          "Morada, telefone, email e horário do Pão Quente Duarte Silva em Pataias.",
      },
      hero: {
        eyebrow: "Contactos",
        title: "Estamos em Pataias, prontos para o café e a fornada do dia.",
        text: "A morada, o telefone e o horário ficam aqui em texto simples, sem mapa incorporado.",
      },
      actions: [
        { label: "Direções", iconKey: "navigation" },
        { label: "Email", iconKey: "mail" },
        { label: "WhatsApp", iconKey: "message" },
        { label: "Ligue agora", iconKey: "phone" },
      ],
      location: {
        eyebrow: "Localização",
        title: "Encontra-nos no coração de Pataias.",
      },
      schedule: {
        eyebrow: "Horário",
        title: "Aberto para café, pão quente e pastelaria.",
      },
    },
  },
};

export type Dictionary = typeof dictionary;

export default dictionary;
