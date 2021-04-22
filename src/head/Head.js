import React, {useState} from "react";
import {Helmet} from "react-helmet";
import * as i18n from "i18n";

export default function Head({
                               title,
                               description,
                               cardTitle = '',
                               cardDescription = '',
                               ogType = 'website',
                               ogUrl = '',
                               imgUrl = '',
                               imgUrlSecure = '',
                               imgType = '',
                               imgWidth = 0,
                               imgHeight = 0,
                               imgAlt = '',
                               twitterCardType = 'summary_large_image',
                               siteTwitterAccount = '',
                               cardCreatorTwitterAccount = '',
                               structuredDataJSON
                             }) {
  const [locale, setLocale] = useState('en_US');
  const localeArray = [];

  switch (i18n.language) {
    case 'en':
      setLocale('en_US');
      localeArray.push('ru_RU', 'ua_UA');
      break;
    case 'ru':
      setLocale('ru_RU');
      localeArray.push('en_US', 'ua_UA');
      break;
    case 'ua':
      setLocale('ua_UA');
      localeArray.push('en_US', 'ru_RU');
      break;
  }

  return (
    <Helmet>
      <html lang={i18n.language}/>
      <title>
        {title}
      </title>
      <meta name="description" content={description}/>
      {/*----------Open Graph----------*/}
      <meta property="og:title" content={cardTitle}/>
      <meta property="og:description" content={cardDescription}/>
      <meta property="og:site_name" content='Bakely'/>
      <meta property="og:type" content={ogType}/>
      <meta property="og:url" content={ogUrl}/>
      <meta property="og:determiner" content=""/>

      <meta property="og:locale" content={locale}/>
      <meta property="og:locale:alternate" content={localeArray[0]}/>
      <meta property="og:locale:alternate" content={localeArray[1]}/>

      <meta property="og:image" content={imgUrl}/>
      <meta property="og:image:secure_url" content={imgUrlSecure}/>
      <meta property="og:image:type" content={`image/${imgType}`}/>
      <meta property="og:image:width" content={imgWidth}/>
      <meta property="og:image:height" content={imgHeight}/>
      <meta property="og:image:alt" content={imgAlt}/>

      {/*----------Twitter Cards----------*/}

      <meta name="twitter:card" content={twitterCardType}/>
      <meta name="twitter:site" content={siteTwitterAccount}/>
      <meta name="twitter:creator" content={cardCreatorTwitterAccount}/>
      {/*MAX: 70 chars*/}
      <meta name="twitter:title" content={cardTitle}/>
      {/*MAX: 200 chars*/}
      <meta name="twitter:description" content={cardDescription}/>
      {/*PNG, GIF, JPG, WEBP < 5MB*/}
      <meta name="twitter:image" content={imgUrl}/>
      {/*MAX: 400 chars*/}
      <meta name="twitter:image:alt" content={imgAlt}/>

      {/*Structured Data*/}
      <script type="application/ld+json">{structuredDataJSON}</script>
    </Helmet>
  );
}