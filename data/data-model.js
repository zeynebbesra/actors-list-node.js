const db = require('./db-config')

module.exports = {
    findAktor,
    findAktorByID,
    addAktor,
    updateAktor,
    deleteAktor,
}

function findAktor(){
    return db("aktor")
}

function findAktorByID(id){
    return db("aktor").where({ id }).first()
}

function addAktor(yeniAktor) {
    //2.parametre görmek istediğimiz değer. ("id")
    //Geri döndürülen değer dizidir.
    return db("aktor")
    .insert(yeniAktor, "id")
    .then(([id]) => {
        return db("aktor").where( id ).first() //bir tane aktor eklediğimi biliyorum bu yüzden dizi istemiyorum bu sebeple first metodunu kullandım.
    })
}


//updated değişkeni, güncelleme işleminin sonucunu temsil eder.
//updatedAktor, güncellenmiş aktör bilgilerini içeren bir nesnedir. 
function updateAktor(updatedAktor, id){
    return db("aktor")
    .update(updatedAktor)
    .where({id})
    .then((updated) =>  {
        if (updated){
            //.where(id).first() ifadesiyle güncellenen aktörün yeni bilgilerini veritabanından çeker.
            return db("aktor").where({id}).first()
        }
    })
}

function deleteAktor(id) {
    return db("aktor").del().where({id})
}