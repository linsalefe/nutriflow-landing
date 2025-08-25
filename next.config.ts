/** @type {import('next').NextConfig} */
const nextConfig = {
  // gera HTML/CSS/JS estático em ./out
  output: 'export',

  // se você usar <Image>, isso evita otimização server-side
  images: { unoptimized: true },

  // opcional: alguns servidores curtem /path/ em vez de /path
  // trailingSlash: true,
};

module.exports = nextConfig;
