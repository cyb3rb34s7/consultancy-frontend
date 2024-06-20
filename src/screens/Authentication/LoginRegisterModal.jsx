import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  PinInput,
  PinInputField,
  HStack,
  Spinner,
} from '../../../node_modules/@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '../../../node_modules/@chakra-ui/icons';
import { login, register, verifyEmail } from '../../services/AuthService';

const LoginRegisterModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        const token = await login(email, password);
        onLoginSuccess(token);
        onClose();
      } else {
        if (password !== confirmPassword) {
          toast({
            title: "Passwords don't match",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
        await register(firstName, lastName, password, confirmPassword, phoneNumber, email);
        toast({
          title: 'Registration successful',
          description: 'Please enter the OTP sent to your email',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setShowOtpInput(true);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await verifyEmail(email, otp);
      onLoginSuccess(response.token);
      onClose();
      toast({
        title: 'Email verified',
        description: 'You have been successfully logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isLogin ? 'Login' : 'Register'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!showOtpInput ? (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {!isLogin && (
                  <>
                    <FormControl isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </FormControl>
                  </>
                )}
                <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                  {isLogin ? 'Login' : 'Register'}
                </Button>
              </VStack>
            </form>
          ) : (
            <VStack spacing={4}>
              <Text>Enter the OTP sent to your email</Text>
              <HStack>
                <PinInput otp onComplete={(value) => setOtp(value)}>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <Button onClick={handleOtpSubmit} colorScheme="blue" isLoading={isLoading}>
                Verify OTP
              </Button>
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          {!showOtpInput && (
            <Text>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Register' : 'Login'}
              </Button>
            </Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginRegisterModal;