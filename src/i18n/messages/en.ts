import { images } from "@/data/site";
import type { Dictionary } from "@/i18n/messages/pt";

const dictionary = {
  metadata: {
    title: "Pão Quente Duarte Silva | Bakery and Cafe in Pataias",
    titleTemplate: "%s | Pão Quente Duarte Silva",
    description:
      "Bakery and cafe in Pataias with fresh bread, pastries, breakfasts, and simple everyday meals.",
  },
  business: {
    name: "Pão Quente Duarte Silva",
    shortName: "Duarte Silva",
    location: "Av. Rainha Santa Isabel 113, Pataias",
    email: "geral@paoquenteduartesilva.pt",
    phone: "+351 244 580 434",
    tagline: "Fresh bread, hot coffee, and neighborhood conversations.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/sobre-nos" },
    { label: "Menu", href: "/menu" },
    { label: "Gallery", href: "/galeria" },
    { label: "Team", href: "/equipa" },
    { label: "Contacts", href: "/contactos" },
  ],
  shell: {
    brandKicker: "Pão Quente",
    footerBrandKicker: "Bakery and Cafe",
    pagesHeading: "Pages",
    contactsHeading: "Contacts",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Select language",
    backToTopLabel: "Back to top",
    backToTopAriaLabel: "Back to top of page",
  },
  openingHours: [
    { day: "Monday", hours: "06:00-19:30" },
    { day: "Tuesday", hours: "06:00-19:30" },
    { day: "Wednesday", hours: "06:00-19:30" },
    { day: "Thursday", hours: "06:00-19:30" },
    { day: "Friday", hours: "06:00-19:30" },
    { day: "Saturday", hours: "06:00-19:30" },
    { day: "Sunday", hours: "07:00-19:30" },
  ],
  pages: {
    home: {
      metadata: {
        title: "Home",
        description:
          "Fresh bread, pastries, coffee, and simple meals at Pão Quente Duarte Silva in Pataias.",
      },
      hero: {
        imageAlt: "Fresh bread on wooden boards",
        eyebrow: "Bakery and cafe in Pataias",
        title: "Fresh bread for simple days that taste better.",
        text: "On Avenida Rainha Santa Isabel, Pão Quente Duarte Silva brings together daily bakes, pastries, coffee, and simple meals in a warm, familiar setting.",
        specialtiesCta: "See Menu",
        contactCta: "Contact Us",
      },
      highlights: [
        {
          title: "Daily fresh bread",
          description: "Bakes prepared to keep up with the rhythm of Pataias.",
          iconKey: "wheat",
        },
        {
          title: "Careful pastry",
          description:
            "Sweets, croissants, and cakes with the shine of a freshly arranged display.",
          iconKey: "croissant",
        },
        {
          title: "Family atmosphere",
          description: "A counter of familiar faces, hot coffee, and attentive service.",
          iconKey: "heart",
        },
        {
          title: "Practical stop",
          description: "Breakfasts, soups, and simple choices for eating well without delay.",
          iconKey: "coffee",
        },
      ],
      specialties: {
        eyebrow: "Specialties",
        title: "From the oven to the table, without rushing.",
        text: "A few choices that belong to the daily routine: bread, croissants, cakes, and well-pulled coffee.",
        cta: "View Menu",
      },
      featuredProducts: [
        {
          name: "Mixed wheat bread",
          category: "Bread",
          description: "Crisp crust, soft crumb, and the flavor of a morning bake.",
          price: "1,20 EUR",
          image: images.bread,
          iconKey: "wheat",
        },
        {
          name: "Brioche croissant",
          category: "Croissants",
          description: "Light, golden, and perfect with freshly pulled coffee.",
          price: "1,60 EUR",
          image: images.pastry,
          iconKey: "croissant",
        },
        {
          name: "House cake",
          category: "Cakes",
          description: "A generous slice, moist texture, and homemade flavor.",
          price: "2,40 EUR",
          image: images.cake,
          iconKey: "cake",
        },
      ],
      meeting: {
        imageAlt: "Pastry display and cafe atmosphere",
        eyebrow: "Meeting point",
        title: "A counter with the smell of coffee and familiar faces.",
        text: "For people who live in Pataias, it is a daily stop. For visitors, it is a simple way to taste a Portuguese neighborhood bakery.",
        visitDetails: [
          {
            title: "Location",
            text: "Av. Rainha Santa Isabel 113, Pataias",
            iconKey: "map",
          },
          {
            title: "Freshness",
            text: "Products prepared for the day",
            iconKey: "wheat",
          },
          {
            title: "Cafe",
            text: "Espresso, latte, and breakfasts",
            iconKey: "coffee",
          },
          {
            title: "Care",
            text: "Close, friendly service",
            iconKey: "sparkles",
          },
        ],
      },
      visit: {
        eyebrow: "Visit us",
        title: "Stop by Avenida Rainha Santa Isabel.",
        cta: "View Contacts",
      },
    },
    about: {
      metadata: {
        title: "About Us",
        description:
          "Discover the identity, team, and daily care behind Pão Quente Duarte Silva in Pataias.",
      },
      hero: {
        eyebrow: "About Us",
        title: "A local bakery made of routine, care, and kindness.",
        text: "Pão Quente Duarte Silva was created to serve Pataias with fresh products and close, friendly service.",
      },
      identity: {
        eyebrow: "Identity",
        title: "The taste of a place people enter every day.",
        text: "Here, bread is baked, coffee is served, and pastry is prepared with the same simple idea: quality, freshness, and a smile at the counter.",
        body: "The connection to the community lives in small gestures: knowing the usual order, keeping a friendly word ready, and keeping the display prepared for anyone stopping by before work, for a snack, or at the end of the day.",
        imageAlt: "Artisanal bread in a bakery",
      },
      values: [
        {
          title: "Mission",
          text: "Make quality bread and pastries, serve well, and welcome people with kindness.",
          iconKey: "wheat",
        },
        {
          title: "Community",
          text: "Be a simple meeting point for people who live and work in Pataias.",
          iconKey: "heart",
        },
        {
          title: "Atmosphere",
          text: "A warm, practical, familiar space designed for easy everyday visits.",
          iconKey: "sparkles",
        },
      ],
      space: {
        eyebrow: "The space",
        title: "The smell of the oven, coffee in the air, and a display that changes with the day.",
        text: "A welcoming setting, refined without losing the ease of a local business.",
        cta: "View Gallery",
      },
    },
    menu: {
      metadata: {
        title: "Menu",
        description:
          "Browse a selection of bread, pastries, croissants, cafe items, and house specialties.",
      },
      hero: {
        eyebrow: "Menu and Specialties",
        title: "Bread, pastries, and simple choices for every day.",
        text: "A selection designed for breakfast, snacks, coffee, and practical meals.",
      },
      section: {
        eyebrow: "Sample menu",
        title: "House specialties",
        text: "The listed values are examples and may be adjusted according to availability, season, and orders.",
      },
      categories: [
        {
          title: "Bread",
          iconKey: "wheat",
          items: [
            ["Mixed wheat bread", "Daily bake, firm crust, and light crumb.", "1,20 EUR"],
            ["Bread roll", "Small bread for breakfast or a snack.", "0,35 EUR"],
            ["Seeded bread", "With toasted seeds and a more rustic flavor.", "1,80 EUR"],
          ],
        },
        {
          title: "Pastry",
          iconKey: "sparkles",
          items: [
            ["Pastel de nata", "Smooth custard and crisp puff pastry.", "1,30 EUR"],
            ["Bola de Berlim", "Soft dough with classic custard cream.", "1,50 EUR"],
            ["Muffin", "Simple, soft, and good with coffee.", "1,10 EUR"],
          ],
        },
        {
          title: "Cakes",
          iconKey: "cake",
          items: [
            ["Slice of homemade cake", "Recipe of the day, served as a generous slice.", "2,40 EUR"],
            ["Birthday cake", "Made to order, with simple decoration.", "18,00 EUR/kg"],
            ["Almond tart", "Sweet, golden, and crisp in texture.", "2,70 EUR"],
          ],
        },
        {
          title: "Croissants",
          iconKey: "croissant",
          items: [
            ["Brioche croissant", "Golden, light, and slightly sweet.", "1,60 EUR"],
            ["Ham and cheese croissant", "With cheese and ham, warmed to order.", "2,60 EUR"],
            ["Palmier", "Crisp pastry with a caramelized finish.", "1,40 EUR"],
          ],
        },
        {
          title: "Savory snacks",
          iconKey: "sandwich",
          items: [
            ["Chicken pie", "Creamy filling and shortcrust pastry.", "1,80 EUR"],
            ["Ham and cheese pastry", "Puff pastry with cheese and ham.", "1,90 EUR"],
            ["Simple sandwich", "Fresh bread with your choice of filling.", "2,50 EUR"],
          ],
        },
        {
          title: "Breakfasts",
          iconKey: "home",
          items: [
            ["Coffee and toast", "Toast on sliced bread with butter.", "2,60 EUR"],
            ["Latte and croissant", "A classic for a slower start.", "3,10 EUR"],
            ["Ham and cheese toastie", "Warm, simple, and well filled.", "3,40 EUR"],
          ],
        },
        {
          title: "Cafe",
          iconKey: "coffee",
          items: [
            ["Espresso", "Short, intense, and aromatic.", "0,85 EUR"],
            ["Latte", "Creamy and served hot.", "1,30 EUR"],
            ["Portuguese galão", "Smooth, served in a tall glass.", "1,50 EUR"],
          ],
        },
        {
          title: "Drinks",
          iconKey: "cup",
          items: [
            ["Water", "Individual bottle.", "1,00 EUR"],
            ["Fresh juice", "Prepared to order when available.", "2,80 EUR"],
            ["Iced tea", "A fresh option to pair with savory snacks.", "1,60 EUR"],
          ],
        },
        {
          title: "House specialties",
          iconKey: "soup",
          items: [
            ["Soup of the day", "Simple, warm, and comforting recipe.", "2,20 EUR"],
            ["Quick menu", "Soup, bread, and a drink.", "4,80 EUR"],
            ["Seasonal product", "Suggestion according to season and bake.", "On request"],
          ],
        },
      ],
    },
    gallery: {
      metadata: {
        title: "Gallery",
        description:
          "See images of the bread, pastry, cafe, display, and atmosphere at Pão Quente Duarte Silva.",
      },
      hero: {
        eyebrow: "Gallery",
        title: "Textures, displays, and bakery moments.",
        text: "Photographs of the bakery space, products, and atmosphere.",
      },
      section: {
        eyebrow: "Atmosphere",
        title: "A visual sample of what you find when you walk in.",
        text: "Fresh bread, pastries, coffee, the display, and that neighborhood comfort.",
      },
      lightbox: {
        zoom: "Zoom in on",
        close: "Close enlarged image",
      },
      items: [
        { title: "Clams", image: "/images/Ameijoas.jpg" },
        { title: "Baguette sandwich", image: "/images/BagueteSandes.jpg" },
        { title: "Counter", image: "/images/Bancada.jpg" },
        { title: "Pastry counter", image: "/images/Bancada2.jpg" },
        { title: "Large cake", image: "/images/bolao.jpg" },
        { title: "Small pastries", image: "/images/bolinhos.jpg" },
        { title: "Coxinha", image: "/images/Coxinha.jpg" },
        { title: "Croissants", image: "/images/Croissants.jpg" },
        { title: "Special pastry", image: "/images/FolhadoOverkill.jpg" },
        { title: "Facade", image: "/images/Frente1semchapeu.jpg" },
        { title: "Entrance", image: "/images/Frente2.jpg" },
        { title: "Ice creams", image: "/images/Gelados.jpg" },
        { title: "Pasta dishes", image: "/images/Massacomcenas.jpg" },
        { title: "Breaded cutlet", image: "/images/Panado.jpg" },
        { title: "Bread loaves", image: "/images/Paozoes.jpg" },
        { title: "Soup", image: "/images/Sopa2.jpg" },
        { title: "Stone soup", image: "/images/SopaPedra.jpg" },
        { title: "Milk bread", image: "/images/Paodeleite.jpg" },
        { title: "Cod fritter", image: "/images/PastelBacalhau.jpg" },
        { title: "Snack", image: "/images/Snack.jpg" },
      ],
    },
    team: {
      metadata: {
        title: "Team",
        description:
          "Meet the people who welcome, prepare, and care for Pão Quente Duarte Silva.",
      },
      hero: {
        eyebrow: "Team",
        title: "People who welcome, prepare, and care.",
        text: "A close, experienced team attentive to the details that make a bakery feel familiar.",
      },
      section: {
        eyebrow: "Faces of the house",
        title: "Artisanal experience with a human touch.",
        text: "Fictional roles for the initial website presentation, ready to adapt to real names.",
      },
      members: [
        {
          name: "Duarte Silva",
          role: "Manager",
          experience: "18 years of experience",
          image: images.duarte,
        },
        {
          name: "Helena Martins",
          role: "Pastry chef",
          experience: "14 years of experience",
          image: images.helena,
        },
        {
          name: "Miguel Costa",
          role: "Baker",
          experience: "11 years of experience",
          image: images.miguel,
        },
        {
          name: "Sofia Almeida",
          role: "Barista",
          experience: "7 years of experience",
          image: images.sofia,
        },
        {
          name: "Rita Neves",
          role: "Counter service",
          experience: "6 years of experience",
          image: images.rita,
        },
      ],
    },
    contacts: {
      metadata: {
        title: "Contacts",
        description:
          "Address, phone, email, and opening hours for Pão Quente Duarte Silva in Pataias.",
      },
      hero: {
        eyebrow: "Contacts",
        title: "We are in Pataias, ready for coffee and the daily bake.",
        text: "The address, phone number, and hours are here in simple text, without an embedded map.",
      },
      actions: [
        { label: "Directions", iconKey: "navigation" },
        { label: "Email", iconKey: "mail" },
        { label: "WhatsApp", iconKey: "message" },
        { label: "Call now", iconKey: "phone" },
      ],
      location: {
        eyebrow: "Location",
        title: "Find us in the heart of Pataias.",
      },
      schedule: {
        eyebrow: "Hours",
        title: "Open for coffee, warm bread, and pastries.",
      },
    },
  },
} satisfies Dictionary;

export default dictionary;
