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
import { IFormData, IFormEventHandlers } from "../../interfaces/formInterface";

const Signup: React.FC = () => {
  // form data state
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });

  // separate states for show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // reference for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // event handlers
  const handleInputChange: IFormEventHandlers["handleInputChange"] = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // clear form data after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      pic: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const postDetails = (picFile: File) => {
    // Handle file upload logic here (validation, preview, uploading, etc.)
    console.log(picFile);
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
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>

        <Button mt={6} width="100%" colorScheme="blue" type="submit">
          Signup
        </Button>
      </VStack>
    </form>
  );
};

export default Signup;
