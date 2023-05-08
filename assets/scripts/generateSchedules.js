import movies from '../../movies.json' assert { type: 'json' }

export const generateSchedules = () => {
    const durationsInMinutes = movies.map(movie => {
        const [hours, minutes] = movie.duration.split(' ');
        return parseInt(hours) * 60 + parseInt(minutes);
    });

    const theaters = Array.from({ length: 15 }, (_, i) => i + 1);
    const schedules = {};

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (const movie of movies) {
        const duration = durationsInMinutes[movies.indexOf(movie)];

        const movieSchedules = {};

        for (const dayOfWeek of daysOfWeek) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            currentDate.setDate(currentDate.getDate() + daysOfWeek.indexOf(dayOfWeek));

            const dailySchedules = [];

            let scheduleCount = 0;
            let hour = 15;

            while (scheduleCount < 6 && hour <= 21) {
                const date = new Date(currentDate);
                date.setHours(hour, 0, 0, 0);

                const endTime = new Date(date);
                endTime.setMinutes(endTime.getMinutes() + duration);

                let assignedTheater = null;

                for (const theater of theaters) {
                    const occupiedSchedules = dailySchedules.filter(schedule => {
                        return (
                            (date >= schedule.startTime && date < schedule.endTime) ||
                            (endTime > schedule.startTime && endTime <= schedule.endTime)
                        );
                    });

                    if (occupiedSchedules.length === 0) {
                        assignedTheater = theater;
                        break;
                    }
                }

                if (assignedTheater === null) {
                    assignedTheater = theaters[Math.floor(Math.random() * theaters.length)];
                }

                const schedule = {
                    theater: assignedTheater,
                    startTime: date,
                    endTime: endTime
                };

                dailySchedules.push(schedule);

                scheduleCount++;
                hour++;
            }

            movieSchedules[dayOfWeek] = dailySchedules;
        }

        schedules[movie.id] = movieSchedules;
    }

    return schedules;
}


export const getMovieSchedule = movieId => {
    const schedules = JSON.parse(sessionStorage.getItem('schedules'))
    return schedules[movieId]
}

export const getMovieDays = schedules => {
    const days = Object.entries(schedules).map(schedule => {
        const formatedDays = schedule[1].map(date => new Date(date.startTime).toLocaleDateString('es', { month: 'long', day: 'numeric' }))
        const [date] = new Set(formatedDays)
        return {
            weekday: schedule[0],
            date: date
        }
    })

    return days
}

export const getMovieHours = (weekday, schedules) => {
    const hours = schedules[weekday]
    const formatedHours = hours.map(hour => {
        return {
            theater: hour.theater,
            time: new Date(hour.startTime).toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })
        }
    })

    return formatedHours
}