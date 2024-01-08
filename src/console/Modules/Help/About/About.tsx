import styles from '@console/Modules/Help/About/About.module.sass';
import consoleDay from '../../../../images/console-day.jpg';

export const About = () => {
  return (
    <div className={styles.about}>
      <img src={consoleDay} alt="" />
      <div>
        <h1>About project and author</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ad dicta,
          est nam odio dolorem ullam iusto repellendus praesentium itaque perspiciatis
          facere laudantium iste totam facilis deleniti, explicabo esse libero.
        </p>
      </div>
    </div>
  );
};
