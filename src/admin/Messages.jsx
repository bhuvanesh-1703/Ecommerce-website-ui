import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import Swal from 'sweetalert2';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        try {
            const response = await axios.get(`${API_URL}/contact/admin/all`);
            if (response.data.success) {
                setMessages(response.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch messages:", err);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${API_URL}/contact/${id}`);
                    if (response.data.success) {
                        Swal.fire(
                            'Deleted!',
                            'The message has been deleted.',
                            'success'
                        );
                        getMessages();
                    }
                } catch (err) {
                    console.error("Failed to delete message:", err);
                    Swal.fire(
                        'Error!',
                        'Failed to delete the message.',
                        'error'
                    );
                }
            }
        });
    };

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <div className="admin-content">
            <h2>Customer Messages</h2>
            <div className="admin-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length > 0 ? (
                            messages.map((msg, index) => (
                                <tr key={msg._id || index}>
                                    <td>{index + 1}</td>
                                    <td className="product-name-cell">{msg.name.toUpperCase()}</td>
                                    <td>{msg.email}</td>
                                    <td>{msg.phone}</td>
                                    <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(msg._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center" }}>No messages found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Messages;
