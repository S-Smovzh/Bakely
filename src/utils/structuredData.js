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
    '@id': `${process.env.PUBLIC_URL}/#website`,
    'name': 'Bakely',
    'image': '',
    'priceRange': '$$',
    'telephone': '+38 (067) 456-98-45',
    'url': process.env.PUBLIC_URL,
    'menu': `${process.env.PUBLIC_URL}/shop`,
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
    ],
    'sameAs': [process.env.PUBLIC_URL, process.env.PUBLIC_URL_SECURE, process.env.PUBLIC_URL]
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

// "interactionStatistic": [
//   {
//     "@type": "InteractionCounter",
//     "interactionService": {
//       "@type": "WebSite",
//       "name": "Twitter",
//       "url": "https://www.twitter.com"
//     },
//     "interactionType": "https://schema.org/ShareAction",
//     "userInteractionCount": "1203"
//   },
//   {
//     "@type": "InteractionCounter",
//     "interactionType": "https://schema.org/CommentAction",
//     "userInteractionCount": "78"
//   }
// ],

// "review": [
//   {
//     "@type": "Review",
//     "author": "Ellie",
//     "datePublished": "2011-04-01",
//     "reviewBody": "The lamp burned out and now I have to replace it.",
//     "name": "Not a happy camper",
//     "reviewRating": {
//       "@type": "Rating",
//       "bestRating": "5",
//       "ratingValue": "1",
//       "worstRating": "1"
//     }
//   },
//   {
//     "@type": "Review",
//     "author": "Lucas",
//     "datePublished": "2011-03-25",
//     "reviewBody": "Great microwave for the price. It is small and fits in my apartment.",
//     "name": "Value purchase",
//     "reviewRating": {
//       "@type": "Rating",
//       "bestRating": "5",
//       "ratingValue": "4",
//       "worstRating": "1"
//     }
//   }
// ]

// export const structuredDataSingle = ({type, prod, imgPath, availability}) => {
//   let data = {};
//
//   switch (type) {
//     case 'faq':
//       data = {
//         "@context": "https://schema.org",
//         "@type": "FAQPage",
//         "mainEntity": [{
//           "@type": "Question",
//           "name": "What is the return policy?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "Most unopened items in new condition and returned within <strong>90 days</strong> will receive a refund or exchange. Some items have a modified return policy noted on the receipt or packing slip. Items that are opened or damaged or do not have a receipt may be denied a refund or exchange. Items purchased online or in-store may be returned to any store.<br /><p>Online purchases may be returned via a major parcel carrier. <a href=http://example.com/returns> Click here </a> to initiate a return.</p>"
//           }
//         }, {
//           "@type": "Question",
//           "name": "How long does it take to process a refund?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "We will reimburse you for returned items in the same way you paid for them. For example,
//             any amounts deducted from a gift card will be credited back to a gift card. For returns by mail,
//             once we receive your return, we will process it within 4–5 business days.
//             It may take up to 7 days after we process the return to reflect in your account,
//             depending on your financial institution's processing time."
//           }
//         }, {
//           "@type": "Question",
//           "name": "What is the policy for late/non-delivery of items ordered online?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "Our local teams work diligently to make sure that your order arrives on time, within our normaldelivery hours of 9AM to 8PM in the recipient's time zone. During  busy holiday periods like Christmas, Valentine's and Mother's Day, we may extend our delivery hours before 9AM and after 8PM to ensure that all gifts are delivered on time. If for any reason your gift does not arrive on time, our dedicated Customer Service agents will do everything they can to help successfully resolve your issue. <br/> <p><a href=https://example.com/orders/>Click here</a> to complete the form with your order-related question(s).</p>"
//           }
//         }, {
//           "@type": "Question",
//           "name": "When will my credit card be charged?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "We'll attempt to securely charge your credit card at the point of purchase online.
//             If there's a problem, you'll be notified on the spot and prompted to use another card.
//             Once we receive verification of sufficient funds, your payment will be completed
//             and transferred securely to us. Your account will be charged in 24 to 48 hours."
//           }
//         }, {
//           "@type": "Question",
//           "name": "Will I be charged sales tax for online orders?",
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": "Local and State sales tax will be collected if your recipient's
//             mailing address is in: <ul><li>Arizona</li><li>California</li><li>Colorado</li></ul>"
//           }
//         }]
//       };
//       break;
//   }
//
//   // brand
//   if (prod['brand']) {
//     data['mpn'] = prod['brand'];
//     data['brand'] = {
//       "@type": "Thing",
//       "name": `${prod['brand']}`
//     };
//   }
//
//   // logo
//   if (prod['logo']) {
//     data['logo'] = imgPath + prod['logo'];
//   }
//
//   return JSON.stringify(data);
// };
// data = {
//   "@context": "http://schema.org/",
//   "@type": "Product",
//   "name": `${prod.title}`,
//   "image": prod.images.map((item) => imgPath + item),
//   "description": prod['description'],
//   "url": location.href,
//   "offers": {
//     "@type": "Offer",
//     "priceCurrency": `${prod['currency'] || "₴"}`,
//     "price": prod['price'] ? `${parseFloat(prod['price'])}` : 0,
//     "availability": `${availability}`,
//     "seller": {
//       "@type": "Organization",
//       "name": "TopMotoPro"
//     }
//   }
// };
