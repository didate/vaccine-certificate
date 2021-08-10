const axios = require('axios');
const config = require('config')

const TOKEN = config.get('dhis2.token');
const headers = { Authorization: `Basic ${TOKEN}` };

const URI = config.get('dhis2.baseUrl');

const size = 200;


let data = [];
/* 
https://dhis2.anss-guinee.org/hmis/api/29/analytics/events/query/c9m3ufPy8D6.json?dimension=pe:THIS_YEAR,ou:Ky2CzFdfBuO,etZ2map5UjF.A1bNxMuvb66,etZ2map5UjF.bbOBxG4F6ja,etZ2map5UjF.bXEwbxbLR9a,etZ2map5UjF.Mj4c07bIa9v,etZ2map5UjF.X2ewZ9nk3r0,etZ2map5UjF.oM60JxeliEy,etZ2map5UjF.NbzrdyiCgYF,etZ2map5UjF.cWAOfDiaXRJ,etZ2map5UjF.WAvcn9eW1IH,etZ2map5UjF.rkQEv1WFZ1u,etZ2map5UjF.xCc7On3MR53,etZ2map5UjF.wlud1vswX9j,etZ2map5UjF.ZhlqaIivZOl,etZ2map5UjF.kd5c8OH1vYM,etZ2map5UjF.KsXsD2K8lpg,etZ2map5UjF.LqjoygdutkZ,etZ2map5UjF.OnKVxqacaXs,etZ2map5UjF.Rwaod1ZtWqW,etZ2map5UjF.ajd9AeY7yJ7,etZ2map5UjF.V7tHVKvHnYZ,etZ2map5UjF.rviA7UQkRnv&stage=etZ2map5UjF&displayProperty=SHORTNAME&outputType=EVENT&desc=eventdate&pageSize=100&page=1
 */
const query = async (yesterday, today, page = 1) => {

    console.log(headers);
    data = []
    const URL = `${URI}/analytics/events/query/c9m3ufPy8D6.json?dimension=pe:THIS_YEAR,ou:Ky2CzFdfBuO,etZ2map5UjF.A1bNxMuvb66,etZ2map5UjF.bbOBxG4F6ja,etZ2map5UjF.bXEwbxbLR9a,etZ2map5UjF.Mj4c07bIa9v,etZ2map5UjF.X2ewZ9nk3r0,etZ2map5UjF.oM60JxeliEy,etZ2map5UjF.NbzrdyiCgYF,etZ2map5UjF.cWAOfDiaXRJ,etZ2map5UjF.WAvcn9eW1IH,etZ2map5UjF.rkQEv1WFZ1u,etZ2map5UjF.xCc7On3MR53,etZ2map5UjF.wlud1vswX9j,etZ2map5UjF.ZhlqaIivZOl,etZ2map5UjF.kd5c8OH1vYM,etZ2map5UjF.KsXsD2K8lpg,etZ2map5UjF.LqjoygdutkZ,etZ2map5UjF.OnKVxqacaXs,etZ2map5UjF.Rwaod1ZtWqW,etZ2map5UjF.ajd9AeY7yJ7,etZ2map5UjF.V7tHVKvHnYZ,etZ2map5UjF.rviA7UQkRnv&stage=etZ2map5UjF&displayProperty=SHORTNAME&outputType=EVENT&desc=eventdate&pageSize=${size}&page=${page}`;
   
    console.log(URL);
    //const yesterday = ymd(addDays(new Date(), -1));
    const response = await axios.get(URL, {
        headers: headers
    });
    makeData(response.data.rows);
    const pager = { page, total, pageSize, pageCount } = response.data.metaData.pager

    if (pager.pageCount > 0) {
       /*  for (let index = 2; index <= pager.pageCount; index++) {
            page = index;
            const response = await axios.get(`${URI}/analytics/events/query/c9m3ufPy8D6.json?dimension=pe:THIS_YEAR,ou:Ky2CzFdfBuO,etZ2map5UjF.A1bNxMuvb66,etZ2map5UjF.bbOBxG4F6ja,etZ2map5UjF.bXEwbxbLR9a,etZ2map5UjF.Mj4c07bIa9v,etZ2map5UjF.X2ewZ9nk3r0,etZ2map5UjF.oM60JxeliEy,etZ2map5UjF.NbzrdyiCgYF,etZ2map5UjF.cWAOfDiaXRJ,etZ2map5UjF.WAvcn9eW1IH,etZ2map5UjF.rkQEv1WFZ1u,etZ2map5UjF.xCc7On3MR53,etZ2map5UjF.wlud1vswX9j,etZ2map5UjF.ZhlqaIivZOl,etZ2map5UjF.kd5c8OH1vYM,etZ2map5UjF.KsXsD2K8lpg,etZ2map5UjF.LqjoygdutkZ,etZ2map5UjF.OnKVxqacaXs,etZ2map5UjF.Rwaod1ZtWqW,etZ2map5UjF.ajd9AeY7yJ7,etZ2map5UjF.V7tHVKvHnYZ,etZ2map5UjF.rviA7UQkRnv&stage=etZ2map5UjF&displayProperty=SHORTNAME&outputType=EVENT&desc=eventdate&pageSize=${size}&page=${page}`, {
                headers: headers
            });
            makeData(response.data.rows);

        } */
    }

    return data;
}



function makeData(rows) {
    rows.forEach(element => {

        const event = {
            localid: element[13],
            lastname: element[14],
            firstname: element[15],
            recipient: element[16],
            result: element[17],
            dateresultat: element[18],
            consultation: element[19]
        }
        data.push(event);
    });
}

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}
function ymd(t = new Date()) {
    return t.toISOString().slice(0, 10)
}


module.exports = { query }