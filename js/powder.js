var canvas = $("#wrapper-canvas").get(0);

var dimensions = {
  width: 1920, // Set your fixed width here
  height: 1000,
  //width: $(window).width(),
  //height: $(window).height(),
};

// Apply the fixed dimensions to the canvas
canvas.width = dimensions.width;
canvas.height = dimensions.height;

//atter.use("matter-attractors");
//Matter.use("matter-wrap");

function runMatter() {
  // module aliases模組別名
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create();

  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0.1;

  // create renderer
  var render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      showVelocity: false, //顯示速度
      width: dimensions.width,
      height: dimensions.height,
      wireframes: false,
      background: "rgba(167, 110, 64, 0)",
    },
  });

  // create runner
  var runner = Runner.create();

  // Runner.run(runner, engine);
  // Render.run(render);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // create a body with an attractor吸引力的
  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    Math.max(dimensions.width / 10, dimensions.height / 10) / 2,
    {
      render: {
        fillStyle: `rgba(255, 255, 255, 0)`,
        strokeStyle: `#e9c27d`,
        lineWidth: 1,
      },

      isStatic: true,
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          },
        ],
      },
    }
  );

  World.add(world, attractiveBody);

  // add some bodies that to be attracted
  //幾何形
  for (var i = 0; i < 150; i += 1) {
    // 生成 100 个粒子
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    let s =
      Common.random() > 0.6 ? Common.random(0.5, 3) : Common.random(0.2, 2);
    let poligonNumber = Common.random(1, 4);
    var body = Bodies.polygon(
      x,
      y,
      poligonNumber,
      s,

      {
        mass: s / 80,
        friction: 0, //摩擦力
        frictionAir: 0.01, //空气阻力
        angle: Math.round(Math.random() * 360),
        render: {
          fillStyle: "#db9928",
          // strokeStyle: `#DDDDDD`,
          //lineWidth: 2,
        },
      }
    );
    World.add(world, body);
  }
  // add small circles
  for (var i = 0; i < 150; i += 1) {
    // 生成100个小圆形粒子
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    let r = Common.random(0, 4);
    var circle1 = Bodies.circle(x, y, Common.random(2, 6), {
      mass: 0.1,
      friction: 0,
      frictionAir: 0.01,
      render: {
        fillStyle: r > 0.3 ? `#bb4d00` : `#db9928`, //r大於0.3時:r小於0.3時
      },
    });

    World.add(world, circle1);
  }

  // add larger circles
  for (var i = 0; i < 20; i += 1) {
    // 生成 20 个较大的圆形粒子
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    let r = Common.random(0, 4);
    var circle2 = Bodies.circle(x, y, Common.random(2, 12), {
      mass: 0.2,
      friction: 0,
      frictionAir: 0.01,
      render: {
        fillStyle: r > 0.3 ? `#dadd40` : `#f3f2bd`,
      },
    });

    World.add(world, circle2);
  }

  // add dense circles
  for (var i = 0; i < 10; i += 1) {
    // 生成 10 个密度较大的圆形粒子
    let x = Common.random(0, render.options.width);
    let y = Common.random(0, render.options.height);
    var circle3 = Bodies.circle(x, y, Common.random(1, 2), {
      mass: 1,
      friction: 0.01,
      frictionAir: 0.01,
      render: {
        fillStyle: `#55d080`,
      },
    });

    World.add(world, circle3);
  }
  // add mouse control
  var mouse = Mouse.create(render.canvas);

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) return;
    // smoothly move the attractor body towards the mouse
    Body.translate(attractiveBody, {
      x: (mouse.position.x - attractiveBody.position.x) * 0.12,
      y: (mouse.position.y - attractiveBody.position.y) * 0.12,
    });
  });

  // apply a small periodic force to each body to simulate floating
  //添加周期性的力
  Events.on(engine, "beforeUpdate", function () {
    Composite.allBodies(engine.world).forEach(function (body) {
      if (!body.isStatic) {
        var forceMagnitude = 0.00001 * body.mass;
        Body.applyForce(body, body.position, {
          x: (Common.random() - 0.5) * forceMagnitude,
          y: (Common.random() - 0.5) * forceMagnitude,
        });
      }
    });
  });

  // 在引擎的 beforeUpdate 事件中为每个粒子应用一个随机方向和大小的力
  Events.on(engine, "beforeUpdate", function () {
    Composite.allBodies(engine.world).forEach(function (body) {
      if (!body.isStatic) {
        var forceMagnitude = 0.0001 * body.mass; // 力的大小
        var forceAngle = Common.random(0, Math.PI * 2); // 力的方向，随机选择一个角度
        var forceX = forceMagnitude * Math.cos(forceAngle); // 在 x 方向上的力
        var forceY = forceMagnitude * Math.sin(forceAngle); // 在 y 方向上的力
        Body.applyForce(body, body.position, {
          x: forceX,
          y: forceY,
        });
      }
    });
  });

  // return a context for MatterDemo to control
  let data = {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
    play: function () {
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    },
  };

  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);
  return data;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

let m = runMatter();
setWindowSize();
$(window).resize(debounce(setWindowSize, 250));

$(".home").click(function (e) {
  $("html, body").animate(
    {
      scrollTop: $("#home_page").offset().top,
    },
    500
  );
});

$(".about").click(function (e) {
  $("html, body").animate(
    {
      scrollTop: $("#about_page").offset().top,
    },
    500
  );
});

//禁用默認的滾動行為
window.addEventListener(
  "wheel",
  function (event) {
    event.preventDefault();
  },
  { passive: false }
);
//滑鼠滾動控制
function smoothScrollWithWheel(scrollSpeed, behavior) {
  window.addEventListener("wheel", function (event) {
    var deltaY = event.deltaY;

    // 獲取目前的滾動調位置
    var currentScrollPosition = window.scrollY;

    // 根據滾輪滾動的方向和速度計算新的滾動位置
    var newScrollPosition = currentScrollPosition + deltaY * scrollSpeed;

    // 平滑滾動到新的位置
    window.scrollTo({
      top: newScrollPosition,
      behavior: behavior, // 平滑滾動的行為
    });
  });
}

// 滾動速度與行為
smoothScrollWithWheel(2, "smooth");
