/* GLOBAL SHIT*/
var data = data_start("scatter");

function data_start(type) {
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: type
  };

  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    type: type
  };

  var trace3 = {
    x: [2, 5, 7, 5],
    y: [16, 3, 8, 9],
    type: type
  };

  var trace4 = {
    x: [2, 5, 7, 5],
    y: [66, 4, 12, 9],
    type: type
  };

  return [trace1, trace2, trace3, trace4];
}

function data_start_mode(type) {
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: type
  };

  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: type
  };

  var trace3 = {
    x: [2, 5, 7, 5],
    y: [16, 3, 8, 9],
    mode: type
  };

  var trace4 = {
    x: [2, 5, 7, 5],
    y: [66, 4, 12, 9],
    mode: type
  };

  return [trace1, trace2, trace3, trace4];
}

/* GLOBAL SHIT*/

$(document).ready(function() {
  //START
  for (let i = 0; i < data.length; i++) {
    let graph =
      '<div class="center" id="graph' +
      i.toString() +
      '"style="width:800px;height:400px;"></div>';
    $(".graph_area").append(graph);
    Plotly.newPlot("graph" + i.toString(), data);
  }
});

$("#bar").on("click", function() {
  remove_graph();
  data = data_start("bar");
  plot_graph();
});

$("#lines").on("click", function() {
  remove_graph();
  data = data_start("scatter");
  plot_graph();
});

$("#dots").on("click", function() {
  remove_graph();
  data = data_start_mode("markers");
  plot_graph();
});

function plot_graph(mode, type) {
  for (let i = 0; i < data.length; i++) {
    let graph =
      '<div class="center" id="graph' +
      i.toString() +
      '"style="width:800px;height:400px;"></div>';
    $(".graph_area").append(graph);
    Plotly.newPlot("graph" + i.toString(), data);
  }
}

function remove_graph() {
  for (let i = 0; i < data.length; i++) {
    $("#graph" + i.toString()).remove();
  }
}

$("#project").on("click", function() {
  remove_graph();
  $(".project").fadeIn(100);
});
