import React, { useEffect, useState } from 'react'
import { fetchEmirates } from '../../services/DemoService/landingFormPageService';

const LandingPage = () => {
    const [emirates, setEmirates] = useState([]);
    const [selectedEmirate, setSelectedEmirate] = useState('');
    const [freezones, setFreezones] = useState([]);
    const [selectedFreezone, setSelectedFreezone] = useState('');
    const [businesses, setBusinesses] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [quotation, setQuotation] = useState(null);

    useEffect(() => {
        fetchEmirates()
            .then(data => {
                setEmirates(data)

            }

            )
            .catch(error => console.error(error));
    }, []);


    return (
        <div>
            <h2>Quotation Form</h2>
        </div>
    )
}

export default LandingPage
