const constants = {
    QUERY_INSERT_TEI: "insert into tracker_entity_instance (id,age,certificate,code,local_id,nom,prenom,sexe,telephone,prefecture,sous_prefecture,village,quartier,profession,uid) values (nextval('sequence_generator'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id;",
    QUERY_INSERT_EVENT: "insert into event (id,uid,date_vaccination,site_vaccination,type_vaccin,lot,tei_id) values(nextval('sequence_generator'),$1,$2,$3,$4,$5,$6)",
    QUERY_UPDATE_EVENT: "update event set date_vaccination=$1,site_vaccination=$2,type_vaccin=$3,lot=$4 where uid = $5;",
    QUERY_SELECT_TEI: "select * from tracker_entity_instance where uid =$1",
    QUERY_SELECT_EVENT: "select * from event where uid =$1",
};



exports.constants = constants;