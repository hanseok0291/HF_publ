import { useEffect, useRef } from 'react';
import styles from '../../../styles/retto_pub/FadeInSection.module.css';

const FadeInSection = ({ children }) => {
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

  return (
    <div className={`${styles.fadeInSection}`} ref={domRef}>
      {children}
    </div>
  );
};

export default FadeInSection;