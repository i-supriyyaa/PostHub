import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editCaption, setEditCaption] = useState('');
    const [editImage, setEditImage] = useState(null);

    useEffect(()=>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            setPosts(res.data.posts);            
        })
    }, []);

    const startEditing = (post) => {
        setEditingPostId(post._id);
        setEditCaption(post.caption || '');
        setEditImage(null);
    };

    const cancelEditing = () => {
        setEditingPostId(null);
        setEditCaption('');
        setEditImage(null);
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:3000/delete-post/${postId}`);
            setPosts((currentPosts) => currentPosts.filter((post) => post._id !== postId));
        } catch (error) {
            console.log(error);
            alert('Unable to delete post');
        }
    };

    const handleEditSubmit = async (event, postId) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('caption', editCaption);

            if (editImage) {
                formData.append('image', editImage);
            }

            const response = await axios.put(`http://localhost:3000/edit-post/${postId}`, formData);
            setPosts((currentPosts) =>
                currentPosts.map((post) => (post._id === postId ? response.data.post : post))
            );
            cancelEditing();
        } catch (error) {
            console.log(error);
            alert('Unable to update post');
        }
    };

    return (
        <section className='feed-section'>
            <div className='page-header'>
                <div>
                    <p className='eyebrow'><b>PostHub</b></p>
                    <h1>Feed</h1>
                </div>
                <div className='header-actions'>
                    <Link className='secondary-button' to='/'>Home</Link>
                    <Link className='primary-button' to='/create-post'>Create Post</Link>
                </div>
            </div>
            {
                posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='post-card'>
                            <img src={post.image} alt={post.caption} />
                            <p>{post.caption}</p>
                            <div className='post-actions'>
                                <button type='button' className='action-button' onClick={() => startEditing(post)}>
                                    Edit
                                </button>
                                <button type='button' className='action-button danger-button' onClick={() => handleDelete(post._id)}>
                                    Delete
                                </button>
                            </div>

                            {editingPostId === post._id && (
                                <form className='edit-form' onSubmit={(event) => handleEditSubmit(event, post._id)}>
                                    <input
                                        type='text'
                                        value={editCaption}
                                        onChange={(event) => setEditCaption(event.target.value)}
                                        placeholder='Update caption'
                                        required
                                    />
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(event) => setEditImage(event.target.files[0] || null)}
                                    />
                                    <div className='edit-actions'>
                                        <button type='submit' className='primary-button'>Save</button>
                                        <button type='button' className='secondary-button' onClick={cancelEditing}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ))
                ) : (
                    <h3>No posts available</h3>
                )
            }
        </section>
    )
}

export default Feed;