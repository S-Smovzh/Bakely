import React from 'react';
import { useTranslation } from 'react-i18next';
import Head from '../head/Head';

export default function CookiePolicy() {
  const [ t ] = useTranslation();

  return (
    <div className="Info-Page Grid">
      <Head title={t('infoPages.cookies.seo.title')} description={t('infoPages.cookies.seo.description')}/>
      <section className="B-T Flex J-C-C A-I-C T-C">
        <h1>
          {t('infoPages.cookies.header')}
        </h1>
      </section>
      <article className="B-M Nunito Flex J-C-S-B A-I-F-S F-F-C-N">
        <p>
          This cookie policy (&quot;Policy&quot;) describes what cookies are and how and they&#039;re
          being used by the <a target="_blank" rel="nofollow noreferrer" href="https://www.bakely.com">bakely.com</a> website
          (&quot;Website&quot; or &quot;Service&quot;) and any of its related products and services
          (collectively, &quot;Services&quot;). This Policy is a legally binding agreement between you
          (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;) and this Website operator
          (&quot;Operator&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). You should read this Policy so you
          can
          understand the types of cookies we use, the information we collect using cookies and how that information is
          used.
          It also describes the choices available to you regarding accepting or declining the use of cookies. For
          further
          information on how we use, store and keep your personal data secure,
          see our <a target="_blank" rel="nofollow noreferrer" href="https://www.bakely.com/en/privacy-policy">Privacy Policy</a>.
        </p>
        <h2>What are cookies?</h2>
        <p>
          Cookies are small pieces of data stored in text files that are saved on your computer or other devices when
          websites are loaded in a browser. They are widely used to remember you and your preferences,
          either for a single visit (through a &quot;session cookie&quot;) or for multiple repeat visits
          (using a &quot;persistent cookie&quot;).
        </p>
        <p>
          Session cookies are temporary cookies that are used during the course of your visit to the Website, and they
          expire
          when you close the web browser.
        </p>
        <p>
          Persistent cookies are used to remember your preferences within our Website and remain on your desktop or
          mobile
          device even after you close your browser or restart your computer. They ensure a consistent
          and efficient experience for you while visiting the Website and Services.
        </p>
        <p>
          Cookies may be set by the Website (&quot;first-party cookies&quot;), or by third parties, such as those who
          serve
          content or provide advertising or analytics services on the Website (&quot;third party cookies&quot;). These
          third
          parties can recognize you when you visit our website and also when you visit certain other websites.
        </p>
        <h2>What type of cookies do we use?</h2>
        <h3>Necessary cookies</h3>
        <p>
          Necessary cookies allow us to offer you the best possible experience when accessing and navigating through our
          Website and using its features. For example, these cookies let us recognize that you have created an account
          and have logged into that account to access the content.
        </p>
        <h3>Functionality cookies</h3>
        <p>
          Functionality cookies let us operate the Website and Services in accordance with the choices you make. For
          example,
          we will recognize your username and remember how you customized the Website and Services during future visits.
        </p>
        <h3>Analytical cookies</h3>
        <p>
          These cookies enable us and third party services to collect aggregated data for statistical purposes on how
          our
          visitors use the Website. These cookies do not contain personal information such as names and email addresses
          and
          are used to help us improve your user experience of the Website.
        </p>
        <h3>Social media cookies</h3>
        <p>
          Third party cookies from social media sites (such as Facebook, Twitter, etc) let us track social network users
          when
          they visit or use the Website and Services, or share content, by using a tagging mechanism provided by those
          social
          networks.
        </p>
        <p>
          These cookies are also used for event tracking and remarketing purposes. Any data collected with these tags
          will be
          used in accordance with our and social networks’ privacy policies. We will not collect or share any personally
          identifiable information from the user.
        </p>
        <h2>What are your cookie options?</h2>
        <p>
          If you don't like the idea of cookies or certain types of cookies, you can change your browser's settings to
          delete
          cookies that have already been set and to not accept new cookies. To learn more about how to do this or to
          learn
          more about cookies, visit <a target="_blank" href="https://www.internetcookies.org" rel="noreferrer">internetcookies.org</a>
        </p>
        <p>
          Please note, however, that if you delete cookies or do not accept them, you might not be able to use all of
          the
          features the Website and Services offer.
        </p>
        <h2>Changes and amendments</h2>
        <p>
          We reserve the right to modify this Policy or its terms relating to the Website and Services at any time,
          effective
          upon posting of an updated version of this Policy on the Website. When we do, we will send you an email to
          notify
          you. Continued use of the Website and Services after any such changes shall constitute your consent to such
          changes.
          Policy was created with <a target="_blank"
            href="https://www.websitepolicies.com/blog/sample-cookie-policy-template" rel="noreferrer">WebsitePolicies</a>.
        </p>
        <h2>Acceptance of this policy</h2>
        <p>
          You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and
          using
          the Website and Services you agree to be bound by this Policy. If you do not agree to abide by the terms of
          this
          Policy,
          you are not authorized to access or use the Website and Services.
        </p>
        <h2>Contacting us</h2>
        <p>
          If you would like to contact us to understand more about this Policy or wish to contact us concerning any
          matter
          relating to our use of cookies, you may do so via the <a target="_blank" rel="nofollow noreferrer"
            href="https://www.bakely.com/en/contact-us">contact
            form</a> or
          send an email to &#98;a&#107;&#101;&#108;&#121;&#46;&#117;kr&#64;gm&#97;il.&#99;&#111;m
        </p>
        <p>This document was last updated on December 31, 2020</p>
      </article>
    </div>
  );
}
