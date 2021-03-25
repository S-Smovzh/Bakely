import React from "react";
import {Helmet} from "react-helmet";
import * as i18n from "i18n";

export default function Head({title, description}) {
  return (<Helmet>
    <html lang={i18n.language}/>
    <title>
      {title}
    </title>
    <meta name="description" content={description}/>
  </Helmet>);
}