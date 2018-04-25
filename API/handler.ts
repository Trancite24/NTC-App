import * as Winston from 'winston';
import {createConnection, Connection} from 'mysql';

export const createJourneyTable = async (event, context, callback) => {
    let inputData = [];
    let results: any;
    inputData = JSON.parse(event.body);
    let connection = createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });

    let sqlQuery = 'CREATE TABLE journey(journeyId VARCHAR(50),nic VARCHAR(25),date VARCHAR(50),routeNo VARCHAR(25),fromName VARCHAR(50),toName VARCHAR(50),door VARCHAR(25),numberOfSeats INTEGER,PRIMARY KEY (journeyId)) ENGINE=InnoDB';
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
            connection.destroy();
            callback(null, error);
        } else {

            console.log('Success!');
            results = results;
            console.log(results);
            connection.end();
            const response = {
                statusCode: 200,
                body: JSON.stringify(results),
            };
            callback(null, response);


        }
    });


};

export const createBusStopTable = async (event, context, callback) => {
    let inputData = [];
    let results: any;
    inputData = JSON.parse(event.body);
    let connection = createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });

    let sqlQuery = 'CREATE TABLE busstop(busstopId VARCHAR(50),journeyId VARCHAR(50),lat VARCHAR(25),lon VARCHAR(25),name VARCHAR(100),timeStamp VARCHAR(25),maleChildOut INTEGER,maleYoungOut INTEGER,maleManOut INTEGER,maleElderOut INTEGER,femaleChildOut INTEGER,femaleYoungOut INTEGER,femaleWomanOut INTEGER,femaleElderOut INTEGER,maleChildIn INTEGER,maleYoungIn INTEGER,maleManIn INTEGER,maleElderIn INTEGER,femaleChildIn INTEGER,femaleYoungIn INTEGER,femaleWomanIn INTEGER,femaleElderIn INTEGER,outTotal INTEGER,inTotal INTEGER,busStopType VARCHAR(25),updatedTime VARCHAR(25),PRIMARY KEY (busstopId)) ENGINE=InnoDB';
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
            connection.destroy();
            callback(null, error);
        } else {

            console.log('Success!');
            results = results;
            console.log(results);
            connection.end();
            const response = {
                statusCode: 200,
                body: JSON.stringify(results),
            };
            callback(null, response);


        }
    });


};

export const dropJourneyTable = async (event, context, callback) => {
    let inputData = [];
    let results: any;
    inputData = JSON.parse(event.body);
    let connection = createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });

    //let sqlQuery = 'CREATE TABLE journey(journeyId VARCHAR(50),date VARCHAR(25),routeNo VARCHAR(25),routeName VARCHAR(25),heading VARCHAR(25),door VARCHAR(25),PRIMARY KEY (journeyId)) ENGINE=InnoDB';
    connection.query('DROP TABLE journey', (error, results, fields) => {
        if (error) {
            connection.destroy();
            callback(null, error);
        } else {

            console.log('Success!');
            results = results;
            console.log(results);
            connection.end();
            const response = {
                statusCode: 200,
                body: JSON.stringify(results),
            };
            callback(null, response);


        }
    });


};

export const dropBusStopTable = async (event, context, callback) => {
    let inputData = [];
    let results: any;
    inputData = JSON.parse(event.body);
    let connection = createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });

    //let sqlQuery = 'CREATE TABLE journey(journeyId VARCHAR(50),date VARCHAR(25),routeNo VARCHAR(25),routeName VARCHAR(25),heading VARCHAR(25),door VARCHAR(25),PRIMARY KEY (journeyId)) ENGINE=InnoDB';
    connection.query('DROP TABLE busstop', (error, results, fields) => {
        if (error) {
            connection.destroy();
            callback(null, error);
        } else {

            console.log('Success!');
            results = results;
            console.log(results);
            connection.end();
            const response = {
                statusCode: 200,
                body: JSON.stringify(results),
            };
            callback(null, response);


        }
    });


};


export const insertIntoJourneyTable = async (event, context, callback) => {
    let journey: any;
    let results: any;
    journey = JSON.parse(event.body);
    let connection = createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });

    let sqlQuery = `INSERT INTO journey (journeyId, date, nic, routeNo, fromName, toName, door, numberOfSeats)VALUES ('${journey.journeyId}', '${journey.date}', '${journey.nic}','${journey.routeNo}', '${journey.fromName}', '${journey.toName}', '${journey.door}', '${journey.numberOfSeats}');`;
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
            connection.destroy();
            callback(null, error);
        } else {

            console.log('Success!');
            results = results;
            console.log(results);
            connection.end();
            const response = {
                statusCode: 200,
                body: JSON.stringify(results),
            };
            callback(null, response);


        }
    });


};

export const insertIntoBusStopTable = async (event, context, callback) => {
    let busStops = [];
    let results: any;
    busStops = JSON.parse(event.body);
    let connection = createConnection({
        host: 'ntc-survey.c0nd5tynef9m.us-east-1.rds.amazonaws.com',
        user: 'trancite24',
        password: 'tranciteadmin321',
        port: 3306,
        database: 'NTCSurvey',
    });
    console.log(busStops);
    for (let i = 0; i < busStops.length; i++) {
    let busStop = busStops[i];
    console.log(busStop);
     let updatedTime = new Date().getTime().toString();
        let sqlQuery = `INSERT INTO busstop (busstopId, journeyId, lat, lon, name, timeStamp ,maleChildOut, maleYoungOut, maleManOut, maleElderOut, femaleChildOut, femaleYoungOut, femaleWomanOut, femaleElderOut, maleChildIn, maleYoungIn, maleManIn, maleElderIn, femaleChildIn, femaleYoungIn, femaleWomanIn, femaleElderIn, outTotal, inTotal, busStopType, updatedTime)VALUES ('${busStop.busstopId}', '${busStop.journeyId}', '${busStop.lat}', '${busStop.lon}', '${busStop.name}', '${busStop.timeStamp}', '${busStop.maleChildOut}', '${busStop.maleYoungOut}', '${busStop.maleManOut}', '${busStop.maleElderOut}', '${busStop.femaleChildOut}', '${busStop.femaleYoungOut}', '${busStop.femaleWomanOut}', '${busStop.femaleElderOut}', '${busStop.maleChildIn}', '${busStop.maleYoungIn}', '${busStop.maleManIn}', '${busStop.maleElderIn}', '${busStop.femaleChildIn}', '${busStop.femaleYoungIn}', '${busStop.femaleWomanIn}', '${busStop.femaleElderIn}', '${busStop.outTotal}', '${busStop.inTotal}', '${busStop.busStopType}','${updatedTime}');`;
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
    const response = {
        statusCode: 200,
        body: JSON.stringify({message: 'inserted all'}),
    };
    callback(null, response);

};
