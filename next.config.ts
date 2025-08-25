/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',   // habilita build estático
  images: {
    unoptimized: true // necessário se usar <Image> do next
  }
};

module.exports = nextConfig;
