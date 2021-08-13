const { dhis2 } = require('./dhis2/dhis2');
const config = require('config')
const connectDB = require('./config/db');
const cron = require("node-cron");
const { constants } = require('./constant');

const REQUEST = config.get('dhis2.query');
const SIZE = 200;



const postgres = async () => {


    let page = 1;
    let pager = { pageCount: 1 };

    const client = await connectDB();

    while (page <= pager.pageCount) {

        let FULL_URL = `${REQUEST}&pageSize=${SIZE}&page=${page}`;

        const response = await dhis2.get(FULL_URL);
        const rows = response.data.rows;
        processing(rows, client);
        pager = { page, total, pageSize, pageCount } = response.data.metaData.pager
        console.log(pager);
        page = page + 1;
    }

    await client.end()
}


const processing = async (rows, client) =>{
    for (const v_event of rows) {
        try {

            const row = formatEvent(v_event);

            // check if the current tei is in the database;
            const dbTei = await client.query(constants.QUERY_SELECT_TEI, [row.trackedEntityInstanceUid]);

            let trackedEntityInstanceId = 0;
            let tei = [];

            if (dbTei.rows && dbTei.rows.length > 0) {
                trackedEntityInstanceId = dbTei.rows[0].id;
            } else {
                // insert a trackedEntityInstance
                const values = [row.age, row.naissance, 234, row.localid, row.nom, row.prenom, row.sexe, row.telephone, row.prefecture, row.sousPrefecture, "", row.quartier, row.profession, row.trackedEntityInstanceUid,row.region];
                tei = await client.query(constants.QUERY_INSERT_TEI, values);
                trackedEntityInstanceId = tei.rows[0].id;
            }

            // check current event is already in the database 
            let eventText = "";
            let eventValues = [];
            const dbEvent = await client.query(constants.QUERY_SELECT_EVENT, [row.eventUid]);
            if (dbEvent.rows && dbEvent.rows.length > 0) {
                // update linked event
                eventText = constants.QUERY_UPDATE_EVENT;
                eventValues = [row.dateVaccination, row.siteVaccination, row.typeVaccin, row.numeroLot, row.eventUid];
            } else {
                // insert linked event (vaccination)
                eventText = constants.QUERY_INSERT_EVENT;
                eventValues = [row.eventUid, row.dateVaccination, row.siteVaccination, row.typeVaccin, row.numeroLot, trackedEntityInstanceId, row.numeroDose];
            }
            await client.query(eventText, eventValues);
        } catch (error) {
            console.log(error);
        }
    };
}


formatEvent = (v_event) => {

    const result = {
        eventUid: v_event[0],
        trackedEntityInstanceUid: v_event[5],
        localid: v_event[13],
        nom: v_event[14],
        prenom: v_event[15],
        sexe: v_event[16],
        naissance: v_event[17],
        profession: v_event[18] === "Autres" ? v_event[19] : v_event[18],
        telephone: v_event[20],
        region: v_event[21],
        prefecture: v_event[22],
        sousPrefecture: v_event[23],
        quartier: v_event[24],
        carte: v_event[25],
        dateVaccination: v_event[26],
        numeroDose: v_event[27],
        numeroLot: v_event[28],
        dateExpirationLot: v_event[29],
        typeVaccin: v_event[30],
        siteVaccination: v_event[31] === "AUTRES" ? v_event[32] : v_event[31],
        dateProchainDose: v_event[33],
        age: calcAge(new Date(v_event[17]), v_event[26])
    };

    return result;

}

function calcAge(birthDate, vaccDate) {

    var birthday = new Date(birthDate);
    //return ~~((new Date(vaccDate) - birthday) / (31557600000));
    return new Date(vaccDate).getFullYear() - birthday.getFullYear();
}

postgres();





// cron.schedule("0 */1 * * *", async () => { });
