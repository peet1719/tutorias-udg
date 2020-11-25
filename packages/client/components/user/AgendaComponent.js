import React, { Component } from 'react'


import styles from './../../assets/styles/components/calendar.module.scss';
/* import BigCalendar from 'react-big-calendar'; */
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
require('moment/locale/es.js');
/* const events = [{ title: "Today", date: new Date() }]; */

/* let allViews = Object.keys(Views).map(k => Views[k]) */
const localizer = momentLocalizer(moment);
const Agenda = () => {
    return (
        <div className={styles.container}>
            {/* <div className="row title" style={{ marginTop: "20px" }} >
                <div class="col-sm-12 btn btn-info">
                    FullCalendar In React Application
               </div>
            </div> */}
            <div className={styles.calendar_wrap}>
                <div className={styles.calendar_description}>
                    <h2 className={styles.calendar_title}>Agenda</h2>
                    <h4 className={styles.calendar_subtitle}>Aquí podras revisar las citas que tienes con tus tutores o alumnos</h4>
                </div>
                <Calendar
                    localizer={localizer}
                    events={[
                        {
                            title: 'My event',
                            allDay: false,
                            start: new Date(2020, 11, 12),
                            end: new Date(2020, 11, 14),
                        }
                    ]}
                    messages={{
                        next: "sig",
                        previous: "ant",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                      }}

                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </div>
    )
}

export default Agenda;