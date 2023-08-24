import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertError from "./alert/AlertError";
import AlertSuccess from "./alert/AlertSuccess";
import { API_BASE_URL } from "./api/api-config";
export default function Join() {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget); // Use event.currentTarget directly

        const formData = {
            userId: data.get("id"),
            password: data.get("password"),
        };

        console.log("id:", formData.userId);
        console.log("Password:", formData.password);

        const url = API_BASE_URL + "/users/join";

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then((response) => {
            if (response.status === 200) {
                setOpen1(true);
            } else {
                setOpen(true);
            }
        });
    };

    return (
        <Box sx={{
            width: '100%',
            height:'100%',
            alignItems: "center",
        }}>
            <Box sx={{
                bgcolor: '#2e1534',  display: 'flex', p: 6
            }}>
            </Box>


            <Box sx={{
                display: "flex", justifyContent: "center", alignItems: "center",
                alignItems: "center",
                height: "85vh"

            }}>
                <Box
                    sx={{
                        width: "410px",
                        height: "500px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        border: "1px solid rgb(189, 188, 188)",
                    }}
                >
                    <Typography variant="h4" fontWeight="bold" color="rgb(59, 58, 58)" >
                        {"회원가입"}
                    </Typography>
                    <Box
                        noValidate
                        sx={{
                            height: "50%",
                            width: "80%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <TextField required fullWidth id="id" label="아이디를 입력하세요." name="id" autoComplete="id" />
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="비밀번호를 입력하세요."
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                        <Box>
                            <AlertError open={open} setOpen={setOpen} text={"이미 존재하는 아이디입니다."} />
                            {open1 && (
                                <Box>
                                    <AlertSuccess open={open1} setOpen={setOpen1} text={"회원가입이 완료되었습니다."} />

                                </Box>
                            )}


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    borderRadius: "10px",
                                    backgroundColor: "#47b8fd",
                                    color: "#white",
                                    fontWeight: "bold",
                                    mb: "10px",
                                    mt: "10px",
                                }}
                            >
                                회원가입
                            </Button>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={() => navigate("/MiniProject_LicensePlate/*")}
                                sx={{
                                    borderRadius: "10px",
                                    backgroundColor: "#47b8fd",
                                    color: "#white",
                                    fontWeight: "bold",
                                }}
                            >
                                로그인 화면
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}