import React, { useEffect, useState } from 'react';
import { app } from '../../firebaseInit'
import Carrossel from '../../components/Carrossel';
import { getAllCarousel } from '../../components/Carrossel/controllers';
import { iCarrossel } from '../../components/Carrossel/interfaces';
import './style.css'

export default function HomePage() {
    const [carrosseis, setCarrosseis] = useState<{ String: iCarrossel } | {}>({});

    useEffect(() => {
        handlePageLoad(setCarrosseis);
    }, [])

    async function handlePageLoad(setCarrosseis: React.Dispatch<React.SetStateAction<{} | { String: iCarrossel }>>) {
        try {
            const data = await getAllCarousel();
            if (data.exists()) {
                setCarrosseis(data.val());
            } else {
                console.log("No data available");
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className='home-page__container'>

            {carrosseis ? Object.values((carrosseis as iCarrossel[])).map((carrossel, index) => {
                return <Carrossel key={index} carrossel={carrossel} />
            }) : <></>}
        </div>
    )
}


  