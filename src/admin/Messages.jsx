import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    const getMessages = async () => {
        try {
            const response = await axios.get("http://localhost:5100/contact/admin/all");
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
                    const response = await axios.delete(`http://localhost:5100/contact/${id}`);
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
        <div style={{ marginLeft: "20%", marginTop: "30px", padding: "20px" }}>
            <h2 style={{ marginBottom: "20px", color: "#56021F" }}>Contact Us Messages</h2>
            <table border={1} style={{ width: "95%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#e2e1e1ff", color: "white", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>S.No</th>
                        <th style={{ padding: "10px" }}>Name</th>
                        <th style={{ padding: "10px" }}>Email</th>
                        <th style={{ padding: "10px" }}>Phone</th>
                        <th style={{ padding: "10px" }}>Date</th>
                        <th style={{ padding: "10px" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <tr key={msg._id || index}>
                                <td style={{ padding: "10px" }}>{index + 1}</td>
                                <td style={{ padding: "10px" }}>{msg.name.toUpperCase()}</td>
                                <td style={{ padding: "10px" }}>{msg.email}</td>
                                <td style={{ padding: "10px" }}>{msg.phone}</td>
                                <td style={{ padding: "10px" }}>{new Date(msg.createdAt).toLocaleString()}</td>
                                <td style={{ padding: "10px" }}>
                                    <button 
                                        onClick={() => handleDelete(msg._id)}
                                        style={{ 
                                            backgroundColor: "#d33", 
                                            color: "white", 
                                            border: "none", 
                                            padding: "5px 10px", 
                                            borderRadius: "4px", 
                                            cursor: "pointer" 
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>No messages found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Messages;
