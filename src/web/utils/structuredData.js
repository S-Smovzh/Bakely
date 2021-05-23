export const structuredDataList = {
  faq: (questionOne, answerOne,
    questionTwo, answerTwo,
    questionThree, answerThree,
    questionFour, answerFour,
    questionFive, answerFive) => ({
    '@context': 'https://schema.org/',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': questionOne,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answerOne
        }
      },
      {
        '@type': 'Question',
        'name': questionTwo,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answerTwo
        }
      },
      {
        '@type': 'Question',
        'name': questionThree,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answerThree
        }
      },
      {
        '@type': 'Question',
        'name': questionFour,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answerFour
        }
      },
      {
        '@type': 'Question',
        'name': questionFive,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answerFive
        }
      }
    ]
  }),
  localBusiness: (city, street, country, postalCode) => ({
    '@context': 'https://schema.org/',
    '@type': 'Bakery',
    '@id': 'https://bakkely.herokuapp.com/#website',
    'name': 'Bakely',
    'image': '',
    'priceRange': '$$',
    'telephone': '+38 (067) 456-98-45',
    'url': 'https://bakkely.herokuapp.com/',
    'menu': `https://bakkely.herokuapp.com/shop`,
    'servesCuisine': 'European and American cuisines.',
    'acceptsReservations': 'false',
    'paymentAccepted': 'Cash, Credit Card',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Petra Sagaydachnogo street 8',
      'addressLocality': 'city',
      'addressRegion': `${city} oblast`,
      'postalCode': postalCode,
      'addressCountry': country
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '08:00',
        'closes': '20:00'
      }
    ]
    // 'sameAs': [process.env.PUBLIC_URL, process.env.PUBLIC_URL_SECURE]
  }),
  product: (name, description, img, price) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.5',
      'reviewCount': '11'
    },
    'description': description,
    'name': name,
    'image': img,
    // eslint-disable-next-line no-restricted-globals
    'url': location.href,
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'price': price,
      'priceCurrency': 'USD'
    }
  }),
  article: (name) => (
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'author': 'Bakely',
      'name': name
    }
  )
};
