import { Product, Post } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Monitor Ultrawide 34" Samsung',
    affiliate_url: 'https://amazon.com.br/monitor-samsung',
    image_url: '/placeholder.svg',
    price: 2499.99,
    category: 'Monitores',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Cadeira Ergonômica Herman Miller',
    affiliate_url: 'https://mercadolivre.com.br/cadeira-herman-miller',
    image_url: '/placeholder.svg',
    price: 4999.99,
    category: 'Mobiliário',
    created_at: '2024-01-14T10:00:00Z'
  },
  {
    id: '3',
    name: 'Mesa Standing Desk Elétrica',
    affiliate_url: 'https://amazon.com.br/mesa-standing-desk',
    image_url: '/placeholder.svg',
    price: 1899.99,
    category: 'Mobiliário',
    created_at: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    name: 'Webcam Logitech C920 Pro',
    affiliate_url: 'https://amazon.com.br/webcam-logitech',
    image_url: '/placeholder.svg',
    price: 399.99,
    category: 'Periféricos',
    created_at: '2024-01-12T10:00:00Z'
  },
  {
    id: '5',
    name: 'Luminária LED Inteligente',
    affiliate_url: 'https://mercadolivre.com.br/luminaria-led',
    image_url: '/placeholder.svg',
    price: 299.99,
    category: 'Iluminação',
    created_at: '2024-01-11T10:00:00Z'
  },
  {
    id: '6',
    name: 'Teclado Mecânico Keychron K2',
    affiliate_url: 'https://amazon.com.br/teclado-keychron',
    image_url: '/placeholder.svg',
    price: 699.99,
    category: 'Periféricos',
    created_at: '2024-01-10T10:00:00Z'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Review Completo: Monitor Ultrawide Samsung - Vale a Pena?',
    slug: 'review-monitor-ultrawide-samsung',
    content: `# Review Completo: Monitor Ultrawide Samsung

## Primeiras Impressões

O **Monitor Ultrawide 34" Samsung** chegou em uma embalagem impecável, demonstrando o cuidado da marca com a experiência do usuário desde o primeiro contato.

### Especificações Técnicas

- **Tamanho**: 34 polegadas
- **Resolução**: 3440 x 1440 (UWQHD)
- **Taxa de Atualização**: 100Hz
- **Tempo de Resposta**: 4ms
- **Conectividade**: USB-C, HDMI, DisplayPort

## Experiência de Uso

### Produtividade
A tela ultrawide revoluciona completamente a forma como trabalhamos. É possível ter múltiplas janelas abertas simultaneamente sem perder a qualidade visual.

### Gaming
Para jogos, a experiência é cinematográfica. A imersão proporcionada pela tela curva é incomparável.

## Prós e Contras

### ✅ Prós
- Qualidade de imagem excepcional
- Perfeito para multitasking
- Design premium e minimalista
- Conectividade versátil

### ❌ Contras
- Preço elevado
- Ocupa bastante espaço na mesa
- Nem todos os jogos suportam a resolução ultrawide

## Conclusão

Este monitor é um investimento que vale a pena para profissionais que buscam maximizar sua produtividade e gamers que desejam uma experiência imersiva.

**Nota: 9/10**`,
    cover_image: '/placeholder.svg',
    status: 'published',
    product_id: '1',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Cadeira Ergonômica Herman Miller: O Investimento na Sua Saúde',
    slug: 'review-cadeira-herman-miller',
    content: `# Cadeira Ergonômica Herman Miller: O Investimento na Sua Saúde

## Por que Investir em uma Boa Cadeira?

Passamos em média 8 horas por dia sentados. Uma cadeira de qualidade não é luxo, é necessidade.

## Design e Construção

A Herman Miller é sinônimo de qualidade e design atemporal. Cada detalhe foi pensado para proporcionar conforto máximo.

### Características Principais

- **Apoio Lombar Ajustável**: Suporte perfeito para a coluna
- **Braços 8D**: Ajuste em todas as direções
- **Base de Alumínio**: Durabilidade e estabilidade
- **Tecido Respirável**: Conforto mesmo em dias quentes

## Experiência de Uso

Após 6 meses de uso intensivo, posso afirmar que foi o melhor investimento para meu home office.

## Vale o Investimento?

Sim, definitivamente. Sua saúde não tem preço.

**Nota: 10/10**`,
    cover_image: '/placeholder.svg',
    status: 'published',
    product_id: '2',
    created_at: '2024-01-14T10:00:00Z'
  }
];