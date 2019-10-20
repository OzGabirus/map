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

/* PARTICLE */

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 1.8,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);



// $.getJSON("temp.json", function(json) {
//   console.log(json); // this will show the info it in firebug console
// });
