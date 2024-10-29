import { Tooltip } from "@mui/material";
import axios from "axios";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as signalR from "@microsoft/signalr";

export default function Message() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");

    const user = JSON.parse(localStorage.getItem("decodedUser")) || {};
    const userId = user.jti;

    // Set up SignalR connection
    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://flowerexchange.azurewebsites.net/yourHub")
        .build();

    useEffect(() => {
        connection
            .start()
            .then(() => console.log("Connected to SignalR Hub"))
            .catch(err => console.error("SignalR Connection Error:", err));

        connection.on("ReceiveMessage", (sender, message) => {
            setMessages(prevMessages => [...prevMessages, { sender, content: message }]);
        });

        return () => {
            connection.stop();
        };
    }, []);

    useEffect(() => {
        const fetchConversations = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`https://flowerexchange.azurewebsites.net/Conversation/${userId}`);
                    setConversations(response.data);
                } catch (error) {
                    console.error("Error fetching conversations:", error);
                }
            }
        };

        fetchConversations();
    }, [userId]);

    const fetchMessages = async (conversationId) => {
        try {
            const response = await axios.get(`https://flowerexchange.azurewebsites.net/thread/${conversationId}`);
            setMessages(response.data);
            setSelectedConversationId(conversationId);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!messageContent.trim()) return;

        const selectedConversation = conversations.find(c => c.id === selectedConversationId);
        const recipientId = selectedConversation?.userConversations
            .find(uc => uc.userId !== userId)?.userId;

        if (recipientId) {
            try {
                const newMessage = {
                    content: messageContent,
                    senderId: userId,
                    recipientId,
                };

                await axios.post("https://flowerexchange.azurewebsites.net/Message", newMessage);
                connection.invoke("SendMessage", userId, messageContent);

                fetchMessages(selectedConversationId);
                setMessageContent("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                    <h5 className="font-weight-bold mb-3 text-center text-lg-start">Member</h5>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBTypography listUnStyled className="mb-0">
                                {conversations.map((conversation) =>
                                    conversation.userConversations?.map((userConversation) => (
                                        <li
                                            key={userConversation.id}
                                            className="p-2 border-bottom"
                                            style={{ backgroundColor: "#eee" }}
                                            onClick={() => fetchMessages(conversation.id)}
                                        >
                                            <a href="#!" className="d-flex justify-content-between">
                                                <div className="d-flex flex-row">
                                                    <img
                                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                                                        alt="avatar"
                                                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                        width="60"
                                                    />
                                                    <div className="pt-1">
                                                        <p className="fw-bold mb-0">{userConversation.user.fullname}</p>
                                                        <p className="small text-muted">Last message snippet here...</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ))
                                )}
                            </MDBTypography>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="6" lg="7" xl="8">
                    <MDBTypography listUnStyled>
                        {messages.map((message, index) => {
                            const isUserMessage = message.senderId === userId;
                            return (
                                <li
                                    className={`d-flex justify-content-${isUserMessage ? "end" : "start"} mb-4`}
                                    key={index}
                                >
                                    <Tooltip title={new Date(message.sentAt).toLocaleString()}>
                                        <MDBCard style={{ backgroundColor: isUserMessage ? "#0084FF" : "#f1f0f0", color: isUserMessage ? "#ffffff" : "#000000" }}>
                                            <MDBCardHeader className="d-flex justify-content-between p-3">
                                                <p className="fw-bold mb-0">{message.sender.fullname}</p>
                                            </MDBCardHeader>
                                            <MDBCardBody>
                                                <p className="mb-0">{message.content}</p>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </Tooltip>
                                </li>
                            );
                        })}

                        <li className="bg-white mb-3">
                            <MDBTextArea
                                id="textAreaExample"
                                rows={4}
                                value={messageContent}
                                onChange={(e) => setMessageContent(e.target.value)}
                            />
                        </li>
                        <Button color="info" rounded className="float-end" onClick={handleSendMessage}>
                            Send
                        </Button>
                    </MDBTypography>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
