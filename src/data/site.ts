import type { LucideIcon } from "lucide-react";
import {
  Bean,
  CakeSlice,
  Coffee,
  Croissant,
  CupSoda,
  HeartHandshake,
  Home,
  MapPin,
  Sandwich,
  Soup,
  Sparkles,
  Wheat,
} from "lucide-react";

export const business = {
  name: "Pão Quente Duarte Silva",
  shortName: "Duarte Silva",
  location: "Avenida Rainha Santa Isabel, Pataias",
  email: "geral@paoquenteduartesilva.pt",
  phone: "+351 244 000 000",
  hours: "Segunda a Sábado: 07:00 - 19:30",
  tagline: "Pão fresco, café quente e conversas de bairro.",
};

export const navigation = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Menu", href: "/menu" },
  { label: "Galeria", href: "/galeria" },
  { label: "Equipa", href: "/equipa" },
  { label: "Contactos", href: "/contactos" },
];

export const images = {
  hero:
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=85&w=1800",
  counter:
    "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=85&w=1400",
  coffee:
    "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=85&w=1200",
  pastry:
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=85&w=1200",
  bread:
    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=85&w=1200",
  cake:
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=85&w=1200",
};

export type Highlight = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const highlights: Highlight[] = [
  {
    title: "Pão fresco diário",
    description: "Fornadas preparadas para acompanhar a rotina de Pataias.",
    icon: Wheat,
  },
  {
    title: "Pastelaria cuidada",
    description: "Doces, croissants e bolos com aquele brilho de vitrine acabada de compor.",
    icon: Croissant,
  },
  {
    title: "Ambiente familiar",
    description: "Um balcão de caras conhecidas, café quente e atendimento atento.",
    icon: HeartHandshake,
  },
  {
    title: "Paragem prática",
    description: "Pequenos-almoços, sopas e escolhas simples para comer bem sem demora.",
    icon: Coffee,
  },
];

export type Product = {
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  icon: LucideIcon;
};

export const featuredProducts: Product[] = [
  {
    name: "Pão de mistura",
    category: "Pão",
    description: "Casca crocante, miolo macio e sabor de fornada da manhã.",
    price: "1,20 EUR",
    image: images.bread,
    icon: Wheat,
  },
  {
    name: "Croissant brioche",
    category: "Croissants",
    description: "Leve, dourado e perfeito com café acabado de tirar.",
    price: "1,60 EUR",
    image: images.pastry,
    icon: Croissant,
  },
  {
    name: "Bolo da casa",
    category: "Bolos",
    description: "Fatia generosa, textura húmida e sabor caseiro.",
    price: "2,40 EUR",
    image: images.cake,
    icon: CakeSlice,
  },
];

export const menuCategories = [
  {
    title: "Pão",
    icon: Wheat,
    items: [
      ["Pão de mistura", "Fornada diária, casca firme e miolo leve.", "1,20 EUR"],
      ["Carcaça", "Pão pequeno para pequeno-almoço ou lanche.", "0,35 EUR"],
      ["Pão de sementes", "Com sementes tostadas e sabor mais rústico.", "1,80 EUR"],
    ],
  },
  {
    title: "Pastelaria",
    icon: Sparkles,
    items: [
      ["Pastel de nata", "Creme suave e massa folhada estaladiça.", "1,30 EUR"],
      ["Bola de Berlim", "Massa fofa com creme clássico.", "1,50 EUR"],
      ["Queque", "Simples, macio e bom para acompanhar café.", "1,10 EUR"],
    ],
  },
  {
    title: "Bolos",
    icon: CakeSlice,
    items: [
      ["Fatia de bolo caseiro", "Receita do dia, servida em fatia generosa.", "2,40 EUR"],
      ["Bolo de aniversário", "Por encomenda, com decoração simples.", "18,00 EUR/kg"],
      ["Tarte de amêndoa", "Doce, dourada e com textura crocante.", "2,70 EUR"],
    ],
  },
  {
    title: "Croissants",
    icon: Croissant,
    items: [
      ["Croissant brioche", "Dourado, leve e ligeiramente doce.", "1,60 EUR"],
      ["Croissant misto", "Com queijo e fiambre, aquecido no momento.", "2,60 EUR"],
      ["Palmier", "Folhado crocante com acabamento caramelizado.", "1,40 EUR"],
    ],
  },
  {
    title: "Salgados",
    icon: Sandwich,
    items: [
      ["Empada de galinha", "Recheio cremoso e massa quebrada.", "1,80 EUR"],
      ["Merenda mista", "Folhado com queijo e fiambre.", "1,90 EUR"],
      ["Sandes simples", "Pão fresco com recheio à escolha.", "2,50 EUR"],
    ],
  },
  {
    title: "Pequenos-almoços",
    icon: Home,
    items: [
      ["Café e torrada", "Torrada em pão de forma com manteiga.", "2,60 EUR"],
      ["Meia de leite e croissant", "Um clássico para começar devagar.", "3,10 EUR"],
      ["Tosta mista", "Quente, simples e bem recheada.", "3,40 EUR"],
    ],
  },
  {
    title: "Cafetaria",
    icon: Coffee,
    items: [
      ["Café", "Expresso curto, intenso e aromático.", "0,85 EUR"],
      ["Meia de leite", "Cremosa e servida quente.", "1,30 EUR"],
      ["Galão", "Suave, em copo alto.", "1,50 EUR"],
    ],
  },
  {
    title: "Bebidas",
    icon: CupSoda,
    items: [
      ["Água", "Garrafa individual.", "1,00 EUR"],
      ["Sumo natural", "Preparado no momento quando disponível.", "2,80 EUR"],
      ["Iced tea", "Opção fresca para acompanhar salgados.", "1,60 EUR"],
    ],
  },
  {
    title: "Especialidades da casa",
    icon: Soup,
    items: [
      ["Sopa do dia", "Receita simples, quente e reconfortante.", "2,20 EUR"],
      ["Menu rápido", "Sopa, pão e bebida.", "4,80 EUR"],
      ["Produto sazonal", "Sugestão conforme época e fornada.", "Sob consulta"],
    ],
  },
];

export const gallery = [
  { title: "Pão acabado de sair", image: images.hero },
  { title: "Croissants dourados", image: images.pastry },
  { title: "Café ao balcão", image: images.coffee },
  { title: "Montra doce", image: images.counter },
  { title: "Bolos para partilhar", image: images.cake },
  {
    title: "Fornadas de bairro",
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=85&w=1200",
  },
  {
    title: "Pequenos-almoços",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=85&w=1200",
  },
  {
    title: "Ambiente acolhedor",
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=85&w=1200",
  },
];

export const team = [
  {
    name: "Duarte Silva",
    role: "Gerente",
    experience: "18 anos de experiência",
    image:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=85&w=900",
  },
  {
    name: "Helena Martins",
    role: "Pasteleira",
    experience: "14 anos de experiência",
    image:
      "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=85&w=900",
  },
  {
    name: "Miguel Costa",
    role: "Padeiro",
    experience: "11 anos de experiência",
    image:
      "https://images.unsplash.com/photo-1622021142947-da7dedc7c39a?auto=format&fit=crop&q=85&w=900",
  },
  {
    name: "Sofia Almeida",
    role: "Barista",
    experience: "7 anos de experiência",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=85&w=900",
  },
  {
    name: "Rita Neves",
    role: "Atendimento ao balcão",
    experience: "6 anos de experiência",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=85&w=900",
  },
];

export const contactDetails = [
  { label: "Morada", value: business.location, icon: MapPin },
  { label: "Email", value: business.email, icon: Bean },
  { label: "Telefone", value: business.phone, icon: Coffee },
  { label: "Horario", value: business.hours, icon: Wheat },
];
