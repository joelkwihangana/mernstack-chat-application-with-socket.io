import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ERROR_MESSAGES } from "../../constants/errorMessages";
import useCustomToast from "../../customHooks/useCustomToast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { BACKEND_URL } from "../../config";

const Login: React.FC = () => {
  const { showToast } = useCustomToast();
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  // State for show/hide password and loading
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      showToast("Error", ERROR_MESSAGES.EMPTY_FIELDS, "error");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;
    const backendUrl = BACKEND_URL;

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    // console.log("Submitting login with:", { email, password });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${backendUrl}/user/login/`,
        { email, password },
        config
      );

      showToast("Success", "Login successful", "success");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      const axiosError = error as AxiosError;
      const message =
        axiosError.response?.data?.message || "an error occurred during login";
      showToast("Error", message, "error");
      console.error("Error logging in:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="5px">
        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <InputRightElement w="fit-content">
              <Button
                h="1.5rem"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          isLoading={loading}
          mt={6}
          width="100%"
          colorScheme="blue"
          type="submit"
        >
          Login
        </Button>

        <Button
          variant="solid"
          colorScheme="orange"
          width="100%"
          onClick={() => {
            setFormData({
              email: "guest@example.com",
              password: "guest123",
            });
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
