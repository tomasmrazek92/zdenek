function getOffset(el) {
  var rect = { top: 0, left: 0 };
  while (el) {
    rect.top += el.offsetTop || 0;
    rect.left += el.offsetLeft || 0;
    el = el.offsetParent;
  }
  return rect;
}

function makeWorld() {
  // Should reappear
  var canvas = document.getElementsByClassName('plg-note');
  var rect = getOffset(canvas[0]);
  rect.width = canvas[0].offsetWidth;
  rect.height = canvas[0].offsetHeight;
  canvas[0].style.visibility = 'visible';

  /** Set up relative positions and scales **/
  var VIEW = {};
  VIEW.width = window.innerWidth;
  VIEW.height = window.innerHeight;
  VIEW.centerX = rect.width / 2;
  VIEW.centerY = rect.height / 2;
  VIEW.offsetX = VIEW.width / 2;
  VIEW.offsetY = VIEW.height / 2;

  // Matter.js module aliases
  var { Engine } = Matter,
    { Render } = Matter,
    { Runner } = Matter,
    { Common } = Matter,
    { World } = Matter,
    { Bodies } = Matter,
    { Body } = Matter,
    { Events } = Matter,
    { Query } = Matter,
    { MouseConstraint } = Matter,
    { Mouse } = Matter;

  // create engine
  var engine = Engine.create(),
    { world } = engine;

  // create renderer
  var render = Render.create({
    engine: engine,
    element: document.getElementById('debug'),
    options: {
      width: rect.width,
      height: rect.height,
      background: 'transparent', // transparent to hide
      wireframeBackground: 'transparent', // transparent to hide
      hasBounds: true,
      enabled: true,
      wireframes: true,
      showSleeping: true,
      showDebug: true,
      showBroadphase: true,
      showBounds: true,
      showVelocity: true,
      showCollisions: true,
      showAxes: false,
      showPositions: true,
      showAngleIndicator: true,
      showIds: true,
      showShadows: false,
    },
  });

  // Disable to hide debug
  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  var ceiling, wallLeft, wallRight, ground, disturber;

  // add walls
  var wallopts = {
    isStatic: true,
    restitution: 0.8,
    friction: 1,
  };
  var groundopts = {
    isStatic: true,
    restitution: 0.8,
    friction: 1,
  };
  World.add(world, [
    // ground
    (ground = Bodies.rectangle(
      rect.width / 2,
      rect.height + 50,
      rect.width + 200,
      100,
      groundopts
    )),
    // walls
    (ceiling = Bodies.rectangle(rect.width / 2, -50, rect.width + 200, 100, wallopts)), // top
    (wallRight = Bodies.rectangle(rect.width + 50, rect.height / 2, 100, rect.height, wallopts)), // right
    (wallLeft = Bodies.rectangle(-50, rect.height / 2, 100, rect.height, wallopts)), // left
  ]);

  var bodiesDom = document.querySelectorAll('.plg-note_item');
  var bodies = [];
  var disturbers = [];
  for (var i = 0, l = bodiesDom.length; i < l; i++) {
    if (bodiesDom[i].classList.contains('item')) {
      var body = Bodies.rectangle(
        rect.width / 2 + Math.floor((Math.random() * rect.width) / 2) - rect.width / 4,
        rect.height / 2 + Math.floor((Math.random() * rect.height) / 2) - rect.height / 4,
        (rect.width * bodiesDom[i].offsetWidth) / window.innerWidth,
        (rect.height * bodiesDom[i].offsetHeight) / window.innerHeight,
        {
          restitution: 0.5,
          friction: 0,
          frictionAir: 0.001,
          frictionStatic: 0,
          density: 1,
          chamfer: { radius: 24 },
        }
      );
    } else if (bodiesDom[i].classList.contains('button-item')) {
      var body = Bodies.rectangle(
        rect.width / 2 + Math.floor((Math.random() * rect.width) / 2) - rect.width / 4,
        rect.height / 2 + Math.floor((Math.random() * rect.height) / 2) - rect.height / 4,
        150,
        44,
        {
          restitution: 0.5,
          friction: 0,
          frictionAir: 0.001,
          frictionStatic: 0,
          density: 1,
          chamfer: { radius: 24 },
        }
      );
    }
    bodiesDom[i].id = body.id;
    bodies.push(body);
  }

  World.add(engine.world, bodies);

  engine.world.gravity.y = 0.5;

  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 1,
        render: {
          visible: false,
        },
        isDraggable: function (body) {
          return body.isStatic ? false : true; // Enable dragging for non-static bodies
        },
      },
    });

  World.add(engine.world, mouseConstraint);

  let isScrolling = false;

  // Scroll event listener
  mouseConstraint.mouse.element.addEventListener('mousewheel', function () {
    isScrolling = true;
    mouseConstraint.mouse.element.removeEventListener(
      'mousewheel',
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      'DOMMouseScroll',
      mouseConstraint.mouse.mousewheel
    );
  });

  // mousedown event listener
  mouseConstraint.mouse.element.addEventListener('mousedown', function () {
    if (isScrolling) {
      isScrolling = false;
      mouseConstraint.mouse.element.addEventListener(
        'mousewheel',
        mouseConstraint.mouse.mousewheel
      );
      mouseConstraint.mouse.element.addEventListener(
        'DOMMouseScroll',
        mouseConstraint.mouse.mousewheel
      );
    }
  });

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  var mouseX, mouseY, mouseXO, mouseYO, mouseXN, mouseYN;

  // Hover
  Events.on(mouseConstraint, 'mousemove', function (e) {
    mouseX = e.mouse.absolute.x;
    mouseY = e.mouse.absolute.y;
    if (Query.point(bodies, { x: mouseX, y: mouseY }).length) {
      // remove exitsing hovers
      removeHovers();
      // apply new hover
      var underMouse = Query.point(bodies, { x: mouseX, y: mouseY })[0].id;
      document.getElementById(underMouse).className += ' hover';
      document.body.style.cursor = 'pointer';
    } else {
      removeHovers();
    }
  });

  function removeHovers() {
    var hovered = document.getElementsByClassName('hover');
    for (var i = 0; i < hovered.length; i++) {
      hovered[i].classList.remove('hover');
    }
    document.body.style.cursor = 'auto';
  }

  // Press (1)
  Events.on(mouseConstraint, 'mousedown', function (e) {
    mouseXO = e.mouse.absolute.x;
    mouseYO = e.mouse.absolute.y;
  });
  // Press (2), part 1 and 2 checks is not end of drag
  Events.on(mouseConstraint, 'mouseup', function (e) {
    mouseXN = e.mouse.absolute.x;
    mouseYN = e.mouse.absolute.y;
    if (mouseXO == mouseXN && mouseYO == mouseYN) {
      var clickedElement = Query.point(bodies, { x: mouseXN, y: mouseYN })[0];

      if (clickedElement) {
        var clickedElementId = clickedElement.id;
        var clickedElementDOM = document.getElementById(clickedElementId);

        if (clickedElementDOM.classList.contains('button-item')) {
          clickedElementDOM.click();
        }
      }
    }
    removeHovers();
  });

  window.requestAnimationFrame(update);

  function update() {
    for (var i = 0, l = disturbers.length; i < l; i++) {
      disturbers[i].force.y += (Math.round(Math.random()) * 2 - 1) * 0.5;
      disturbers[i].force.x += (Math.round(Math.random()) * 2 - 1) * 0.5;
    }

    // strips
    for (var i = 0, l = bodiesDom.length; i < l; i++) {
      var bodyDom = bodiesDom[i];
      var body = null;
      for (var j = 0, k = bodies.length; j < k; j++) {
        if (bodies[j].id == bodyDom.id) {
          body = bodies[j];
          break;
        }
      }

      if (body === null) continue;

      var rect = canvas[0].getBoundingClientRect();
      var canvasTop = canvas[0].offsetTop;
      var canvasLeft = canvas[0].offsetLeft;

      var bodyPositionRelativeToCanvas = {
        x: body.position.x - canvasLeft,
        y: body.position.y - canvasTop,
      };

      bodyDom.style.transform =
        'translate( ' +
        (bodyPositionRelativeToCanvas.x - bodyDom.offsetWidth / 2) +
        'px, ' +
        (bodyPositionRelativeToCanvas.y - bodyDom.offsetHeight * 1.5 + bodyDom.offsetHeight) +
        'px )';
      bodyDom.style.transform += 'rotate( ' + body.angle + 'rad )';
    }

    window.requestAnimationFrame(update);
  }
}

// Call World
makeWorld();

// Reload page every 500ms to handle resize
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

var refreshWorld = debounce(function () {
  location.reload();
}, 500);

window.addEventListener('resize', refreshWorld);
