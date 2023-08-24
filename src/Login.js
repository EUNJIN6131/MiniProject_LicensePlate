  import {
    Box,
    Button,
    Container,
    CssBaseline,
    Typography,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
  } from "@mui/material";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import { API_BASE_URL } from "./api/api-config";
  import AlertError from "./alert/AlertError";
  import { useState } from "react";
  import Visibility from "@mui/icons-material/Visibility";
  import VisibilityOff from "@mui/icons-material/VisibilityOff";
  

  export default function Login() {

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.target);

      console.log("Form Data:", data.entries());

      const formData = {
        userId: data.get("id"),
        password: data.get("password"),
      };

      console.log("id:", formData.userId);
      console.log("Password:", formData.password);
      const url = API_BASE_URL + "/users/login";
      console.log(url);
      try {
        const res = await axios.post(url, formData);
        if (res.status === 200) {
          const accessToken = res.headers["authorization"];
          localStorage.setItem("ACCESS_TOKEN", accessToken);
          localStorage.setItem("userId", data.get("id"));
          navigate("/MiniProject_LicensePlate/main");
        }
      } catch (error) {
        setOpen(true);
        console.error("Error during API call:", error);
      }
    };


    return (

      <Box sx={{ width: '100%' }}> {/* 가로폭을 100%로 설정 */}
          <CssBaseline />
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
                          {"로그인"}
                      </Typography>

            <Box noValidate
                          sx={{
                              height: "50%",
                              width: "80%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-evenly",
                          }} component="form" onSubmit={handleSubmit} >
              <TextField margin="normal" required fullWidth id="id" label="ID" name="id" autoFocus />
              <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  fullWidth
                />
              </FormControl>
              <AlertError
                open={open}
                setOpen={setOpen}
                text={"아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: "10px",
                mt: "10px", borderRadius: "10px", bgcolor: "#47b8fd", color: "#white", fontWeight: "bold" }}
              >
                로그인
              </Button>
              <Button
                onClick={() => navigate("/MiniProject_LicensePlate/join")}
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  color: "#white",
                  bgcolor: "#47b8fd",
                  fontWeight: "bold",
                }}
              >
                회원가입
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }