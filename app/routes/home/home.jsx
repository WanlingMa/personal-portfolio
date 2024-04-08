
import healthNowTextureLarge from '~/assets/healthNow-main.png';
import healthNowTexture from '~/assets/healthNow-main.png';
import healthNowTexturePlaceholder from '~/assets/healthNow-main.png';

import wayfoundTextureLarge from '~/assets/wayfound-main.png';
import wayfoundTexture from '~/assets/wayfound-main.png';
import wayfoundTexturePlaceholder from '~/assets/wayfound-main.png';

import wayfoundTextureLarge2 from '~/assets/wayfound-main2.png';
import wayfoundTexture2 from '~/assets/wayfound-main2.png';
import wayfoundTexturePlaceholder2 from '~/assets/wayfound-main2.png';

import sliceTextureLarge from '~/assets/slice-app-large.jpg';
import sliceTexturePlaceholder from '~/assets/slice-app-placeholder.jpg';
import sliceTexture from '~/assets/slice-app.jpg';

import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Wayfound - Navigation App of Bissell Building at University of Toronto"
        description="An AR navigation app that guides users through the Bissell Building with real-time camera-based directional arrows"
        buttonText="View project"
        buttonLink="/projects/smart-sparrow"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${wayfoundTexture} 375w, ${wayfoundTextureLarge} 750w`,
              placeholder: wayfoundTexturePlaceholder,
            },
            {
              srcSet: `${wayfoundTexture2} 375w, ${wayfoundTextureLarge2} 750w`,
              placeholder: wayfoundTexturePlaceholder2,
            },
          ],
        }}
        // model={{
        //   type: 'laptop',
        //   alt: 'Smart Sparrow lesson builder',
        //   textures: [
        //     {
        //       srcSet: `${sprTexture} 1280w, ${sprTextureLarge} 2560w`,
        //       placeholder: sprTexturePlaceholder,
        //     },
        //   ],
        // }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="HealthNow - Clinic Appointments Management System"
        description="Designed and prototyped a system for patients to manage appointments with clinics"
        buttonText="View project"
        buttonLink="/projects/smart-sparrow"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: `${healthNowTexture} 375w, ${healthNowTextureLarge} 750w`,
              placeholder: healthNowTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Biomedical image collaboration"
        description="Increasing the amount of collaboration in Slice, an app for biomedical imaging"
        buttonText="View project"
        buttonLink="/projects/slice"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: `${sliceTexture} 800w, ${sliceTextureLarge} 1920w`,
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
