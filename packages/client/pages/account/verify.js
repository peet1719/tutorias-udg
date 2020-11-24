import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './../../assets/styles/components/verifyEmail.module.scss'
import button from './../../assets/styles/components/buttons.module.scss';
import Checkmark from './../../assets/icons/SVG/checkmark.svg';
import Cross from './../../assets/icons/SVG/cross.svg';
import Link from 'next/link';
import { useQuery } from '@apollo/client'
import { VERIFICATION_TOKEN } from './../../components/graphql/querys/users';

const Verify = () => {
    const [valid, setValid] = useState(false);
    const router = useRouter()
    const [datos, setDatos] = useState({})

    const { data, loading, error } = useQuery(VERIFICATION_TOKEN, {
        variables:
        {
            token: router.query.token
        }
    })


    useEffect(() => {

        if (!loading) {
            if (data) {
                console.log(data)
                setDatos({
                    title: data.verificationToken.title,
                    text: data.verificationToken.text,
                    successful: data.verificationToken.successful
                })
            }
            if (error) {
                setDatos({
                    title: "Lo sentimos",
                    text: error.message,
                    successful: false
                })
            }
        }

    }, [data, error])

    return (
        <div className={styles.container}>
            {datos.successful ? <Checkmark className={styles.checkmark_icon} /> : <Cross className={styles.cross_icon} />}
            <h1 className={styles.title}>{datos.title}</h1>
            <p className={styles.text}>{datos.text}</p>
            <Link href="/"><button className={`${button.btn} ${button.btn__primary}`} >Continuar</button></Link>
        </div>
    )

}

export default Verify;