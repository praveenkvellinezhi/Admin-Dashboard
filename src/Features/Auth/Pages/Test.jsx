import React, { useEffect, useState } from "react";
import { AddData, getPOsts, DeleteData, EditData } from "./api";

export default function Test() {
    const [posts, setPosts] = useState([]);
    // Update form fields
    const [form, setForm] = useState({
        title: "",
        body: "",
        userId: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [newPostData, setNewPostData] = useState(null);


    const [editModal, setEditModal] = useState(false);
    const [editPost, setEditPost] = useState(null);




    // ------------ FETCH POSTS (GET API) ------------

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPOsts(); // GET API
                setPosts(data);
            }
            catch (error) {
                console.log("Error fetching posts:", error);
            } // array of posts
        };
        fetchData();
    }, []);






    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {

            userId: Number(form.userId),
            title: form.title,
            body: form.body,
        };



        try {


            const savedPost = await AddData(newPost);
            // Show modal with returned data

            const updatedList = await getPOsts();
            setPosts(updatedList);
            setNewPostData(savedPost);
            setShowModal(true);

            // Add to UI immediately


        } catch (error) {
            console.error("Error adding post:", error);
        }




        setForm({ title: "", body: "", userId: "" });


    }; const handleDelete = async (id) => {
        try {
            await DeleteData(id);

            setPosts(posts.filter((p) => p.id !== id));
        } catch (error) {
            console.log("Error deleting post :", error);

        }
    }

    const handleUpdate = async (id) => {
        try {
            const updatePost = await EditData(id, {

                title: editPost.title,
                body: editPost.body,
                userId: editPost.userId,
            });
            setPosts(
                posts.map((post)=>(post.id === id ? updatePost :post))
            );
            setEditModal(false);

        } catch(error) {
            console.log("Error updating post:", error);
            
        }
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-5">
                <h1 className="text-2xl font-bold mb-4">Add + Display Posts</h1>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-4 rounded-lg shadow mb-5 grid gap-3"
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        className="border p-2 rounded"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="body"
                        placeholder="Enter body text"
                        className="border p-2 rounded"
                        value={form.body}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="userId"
                        placeholder="User ID"
                        className="border p-2 rounded"
                        value={form.userId}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Add Post
                    </button>
                </form>
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-3 text-green-600">
                                Post Added!
                            </h2>

                            <p>
                                <strong>Title:</strong> {newPostData.title}
                            </p>
                            <p className="mt-1">
                                <strong>Body:</strong> {newPostData.body}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                User ID: {newPostData.userId} • Post ID: {newPostData.id}
                            </p>

                            <button
                                onClick={() => {
                                    setPosts([newPostData, ...posts]); // Add post AFTER closing modal
                                    setShowModal(false);
                                }}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
                {editModal && editPost && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-3 text-blue-600">Edit Post</h2>

                            <input
                                type="text"
                                value={editPost.title}
                                onChange={(e) =>
                                    setEditPost({ ...editPost, title: e.target.value })
                                }
                                className="border p-2 w-full rounded mb-2"
                            />

                            <textarea
                                value={editPost.body}
                                onChange={(e) =>
                                    setEditPost({ ...editPost, body: e.target.value })
                                }
                                className="border p-2 w-full rounded mb-2"
                            />

                            <button
                                onClick={() => handleUpdate(editPost.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded mr-3"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setEditModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}


                {/* Display Posts */}
                <div className="grid gap-4">
                    {posts.slice(0, 5).map((post) => (
                        <div
                            key={post.id}
                            className="bg-white p-4 rounded-lg shadow border border-gray-200"
                        >
                            <h2 className="text-lg font-semibold">{post.title}</h2>
                            <p className="text-sm text-gray-600 mt-1">{post.body}</p>

                            <p className="text-xs text-gray-400 mt-2">
                                User ID: {post.userId} • Post ID: {post.id}
                            </p>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    setEditPost(post);
                                    setEditModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                            >
                                Edit
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
