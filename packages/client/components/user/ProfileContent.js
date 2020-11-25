import {useState,useEffect} from 'react'
import styles from './../../assets/styles/components/profileContent.module.scss'
import Image from 'next/image'
import button from './../../assets/styles/components/buttons.module.scss'
import jwt_decode from 'jwt-decode';

const ProfileContent = () => {
    const [dataProfile, setDataProfile] = useState({})
    useEffect(() => {
        const decode = jwt_decode(localStorage.getItem('token'))
        setDataProfile(decode)
    },[])
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Perfil del estudiante</h2>
            <div className={styles.container_profile}>
                <div className={styles.profile}>
                    <div className={styles.username}>{`${dataProfile.userName} ${dataProfile.apellido}` }</div>
                    <div className={styles.username_photo}>
                        {/* <Image src="/img/user_default.png" alt="user" width={200} height={200} ></Image> */}
                        <figure className={styles.profile_shape}>
                            <Image className={styles.profile_img} src="/img/user_default.png" alt="user" width={200} height={200} ></Image>
                            {/* <img src="img/nat-8.jpg" alt="Person on a tour" class="story__img">
                            <figcaption class="story__caption">Mary Smith</figcaption> */}
                        </figure>
                    </div>
                    <div className={styles.username}>Alumno</div>
                </div>
                <div className={styles.profile_data}>
                    <div className={styles.section}>
                        <p className={styles.profile_description}>Datos generales</p>
                        <button className={`${button.btn} ${button.btn__white}`}>Editar</button>
                    </div>
                    <hr className={styles.spacer} />
                    <div className={styles.container_generalData}>
                        <ul>
                            <li><span className={styles.bold}>Nombre: </span>{dataProfile.userName}</li>
                            <li><span className={styles.bold}>Apellido: </span>{dataProfile.apellido}</li>
                            <li><span className={styles.bold}>Usuario: </span>{dataProfile.usuario ? dataProfile.usuario : ""}</li>
                        </ul>
                    </div>
                    <hr className={styles.spacer} />
                    <div className={styles.section}>
                        <p className={styles.profile_description}>Información privada</p>
                    </div>
                    <div className={styles.container_generalData}>
                        <ul>
                        <li><span className={styles.bold}>Correo: </span>{dataProfile.email ? dataProfile.email : ""}</li>
                        <li><span className={styles.bold}>Célular: </span>{dataProfile.cel ? dataProfile.cel : ""}</li>
                            <li><span className={styles.bold}>Dirección: </span>{dataProfile.address ? dataProfile.address : ""}</li>
                            <li><span className={styles.bold}>Nivel o grado: </span>{dataProfile.grade ? dataProfile.grade : ""}</li>
                            <li><span className={styles.bold}>Centro Eduativo: </span>{dataProfile.school ? dataProfile.school : ""}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileContent;