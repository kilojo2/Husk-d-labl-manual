import ArticlePage from "@/components/ArticlePage";
import MarkdownContent from "@/components/MarkdownContent";
import type { ContentBlock } from "@/components/MarkdownContent";

const blocks: ContentBlock[] = [
  {
    type: "heading",
    text: "Тип меню",
  },

  // ═══ Ноу-нюд ═══
  { type: "subheading", text: "1. Ноу-нюд (No Nude)" },
  { type: "paragraph", text: "Мягкое, без обнажения — только лицо, одежда, эмоции и лёгкие действия." },

  { type: "subheading", text: "База" },
  { type: "list", items: [
    "Pm 💌",
    "Hi 👋",
    "Hello 👋",
    "Heyyy 👋",
    "Air kiss 💋",
    "Eye contact 👀",
    "Don't stop 😍",
    "Keep going 😍",
    "If you love me 🥰",
    "Make me happy 🥰",
    "Day off 💤",
    "My little dream 🥳",
    "Your name on my body ✍️ (поверх одежды)",
    "Dick rate 🍆",
    "Small dick tax 🍌",
    "Big dick tax 🍆",
    "Cum tax 💦",
    "Masturbation tax 🙈",
  ]},

  { type: "subheading", text: "Лайт" },
  { type: "list", items: [
    "Wink 😉",
    "Smile for you ☺️",
    "Show tongue 👅",
    "Lick fingers 👄☝️",
    "Suck fingers 🫦☝️",
    "Lick or bite my lips 👄👅",
    "Ahegao 🥵",
    "Spin around 🔄",
    "Stand up, please 🙏",
    "Show outfit 👗",
    "Put on/off heels 👠",
    "Put on/off stockings/tights/pantyhose 🦵",
    "Change outfit 👗",
  ]},

  { type: "subheading", text: "Дразнилки (лёгкие)" },
  { type: "list", items: [
    "Panties tease 👙 (поверх одежды)",
    "Show outfit + spin",
    "Handbra (поверх одежды)",
  ]},

  // ═══ Полу-нюд ═══
  { type: "divider" },
  { type: "subheading", text: "2. Полу-нюд (Semi Nude)" },
  { type: "paragraph", text: "Частичное обнажение, бельё, намёки, без полного нюда и без проникновения." },
  { type: "paragraph", text: "База + Лайт (всё из ноу-нюд +)" },

  { type: "subheading", text: "Дразнилки" },
  { type: "list", items: [
    "Panties tease 👙",
    "Show butt 🍑 (в трусиках)",
    "Flash ass in panties 🍑",
    "Shake ass 🍑",
    "Flash tits 🍒 (руками/белье)",
    "Show tits 🍒 (в белье / частично)",
    "Handbra 🍒",
    "Squeeze boobs 🍒",
    "Oil tits 🍒 / Oil feet 🦶",
    "Spit on boobs 💧🍒",
    "Bounce & shake tits 🍒↕️",
    "Slap boobs 👋🍒",
    "Spank ass (×3 / ×5) 👋🍑",
    "Make my ass red 🍑 (поверх белья)",
    "Show feet 🦶",
    "Show armpits 🙆‍♀️",
  ]},

  { type: "subheading", text: "Горячие (полу)" },
  { type: "list", items: [
    "Get naked до белья 🥵",
    "Naked 5–10 min в белье 🥵",
    "Oil ass 🍑",
    "Butt plug (поверх/в белье) 🍑💎",
  ]},

  // ═══ Фулл-нюд ═══
  { type: "divider" },
  { type: "subheading", text: "3. Фулл-нюд (Full Nude)" },
  { type: "paragraph", text: "Полное обнажение + все горячие действия." },
  { type: "paragraph", text: "Всё из полу-нюд +"},

  { type: "subheading", text: "Горячие" },
  { type: "list", items: [
    "Get naked 🥵",
    "Naked 5–10 min 🥵",
    "Full naked for stream 🥵",
    "Spread pussy open 🍓",
    "Show tight asshole 🍑",
    "Doggy 🍑",
    "Ride pillow 🤠",
    "Ride dildo 🤠🍆",
    "Finger pussy 🖖🍓",
    "Finger ass 🖖🍑",
    "Fuck pussy with dildo 🍓🍆",
    "Fuck ass with dildo 🍑🍆",
    "Double penetration 🍌🍆",
    "Butt plug 🍑💎",
    "Spank ass (×10) 👋🍑",
  ]},

  { type: "subheading", text: "Toy control / дрочка" },
  { type: "list", items: [
    "Control toy X min",
    "Favorite pattern 🌊",
    "Make me cum 💧",
    "Squirt 💦",
    "Masturbate close to orgasm 🖖🍓",
    "Masturbate until cum 🖖💧",
    "Yummy pussy play 🥵🍓",
  ]},
];

export default function Page() {
  return (
    <ArticlePage title="Тип меню" description="Категории услуг: Ноу-нюд, Полу-нюд, Фулл-нюд — база, лайт, дразнилки и горячие действия">
      <MarkdownContent blocks={blocks} />
    </ArticlePage>
  );
}