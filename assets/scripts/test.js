import movies from '../../movies.json' assert { type: 'json' }

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function generateSchedules(movies) {
    const durationsInMinutes = movies.map(movie => {
        const [hours, minutes] = movie.duration.split(' ');
        return parseInt(hours) * 60 + parseInt(minutes);
    });

    const theaters = Array.from({ length: 15 }, (_, i) => i + 1);
    const schedules = {};

    for (const movie of movies) {
        const duration = durationsInMinutes[movies.indexOf(movie)];

        const movieSchedules = {};

        for (const dayOfWeek of daysOfWeek) {
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            currentDate.setDate(currentDate.getDate() + daysOfWeek.indexOf(dayOfWeek));

            const dailySchedules = [];

            for (let hour = 9; hour <= 21; hour++) {
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
            }

            movieSchedules[dayOfWeek] = dailySchedules;
        }

        schedules[movie.id] = movieSchedules;
    }

    return schedules;
}


// Ejemplo de uso (continuación)
const peliculas = [
    { titulo: 'Pelicula 1', duracion: '1h 45min' },
    { titulo: 'Pelicula 2', duracion: '2h 10min' },
    { titulo: 'Pelicula 3', duracion: '1h 32min' },
    { titulo: 'Pelicula 4', duracion: '2h 30min' },
    { titulo: 'Pelicula 5', duracion: '1h 46min' },
    { titulo: 'Pelicula 6', duracion: '1h 46min' },
    { titulo: 'Pelicula 7', duracion: '1h 46min' },
    { titulo: 'Pelicula 8', duracion: '1h 46min' },
    { titulo: 'Pelicula 9', duracion: '1h 46min' },
    { titulo: 'Pelicula 10', duracion: '1h 46min' },
    { titulo: 'Pelicula 11', duracion: '1h 46min' },
    // Agregar más películas si es necesario
];

const schedules = generateSchedules(movies);

console.log(schedules)

