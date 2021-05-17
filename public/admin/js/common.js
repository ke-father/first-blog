function serializeToJson(farm) {
    var obj = {};

    let f = farm.serializeArray();

    f.forEach(function (item) {
        obj[item.name] = item.value;
    })

    return obj;

}