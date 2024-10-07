import React from 'react'
import { Box, Typography, Button, Avatar, IconButton } from '@mui/material'
import red from "@mui/material/colors/red";
import { IoMdSend } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';

const chatMessages = [
    {
        role: "user",
        content: "Hello! Can you assist me with my project?"
    },
    {
        role: "assistant",
        content: "Of course! What part of the project do you need help with?"
    },
    {
        role: "user",
        content: "I'm having trouble with my API call. It's giving me a network error."
    },
    {
        role: "assistant",
        content: "A network error usually happens when the server isn't reachable. Have you checked if your backend is running and the URL is correct?"
    },
    {
        role: "user",
        content: "Yes, it's running. The error seems to be related to CORS."
    },
    {
        role: "assistant",
        content: "If it's a CORS issue, try adding the `cors` middleware in your Express backend. Would you like me to show an example of how to do that?"
    },
    {
        role: "user",
        content: "Yes, that would be helpful!"
    },
    {
        role: "assistant",
        content: "Sure! Here's a simple example: \n ```javascript\n const cors = require('cors');\n app.use(cors()); \n ```\nThis should allow cross-origin requests. Let me know if you need further assistance!"
    }
];


const Chat = () => {
    const auth = useAuth()
    return (
        <Box
            sx={{
                display: "flex",
                flex: 1,
                width: "100%",
                height: "100%",
                mt: 3,
                gap: 3,
            }}
        >
            <Box
                sx={{
                    display: { md: "flex", xs: "none", sm: "none" },
                    flex: 0.2,
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        height: "60vh",
                        bgcolor: "rgb(17,29,39)",
                        borderRadius: 5,
                        flexDirection: "column",
                        mx: 3,
                    }}
                >
                    <Avatar
                        sx={{
                            mx: "auto",
                            my: 2,
                            bgcolor: "white",
                            color: "black",
                            fontWeight: 700,
                        }}
                    >
                        {auth?.user?.name[0]}{auth?.user?.name.split(" ")[1][0]}
                    </Avatar>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
                        You are talking to a ChatBOT
                    </Typography>
                    <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
                        You can ask some questions related to Knowledge, Business, Advices,
                        Education, etc. But avoid sharing personal information
                    </Typography>
                    <Button

                        sx={{
                            width: "200px",
                            my: "auto",
                            color: "white",
                            fontWeight: "700",
                            borderRadius: 3,
                            mx: "auto",
                            bgcolor: red[300],
                            ":hover": {
                                bgcolor: red.A400,
                            },
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flex: { md: 0.8, xs: 1, sm: 1 },
                    flexDirection: "column",
                    px: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "40px",
                        color: "white",
                        mb: 2,
                        mx: "auto",
                        fontWeight: "600",
                    }}
                >
                    Model - GPT 3.5 Turbo
                </Typography>
                <Box
                    sx={{
                        width: "100%",
                        height: "60vh",
                        borderRadius: 3,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "scroll",
                        overflowX: "hidden",
                        overflowY: "auto",
                        scrollBehavior: "smooth",
                    }}
                >
                    {chatMessages.map((chat,index)=> <div>
                        <ChatItem  content={chat.content} role={chat.role} key={index}/>
                    </div>)}
                </Box>
                <div
                    style={{
                        width: "100%",  
                        borderRadius: 8,
                        backgroundColor: "rgb(17,27,39)",
                        display: "flex",
                        margin: "auto",
                    }}
                >
                    {" "}
                    <input

                        type="text"
                        style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            padding: "30px",
                            border: "none",
                            outline: "none",
                            color: "white",
                            fontSize: "20px",
                        }}
                    />
                    <IconButton sx={{ color: "white", mx: 1 }}>
                        <IoMdSend />
                    </IconButton>
                </div>
            </Box>
        </Box>
    )
}

export default Chat