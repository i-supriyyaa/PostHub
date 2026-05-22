import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const CreatePost = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await axios.post("http://localhost:3000/create-post", formData);
      navigate("/feed");
    } catch (err) {
      console.log(err);
      alert("Error catching post");      
    }

  }

  return (
    <section className='create-post-section'>
        <div className='page-header'>
          <div>
            <p className='eyebrow'><b>PostHub</b></p>
            <h1>Create Post</h1>
          </div>
          <div className='header-actions'>
            <Link className='secondary-button' to='/'>Home</Link>
            <Link className='primary-button' to='/feed'>View Feed</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" accept="image/*" required />
          <input type="text" name="caption" placeholder="enter caption" required />
            <button type='submit'>Submit</button>
        </form>
    </section>
  )
}

export default CreatePost;