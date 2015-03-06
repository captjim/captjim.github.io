var width = $(document).width(),
    height = $(document).height(),
    i = 1;

var vertices = d3.range(9).map(function(d) {
  return [ Math.random() * 400 * Math.sin((d - i) * 2 * Math.PI/20) + .8 * width, 20 * Math.cos((d - i) * 2 * Math.PI/20) + .5 * height ];
});

var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [width, height]]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = svg.append("g").selectAll("path");


svg.selectAll("circle")
    .data(vertices.slice(1))
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 1.5);

redraw();

function redraw() {
  path = path
      .data(voronoi(vertices), polygon);

  path.exit().remove();

  path.enter().append("path")
      .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
      .attr("d", polygon);

  path.order();

  setTimeout(function(){
    i = i + 1;
    redraw();
  }, 2000);

}

function polygon(d) {
  return "M" + d.join("L") + "Z";
}
