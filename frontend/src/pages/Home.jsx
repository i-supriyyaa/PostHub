import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className='home-page'>
      <section className='hero-card'>
        <p className='eyebrow'><b>PostHub</b></p>
        <h1>Welcome to PostHub</h1>
        <p className='hero-copy'>
          Explore your latest posts or create something new in a few clicks.
        </p>

        <div className='hero-actions'>
          <Link className='primary-button' to='/feed'>
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
