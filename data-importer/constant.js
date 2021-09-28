const constants = {
    QUERY_INSERT_TEI: "insert into tracker_entity_instance (id,age,certificate,code,local_id,nom,prenom,sexe,telephone,prefecture,sous_prefecture,village,quartier,profession,uid,region) values (nextval('sequence_generator'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) RETURNING id;",
    QUERY_UPDATE_TEI: "update tracker_entity_instance set age=$1,local_id=$2,nom=$3,prenom=$4,sexe=$5,telephone=$6,prefecture=$7,sous_prefecture=$8,village=$9,quartier=$10,profession=$11,region=$12 where uid=$13 RETURNING id;",
    QUERY_INSERT_EVENT: "insert into event (id,uid,date_vaccination,site_vaccination,type_vaccin,lot,tei_id,dose) values(nextval('sequence_generator'),$1,$2,$3,$4,$5,$6,$7);",
    QUERY_UPDATE_EVENT: "update event set date_vaccination=$1,site_vaccination=$2,type_vaccin=$3,lot=$4 where uid = $5;",
    QUERY_SELECT_TEI: "select * from tracker_entity_instance where uid =$1;",
    QUERY_SELECT_EVENT: "select * from event where uid = $1;",
    QUERY_DELETE_TEI : "delete from tracker_entity_instance where uid = $1;",
    QUERY_DELETE_EVENT : "delete from event where uid = $1;",
    STATUS_DE : "ENZzol6OWdD"
};



exports.constants = constants;