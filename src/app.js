

function getSettings() {
    // console.log(document.querySelector("#scale-range"))
    let s = document.querySelector("#scale-range").value;
    return  {
        scale: `${s} ${s} ${s}`
    }
}

function toAframe(arr) {
    return `${arr[0]} ${arr[2]} ${arr[1]}`;
}

function updateUI() {
    let settings = getSettings();

    // d3.select("body").append("p").attr("id","aaa").text("aaaaaa")
    
    console.log(data.slice(5000,5500))
    d3.select("#mainscene")
        .selectAll("a-box")
        .data(data.slice(5000,5500))
        .join("a-box")
            .attr("position", d => toAframe(d["kettle pos"]))
            .attr("color", "red")
            .attr("alphaTest", .5)
            .attr("scale", `.01 .01 .01`)
    // d3.select("#aaa").remove();

    d3.select("#mainscene").attr("scale", settings.scale)
}

function start() {

}

start();