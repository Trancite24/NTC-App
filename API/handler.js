const mysql = require('mysql');
const moment = require('moment');


module.exports.insertIntoJourneyTable = (event, context, callback) => {
    let journey;
    journey = JSON.parse(event.body);
    journey.date = moment(journey.date, 'DD/MM/YYYY').format('YYYY-MM-DD').toString();
    let connection = mysql.createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });
    connection.connect();
    let sqlQuery = `INSERT INTO journey (journeyId, nic, routeNo, fromName, toName, door, numberOfSeats, date)VALUES ('${journey.journeyId}', '${journey.nic}','${journey.routeNo}', '${journey.fromName}', '${journey.toName}', '${journey.door}', '${journey.numberOfSeats}', '${journey.date}');`;
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
            connection.destroy();
            callback(null, {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({message: 'error'})
            });
        } else {

            console.log('Success!');
            console.log(results);
            connection.end();
            callback(null, {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                },
                body: JSON.stringify({message: 'inserted all'}),
            });


        }
    });


};

module.exports.insertIntoBusStopTable = (event, context, callback) => {
    let busStops = JSON.parse(event.body);
    let connection = mysql.createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });
    console.log(busStops);
    connection.connect();
    for (let i = 0; i < busStops.length; i++) {
        let busStop = busStops[i];
        console.log(busStop);
        let updatedTime = new Date().getTime().toString();
        let sqlQuery = `INSERT INTO busstop (busstopId, journeyId, lat, lon, name, timeStamp ,maleChildOut, maleYoungOut, maleManOut, maleElderOut, femaleChildOut, femaleYoungOut, femaleWomanOut, femaleElderOut, maleChildIn, maleYoungIn, maleManIn, maleElderIn, femaleChildIn, femaleYoungIn, femaleWomanIn, femaleElderIn, outTotal, inTotal, busStopType, updatedTime)VALUES ('${busStop.busstopId}', '${busStop.journeyId}', '${busStop.lat}', '${busStop.lon}', '${busStop.name}', '${busStop.timeStamp}', '${busStop.maleChildOut}', '${busStop.maleYoungOut}', '${busStop.maleManOut}', '${busStop.maleElderOut}', '${busStop.femaleChildOut}', '${busStop.femaleYoungOut}', '${busStop.femaleWomanOut}', '${busStop.femaleElderOut}', '${busStop.maleChildIn}', '${busStop.maleYoungIn}', '${busStop.maleManIn}', '${busStop.maleElderIn}', '${busStop.femaleChildIn}', '${busStop.femaleYoungIn}', '${busStop.femaleWomanIn}', '${busStop.femaleElderIn}', '${busStop.outTotal}', '${busStop.inTotal}', '${busStop.busStopType}','${updatedTime}');`;
        connection.query(sqlQuery, (error, results, fields) => {
            if (error) {
                connection.destroy();
                callback(null,
                    {
                        statusCode: 500,
                        headers: {
                            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                            "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                        },
                        body: JSON.stringify({message: 'error'})
                    });
            } else {

                console.log('Success!');
                console.log(results);


            }
        });
    }
    /* busStops.forEach(
         (busStop) => {
             let sqlQuery = `INSERT INTO busstop (busstopId, journeyId, lat, lon, maleChildOut, maleYoungOut, maleManOut, maleElderOut, femaleChildOut, femaleYoungOut, femaleWomanOut, femaleElderOut, maleChildIn, maleYoungIn, maleManIn, maleElderIn, femaleChildIn, femaleYoungIn, femaleWomanIn, femaleElderIn, outTotal, inTotal)VALUES ('${busStop.busstopId}', '${busStop.journeyId}', '${busStop.lat}', '${busStop.lon}', '${busStop.maleChildOut}', '${busStop.maleYoungOut}', '${busStop.maleManOut}', '${busStop.maleElderOut}', '${busStop.femaleChildOut}', '${busStop.femaleYoungOut}', '${busStop.femaleWomanOut}', '${busStop.femaleElderOut}', '${busStop.maleChildIn}', '${busStop.maleYoungIn}', '${busStop.maleManIn}', '${busStop.maleElderIn}', '${busStop.femaleChildIn}', '${busStop.femaleYoungIn}', '${busStop.femaleWomanIn}', '${busStop.femaleElderIn}', '${busStop.outTotal}', '${busStop.inTotal}');`;
             connection.query(sqlQuery, (error, results, fields) => {
                 if (error) {
                     connection.destroy();
                     callback(null, error);
                 } else {

                     console.log('Success!');
                     console.log(results);


                 }
             });
         }
     );*/

    connection.end();
    callback(null,
        {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({message: 'inserted all'}),
        });

};
