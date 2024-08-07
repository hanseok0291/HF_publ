import { useEffect, useRef } from 'react';
import styles from '../../../styles/retto_pub/FadeInSection.module.css';

const FadeInSection = ({ children, delay = 0 }) => {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, {
      rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(domRef.current);

    return () => observer.disconnect();
  }, []);

  const style = {
    transitionDelay: `${delay/1000}s`
  };

  return (
    <div className={`${styles.fadeInSection}`} ref={domRef} style={style}>
      {children}
    </div>
  );
};

export default FadeInSection;