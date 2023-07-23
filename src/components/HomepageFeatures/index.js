import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Imbedable Youtube Videos',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Youtube vidoes can easily be added in either the sidebar or at the top of each subsection. <br /> <br />
        This allows the manual and videos to fully integrate with each other and allows for pre-recorded skill videos when appropriate to the section.
      </>
    ),
  },
  {
    title: 'Goodbye Monster Google Doc',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        150 page Google Docs do not perform well, with ~400 image load times can be terrible especially on low spec computers. <br /><br />
        Additionally printing can be a haste and general naviagtion is a pain. 
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <div className="text--center">
    <h1>Embed Vidoes</h1>
    <p>Videos cna easily be integrated at the top of page or in the sidebar, allowing for the best integration between videos and manual.</p>
    <details className={styles.details}>
      <summary>
        Build Video for Section
      </summary>
      <div>
      <iframe width="420" height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY">
      </iframe>
      </div>
    </details>
    </div>
  );
}
