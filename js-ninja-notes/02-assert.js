/**
 * Для блочного тестирования
 */
function assert(value, desc) {
  console[value === true ? 'log' : 'error'](desc);
}

/**
 * Группа тестов
 */
function test(name, fn) {
  console.log('Test group:', '"' + name + '"', 'start');
  console.log('======================================');
  fn();
  console.log('======================================');
  console.log('Test group:', '"' + name + '"', 'end');
}

test('Demo test', function () {
  assert(true, 'Yes');
  assert(false, 'No');
});


/**
 * Асинхронное тестирование
 */
var queue = [],
  paused = false;

function asyncTest(name, fn) {
  queue.push(fn);
  runTest();
};

function pause() {
  paused = true;
};

function resume() {
  paused = false;
  setTimeout(runTest, 1);
};

function runTest() {
  if (!paused && queue.length) {
    (queue.shift())();
    if (!paused) {
      resume();
    }
  }
};

asyncTest("Async Test #1", function () {
  pause();
  setTimeout(function () {
    assert(true, "First test completed");
    resume();
  }, 1000);
});

asyncTest("Async Test #2", function () {
  pause();
  setTimeout(function () {
    assert(true, "Second test completed");
    resume();
  }, 1000);
});