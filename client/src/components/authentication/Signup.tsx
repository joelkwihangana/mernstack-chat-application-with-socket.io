import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
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
  const [loading, setLoading] = useState(false);

  // reference for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chakra Toast for notifications
  const toast = useToast();

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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

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

  const postDetails = (pics: File | null) => {
    setLoading(true);

    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

    if (!uploadPreset || !uploadUrl) {
      toast({
        title: "Error",
        description: "Cloudinary configuration is missing.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // Ensure a picture is selected
    if (!pics) {
      toast({
        title: "Error",
        description: "Please select a picture",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Stop loading on error
      return;
    }

    // Check if the file type is valid
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", uploadPreset || ""); // Ensure preset is available

      fetch(uploadUrl || "", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secure_url) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              pic: data.secure_url.toString(),
            }));
            console.log(data.secure_url.toString());
          } else {
            // Handle failure response from Cloudinary
            toast({
              title: "Error",
              description: "Failed to upload the image. Please try again.",
              status: "error",
              duration: 4000,
              isClosable: true,
              position: "bottom",
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error uploading the image:", error);
          toast({
            title: "Error",
            description: "An error occurred while uploading the image.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        });
    } else {
      // Handle invalid file types
      toast({
        title: "Error",
        description: "Please select a valid image file (JPEG or PNG)",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false); // Stop loading on invalid file type
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
            onChange={(e) => postDetails(e.target.files[0])}
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
