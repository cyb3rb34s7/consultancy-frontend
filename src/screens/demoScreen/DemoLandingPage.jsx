import React, { useState, useEffect } from 'react';

import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Select,
    Button,
    Code,
    Flex,
    Text,
    VStack,
    Divider,
    useDisclosure,
    Spinner,
} from '../../../node_modules/@chakra-ui/react';
import { calculateQuotation, fetchBusinesses, fetchEmirates, fetchFreezones, fetchPackages } from '../../services/DemoService/landingFormPageService';
import LoginRegisterModal from '../Authentication/LoginRegisterModal';


const DemoLandingPage = () => {
    const [emirates, setEmirates] = useState([]);
    const [selectedEmirate, setSelectedEmirate] = useState(null);
    const [freezones, setFreezones] = useState([]);
    const [selectedFreezone, setSelectedFreezone] = useState(null);
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [quotation, setQuotation] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        fetchEmirates()
            .then(data => {
                console.log('Emirates data:', data);
                setEmirates(data);
            })
            .catch(error => console.error(error))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (selectedEmirate) {
            setIsLoading(true);
            fetchFreezones(selectedEmirate.id)
                .then(data => {
                    console.log('Freezones data:', data);
                    setFreezones(data);
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
        } else {
            setFreezones([]);
        }
    }, [selectedEmirate]);

    useEffect(() => {
        if (selectedFreezone) {
            setIsLoading(true);
            fetchBusinesses(selectedEmirate.id, selectedFreezone.id)
                .then(data => {
                    console.log('Businesses data:', data);
                    setBusinesses(data);
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
        } else {
            setBusinesses([]);
        }
    }, [selectedFreezone]);

    useEffect(() => {
        if (selectedBusiness) {
            setIsLoading(true);
            fetchPackages(selectedEmirate.id, selectedFreezone.id, selectedBusiness.id)
                .then(data => {
                    console.log('Packages data:', data);
                    setPackages(data);
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
        } else {
            setPackages([]);
        }
    }, [selectedBusiness]);

    const handleLoginSuccess = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const handleCalculateQuotation = () => {
        if (!isAuthenticated) {
            onOpen();
            return;
        }

        if (selectedPackage) {
            setIsLoading(true);
            calculateQuotation(
                selectedEmirate.id,
                selectedFreezone.id,
                selectedBusiness.id,
                selectedPackage.id
            )
                .then(data => {
                    console.log('quotation Downloaded', data);
                    setQuotation(data);
                })
                .catch(error => console.error(error))
                .finally(() => setIsLoading(false));
        }
    };
    return (

        <Flex minH="100vh" direction={'column'}>
            <Flex justify="flex-end" p={4}>
                {isAuthenticated ? (
                    <Button onClick={handleLogout}>Logout</Button>
                ) : (
                    <Button onClick={onOpen}>Login</Button>
                )}
            </Flex>
            <Flex align="center" justify="center" flex={1}>
                <Box width={'50rem'} mx="auto" p={6} boxShadow="md" borderRadius="md" bg="white">
                    <Heading size="lg" mb={6}>Quotation Form</Heading>
                    <form>
                        <FormControl mb={4}>
                            <FormLabel htmlFor="emirate">Emirates:</FormLabel>
                            <Select
                                id="emirate"
                                value={selectedEmirate ? selectedEmirate.id : ''}
                                onChange={(e) => {
                                    const selectedEmirateObj = emirates.find(emirate => emirate.id === parseInt(e.target.value, 10)) || null;
                                    setSelectedEmirate(selectedEmirateObj);
                                    console.log('Selected Emirate:', JSON.stringify(selectedEmirateObj, null, 2));
                                    if (selectedEmirateObj) {
                                        console.log('Selected Emirate ID:', selectedEmirateObj.id);
                                        console.log('Selected Emirate Name:', selectedEmirateObj.name);
                                    }
                                }}
                                placeholder="Select an emirate"
                            >
                                {emirates.map(emirate => (

                                    <option key={emirate.id} value={emirate.id}>
                                        {emirate.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel htmlFor="freezone">Freezones:</FormLabel>
                            <Select
                                id="freezone"
                                value={selectedFreezone ? selectedFreezone.id : ''}

                                onChange={(e) => {
                                    const selectedFreezoneObj = freezones.find(freezone => freezone.id === parseInt(e.target.value, 10)) || null;
                                    setSelectedFreezone(selectedFreezoneObj);
                                    console.log('Selected Emirate:', JSON.stringify(selectedFreezoneObj, null, 2));
                                    if (selectedFreezoneObj) {
                                        console.log('Selected Emirate ID:', selectedFreezoneObj.id);
                                        console.log('Selected Emirate Name:', selectedFreezoneObj.name);
                                    }
                                }}

                                isDisabled={!selectedEmirate}
                                placeholder="Select a freezone"
                            >
                                {freezones.map(freezone => (
                                    <option key={freezone.id} value={freezone.id}>
                                        {freezone.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel htmlFor="business">Businesses:</FormLabel>
                            <Select
                                id="business"
                                value={selectedBusiness ? selectedBusiness.id : ''}
                                onChange={(e) => {
                                    const selectedBusinessObj = businesses.find(business => business.id === parseInt(e.target.value, 10)) || null;
                                    setSelectedBusiness(selectedBusinessObj);
                                    console.log('Selected Business:', JSON.stringify(selectedBusinessObj, null, 2));
                                    if (selectedBusinessObj) {
                                        console.log('Selected Business ID:', selectedBusinessObj.id);
                                        console.log('Selected Business Name:', selectedBusinessObj.name);
                                    }
                                }}
                                isDisabled={!selectedFreezone}
                                placeholder="Select a business"
                            >
                                {businesses.map(business => (
                                    <option key={business.id} value={business.id}>
                                        {business.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mb={6}>
                            <FormLabel htmlFor="package">Packages:</FormLabel>
                            <Select
                                id="package"
                                value={selectedPackage ? selectedPackage.id : ''}
                                onChange={(e) => {
                                    const selectedPackageObj = packages.find(pkg => pkg.id === parseInt(e.target.value, 10)) || null;
                                    setSelectedPackage(selectedPackageObj);
                                    console.log('Selected Package:', JSON.stringify(selectedPackageObj, null, 2));
                                    if (selectedPackageObj) {
                                        console.log('Selected Package ID:', selectedPackageObj.id);
                                        console.log('Selected Package Name:', selectedPackageObj.name);
                                    }
                                }}

                                isDisabled={!selectedBusiness}
                                placeholder="Select a package"
                            >
                                {packages.map(pkg => (
                                    <option key={pkg.id} value={pkg.id}>
                                        {pkg.number_of_package}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            colorScheme="blue"
                            onClick={handleCalculateQuotation}
                            isDisabled={!selectedPackage || isLoading}
                            isLoading={isLoading}
                        >
                            Calculate Quotation
                        </Button>
                    </form>
                    {isLoading && (
                        <Flex justify="center" mt={4}>
                            <Spinner size="xl" />
                        </Flex>
                    )}

                    {quotation && (
                        <Box mt={6}>
                            <Heading size="md" mb={4}>Quotation:</Heading>
                            <VStack align="start" spacing={4} divider={<Divider />}>
                                <Text>
                                    <strong>Package Name:</strong> {quotation.packageName}
                                </Text>
                                <Text>
                                    <strong>Total Cost:</strong> ${quotation.totalCost}
                                </Text>
                                <Box >
                                    <Heading size="sm" mb={2}>Cost Breakdown:</Heading>
                                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                                        {Object.entries(quotation.breakdown).map(([key, value]) => (

                                            <Text key={key}>
                                                <strong>{key}:</strong> ${value}
                                            </Text>
                                        ))}
                                    </Box>

                                </Box>
                            </VStack>
                        </Box>
                    )}
                </Box>
            </Flex>
            <LoginRegisterModal isOpen={isOpen} onClose={onClose} onLoginSuccess={handleLoginSuccess} />
        </Flex>



    );
};

export default DemoLandingPage;