import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IFormData, IFormEventHandlers } from "../../interfaces/formInterface";
import useCustomToast from "../../customHooks/useCustomToast";
const Signup: React.FC = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form data state
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });

  // Separate states for show/hide password and loading
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showToast } = useCustomToast();

  // Constants for error messages
  const ERROR_MESSAGES = {
    EMPTY_FIELDS: "All fields are required.",
    PASSWORD_MISMATCH: "Passwords do not match.",
    UPLOAD_ERROR: "Failed to upload the image. Please try again.",
    INVALID_FILE_TYPE: "Please select a valid image file (JPEG or PNG).",
    CLOUDINARY_CONFIG_ERROR: "Cloudinary configuration is missing.",
    SELECT_PICTURE: "Please select a picture.",
  };

  // Event handlers
  const handleInputChange: IFormEventHandlers["handleInputChange"] = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, pic } = formData;
    if (!name || !email || !password || !confirmPassword || !pic) {
      showToast("Error", ERROR_MESSAGES.EMPTY_FIELDS, "error");
      return false;
    }
    if (password !== confirmPassword) {
      showToast("Error", ERROR_MESSAGES.PASSWORD_MISMATCH, "error");
      return false;
    }
    return true;
  };
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { name, email, password } = formData;

      const { data } = await axios.post(
        `${backendUrl}/api/user/`,
        { name, email, password },
        config
      );

      showToast("Success", "User registered successfully.", "success");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to register user";
      showToast("Error", errorMessage, "error");
    } finally {
      setLoading(false);
      clearForm();
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      pic: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const postDetails = async (pics: File | null) => {
    setLoading(true);

    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

    if (!uploadPreset || !uploadUrl) {
      showToast("Error", ERROR_MESSAGES.CLOUDINARY_CONFIG_ERROR, "error");
      setLoading(false);
      return;
    }
    if (!pics) {
      showToast("Error", ERROR_MESSAGES.SELECT_PICTURE, "error");
      setLoading(false);
      return;
    }
    if (!["image/jpeg", "image/png"].includes(pics.type)) {
      showToast("Error", ERROR_MESSAGES.INVALID_FILE_TYPE, "error");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: data,
      });
      const result = await response.json();

      if (result.secure_url) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          pic: result.secure_url.toString(),
        }));
      } else {
        showToast("Error", ERROR_MESSAGES.UPLOAD_ERROR, "error");
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
      showToast(
        "Error",
        "An error occurred while uploading the image.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="5px">
        <FormControl isRequired mt={4} id="Name">
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mt={4}>
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

        <FormControl isRequired mt={4}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <InputRightElement w="fit-content">
              <Button
                h="1.5rem"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? "Hide Confirm Password"
                    : "Show Confirm Password"
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Upload Profile Picture</FormLabel>
          <Input
            ref={fileInputRef}
            accept="image/*"
            type="file"
            onChange={(e) => postDetails(e.target.files?.[0] || null)}
          />
        </FormControl>

        <Button
          mt={6}
          width="100%"
          colorScheme="blue"
          type="submit"
          isLoading={loading}
        >
          Signup
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;
