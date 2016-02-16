var dataset;

d3.csv("executions.csv", function(error, data) {

    if (error) {  //If error is not null, something went wrong.
        console.log(error);  //Log the error.
    } else {      //If no error, the file loaded correctly. Yay!
        dataset = data;
        console.log(dataset); //Log the data.
        generateVis();
        // hideLoadingMsg();
    }
});

var w = 1000;
var h = 800;

function generateVis() {

    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, w], 0.05);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

    //Create SVG element
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle") 
        .attr("cx", function(d) {
            return 900*Number(d.xcor) + 220;
        })
        .attr("cy", function(d) {
            return 900*Number(d.ycor) + 360;
        })
        .attr("r", 4)
        .attr("fill", function(d) {
                return "black";
        })
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) {
            return yScale(d);
        })
        .on("mouseover",function(d) {
            console.log(d.num);
            d3.select(this)
                .attr("fill", "red")

            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

            // Update the tooltip position and value
            d3.select("#tooltip")
              .select("#value")
              .text(d.LastS);
            d3.select("#name")
              .text(d.FirstName + " " + d.LastName);
            d3.select("#date")
              .text("(Age " + d.Age + ", " + d.Date + ")");

            if (d.form != "y") {
                changeimage(d.image);
            } else {
                changeimage("nophoto.jpg");
            }

            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
        })

        .on("mouseout",function(d) {
            //console.log(d.num);
            d3.select(this)
                .attr("fill", function(d) {
                return "black";
            })

            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true);

        });

    // d3.select("#button1")
    //     .on("click", function(d) {
    //         svg.selectAll("circle")
    //                 .attr("visibility", "hidden");
    //         // if (svg.selectAll("circle").style.visibility == "visible") {
    //         //     console.log(svg.selectAll("circle").style.visibility);
    //         //     svg.selectAll("circle")
    //         //         .attr("visibility", "hidden");
    //         // } else {
    //         //     console.log(svg.selectAll("circle").style.visibility);
    //         //     svg.selectAll("circle")
    //         //         .attr("visibility", "visible");
    //         // }  
    //     })

    // d3.select("#button2")
    //     .on("click", function(d) {
    //         alert("hi");
    //     })

    // d3.select("#button3")
    //     .on("click", function(d) {
    //         alert("hi");
    //     })
} 

function changeimage(d) {
    document.getElementById("photo").src = d;
}

// function updateData() {

//     // Select the section we want to apply our changes to
//     var svg = d3.select("body").transition();

//     // Make the changes
//         svg.select("circle")   // change the line
//             .duration(750)
//             .style.visibilty="hidden";
//         svg.select(".x.axis") // change the x axis
//             .duration(750)
//             .call(xAxis);
//         svg.select(".y.axis") // change the y axis
//             .duration(750)
//             .call(yAxis);

//     });
// }

function addimage(d) {
    // var newphoto = document.createElement("span");
    // console.log(newphoto);
    // document.getElementByID("photo").style.visibilty="visible";
    var img = new Image();
    img.src = d
    photo.appendChild(img);
}

function removeimage(d) {
    // var img = document.getElementById("photo");
    // img.parentNode.removeChild(img);
    // document.getElementByID("photo").style.visibilty="hidden";
}

