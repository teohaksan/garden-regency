/**
 * Emerald Garden Theme Config
 * Usage: Add class="emerald" to <html> element
 * Inspired by: Garden Regency 芊御
 * Theme: Dark emerald green with gold accents
 */
const emerald = {
  id: 'emerald',
  label: 'Emerald Garden',
  accent: '#B8860B',
  bg: '#07120a',
  isDark: true,
  fonts: {
    display: "'Playfair Display', serif",
    body: "'DM Sans', 'Noto Sans TC', sans-serif",
    number: "'DM Sans', sans-serif",
  },
  components: {
    hero: { overlay: 'from-black/50 via-black/25 to-black/70' },
    cta: { bg: 'bg-[#B8860B]', text: 'text-[#07120a]', hover: 'hover:bg-[#DAA520]' },
    nav: { bg: 'bg-transparent', scrolled: 'bg-[#07120a]/95 backdrop-blur-md' },
    floating: {
      whatsapp: 'bg-gradient-to-br from-[#25D366] to-[#128C7E]',
      wechat: 'bg-gradient-to-br from-[#07C160] to-[#06AD56]',
      phone: 'bg-gradient-to-br from-[#2D5016] to-[#4A7C2E]',
    },
    section: { bg: 'bg-[#0a1a12]', alt: 'bg-[#07120a]' },
  },
}

export default emerald
