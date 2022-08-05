// module.exports = {
//     images: {

//       domains: ['i.scdn.co','xx.fbcdn.net'],
//     },
//   }

  module.exports = {
    experimental: {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**.scdn.co',
          },
          {
            protocol: 'https',
            hostname: '**.fbcdn.net',
          },
        ],
      },
    },
  }